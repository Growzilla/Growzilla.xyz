'use client'

import { useCallback } from 'react'
import type { TrackingMethod } from '@/types/quiz'
import QuizOptionCard from './QuizOptionCard'

const OPTIONS: { value: TrackingMethod; label: string }[] = [
  { value: 'guesswork', label: "We don't — it's guesswork" },
  { value: 'spreadsheets', label: 'Manual spreadsheets' },
  { value: 'ga_meta', label: 'GA / Meta dashboard' },
  { value: 'not_accurate', label: 'Some tracking but not accurate' },
]

interface QuizStepTrackingProps {
  value: TrackingMethod | null
  onNext: (value: TrackingMethod) => void
  onBack: () => void
}

export default function QuizStepTracking({ value, onNext, onBack }: QuizStepTrackingProps) {
  const handleSelect = useCallback((v: TrackingMethod) => {
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
        How do you currently track creator-driven revenue?
      </h2>

      <div className="grid grid-cols-1 gap-3">
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
