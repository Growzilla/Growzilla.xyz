'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import type { MorsdagQuizData, ResultRoute } from '@/lib/morsdag/types';
import { scoreLead } from '@/lib/morsdag/scoreLead';
import { submitLead } from '@/lib/morsdag/submitLead';

import MorsdagQuizProgress from './MorsdagQuizProgress';
import Step1Contact from './steps/Step1Contact';
import Step2Platform from './steps/Step2Platform';
import Step3Revenue from './steps/Step3Revenue';
import Step4ProductFit from './steps/Step4ProductFit';
import Step5Fulfillment from './steps/Step5Fulfillment';
import Step6Budget from './steps/Step6Budget';
import Step7AdBudget from './steps/Step7AdBudget';
import Step8Urgency from './steps/Step8Urgency';
import Step9Notes from './steps/Step9Notes';
import ResultGood from './results/ResultGood';
import ResultMaybe from './results/ResultMaybe';
import ResultBad from './results/ResultBad';

const TOTAL_STEPS = 9;

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

function makeInitialData(): MorsdagQuizData {
  return {
    contact: { namn: '', foretag: '', email: '', telefon: '', url: '' },
    notes: '',
    attribution: {},
  };
}

function MorsdagQuizShellInner() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<MorsdagQuizData>(makeInitialData);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ResultRoute | null>(null);

  // Capture UTM / click IDs once on mount
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

  const update = useCallback((partial: Partial<MorsdagQuizData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), []);
  const prev = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    const submittedAt = new Date().toISOString();
    const finalData: MorsdagQuizData = { ...data, submittedAt };
    const { score, route } = scoreLead(finalData);
    // Fire and forget — submitLead never throws, returns {ok:false} on failure
    await submitLead({ ...finalData, score, route });
    setResult(route);
    setSubmitting(false);
  }, [data, submitting]);

  const showProgress = result === null;

  const stepNode = useMemo(() => {
    if (result) {
      if (result === 'good') return <ResultGood />;
      if (result === 'maybe') return <ResultMaybe />;
      return <ResultBad />;
    }
    switch (step) {
      case 1:
        return <Step1Contact data={data} update={update} next={next} />;
      case 2:
        return <Step2Platform data={data} update={update} next={next} prev={prev} />;
      case 3:
        return <Step3Revenue data={data} update={update} next={next} prev={prev} />;
      case 4:
        return <Step4ProductFit data={data} update={update} next={next} prev={prev} />;
      case 5:
        return <Step5Fulfillment data={data} update={update} next={next} prev={prev} />;
      case 6:
        return <Step6Budget data={data} update={update} next={next} prev={prev} />;
      case 7:
        return <Step7AdBudget data={data} update={update} next={next} prev={prev} />;
      case 8:
        return <Step8Urgency data={data} update={update} next={next} prev={prev} />;
      case 9:
        return (
          <Step9Notes
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
  }, [step, data, update, next, prev, submitting, handleSubmit, result]);

  // Key changes whenever we transition between meaningfully different screens
  const motionKey = result ? `result-${result}` : `step-${step}`;

  return (
    <div className="min-h-screen bg-morsdag-ink text-white">
      <nav className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-morsdag-rose flex items-center justify-center">
              <span className="text-morsdag-ink font-bold text-[10px]">G</span>
            </div>
            <span className="font-display font-semibold text-white text-sm tracking-wide group-hover:text-morsdag-rose transition-colors">
              GROWZILLA
            </span>
          </Link>
          <Link
            href="/morsdag"
            className="text-xs text-white/55 hover:text-white transition-colors"
          >
            Tillbaka till erbjudandet
          </Link>
        </div>
      </nav>

      {showProgress && (
        <div className="px-4 sm:px-6 pt-8 sm:pt-10">
          <div className="max-w-2xl mx-auto">
            <MorsdagQuizProgress step={step} total={TOTAL_STEPS} />
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
            Integritet
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function MorsdagQuizShell() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-morsdag-ink" />}>
      <MorsdagQuizShellInner />
    </Suspense>
  );
}
