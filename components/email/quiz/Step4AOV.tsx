'use client';

import { useEffect } from 'react';
import type { EmailQuizData, Temp } from '@/lib/email/types';
import StepLayout from './_layout';
import QuizOption from './QuizOption';

interface Props {
  data: EmailQuizData;
  update: (partial: Partial<EmailQuizData>) => void;
  next: () => void;
  prev: () => void;
}

const TEMP_OPTIONS: { value: Temp; label: string; description: string }[] = [
  {
    value: 'warm',
    label: 'Warm — quiet 30 to 90 days',
    description: 'Bought recently or opened email in the last 60 days.',
  },
  {
    value: 'cool',
    label: 'Cool — quiet 90 to 180 days',
    description: 'Quiet for a few months. Brand still recognizable.',
  },
  {
    value: 'cold',
    label: 'Cold — quiet 180+ days',
    description: 'Long dormant. Identity recall is fading.',
  },
];

export default function Step4AOV({ data, update, next, prev }: Props) {
  const aov = data.aov ?? 80;

  useEffect(() => {
    if (data.aov === undefined) update({ aov: 80 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepLayout
      eyebrow="Step 4 of 5"
      heading="What's your AOV — and how cold is the list?"
      subheading="AOV anchors the floor math. Temperature shifts the reactivation rate."
      onBack={prev}
      primaryCta={{
        label: 'Continue',
        onClick: next,
        disabled: !data.aov || data.aov < 10 || !data.temp,
      }}
    >
      <div className="grid gap-6">
        <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-6">
          <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 mb-2">
            Average order value (USD)
          </label>
          <div className="font-display text-4xl text-white mb-4 tabular-nums">
            ${aov.toLocaleString()}
          </div>
          <input
            type="range"
            min={20}
            max={500}
            step={5}
            value={Math.min(aov, 500)}
            onChange={(e) => update({ aov: parseInt(e.target.value) })}
            className="w-full accent-zilla-neon"
          />
          <div className="flex justify-between mt-2 text-xs text-white/48 font-mono">
            <span>$20</span>
            <span>$500+</span>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 mb-3">
            How cold is the list?
          </div>
          <div className="grid gap-3">
            {TEMP_OPTIONS.map((opt) => (
              <QuizOption
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={data.temp === opt.value}
                onClick={() => update({ temp: opt.value })}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
