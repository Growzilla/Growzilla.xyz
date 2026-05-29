'use client';

import { useState } from 'react';
import type { EmailQuizData, GrowthStrategy } from '@/lib/email/types';
import StepLayout from './_layout';
import QuizOption from './QuizOption';

interface Props {
  data: EmailQuizData;
  update: (partial: Partial<EmailQuizData>) => void;
  next: () => void;
}

const OPTIONS: { value: GrowthStrategy; label: string; description: string }[] = [
  {
    value: 'paid-ads',
    label: 'Paid ads (Meta / Google)',
    description: 'Most of your acquisition runs through ad spend.',
  },
  {
    value: 'organic-social',
    label: 'Organic social / content',
    description: 'TikTok, Instagram, YouTube — building audience.',
  },
  {
    value: 'influencers',
    label: 'Influencers / UGC',
    description: 'Creator partnerships drive traffic and sales.',
  },
  {
    value: 'seo',
    label: 'SEO',
    description: 'Long-tail search and organic Google traffic.',
  },
  {
    value: 'reactivation',
    label: 'Email reactivation',
    description: 'You already work the existing list. Smart.',
  },
  {
    value: 'multiple',
    label: 'Multiple / not sure',
    description: 'A mix — and one of them is starving the others.',
  },
];

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Step1Strategy({ data, update, next }: Props) {
  const [pending, setPending] = useState<GrowthStrategy | null>(null);

  function pick(v: GrowthStrategy) {
    if (pending) return;
    setPending(v);
    update({ growthStrategy: v });
    window.setTimeout(() => next(), 200);
  }

  return (
    <StepLayout
      eyebrow="Step 1 of 5"
      heading="What's your growth strategy right now?"
      subheading="Pick the one that takes up most of your week. There's no wrong answer — the quiz tells you what your floor looks like next to it."
    >
      <div className="grid gap-3">
        {OPTIONS.map((opt, i) => (
          <QuizOption
            key={opt.value}
            label={opt.label}
            description={opt.description}
            letter={LETTERS[i]}
            selected={(pending ?? data.growthStrategy) === opt.value}
            onClick={() => pick(opt.value)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
