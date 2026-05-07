'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export type AllGreenBarDatum = {
  label: string
  value: number
}

type AllGreenBarsProps = {
  data: AllGreenBarDatum[]
  unit?: string
  height?: number
  /**
   * When true, the LAST bar in the series is rendered at full neon opacity
   * and its label brightens. Earlier bars render at 0.22 opacity to read
   * as the "before" state. Default: false (all bars full opacity).
   */
  spotlightLast?: boolean
  ariaLabel: string
}

/**
 * Two-opacity all-neon bar chart for /agency.
 * Forbidden: gray bars, gradient fills, glow shadows.
 * Spec: AGENCY_REVAMP_PLAN.md §6.
 */
export default function AllGreenBars({
  data,
  unit = '',
  height = 240,
  spotlightLast = false,
  ariaLabel,
}: AllGreenBarsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className="relative w-full"
      style={{ height: height + 56 }}
    >
      <div
        className="absolute left-0 right-0 top-7 bottom-9 flex items-end justify-around gap-3 px-2 rounded-md"
        style={{ background: 'rgba(0,255,148,0.04)' }}
      >
        {data.map((d, i) => {
          const pct = (d.value / max) * 100
          const isAfter = spotlightLast ? i === data.length - 1 : true
          const opacity = isAfter ? 1.0 : 0.22
          return (
            <div
              key={`${d.label}-${i}`}
              className="flex-1 flex flex-col items-center justify-end h-full relative min-w-0"
            >
              <span
                className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] sm:text-[12px] tabular-nums whitespace-nowrap pointer-events-none"
                style={{
                  bottom: `calc(${pct}% + 8px)`,
                  color: isAfter ? '#00FF94' : 'rgba(255,255,255,0.55)',
                }}
              >
                {formatValue(d.value)}
                {unit}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: `${pct}%` } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 + i * 0.06 + (isAfter && spotlightLast ? 0.2 : 0),
                }}
                className="w-full rounded-t-md"
                style={{
                  backgroundColor: '#00FF94',
                  opacity,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Baseline */}
      <div className="absolute left-2 right-2 bottom-8 h-px bg-white/[0.06]" />

      {/* X-axis labels */}
      <div className="absolute left-0 right-0 bottom-0 flex justify-around gap-3 px-2">
        {data.map((d, i) => (
          <span
            key={`label-${d.label}-${i}`}
            className="flex-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 truncate text-center"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function formatValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 10_000) return `${Math.round(v / 1_000)}k`
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k`
  if (Number.isInteger(v)) return v.toString()
  return v.toFixed(1)
}
