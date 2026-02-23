'use client'

import { useCallback } from 'react'
import type { RevenueRange } from '@/types/quiz'
import QuizOptionCard from './QuizOptionCard'

const OPTIONS: { value: RevenueRange; label: string }[] = [
  { value: 'under_50k', label: 'Under $50K / month' },
  { value: '50k_150k', label: '$50K – $150K / month' },
  { value: '150k_400k', label: '$150K – $400K / month' },
  { value: '400k_1m', label: '$400K – $1M / month' },
  { value: 'over_1m', label: '$1M+ / month' },
]

interface QuizStepRevenueProps {
  value: RevenueRange | null
  onNext: (value: RevenueRange) => void
  onBack: () => void
}

export default function QuizStepRevenue({ value, onNext, onBack }: QuizStepRevenueProps) {
  const handleSelect = useCallback((v: RevenueRange) => {
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
        What&apos;s your monthly revenue?
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
