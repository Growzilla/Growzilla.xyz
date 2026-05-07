'use client'

import { motion } from 'framer-motion'

/**
 * Two-column strikethrough comparison. Highest-trust pattern on the page.
 * Spec: AGENCY_LANDING_V3.md §10.
 */

const ROWS: [string, string][] = [
  [
    'Hand off to juniors after the pitch',
    'Same operator runs your account week to week.',
  ],
  [
    'Show ROAS dashboards. Never ship a theme fix.',
    'We deploy to your live theme. Friday by Friday.',
  ],
  [
    'Six-month contracts. Vague pricing.',
    '90-day minimum. Pricing visible on this page.',
  ],
  [
    'Thirty retainers. You get thirty minutes.',
    'Six brands at a time. We choose.',
  ],
  ['Hide the playbook.', 'Knowledge base is public. Read everything — free.'],
]

export default function ComparisonTape() {
  return (
    <section className="relative w-full bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-zilla-neon/80 mb-6 text-center"
        >
          Why Growzilla
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
          className="font-display font-semibold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.025em] text-white/95 text-center max-w-3xl mx-auto"
        >
          We&rsquo;re not a vendor. We operate.
        </motion.h2>

        <div className="mt-14 sm:mt-16 grid grid-cols-2 gap-x-6 sm:gap-x-10">
          {/* Headers */}
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 pb-4 border-b border-white/[0.06]">
            Other agencies
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon/85 pb-4 border-b border-white/[0.06]">
            Growzilla
          </div>

          {/* Rows */}
          {ROWS.map(([left, right], i) => (
            <Row key={i} index={i} left={left} right={right} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="mt-12 text-center font-mono text-[12px] uppercase tracking-[0.16em] text-white/45"
        >
          Most agencies hand you a deck and disappear. We see it differently.
        </motion.p>
      </div>
    </section>
  )
}

function Row({
  index,
  left,
  right,
}: {
  index: number
  left: string
  right: string
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 + index * 0.06 }}
        className="flex items-start gap-3 py-5 border-b border-white/[0.06]"
      >
        <span
          aria-hidden="true"
          className="text-white/35 text-[14px] leading-[1.5] mt-0.5"
        >
          ✗
        </span>
        <span className="text-[14px] sm:text-[15px] leading-[1.55] text-white/40 line-through decoration-white/20">
          {left}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: 0.1 + index * 0.06,
        }}
        className="flex items-start gap-3 py-5 border-b border-white/[0.06]"
      >
        <span
          aria-hidden="true"
          className="text-zilla-neon text-[14px] leading-[1.5] mt-0.5"
        >
          ✓
        </span>
        <span className="text-[14px] sm:text-[15px] leading-[1.55] text-white/85">
          {right}
        </span>
      </motion.div>
    </>
  )
}
