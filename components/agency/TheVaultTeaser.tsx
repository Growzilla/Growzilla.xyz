'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * Compact editorial band linking to the knowledgebase hub at /agency/vault.
 *
 * Spec: AGENCY_REVAMP_PLAN.md §3.6 + §9.
 */

export default function TheVaultTeaser() {
  return (
    <section className="relative w-full py-20 sm:py-24 bg-zilla-black border-t border-b border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="max-w-3xl mx-auto px-5 sm:px-8 text-center"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 mb-6">
          THE VAULT
        </div>

        <h2 className="font-display font-semibold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.15] tracking-[-0.02em] text-white/95 max-w-2xl mx-auto">
          Everything we&rsquo;d charge for. Free, while we have the bandwidth to
          write it.
        </h2>

        <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-xl mx-auto">
          Breakdowns, playbooks, the tools we use on client work. Ungated.
        </p>

        <Link
          href="/agency/vault"
          className="group inline-flex items-center gap-2 mt-10 font-mono text-[13px] uppercase tracking-[0.16em] text-white/85 hover:text-white transition-colors"
        >
          Open the vault
          <span className="text-zilla-neon transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  )
}
