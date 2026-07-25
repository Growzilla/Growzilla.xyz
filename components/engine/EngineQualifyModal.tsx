import React, { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/router';

export type QualifyAnswers = {
  role: 'founder' | 'growth' | 'other' | null;
  goal: 'yes' | 'exploring' | null;
  invest: 'yes' | 'not_now' | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const ROLE_OPTIONS: { value: NonNullable<QualifyAnswers['role']>; label: string }[] = [
  { value: 'founder', label: 'B2B / SaaS founder (or co-founder)' },
  { value: 'growth', label: 'Growth / GTM lead at a B2B company' },
  { value: 'other', label: 'Something else' },
];

const GOAL_OPTIONS: { value: NonNullable<QualifyAnswers['goal']>; label: string }[] = [
  { value: 'yes', label: 'Yes — 5–10 qualified meetings / week is the goal' },
  { value: 'exploring', label: 'Exploring — not sure yet' },
];

const INVEST_OPTIONS: { value: NonNullable<QualifyAnswers['invest']>; label: string }[] = [
  { value: 'yes', label: 'Yes — ready to invest if it’s a fit' },
  { value: 'not_now', label: 'Not right now' },
];

function isEligible(a: QualifyAnswers): boolean {
  return (
    (a.role === 'founder' || a.role === 'growth') &&
    a.goal === 'yes' &&
    a.invest === 'yes'
  );
}

export default function EngineQualifyModal({ open, onClose }: Props) {
  const router = useRouter();
  const titleId = useId();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QualifyAnswers>({
    role: null,
    goal: null,
    invest: null,
  });

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setAnswers({ role: null, goal: null, invest: null });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const goCall = (eligible: boolean) => {
    try {
      sessionStorage.setItem(
        'gz_call_qualify',
        JSON.stringify({ eligible, answers, at: Date.now() })
      );
    } catch {
      /* ignore */
    }
    onClose();
    void router.push(eligible ? '/call?eligible=1' : '/call?eligible=0');
  };

  const steps = [
    {
      key: 'role' as const,
      question: 'Which best describes you?',
      options: ROLE_OPTIONS,
      value: answers.role,
      set: (v: NonNullable<QualifyAnswers['role']>) =>
        setAnswers((a) => ({ ...a, role: v })),
    },
    {
      key: 'goal' as const,
      question: 'Is booking 5–10 qualified meetings a week from LinkedIn a priority?',
      options: GOAL_OPTIONS,
      value: answers.goal,
      set: (v: NonNullable<QualifyAnswers['goal']>) =>
        setAnswers((a) => ({ ...a, goal: v })),
    },
    {
      key: 'invest' as const,
      question: 'If the system fits, are you able to invest in a done-for-you engine?',
      options: INVEST_OPTIONS,
      value: answers.invest,
      set: (v: NonNullable<QualifyAnswers['invest']>) =>
        setAnswers((a) => ({ ...a, invest: v })),
    },
  ];

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const onSelect = (value: string) => {
    const next: QualifyAnswers = { ...answers, [current.key]: value } as QualifyAnswers;
    setAnswers(next);
    if (step < steps.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 160);
      return;
    }
    goCall(isEligible(next));
  };

  return (
    <div
      className="engine-modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="engine-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <p className="engine-eyebrow engine-eyebrow-mute mb-2">Quick fit check</p>
            <h2 id={titleId} className="engine-display text-[1.35rem] sm:text-[1.5rem] leading-tight">
              Three short questions
            </h2>
            <p className="mt-2 text-sm text-white/45 leading-relaxed">
              So we only put the right people on a fit call.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-md border border-white/[0.1] text-white/45 hover:text-white/80 hover:border-white/20 transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="h-0.5 w-full rounded-full bg-white/[0.06] mb-6 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--e-neon)]/70 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/30 mb-2">
          {step + 1} / {steps.length}
        </p>
        <p className="text-[15px] sm:text-base text-white/88 font-medium mb-4 leading-snug">
          {current.question}
        </p>

        <div className="space-y-2">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`engine-option ${current.value === opt.value ? 'engine-option-active' : ''}`}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="mt-5 text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
