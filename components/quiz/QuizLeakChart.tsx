'use client'

import { motion } from 'framer-motion'
import type { LeakBreakdown } from '@/types/quiz'

interface QuizLeakChartProps {
  breakdown: LeakBreakdown
  leakEstimate: number
}

const BARS: { key: keyof LeakBreakdown; label: string; color: string }[] = [
  { key: 'attributionGap', label: 'Attribution Gap', color: '#FF3366' },
  { key: 'platformBlindSpots', label: 'Platform Blind Spots', color: '#FF8C42' },
  { key: 'creatorScaleLoss', label: 'Creator Scale Loss', color: '#FFB84D' },
  { key: 'unoptimizedSpend', label: 'Unoptimized Spend', color: '#00D9FF' },
]

export default function QuizLeakChart({ breakdown, leakEstimate }: QuizLeakChartProps) {
  const maxValue = Math.max(...Object.values(breakdown), 1)

  return (
    <div className="space-y-4">
      {BARS.map((bar, i) => {
        const value = breakdown[bar.key]
        const pct = (value / maxValue) * 100

        return (
          <div key={bar.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">{bar.label}</span>
              <span className="text-xs font-mono text-white">
                ${value.toLocaleString()}/mo
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: bar.color }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )
      })}

      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <span className="text-sm font-medium text-white">Total Monthly Leak</span>
        <span className="text-sm font-mono font-bold text-zilla-neon">
          ${leakEstimate.toLocaleString()}/mo
        </span>
      </div>
    </div>
  )
}
