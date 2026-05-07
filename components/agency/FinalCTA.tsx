'use client'

import { motion } from 'framer-motion'

/**
 * Final CTA — two-CTA fork (call or lead magnet).
 * Spec: AGENCY_LANDING_V3.md §14.
 */

export default function FinalCTA() {
  return (
    <section className="relative w-full bg-zilla-black py-28 sm:py-32 lg:py-36 border-t border-white/[0.06]">
      {/* subtle radial */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-zilla-neon/[0.05] blur-[180px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-zilla-neon/80 mb-6"
        >
          Ready when you are
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.06 }}
          className="font-display font-semibold text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.02] tracking-[-0.025em] text-white/95 max-w-3xl mx-auto"
        >
          Your next quarter is{' '}
          <span className="text-zilla-neon">already happening.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.18 }}
          className="mt-7 text-[16px] sm:text-[17px] leading-[1.6] text-white/65 max-w-xl mx-auto"
        >
          Two slots open this quarter. Pick one path.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.26 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
        >
          <a
            href="https://calendly.com/albert-growzilla/growzilla-install"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px]"
          >
            Book a 20-min call
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#leadmagnet"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/[0.14] text-[14px] font-medium text-white/85 hover:text-white hover:border-zilla-neon/40 transition-all duration-150"
          >
            Get the competitor PDF first
            <span className="text-zilla-neon transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="mt-10 font-mono text-[12px] uppercase tracking-[0.16em] text-white/40"
        >
          I reply within 24 hours, weekdays. — Albert
        </motion.p>
      </div>
    </section>
  )
}
