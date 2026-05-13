'use client';

import type { MorsdagQuizData, Platform } from '@/lib/morsdag/types';
import SingleSelectStep from './SingleSelectStep';

const OPTIONS: readonly Platform[] = [
  'Shopify',
  'WooCommerce',
  'Custom/other',
  'Vi har ingen riktig butik ännu',
] as const;

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
  prev: () => void;
}

export default function Step2Platform({ data, update, next, prev }: Props) {
  return (
    <SingleSelectStep
      eyebrow="Steg 2"
      heading="Vilken plattform använder ni?"
      options={OPTIONS}
      value={data.platform}
      onSelect={(v) => {
        update({ platform: v });
        next();
      }}
      onBack={prev}
    />
  );
}
