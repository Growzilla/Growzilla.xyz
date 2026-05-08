'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * Three editorial rows. Not cards.
 * Single neon CTA arrow per row, hairline separators.
 *
 * Spec: AGENCY_REVAMP_PLAN.md §3.5 + §8.
 */

type Magnet = {
  glyph: string
  title: string
  body: string
  time: string
  href: string
}

const MAGNETS: Magnet[] = [
  {
    glyph: '◆',
    title: 'Competitor Ads Pull',
    body: 'Drop your domain. We pull every ad your top competitors ran in the last 30 days, tag the angles, and write five briefs you can ship this week.',
    time: '~4 min',
    href: '/adcreator',
  },
  {
    glyph: '⚡',
    title: 'Hook Mine',
    body: 'The hooks our scraper extracts from the brands beating you, ranked by ad spend and longevity.',
    time: 'Inside the report',
    href: '/adcreator',
  },
  {
    glyph: '✦',
    title: 'PSI + Funnel Audit',
    body: 'Mobile-speed audit + funnel leak map + the fix order. We walk it with you on a 30-min call.',
    time: '30 min',
    href: 'https://calendly.com/albert-growzilla/growzilla-install',
  },
]

export default function LeadMagnets() {
  return (
    <section
      id="vault"
      className="relative w-full py-28 sm:py-32 lg:py-36 bg-zilla-black"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon/80 mb-6"
        >
          FREE FOR OPERATORS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.06 }}
          className="font-display font-semibold text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.02] tracking-[-0.025em] text-white/95 max-w-3xl"
        >
          Take what we&rsquo;d charge for.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.14 }}
          className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-white/60 max-w-xl"
        >
          Three of the tools we run on client work, available for any operator
          to plug a domain into. No signup wall.
        </motion.p>

        <ul className="mt-16 sm:mt-20 border-t border-white/[0.06]">
          {MAGNETS.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: 0.1 + i * 0.08,
              }}
              className="border-b border-white/[0.06]"
            >
              <Link
                href={m.href}
                className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-4 sm:gap-8 py-7 sm:py-8 transition-colors hover:bg-white/[0.015]"
              >
                <span
                  aria-hidden="true"
                  className="text-zilla-neon text-[20px] leading-none w-6 text-center"
                >
                  {m.glyph}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[22px] sm:text-[24px] leading-tight tracking-[-0.015em] text-white/95">
                    {m.title}
                  </div>
                  <div className="mt-2 text-[14px] leading-[1.55] text-white/55 max-w-2xl">
                    {m.body}
                  </div>
                </div>
                <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 tabular-nums">
                  {m.time}
                </span>
                <span className="text-zilla-neon text-[20px] leading-none transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
