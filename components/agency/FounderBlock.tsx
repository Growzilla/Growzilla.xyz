'use client'

import { motion } from 'framer-motion'

/**
 * Real founder. Three lookable verification links on the page.
 * Spec: AGENCY_LANDING_V3.md §13.
 *
 * Operator: drop a real photo at /public/agency/founder.jpg (1:1, ≥256px).
 * If absent, the styled-initials block renders as fallback — never a stock photo.
 */

export default function FounderBlock() {
  return (
    <section className="relative w-full bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-zilla-neon/80 mb-7"
        >
          Who you talk to
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.04 }}
          className="inline-flex w-24 h-24 rounded-md border border-white/[0.10] bg-zilla-surface items-center justify-center overflow-hidden mb-8"
        >
          {/* Operator drops /public/agency/founder.jpg. Fallback: styled initials. */}
          <span className="font-display font-semibold text-[28px] text-white/85">
            AE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          className="font-display font-semibold text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] text-white/95"
        >
          One operator. Six brands.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.14 }}
          className="mt-8 space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-white/70 max-w-xl mx-auto text-left"
        >
          <p>
            I&rsquo;m Albert. I&rsquo;ve shipped Shopify growth work since
            2024. I built Growzilla because every agency I worked with showed
            me ROAS but couldn&rsquo;t show me what each ad dollar actually
            did. Now we run six brands at a time as one team — and
            we ship to your live store every week.
          </p>
          <p>
            If you want proof I exist before you book a call: my X is below,
            my LinkedIn is below, my company is RolloutFactory Inc.
            (Delaware). I read every email myself.
          </p>
          <p
            className="font-serif italic text-white/85 text-[16px]"
            style={{ fontFamily: 'Instrument Serif, Source Serif 4, serif' }}
          >
            — Albert Elmgart · Sweden
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[12px]"
        >
          <a
            href="https://x.com/ascendergrey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-zilla-neon transition-colors underline-offset-4 hover:underline"
          >
            X · @ascendergrey
          </a>
          <span className="text-white/20">·</span>
          <a
            href="https://linkedin.com/in/albert-elmgart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-zilla-neon transition-colors underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <span className="text-white/20">·</span>
          <a
            href="mailto:albert@growzilla.xyz"
            className="text-white/60 hover:text-zilla-neon transition-colors underline-offset-4 hover:underline"
          >
            albert@growzilla.xyz
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.36 }}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30"
        >
          RolloutFactory Inc · Delaware · Operating from Sweden
        </motion.p>
      </div>
    </section>
  )
}
