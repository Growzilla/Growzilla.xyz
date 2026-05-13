'use client';

import type { MorsdagQuizData, Fulfillment } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly Fulfillment[] = ['Ja', 'Osäker', 'Nej'] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step5Fulfillment({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 5"
      heading="Kan ni leverera innan Mors dag?"
      subheading="31 maj 2026."
      options={OPTIONS}
      value={data.fulfillment}
      onSelect={(v) => {
        update({ fulfillment: v });
        next();
      }}
      onBack={prev}
    />
  );
}
