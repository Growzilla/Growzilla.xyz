'use client'

/**
 * /agency AboutTeaser — portrait + copy. Two columns desktop, stacked
 * mobile. Single CEO line below portrait, no title-stuffing. First
 * person plural throughout.
 */

import { motion } from 'framer-motion'

const ASSETS_READY = false

export default function AboutTeaser() {
  return (
    <section
      id="about"
      aria-label="Who we are"
      className="relative bg-zilla-black"
    >
      <div className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="aspect-[4/5] w-full max-w-[320px] rounded-md border border-white/[0.08] bg-[#0F0F10] overflow-hidden">
            {ASSETS_READY ? (
              <img
                src="/agency/team/albert.jpg"
                alt="Albert Elmgart"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="mt-4 text-[13px] text-white/60">
            CEO · Albert Elmgart
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon">
            ◆ WHO WE ARE
          </span>
          <h2 className="mt-3 text-[26px] md:text-[30px] font-medium leading-tight tracking-[-0.01em] text-white/95">
            A small team that takes the work seriously.
          </h2>
          <div className="mt-6 text-white/75 text-[15px] leading-relaxed space-y-4">
            <p>
              We run paid acquisition for Shopify DTC brands doing $50k–$500k a
              month. Past product-market fit, ready to scale, sick of the
              agency carousel.
            </p>
            <p>
              We work with a small number of brands at a time. Long horizons,
              real relationships, no quick flips. We&apos;d rather raise one
              brand for two years than churn six in six months.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
