'use client'

/**
 * /agency Pricing — three tiers, middle is the main offer, $30k is the anchor.
 *
 * Tier 1: Free 30-min CRO audit (entry).
 * Tier 2: Partner $3,500/mo (recommended, holds the full value list).
 * Tier 3: Maintainer $30,000/mo (anchor — stacks the premium scope).
 *
 * Editorial cards, two opacities of #00FF94 for the recommended highlight.
 * No gradients, no icons, hairline borders.
 */

import { motion } from 'framer-motion'

const BOOK_AUDIT_URL =
  'https://calendly.com/albert-growzilla/growzilla-install'
const APPLY_MAINTAINER_URL =
  'https://calendly.com/albert-growzilla/growzilla-install?type=maintainer'

type Tier = {
  name: string
  price: string
  suffix: string
  blurb: string
  bullets: string[]
  cta: string
  href: string
  recommended?: boolean
  anchor?: boolean
  inheritsFrom?: string
}

const TIERS: Tier[] = [
  {
    name: '30-min CRO Audit',
    price: 'Free',
    suffix: '30 minutes · no commitment',
    blurb:
      'We map the leaks in your funnel and the bottlenecks on your landing page. You walk away with a list of fixes you can ship this week — whether you work with us or not.',
    bullets: [
      'Live walk-through of your store + ad account',
      'Pagespeed + funnel + offer leak audit',
      'Action list you can ship this week',
      'No retainer pitch unless you ask',
    ],
    cta: 'Book the audit →',
    href: BOOK_AUDIT_URL,
  },
  {
    name: 'Partner',
    price: '$3,500',
    suffix: '/month · 90-day minimum',
    blurb:
      'Full operator team running paid acquisition, creative, and the funnel. Weekly cadence, end-to-end ownership of the number.',
    bullets: [
      'Fully managed ad account (Meta + Google where it earns its place)',
      '10 creatives shipped per week — we brief, we make, we test',
      'Weekly call — strategy, numbers, next move',
      'CRO audit + funnel build + offer & discount setup',
      'Pagespeed lift via our pagespeed system (unique to us)',
      'Direct WhatsApp line — same-day reply',
    ],
    cta: 'Book a 30-min CRO audit →',
    href: BOOK_AUDIT_URL,
    recommended: true,
  },
  {
    name: 'Maintainer',
    price: '$30,000',
    suffix: '/month · two brands at this tier',
    blurb:
      'Everything in Partner, with the scope opened up. For brands that want the full operator team, not just the retainer hours.',
    bullets: [
      'Unlimited creative volume — no weekly cap',
      'In-person quarterly strategy session (we fly to you)',
      'Founder-direct line — Albert on WhatsApp, 1-hour SLA',
      'Email + SMS retention build (Klaviyo + Postscript flows)',
      'Custom landing pages — up to 10 per quarter',
      'Quarterly brand audit + roadmap rewrite',
      'Influencer + UGC sourcing handled in-house',
      'Reserved seat — only two brands at this tier',
    ],
    cta: 'Apply →',
    href: APPLY_MAINTAINER_URL,
    anchor: true,
    inheritsFrom: 'Partner',
  },
]

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Engagements"
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
          WHAT IT COSTS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
          className="font-display font-medium text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-white/95 text-center max-w-3xl mx-auto"
        >
          Three engagements. Pick the one that fits.
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
              className={`relative rounded-lg p-7 sm:p-8 flex flex-col ${
                tier.recommended
                  ? 'border border-zilla-neon/40 bg-zilla-neon/[0.03]'
                  : 'border border-white/[0.08] bg-zilla-surface/40'
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-2.5 right-5 px-2.5 py-0.5 rounded-md bg-zilla-neon text-black font-mono text-[10px] uppercase tracking-[0.16em] font-semibold">
                  Most partners pick this
                </span>
              )}
              {tier.anchor && (
                <span className="absolute -top-2.5 right-5 px-2.5 py-0.5 rounded-md border border-white/[0.14] bg-zilla-black/80 text-white/70 font-mono text-[10px] uppercase tracking-[0.16em]">
                  By application
                </span>
              )}

              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                {tier.name}
              </h3>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display font-medium text-[40px] sm:text-[44px] leading-none tracking-[-0.025em] text-white/95 tabular-nums">
                  {tier.price}
                </span>
              </div>
              <span className="mt-2 font-mono text-[12px] text-white/55 leading-[1.5]">
                {tier.suffix}
              </span>

              <p className="mt-6 text-[14px] sm:text-[15px] leading-[1.6] text-white/75">
                {tier.blurb}
              </p>

              <div className="my-6 h-px bg-white/[0.08]" />

              {tier.inheritsFrom && (
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zilla-neon/80">
                  Everything in {tier.inheritsFrom}, plus
                </p>
              )}

              <ul className="space-y-2.5 text-[14px] leading-[1.55] text-white/80 flex-1">
                {tier.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-white/35 select-none mt-[1px]">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-7 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md text-[13px] font-semibold tracking-[0.01em] transition-all duration-150 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-zilla-neon/60 ${
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
