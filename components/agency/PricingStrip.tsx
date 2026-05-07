'use client'

import { motion } from 'framer-motion'

/**
 * Three visible price tiers. Kills "what does it cost" objection on the
 * landing page itself. Spec: AGENCY_LANDING_V3.md §8.
 */

type Tier = {
  name: string
  price: string
  suffix: string
  body: string
  cta: string
  href: string
  recommended?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Audit Only',
    price: '£1,500',
    suffix: 'one-time',
    body: 'Two-week store + ad audit. Walk away with the kill list and a 90-day plan. No retainer, no commitment.',
    cta: 'Book the audit →',
    href: 'https://calendly.com/albert-growzilla/growzilla-install?type=audit',
  },
  {
    name: 'Growth Retainer',
    price: '£3,500',
    suffix: '/mo + 10% of incremental revenue',
    body: 'Full operator team. Five-day spin-up. Weekly creative drop, daily hook-rate review, monthly funnel rebuild. 90-day minimum.',
    cta: 'Book a 20-min call →',
    href: 'https://calendly.com/albert-growzilla/growzilla-install',
    recommended: true,
  },
  {
    name: 'Performance Only',
    price: '£0',
    suffix: '/mo + 18% of incremental revenue',
    body: 'For brands already running £200k+/mo. We earn when you earn. 90-day minimum, same operator team.',
    cta: 'Apply for performance tier →',
    href: 'https://calendly.com/albert-growzilla/growzilla-install?type=performance',
  },
]

export default function PricingStrip() {
  return (
    <section
      id="pricing"
      className="relative w-full bg-zilla-black py-24 sm:py-28 lg:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-zilla-neon/80 mb-6 text-center"
        >
          What it costs
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
          className="font-display font-semibold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.025em] text-white/95 text-center max-w-3xl mx-auto"
        >
          Three engagements. One operator team.
        </motion.h2>

        <div className="mt-14 sm:mt-16 grid lg:grid-cols-3 gap-5 sm:gap-6">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: 0.05 + i * 0.08,
              }}
              className={`relative rounded-lg p-7 flex flex-col ${
                tier.recommended
                  ? 'border border-zilla-neon/40 bg-zilla-neon/[0.03]'
                  : 'border border-white/[0.06] bg-zilla-surface/40'
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-2.5 right-5 px-2.5 py-0.5 rounded-md bg-zilla-neon text-black font-mono text-[10px] uppercase tracking-[0.16em] font-semibold">
                  Recommended
                </span>
              )}

              <h3 className="text-[14px] font-mono uppercase tracking-[0.16em] text-white/55">
                {tier.name}
              </h3>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display font-semibold text-[40px] sm:text-[44px] leading-none tracking-[-0.025em] text-white/95 tabular-nums">
                  {tier.price}
                </span>
              </div>
              <span className="mt-2 font-mono text-[12px] text-white/55 leading-[1.5]">
                {tier.suffix}
              </span>

              <p className="mt-6 text-[14px] sm:text-[15px] leading-[1.6] text-white/65 flex-1">
                {tier.body}
              </p>

              <a
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-7 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md text-[13px] font-semibold tracking-[0.01em] transition-all duration-150 hover:translate-y-[-1px] ${
                  tier.recommended
                    ? 'bg-zilla-neon text-black hover:brightness-105'
                    : 'border border-white/[0.14] text-white/85 hover:text-white hover:border-white/[0.28]'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="mt-12 text-center font-mono text-[12px] uppercase tracking-[0.16em] text-white/55 max-w-2xl mx-auto leading-[1.6]"
        >
          You own everything we make. Ad accounts, audiences, theme code,
          creatives, copy. We never co-own.
        </motion.p>
      </div>
    </section>
  )
}
