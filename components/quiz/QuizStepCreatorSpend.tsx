'use client'

import { useCallback } from 'react'
import type { SpendRange } from '@/types/quiz'
import QuizOptionCard from './QuizOptionCard'

const OPTIONS: { value: SpendRange; label: string }[] = [
  { value: 'zero_3k', label: '$0 – $3K / month' },
  { value: '3k_8k', label: '$3K – $8K / month' },
  { value: '8k_20k', label: '$8K – $20K / month' },
  { value: '20k_50k', label: '$20K – $50K / month' },
  { value: 'over_50k', label: '$50K+ / month' },
]

interface QuizStepCreatorSpendProps {
  value: SpendRange | null
  onNext: (value: SpendRange) => void
  onBack: () => void
}

export default function QuizStepCreatorSpend({ value, onNext, onBack }: QuizStepCreatorSpendProps) {
  const handleSelect = useCallback((v: SpendRange) => {
    setTimeout(() => onNext(v), 300)
  }, [onNext])

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">
        How much do you spend on creators / UGC monthly?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <QuizOptionCard
            key={opt.value}
            label={opt.label}
            selected={value === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  )
}
