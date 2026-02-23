'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { QuizResult } from '@/types/quiz'
import { BUCKET_COLORS, BUCKET_LABELS } from '@/lib/quizCalculations'
import QuizLeakChart from './QuizLeakChart'

interface QuizResultsProps {
  result: QuizResult
  onUnlock: () => void
}

export default function QuizResults({ result, onUnlock }: QuizResultsProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const bucketColor = BUCKET_COLORS[result.bucket]
  const bucketLabel = BUCKET_LABELS[result.bucket]

  // Animate score counter
  useEffect(() => {
    const duration = 1800
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(eased * result.score))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [result.score])

  // SVG gauge parameters
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - result.score / 100)

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Score Gauge */}
        <div className="relative mb-6">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Track */}
            <circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
            />
            {/* Score arc */}
            <motion.circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke={bucketColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              transform="rotate(-90 90 90)"
              style={{ filter: `drop-shadow(0 0 8px ${bucketColor}40)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold text-white">{displayScore}</span>
            <span className="text-xs text-gray-500">/ 100</span>
          </div>
        </div>

        {/* Bucket label */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold mb-4"
          style={{ backgroundColor: `${bucketColor}15`, color: bucketColor }}
        >
          {bucketLabel}
        </span>

        {/* Leak estimate */}
        <p className="text-gray-400 text-sm mb-1">Estimated Monthly Revenue Leak</p>
        <p className="font-mono text-3xl sm:text-4xl font-bold text-white mb-8">
          ${result.leakEstimate.toLocaleString()}<span className="text-lg text-gray-500">/mo</span>
        </p>

        {/* Leak breakdown chart */}
        <div className="w-full card-zilla p-6 mb-8">
          <QuizLeakChart breakdown={result.breakdown} leakEstimate={result.leakEstimate} />
        </div>

        {/* Personalized insight */}
        <p className="text-sm text-gray-400 leading-relaxed text-center mb-10">
          {result.headline}
        </p>

        {/* CTA */}
        <motion.button
          onClick={onUnlock}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-zilla w-full py-4 rounded-xl text-base"
        >
          Unlock Your Full Revenue Report &rarr;
        </motion.button>
      </motion.div>
    </div>
  )
}
