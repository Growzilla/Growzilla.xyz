'use client'

/**
 * Morsdag Hero — restrained, dark-on-rose, ad-scent matched.
 *
 * H1 reuses the exact ad copy tokens "Morsdag Launch", "72h", "31 maj"
 * so scent from Meta → page is preserved. Single radial bg-rose glow at
 * very low opacity. No software UI, no faux-browser frames.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import MorsdagCountdown from './MorsdagCountdown'

const STACK_LABELS = [
  'Creatives',
  'Meta Ads',
  'Email/SMS',
  'Shopify',
  'Retargeting',
  '72h Launch',
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-zilla-black pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6"
    >
      {/* Subtle radial glow — restrained, well under 10% saturation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="mt-24 h-[520px] w-[520px] rounded-full bg-morsdag-rose/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose"
        >
          Morsdag Sverige · 31 maj 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="mt-6 font-display font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.025em] text-white"
        >
          Gör Mors dag till månadens största intäktskampanj.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          className="mt-7 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Vi bygger och lanserar en komplett Morsdag Launch för Shopify-butiker
          som redan säljer — med erbjudande, creatives, Meta ads, email/SMS och
          landningssida live inom 72 timmar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-morsdag-rose">
            Tid kvar till Mors dag
          </span>
          <MorsdagCountdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.28 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
        >
          <Link
            href="/morsdag/quiz"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-morsdag-rose text-morsdag-ink text-[14px] font-semibold tracking-[0.01em] transition-all duration-150 ease-out hover:brightness-105 hover:translate-y-[-1px]"
          >
            Ansök om Morsdag Launch
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <a
            href="#ingar"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-[14px] font-medium text-white/85 hover:text-white hover:border-morsdag-rose/40 transition-all duration-150 ease-out"
          >
            Se vad som ingår
            <span className="text-morsdag-rose transition-transform duration-150 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.36 }}
          className="mt-6 text-sm text-white/50 max-w-xl mx-auto"
        >
          För svenska ecommerce-brands som kan leverera innan Mors dag och vill
          få kampanjen live snabbt.
        </motion.p>

        {/* Credibility strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.44 }}
          className="mt-14 flex flex-wrap justify-center gap-x-3 gap-y-2"
        >
          {STACK_LABELS.map((label, i) => (
            <span
              key={label}
              className="inline-flex items-center px-3 py-1 rounded-full border border-white/8 text-[11px] uppercase tracking-wider text-white/60 font-mono"
            >
              {label}
              {i < STACK_LABELS.length - 1 && (
                <span className="ml-3 text-white/20 hidden">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
