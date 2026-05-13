'use client'

/**
 * Morsdag Pricing — single card, centered, max-w-xl.
 * 20 000 kr setup + 10% performance fee. Reserve full-saturation rose for the CTA.
 * No checkmark icons — small rose dot prefix per brief.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'

const BULLETS = [
  'Launch live inom 72h',
  'Full kampanjuppsättning',
  'Creatives + copy + email/SMS',
  'Shopify + Meta setup',
  'Optimering fram till Mors dag',
]

export default function Pricing() {
  return (
    <section
      id="pris"
      className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-zilla-black border-t border-white/8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
            05 · Pris
          </span>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-white max-w-3xl mx-auto">
            Performance-heavy. Låg friktion. Tydligt scope.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
          className="mt-14 mx-auto max-w-xl"
        >
          <div className="bg-morsdag-ink/40 border border-morsdag-rose/20 rounded-2xl p-8 sm:p-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
              Erbjudande
            </span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl text-white font-medium">
              Morsdag Launch
            </h3>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="font-display text-5xl text-morsdag-ivory tabular-nums leading-none">
                20 000 kr
              </span>
              <span className="text-white/55 text-sm">setup</span>
            </div>
            <p className="mt-3 text-morsdag-rose text-base leading-relaxed">
              + 10% performance fee på genererad kampanjintäkt
            </p>
            <p className="mt-1 text-white/45 text-sm">Ad spend tillkommer</p>

            <div className="my-7 h-px bg-morsdag-rose/15" />

            <ul className="space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[9px] h-1.5 w-1.5 rounded-full bg-morsdag-rose flex-shrink-0"
                  />
                  <span className="text-white/85 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/morsdag/quiz"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 h-12 px-6 rounded-full bg-morsdag-rose text-morsdag-ink text-[14px] font-semibold tracking-[0.01em] transition-all duration-150 hover:brightness-105 hover:translate-y-[-1px]"
            >
              Ansök om plats
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <p className="mt-8 italic text-sm text-white/55 text-center max-w-md mx-auto leading-relaxed">
            Vi tar bara in ett begränsat antal brands eftersom varje launch
            kräver snabb execution.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="mt-12 text-xs text-white/40 text-center max-w-2xl mx-auto leading-relaxed"
        >
          Performance fee mäts via kampanjkod, UTM,
          Shopify/Klaviyo/Meta-data eller annan överenskommen attribuering.
        </motion.p>
      </div>
    </section>
  )
}
