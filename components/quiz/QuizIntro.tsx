'use client'

import { motion } from 'framer-motion'

interface QuizIntroProps {
  onStart: () => void
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-4 py-12 sm:py-20"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 mb-8">
        <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
        <span className="text-xs font-mono text-zilla-neon tracking-wide uppercase">Free 90-Second Calculator</span>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-xl mb-6">
        Discover How Much Revenue Your Creators Are Quietly{' '}
        <span className="text-zilla-neon text-glow">Leaking</span>{' '}
        Every Month
      </h1>

      <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10">
        Free 90-second Creator Revenue Leak Calculator for Shopify brands
      </p>

      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-zilla text-base sm:text-lg px-10 py-4 rounded-xl"
      >
        Calculate My Revenue Leak &rarr;
      </motion.button>

      <p className="text-xs text-gray-500 mt-6 max-w-sm">
        Built by Growzilla — used by 100+ stores. No signup needed to start. No sales pitch.
      </p>
    </motion.div>
  )
}
