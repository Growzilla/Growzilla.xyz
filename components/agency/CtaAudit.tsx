'use client'

/**
 * /agency CtaAudit — final on-page CTA: free 30-min CRO audit.
 *
 * Centered, max-w-3xl, mono eyebrow + display headline + body +
 * end-tagline + primary button. Calendly link reused from Hero/Nav.
 */

import { motion } from 'framer-motion'

const BOOK_CALL_URL = 'https://calendly.com/albert-growzilla/growzilla-install'

export default function CtaAudit() {
  return (
    <section
      id="audit"
      aria-label="Book the free CRO audit"
      className="relative bg-zilla-black"
    >
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon">
            30-MINUTE CRO AUDIT · FREE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="mt-5 text-[28px] md:text-[34px] font-medium leading-tight tracking-[-0.01em] text-white/95"
        >
          Map the leaks. Walk away with the fixes.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-white/75 mt-6 max-w-xl mx-auto text-[15px] md:text-[16px] leading-relaxed"
        >
          We map the leaks in your funnel and the bottlenecks on your landing
          page. You walk away with a list of fixes you can ship this week —
          whether you work with us or not.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.14 }}
          className="italic text-white/55 mt-6 text-[14px] md:text-[15px]"
        >
          Worst case: you waste 30 minutes. Best case: you walk away with a
          better store that gets you more sales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.18 }}
          className="mt-10"
        >
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 ease-out hover:translate-y-[-1px]"
          >
            Book the audit
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
