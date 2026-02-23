'use client'

import { motion } from 'framer-motion'

interface QuizProgressBarProps {
  step: number // 1-6
}

export default function QuizProgressBar({ step }: QuizProgressBarProps) {
  const progress = Math.min(step / 6, 1)

  return (
    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className="h-full bg-zilla-neon rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
