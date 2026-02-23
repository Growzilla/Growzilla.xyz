'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface QuizStepStoreURLProps {
  value: string
  onNext: (value: string) => void
  onBack: () => void
}

export default function QuizStepStoreURL({ value, onNext, onBack }: QuizStepStoreURLProps) {
  const [url, setUrl] = useState(value)
  const [error, setError] = useState('')

  function handleSubmit() {
    const trimmed = url.trim().toLowerCase()
    if (!trimmed) {
      setError('Please enter your store URL')
      return
    }
    setError('')
    onNext(trimmed)
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
        What&apos;s your Shopify store URL?
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        We&apos;ll use this to personalize your results.
      </p>

      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError('') }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="yourstore.myshopify.com"
          className="w-full rounded-xl border border-white/10 bg-zilla-charcoal/40 px-4 py-4 text-white placeholder:text-gray-600 focus:border-zilla-neon/50 focus:outline-none focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
          autoFocus
        />
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-zilla w-full mt-6 py-4 rounded-xl text-base"
      >
        Next &rarr;
      </motion.button>
    </div>
  )
}
