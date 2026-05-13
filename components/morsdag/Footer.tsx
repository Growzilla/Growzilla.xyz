'use client'

/**
 * Morsdag Footer — minimal. One line of brand frame + small attribution row.
 */

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-zilla-black px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm text-white/40 leading-relaxed">
          Byggt för svenska Shopify-brands som vill konvertera säsongsefterfrågan
          till intäkt.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/30">
          <span>© Growzilla 2026</span>
          <span aria-hidden>·</span>
          <Link
            href="/"
            className="hover:text-white/60 transition-colors duration-150"
          >
            Hem
          </Link>
        </div>
      </div>
    </footer>
  )
}
