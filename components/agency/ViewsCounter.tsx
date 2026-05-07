'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type ViewsCounterProps = {
  /** Default 50_000 — operator's raw Meta number, will grow over time */
  target?: number
  /** Default "since 2024" */
  period?: string
  /** Default "Views produced" */
  label?: string
}

/**
 * Frame Growzilla as larger than it is, defensibly.
 *
 * Claim covers cumulative views across all shipped client creative since
 * project start. Confirm number monthly. Source: meta-ads MCP
 * `get_creative_performance` summed across active accounts.
 *
 * Spec: AGENCY_REVAMP_PLAN.md §3.2 + §7.
 */
export default function ViewsCounter({
  target = 50_000,
  period = 'since 2024',
  label = 'Views produced',
}: ViewsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOut cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <section
      ref={ref}
      className="relative w-full bg-zilla-black py-28 sm:py-32 lg:py-40 border-t border-b border-white/[0.06]"
      aria-label={`${label}: ${target.toLocaleString()}+ ${period}`}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-8">
          {label}
        </div>

        <div className="font-display font-semibold text-[72px] sm:text-[96px] lg:text-[120px] leading-[0.95] tracking-[-0.03em] text-white/95 tabular-nums">
          {value.toLocaleString()}
          <span className="text-zilla-neon">+</span>
        </div>

        <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
          Across all client creative · {period}
        </div>
      </div>
    </section>
  )
}
