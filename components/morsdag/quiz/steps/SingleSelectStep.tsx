'use client';

import { useState } from 'react';
import MorsdagQuizOption from '../MorsdagQuizOption';
import StepLayout from './_layout';

interface Props<T extends string> {
  eyebrow: string;
  heading: string;
  subheading?: string;
  options: readonly T[];
  value: T | undefined;
  onSelect: (v: T) => void;
  onBack?: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function SingleSelectStep<T extends string>({
  eyebrow,
  heading,
  subheading,
  options,
  value,
  onSelect,
  onBack,
}: Props<T>) {
  const [pending, setPending] = useState<T | null>(null);

  function handlePick(v: T) {
    if (pending) return;
    setPending(v);
    // small UX delay so the user can see the selection state before transitioning
    window.setTimeout(() => onSelect(v), 200);
  }

  return (
    <StepLayout eyebrow={eyebrow} heading={heading} subheading={subheading} onBack={onBack}>
      <div className="grid gap-3">
        {options.map((opt, i) => (
          <MorsdagQuizOption
            key={opt}
            label={opt}
            letter={LETTERS[i]}
            selected={(pending ?? value) === opt}
            onClick={() => handlePick(opt)}
          />
        ))}
      </div>
    </StepLayout>
  );
}
