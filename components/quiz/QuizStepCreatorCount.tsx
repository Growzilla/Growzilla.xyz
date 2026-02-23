'use client'

import { useCallback } from 'react'
import type { CreatorCount } from '@/types/quiz'
import QuizOptionCard from './QuizOptionCard'

const OPTIONS: { value: CreatorCount; label: string }[] = [
  { value: '1_5', label: '1 – 5 creators' },
  { value: '6_15', label: '6 – 15 creators' },
  { value: '16_30', label: '16 – 30 creators' },
  { value: '30_plus', label: '30+ creators' },
]

interface QuizStepCreatorCountProps {
  value: CreatorCount | null
  onNext: (value: CreatorCount) => void
  onBack: () => void
}

export default function QuizStepCreatorCount({ value, onNext, onBack }: QuizStepCreatorCountProps) {
  const handleSelect = useCallback((v: CreatorCount) => {
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
        How many creators do you work with?
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
