'use client'

/**
 * Morsdag FinalCTA — compact countdown + single primary action.
 * Centered. No glow, no decoration. Final reminder of urgency.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import MorsdagCountdown from './MorsdagCountdown'

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-zilla-black border-t border-white/8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
            07 · Nästa steg
          </span>
          <h2 className="mt-4 font-display font-medium text-4xl sm:text-6xl leading-[1.05] tracking-[-0.02em] text-white">
            Vill ni hinna få ut en riktig Morsdag Launch?
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Svara på några frågor så ser vi om kampanjen passar er butik. Bra
            fit går vidare till bokning. Osäkra case granskas manuellt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <MorsdagCountdown compact />

          <Link
            href="/morsdag/quiz"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-morsdag-rose text-morsdag-ink text-[14px] font-semibold tracking-[0.01em] transition-all duration-150 hover:brightness-105 hover:translate-y-[-1px]"
          >
            Ansök om Morsdag Launch
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <p className="text-sm text-white/45 text-center max-w-md">
            Tar cirka 2 minuter. Inga fluffiga säljmöten om caset inte passar.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
