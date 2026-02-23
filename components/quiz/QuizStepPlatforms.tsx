'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { QuizPlatform } from '@/types/quiz'
import QuizOptionCard from './QuizOptionCard'

const OPTIONS: { value: QuizPlatform; label: string }[] = [
  { value: 'instagram_reels', label: 'Instagram Reels' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube_shorts', label: 'YouTube Shorts' },
  { value: 'pinterest_other', label: 'Pinterest / Other' },
]

interface QuizStepPlatformsProps {
  value: QuizPlatform[]
  onNext: (value: QuizPlatform[]) => void
  onBack: () => void
}

export default function QuizStepPlatforms({ value, onNext, onBack }: QuizStepPlatformsProps) {
  const [selected, setSelected] = useState<QuizPlatform[]>(value)

  function toggle(platform: QuizPlatform) {
    setSelected((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
        Which platforms do your creators post on?
      </h2>
      <p className="text-sm text-gray-500 mb-8">Select all that apply</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <QuizOptionCard
            key={opt.value}
            label={opt.label}
            selected={selected.includes(opt.value)}
            onClick={() => toggle(opt.value)}
            multiSelect
          />
        ))}
      </div>

      <motion.button
        onClick={() => selected.length > 0 && onNext(selected)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={selected.length === 0}
        className="btn-zilla w-full mt-6 py-4 rounded-xl text-base disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next &rarr;
      </motion.button>
    </div>
  )
}
