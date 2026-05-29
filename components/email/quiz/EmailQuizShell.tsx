'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import type { EmailQuizData, ResultRoute } from '@/lib/email/types';
import { scoreLead } from '@/lib/email/scoreLead';
import { submitLead } from '@/lib/email/submitLead';
import {
  trackEmailDisqualified,
  trackEmailLead,
  trackEmailPartialLead,
  trackEmailQuizStart,
} from '@/lib/email/pixel';

import QuizProgress from './QuizProgress';
import Step1Strategy from './Step1Strategy';
import Step2Contact from './Step2Contact';
import Step3List from './Step3List';
import Step4AOV from './Step4AOV';
import Step5Urgency from './Step5Urgency';
import ResultGood from './ResultGood';
import ResultMaybe from './ResultMaybe';
import ResultBad from './ResultBad';

const TOTAL_STEPS = 5;

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
];

const stepVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

function makeInitialData(): EmailQuizData {
  return {
    contact: { name: '', email: '', brand: '', url: '', phone: '' },
    notes: '',
    attribution: {},
  };
}

function EmailQuizShellInner() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<EmailQuizData>(makeInitialData);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ResultRoute | null>(null);
  const [finalFloor, setFinalFloor] = useState(0);

  useEffect(() => {
    if (!searchParams) return;
    const attribution: Record<string, string> = {};
    for (const k of ATTRIBUTION_KEYS) {
      const v = searchParams.get(k);
      if (v) attribution[k] = v;
    }
    if (Object.keys(attribution).length > 0) {
      setData((prev) => ({ ...prev, attribution }));
    }
  }, [searchParams]);

  useEffect(() => {
    trackEmailQuizStart();
  }, []);

  const update = useCallback((partial: Partial<EmailQuizData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const [leadId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const existing = sessionStorage.getItem('email-lead-id');
    if (existing) return existing;
    const fresh =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem('email-lead-id', fresh);
    return fresh;
  });
  const partialFiredRef = useRef(false);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);
  const prev = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  // Fire partial after Step 2 (when contact is captured + validated).
  const firePartial = useCallback(
    (currentData: EmailQuizData) => {
      if (partialFiredRef.current) return;
      const c = currentData.contact;
      if (!c.email || !c.brand || !c.name) return;
      partialFiredRef.current = true;
      trackEmailPartialLead(leadId);
      void submitLead({ ...currentData, kind: 'partial', id: leadId });
    },
    [leadId],
  );

  const nextWithPartial = useCallback(() => {
    setStep((s) => {
      const newStep = Math.min(s + 1, TOTAL_STEPS);
      if (s === 2) firePartial(data);
      return newStep;
    });
  }, [data, firePartial]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    const submittedAt = new Date().toISOString();
    const finalData: EmailQuizData = { ...data, submittedAt };
    const { score, route, floorUsd } = scoreLead(finalData);
    if (route === 'bad') {
      trackEmailDisqualified(score);
    } else {
      trackEmailLead(route, score, floorUsd, leadId);
    }
    setFinalFloor(floorUsd);
    await submitLead({ ...finalData, score, route, floorUsd, kind: 'final', id: leadId });
    setResult(route);
    setSubmitting(false);
  }, [data, submitting, leadId]);

  const showProgress = result === null;

  const stepNode = useMemo(() => {
    if (result) {
      if (result === 'good') return <ResultGood data={data} floorUsd={finalFloor} />;
      if (result === 'maybe') return <ResultMaybe data={data} floorUsd={finalFloor} />;
      return <ResultBad data={data} />;
    }
    switch (step) {
      case 1:
        return <Step1Strategy data={data} update={update} next={next} />;
      case 2:
        return <Step2Contact data={data} update={update} next={nextWithPartial} prev={prev} />;
      case 3:
        return <Step3List data={data} update={update} next={next} prev={prev} />;
      case 4:
        return <Step4AOV data={data} update={update} next={next} prev={prev} />;
      case 5:
        return (
          <Step5Urgency
            data={data}
            update={update}
            submitting={submitting}
            onSubmit={handleSubmit}
            prev={prev}
          />
        );
      default:
        return null;
    }
  }, [step, data, update, next, nextWithPartial, prev, submitting, handleSubmit, result, finalFloor]);

  const motionKey = result ? `result-${result}` : `step-${step}`;

  return (
    <div className="min-h-screen bg-zilla-black text-white">
      <nav className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-zilla-neon flex items-center justify-center">
              <span className="text-zilla-black font-bold text-[10px]">G</span>
            </div>
            <span className="font-display font-semibold text-white text-sm tracking-wide group-hover:text-zilla-neon transition-colors">
              GROWZILLA
            </span>
          </Link>
          <Link
            href="/email"
            className="text-xs text-white/55 hover:text-white transition-colors"
          >
            ← Back to offer
          </Link>
        </div>
      </nav>

      {showProgress && (
        <div className="px-4 sm:px-6 pt-8 sm:pt-10">
          <div className="max-w-2xl mx-auto">
            <QuizProgress step={step} total={TOTAL_STEPS} />
          </div>
        </div>
      )}

      <main className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={motionKey}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {stepNode}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-[11px] text-white/35 font-mono uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Growzilla</span>
          <Link href="/privacy" className="hover:text-white/60 transition-colors">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function EmailQuizShell() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zilla-black" />}>
      <EmailQuizShellInner />
    </Suspense>
  );
}
