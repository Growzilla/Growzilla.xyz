'use client'

import { motion } from 'framer-motion'

/**
 * THE GROWZILLA SYSTEM — the named method.
 * Type-only treatment, no cards/icons/numbered circles.
 *
 * Spec: AGENCY_REVAMP_PLAN.md §3.4 + §4.
 */

type Stage = {
  marker: string // e.g. STAGE 01 · BREAK
  title: string
  body: string
  metric: string
}

const STAGES: Stage[] = [
  {
    marker: 'STAGE 01 · BREAK',
    title: 'Audit. Then kill.',
    body: 'We open every account from the bottom up — pixel, Klaviyo flows, ad library, theme, PSI, the whole stack. Anything that looks like noise gets killed in the first two weeks. No "discovery sprint." No 40-page audit deck. The only deliverable is a kill list and a calendar of what ships next.',
    metric: '~14 days',
  },
  {
    marker: 'STAGE 02 · BUILD',
    title: 'Creative volume + critical-path rebuild.',
    body: 'Thirty ad-ready clips a week, scripted from the angle map. Hooks, opens, callouts. In parallel: PDP and checkout get the surgical rebuild — fonts, render-blocking JS, hero images, the whole load-time floor. Same theme, same SKUs. Just the path between landing and add-to-cart.',
    metric: '30+ ad-ready clips / wk',
  },
  {
    marker: 'STAGE 03 · SCALE',
    title: 'Daily hook-rate review.',
    body: 'Anything below 30% three-second hold gets cut at midnight. Five fresh hooks a week. We feed the algorithm; it picks the winners. The two clips that carry the month show up in week three or four — not earlier — and we ride them until the cohort reads.',
    metric: '2 creatives carry the month',
  },
]

export default function TheGrowzillaSystem() {
  return (
    <section
      id="system"
      className="relative w-full py-32 sm:py-36 lg:py-40 bg-zilla-black"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-zilla-neon/80 mb-8"
        >
          ◆ THE METHOD · v9.4
        </motion.div>

        {/* Headline with travelling underline */}
        <div className="relative inline-block">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
            className="font-display font-semibold text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.98] tracking-[-0.025em] text-white/95"
          >
            THE GROWZILLA SYSTEM.
          </motion.h2>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
            className="absolute left-0 -bottom-2 h-[2px] w-full bg-zilla-neon origin-left"
          />
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.18 }}
          className="mt-10 text-[16px] sm:text-[17px] leading-[1.65] text-white/60 max-w-xl"
        >
          What we run every brand through. Six brands at a time, max — past
          that, taste collapses. Every account moves through the same three
          stages: break, build, scale.
        </motion.p>

        {/* Stages */}
        <div className="mt-20 sm:mt-24 space-y-12 sm:space-y-14">
          {STAGES.map((stage, i) => (
            <motion.article
              key={stage.marker}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: 0.1 + i * 0.12,
              }}
              className={`pt-12 ${
                i === 0 ? '' : 'border-t border-white/[0.06]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6 mb-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {stage.marker}
                </div>
                <div className="font-mono text-[12px] tracking-[0.06em] text-zilla-neon tabular-nums">
                  {stage.metric}
                </div>
              </div>

              <h3 className="font-display font-semibold text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.1] tracking-[-0.02em] text-white/95">
                {stage.title}
              </h3>

              <p className="mt-5 text-[16px] leading-[1.75] text-white/60 max-w-2xl">
                {stage.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="mt-20 sm:mt-24 pt-10 border-t border-white/[0.06] font-mono text-[12px] uppercase tracking-[0.18em] text-white/45"
        >
          Runs 6 brands at a time, max.
        </motion.p>
      </div>
    </section>
  )
}
