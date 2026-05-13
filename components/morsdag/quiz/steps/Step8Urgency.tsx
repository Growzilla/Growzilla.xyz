'use client';

import type { MorsdagQuizData, Urgency } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly Urgency[] = ['Igår', 'Inom 48h', 'Inom en vecka', 'Bara nyfiken'] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step8Urgency({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 8"
      heading="När vill ni lansera?"
      options={OPTIONS}
      value={data.urgency}
      onSelect={(v) => {
        update({ urgency: v });
        next();
      }}
      onBack={prev}
    />
  );
}
