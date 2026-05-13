'use client';

import type { MorsdagQuizData, AdBudget } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly AdBudget[] = [
  'Under 5 000 kr',
  '5 000–15 000 kr',
  '15 000–50 000 kr',
  '50 000 kr+',
] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step7AdBudget({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 7"
      heading="Vilken annonsbudget kan ni lägga på kampanjen?"
      options={OPTIONS}
      value={data.adBudget}
      onSelect={(v) => {
        update({ adBudget: v });
        next();
      }}
      onBack={prev}
    />
  );
}
