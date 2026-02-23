'use client'

import { motion } from 'framer-motion'

interface QuizOptionCardProps {
  label: string
  selected: boolean
  onClick: () => void
  multiSelect?: boolean
}

export default function QuizOptionCard({ label, selected, onClick, multiSelect }: QuizOptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full rounded-xl border p-4 text-left cursor-pointer transition-colors min-h-[52px] flex items-center gap-3 ${
        selected
          ? 'border-zilla-neon/50 bg-zilla-neon/5 shadow-[0_0_20px_rgba(0,255,148,0.08)]'
          : 'border-white/10 bg-zilla-charcoal/40 hover:border-white/20 hover:bg-zilla-charcoal/60'
      }`}
    >
      {/* Indicator */}
      <span
        className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-${multiSelect ? 'md' : 'full'} border transition-colors ${
          selected
            ? 'border-zilla-neon bg-zilla-neon'
            : 'border-white/20 bg-transparent'
        }`}
      >
        {selected && (
          multiSelect ? (
            <svg className="w-3 h-3 text-zilla-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="block w-2 h-2 rounded-full bg-zilla-black" />
          )
        )}
      </span>

      <span className="text-sm font-medium text-white">{label}</span>
    </motion.button>
  )
}
