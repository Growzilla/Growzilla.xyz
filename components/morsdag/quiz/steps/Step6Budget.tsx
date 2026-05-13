'use client';

import type { MorsdagQuizData, Budget } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly Budget[] = ['Ja', 'Kanske, om caset är rätt', 'Nej'] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step6Budget({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 6"
      heading="Har ni budget för både setup och annonser?"
      options={OPTIONS}
      value={data.budget}
      onSelect={(v) => {
        update({ budget: v });
        next();
      }}
      onBack={prev}
    />
  );
}
