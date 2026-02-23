'use client'

import { motion } from 'framer-motion'
import type { QuizResult } from '@/types/quiz'
import { BUCKET_COLORS, BUCKET_LABELS } from '@/lib/quizCalculations'
import QuizLeakChart from './QuizLeakChart'

interface QuizResultsFullProps {
  result: QuizResult
  storeUrl: string
}

export default function QuizResultsFull({ result, storeUrl }: QuizResultsFullProps) {
  const bucketColor = BUCKET_COLORS[result.bucket]
  const bucketLabel = BUCKET_LABELS[result.bucket]
  const dashboardUrl = `/organicdashboard?storeUrl=${encodeURIComponent(storeUrl)}&source=quiz`

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6"
          style={{ backgroundColor: `${bucketColor}15`, color: bucketColor }}
        >
          Risk Score: {result.score}/100 — {bucketLabel}
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-2">
          Your Full Revenue Leak Report
        </h2>
        <p className="font-mono text-3xl font-bold text-zilla-neon mb-8">
          ${result.leakEstimate.toLocaleString()}<span className="text-lg text-gray-500">/mo</span>
        </p>

        {/* Insight paragraph */}
        <div className="card-zilla p-6 mb-6 w-full">
          <p className="text-sm text-gray-300 leading-relaxed">{result.insight}</p>
        </div>

        {/* Leak breakdown */}
        <div className="card-zilla p-6 mb-6 w-full">
          <h3 className="text-sm font-medium text-white mb-4">Revenue Leak Breakdown</h3>
          <QuizLeakChart breakdown={result.breakdown} leakEstimate={result.leakEstimate} />
        </div>

        {/* KPI-style summary */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8">
          <div className="card-zilla p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Annual Impact</p>
            <p className="font-mono text-lg font-bold text-white">
              ${(result.leakEstimate * 12).toLocaleString()}
            </p>
          </div>
          <div className="card-zilla p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Leak Rate</p>
            <p className="font-mono text-lg font-bold" style={{ color: bucketColor }}>
              {(0.08 + (result.score / 100) * 0.22).toFixed(0)}%
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="w-full space-y-3">
          <motion.a
            href={dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-zilla w-full py-4 rounded-xl text-base text-center block"
          >
            Play Around with the Live Dashboard &rarr;
          </motion.a>

          <motion.a
            href={`${dashboardUrl}&scrollTo=calendly`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl text-base text-center block border border-zilla-neon/30 bg-zilla-neon/5 text-zilla-neon font-medium hover:bg-zilla-neon/10 transition-colors"
          >
            Book a 15-Min Custom Demo Call &rarr;
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
