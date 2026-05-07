'use client'

/**
 * /agency Hero — quiet centered hero, negative space, single fade-in.
 *
 * Surgical revamp: no ops ticker, no software UI, no trust pills, no
 * founder anchor row. Just headline + subhead + two CTAs, anchored
 * to #case-study and Calendly.
 */

import { motion } from 'framer-motion'

const BOOK_CALL_URL = 'https://calendly.com/albert-growzilla/growzilla-install'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-32 overflow-hidden bg-zilla-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center"
      >
        <h1 className="font-display font-medium text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.02] tracking-[-0.025em] text-white/95 max-w-[18ch] mx-auto">
          We run the ads. Ship the creative. Fix the funnel.
        </h1>

        <p className="mt-9 text-[16px] sm:text-[18px] leading-[1.6] text-white/65 max-w-2xl mx-auto">
          One team. Weekly cadence. End-to-end ownership of your number.
        </p>

        <div className="mt-11 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 ease-out hover:translate-y-[-1px]"
          >
            Book the 30-min CRO audit
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#case-study"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/[0.14] text-[14px] font-medium text-white/85 hover:text-white hover:border-zilla-neon/40 transition-all duration-150 ease-out"
          >
            See the work
            <span className="text-zilla-neon transition-transform duration-150 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
