'use client';

import type { MorsdagQuizData, ProductFit } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly ProductFit[] = ['Ja, tydligt', 'Kanske', 'Nej'] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step4ProductFit({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 4"
      heading="Har ni en produkt eller ett erbjudande som passar Mors dag?"
      options={OPTIONS}
      value={data.productFit}
      onSelect={(v) => {
        update({ productFit: v });
        next();
      }}
      onBack={prev}
    />
  );
}
