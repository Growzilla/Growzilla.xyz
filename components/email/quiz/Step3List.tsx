'use client';

import { useEffect } from 'react';
import type { EmailQuizData } from '@/lib/email/types';
import StepLayout from './_layout';

interface Props {
  data: EmailQuizData;
  update: (partial: Partial<EmailQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step3List({ data, update, next, prev }: Props) {
  const value = data.listSize ?? 5000;

  // Seed default into state if missing so the Continue button enables without a manual nudge.
  useEffect(() => {
    if (data.listSize === undefined) update({ listSize: 5000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepLayout
      eyebrow="Step 3 of 5"
      heading="How many dormant subscribers?"
      subheading="People on your Klaviyo list who haven't bought in 60+ days. A rough estimate is fine — we'll refine on the call."
      onBack={prev}
      primaryCta={{
        label: 'Continue',
        onClick: next,
        disabled: !data.listSize || data.listSize < 100,
      }}
    >
      <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-6">
        <div className="font-display text-5xl text-white mb-4 tabular-nums">
          {value.toLocaleString()}
        </div>
        <input
          type="range"
          min={500}
          max={50000}
          step={500}
          value={Math.min(value, 50000)}
          onChange={(e) => update({ listSize: parseInt(e.target.value) })}
          className="w-full accent-zilla-neon"
        />
        <div className="flex justify-between mt-2 text-xs text-white/48 font-mono">
          <span>500</span>
          <span>50,000+</span>
        </div>
        <div className="mt-6">
          <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 mb-2">
            Or type exactly:
          </label>
          <input
            type="number"
            min={0}
            max={500000}
            step={100}
            value={value}
            onChange={(e) => update({ listSize: Math.max(0, parseInt(e.target.value) || 0) })}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
          />
        </div>
      </div>
    </StepLayout>
  );
}
