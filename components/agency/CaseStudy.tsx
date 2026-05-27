'use client'

/**
 * /agency CaseStudy — two cards, 50/50, full content-width.
 *
 * Left: Case in progress, 2026 — pageload 20s -> <2s, custom print-app workaround.
 * Right: Next partner, by invitation. Quarterly intake.
 *
 * No software UI. No charts. Editorial cards only.
 */

import { motion } from 'framer-motion'

const BOOK_CALL_URL = 'https://calendly.com/albert-growzilla/growzilla-install'

function LogoSlot({ label }: { label: string }) {
  return (
    <div className="aspect-[3/2] bg-[#0A0A0B] border-b border-white/[0.08] flex items-center justify-center">
      <span className="text-white/40 text-[13px] tracking-wider font-mono">
        [ {label} ]
      </span>
    </div>
  )
}

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      aria-label="Case study and next partner"
      className="relative bg-zilla-black"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
        {/* Left card — case in progress */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-[#0F0F10] border border-white/[0.08] rounded-lg overflow-hidden flex flex-col"
        >
          <LogoSlot label="Case · 01 · 2026" />

          <div className="p-8 flex flex-col gap-4 flex-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zilla-neon">
              ◆ CASE IN PROGRESS · 2026
            </span>

            <h3 className="text-[22px] md:text-[26px] font-medium leading-tight text-white/95">
              Pageload 20s → &lt;2s. Funnel can finally breathe.
            </h3>

            <p className="text-[15px] leading-relaxed text-white/70">
              When we took over, ~99% of mobile Facebook traffic bounced before
              the page rendered. We built a custom print-app workaround the
              standard tooling couldn&apos;t do without breaking personalization.
              First creative signal landed in week one — we&apos;re now scaling
              against the new baseline.
            </p>

            <div className="h-px bg-white/[0.08] my-2" />

            <a
              href="#"
              className="text-[13px] text-white/70 hover:text-zilla-neon transition-colors duration-200 ease-out"
            >
              View the work →
            </a>
          </div>
        </motion.article>

        {/* Right card — Next partner */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
          className="bg-[#0F0F10] border border-white/[0.08] rounded-lg overflow-hidden flex flex-col"
        >
          <LogoSlot label="Next partner · by invitation" />

          <div className="p-8 flex flex-col gap-4 flex-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zilla-neon">
              ◆ ACCEPTING ONE BRAND
            </span>

            <h3 className="text-[22px] md:text-[26px] font-medium leading-tight text-white/95">
              We work with a small number of brands at a time.
            </h3>

            <p className="text-[15px] leading-relaxed text-white/70">
              New partner intake runs once per quarter. If the timing&apos;s
              right, we&apos;d rather take one brand we can raise for two years
              than six we churn in six months.
            </p>

            <div className="h-px bg-white/[0.08] my-2" />

            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-white/70 hover:text-zilla-neon transition-colors duration-200 ease-out"
            >
              Apply →
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
