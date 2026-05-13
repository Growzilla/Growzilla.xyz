'use client'

/**
 * Morsdag Solution — editorial, no cards, single hairline rule.
 * Per brief: H2 + body + hairline. That's the whole section.
 */

import { motion } from 'framer-motion'

export default function Solution() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-zilla-black">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
            02 · Lösningen
          </span>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-white max-w-4xl">
            Vi tar ert bästa present-case och gör det till en full launch.
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl text-lg leading-relaxed">
            Vi paketerar produkten, bygger kampanjen, skapar creatives, sätter
            upp Meta annonsering, skriver utskick och driver urgency fram till
            Mors dag.
          </p>
          <div className="mt-12 h-px bg-white/8" />
        </motion.div>
      </div>
    </section>
  )
}
