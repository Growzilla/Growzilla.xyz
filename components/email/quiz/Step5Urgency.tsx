'use client';

import { useState } from 'react';
import type { EmailQuizData, Urgency } from '@/lib/email/types';
import StepLayout from './_layout';
import QuizOption from './QuizOption';

interface Props {
  data: EmailQuizData;
  update: (partial: Partial<EmailQuizData>) => void;
  onSubmit: () => void;
  submitting: boolean;
  prev: () => void;
}

const OPTIONS: { value: Urgency; label: string; description: string }[] = [
  {
    value: 'this-month',
    label: 'Ship this month',
    description: 'You\'re ready to grant access and start within a week.',
  },
  {
    value: 'next-month',
    label: 'Next month',
    description: 'Locking in scope now, kicking off in 30 days.',
  },
  {
    value: 'exploring',
    label: 'Just exploring',
    description: 'No plans to act yet — checking the math.',
  },
];

export default function Step5Urgency({ data, update, onSubmit, submitting, prev }: Props) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <StepLayout
      eyebrow="Step 5 of 5"
      heading="When do you want to ship?"
      subheading="Final question. Then we send your personalized floor audit."
      onBack={prev}
      primaryCta={{
        label: 'Get my audit',
        onClick: onSubmit,
        disabled: !data.urgency,
        loading: submitting,
      }}
    >
      <div className="grid gap-3">
        {OPTIONS.map((opt) => (
          <QuizOption
            key={opt.value}
            label={opt.label}
            description={opt.description}
            selected={data.urgency === opt.value}
            onClick={() => update({ urgency: opt.value })}
          />
        ))}
      </div>

      <div className="mt-8">
        {!showNotes ? (
          <button
            type="button"
            onClick={() => setShowNotes(true)}
            className="text-xs text-white/48 hover:text-white transition underline-offset-2 hover:underline"
          >
            + Anything else we should know? (optional)
          </button>
        ) : (
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={data.notes}
              onChange={(e) => update({ notes: e.target.value })}
              rows={3}
              placeholder="Anything about your list, your sender reputation, past agency experience…"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors resize-none"
            />
          </div>
        )}
      </div>
    </StepLayout>
  );
}
