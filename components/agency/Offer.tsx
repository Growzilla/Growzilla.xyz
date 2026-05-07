'use client'

/**
 * /agency Offer — three editorial blocks separated by hairlines.
 *
 * No icons. No cards. Pure type. Each block: mono eyebrow + body.
 * Strict register: operator language, no SaaS terms.
 */

import { motion } from 'framer-motion'

export default function Offer() {
  return (
    <section
      id="offer"
      aria-label="What we do, what you get, what you walk away with"
      className="relative bg-zilla-black"
    >
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        {/* Block 1 — WHAT WE DO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon mb-4">
            WHAT WE DO
          </div>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-white/85">
            We run paid acquisition, ship the creative, and fix the funnel it
            lands on. One team. Weekly cadence. End-to-end ownership of the
            number.
          </p>
        </motion.div>

        <div className="h-px bg-white/[0.08]" />

        {/* Block 2 — WHAT YOU GET */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon mb-4">
            WHAT YOU GET
          </div>
          <ul className="space-y-3 text-[15px] md:text-[16px] leading-relaxed text-white/85">
            <li className="flex gap-3">
              <span className="text-white/40 select-none">·</span>
              <span>
                Fully managed ad account (Meta + Google where it earns its
                place)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/40 select-none">·</span>
              <span>
                10 creatives shipped per week — we brief, we make, we test
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/40 select-none">·</span>
              <span>Weekly call — strategy, numbers, next move</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/40 select-none">·</span>
              <span>CRO audit + funnel build + offer &amp; discount setup</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/40 select-none">·</span>
              <span>
                Pagespeed lift via our pagespeed system{' '}
                <em className="text-white/60 not-italic">
                  (unique to us — built for Shopify stores choking on the apps
                  they need)
                </em>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/40 select-none">·</span>
              <span>Direct WhatsApp line — same-day reply</span>
            </li>
          </ul>
        </motion.div>

        <div className="h-px bg-white/[0.08]" />

        {/* Block 3 — WHAT YOU WALK AWAY WITH */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon mb-4">
            WHAT YOU WALK AWAY WITH
          </div>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-white/85">
            A self-sufficient paid acquisition engine and an optimized store.
            Not a service you rent — a system we build with you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
