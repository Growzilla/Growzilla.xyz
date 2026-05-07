'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AllGreenBars from './AllGreenBars'

/**
 * Single-brand proof section — Scandinavian Poster.
 * Earns the rest of the page. ~9% neon surface (the most of any section).
 *
 * Spec: AGENCY_REVAMP_PLAN.md §3.3.
 *
 * Operator inputs to confirm before launch:
 *   - Lighthouse a11y/best/SEO real captured numbers (currently defaults).
 *     Real PSI 18→69 confirmed S42 (2026-05-05, Moto G Power, slow 4G).
 *   - Wordmark SVG drop slot at /public/agency/cases/scandinavian-poster/wordmark.svg
 */

type CaseHeroProps = {
  /** Real PSI capture confirmed S42 2026-05-05 — do not change without re-capture */
  psiBefore?: number
  psiAfter?: number
  capturedAt?: string
  capturedDevice?: string
  /** Lighthouse mobile, captured same run as PSI. Operator confirms before launch. */
  a11y?: number
  bestPractices?: number
  seo?: number
}

export default function CaseHero({
  psiBefore = 18,
  psiAfter = 69,
  capturedAt = 'May 5, 2026',
  capturedDevice = 'Moto G Power · slow 4G · headless Chromium 146',
  a11y = 92,
  bestPractices = 92,
  seo = 100,
}: CaseHeroProps) {
  const delta = Math.round(((psiAfter - psiBefore) / psiBefore) * 100)

  return (
    <section
      id="case"
      className="relative w-full py-28 sm:py-32 lg:py-36 bg-zilla-black"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon/80 mb-6"
        >
          ◆ CASE · 01 · 2026
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
          className="font-display font-semibold text-[44px] sm:text-[60px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] text-white/95 max-w-4xl"
        >
          Scandinavian Poster.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] tracking-[0.06em] text-white/45"
        >
          <span>Custom posters</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Sweden</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>90 days · sessions 25–39</span>
        </motion.div>

        <div className="mt-14 lg:mt-20 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left — copy + delta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display font-semibold text-[56px] sm:text-[72px] lg:text-[84px] leading-none tracking-[-0.03em] text-zilla-neon tabular-nums">
                +{delta}%
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/45">
                Mobile PSI
              </span>
            </div>

            <p className="mt-8 text-[17px] sm:text-[18px] leading-[1.65] text-white/65 max-w-xl">
              Same Shopify theme, same product catalog. Just the critical path
              rebuilt. Mobile Lighthouse moved <span className="text-white/90 tabular-nums">{psiBefore}</span> →{' '}
              <span className="text-zilla-neon tabular-nums">{psiAfter}</span> over 90 days.
            </p>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 max-w-xl">
              Captured {capturedAt} · {capturedDevice}
            </p>

            <Link
              href="/agency/cases/scandinavian-poster"
              className="group inline-flex items-center gap-2 mt-10 text-[14px] font-medium text-white/85 hover:text-white transition-colors"
            >
              Read the full case
              <span className="text-zilla-neon transition-transform duration-150 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          {/* Right — bars + lighthouse rings */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.24 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-zilla-surface/60 backdrop-blur-sm p-6 sm:p-7">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Mobile PSI · before / after
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zilla-neon/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-zilla-neon" />
                  Real data
                </span>
              </div>

              <AllGreenBars
                ariaLabel={`Mobile PageSpeed score moved from ${psiBefore} to ${psiAfter}`}
                data={[
                  { label: 'Before', value: psiBefore },
                  { label: 'After', value: psiAfter },
                ]}
                spotlightLast
                height={220}
              />

              <div className="mt-8 pt-7 border-t border-white/[0.06]">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45 mb-5">
                  Lighthouse · mobile
                </div>
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  <Ring label="Perf" value={psiAfter} delay={0.32} />
                  <Ring label="A11y" value={a11y} delay={0.4} />
                  <Ring label="Best" value={bestPractices} delay={0.48} />
                  <Ring label="SEO" value={seo} delay={0.56} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Lighthouse-style score ring. Neon arc strokes in over 900ms.
 * No glow shadow. Single neon at 1.0 opacity.
 */
function Ring({
  label,
  value,
  delay = 0,
}: {
  label: string
  value: number
  delay?: number
}) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(100, value))
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center text-center">
      <svg
        ref={ref}
        viewBox="0 0 72 72"
        className="w-16 h-16 sm:w-18 sm:h-18"
        aria-label={`${label} ${value}`}
      >
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="rgba(0,255,148,0.10)"
          strokeWidth="4"
        />
        <motion.circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#00FF94"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
          transform="rotate(-90 36 36)"
        />
        <text
          x="36"
          y="40"
          textAnchor="middle"
          className="fill-white font-mono tabular-nums"
          style={{ fontSize: '15px', fontWeight: 500 }}
        >
          {value}
        </text>
      </svg>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </div>
    </div>
  )
}
