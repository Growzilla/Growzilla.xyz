'use client';

import type { MorsdagQuizData, Revenue } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly Revenue[] = ['0–25k kr', '25k–100k kr', '100k–500k kr', '500k+ kr'] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step3Revenue({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 3"
      heading="Hur mycket omsätter butiken per månad ungefär?"
      options={OPTIONS}
      value={data.revenue}
      onSelect={(v) => {
        update({ revenue: v });
        next();
      }}
      onBack={prev}
    />
  );
}
