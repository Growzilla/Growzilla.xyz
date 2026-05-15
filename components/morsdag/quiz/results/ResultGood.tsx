'use client';

import Link from 'next/link';
import Script from 'next/script';
import { trackBookCall, trackInitiateCheckout } from '@/lib/morsdag/pixel';

const CALENDLY_URL = 'https://calendly.com/albert-elmgart/ecommerce-ai-systems-review';

export default function ResultGood() {
  return (
    <div className="w-full">
      <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-morsdag-rose">
        <RoseCheck />
        Stark fit
      </div>
      <h1 className="font-display text-[32px] sm:text-[44px] leading-[1.05] text-white tracking-tight">
        Ni ser ut som en stark fit.
      </h1>
      <p className="mt-5 text-[15px] sm:text-base text-white/70 leading-relaxed max-w-xl">
        Baserat på era svar kan en Morsdag Launch vara relevant. Boka en kort genomgång nedan,
        eller hoppa över samtalet och säkra er plats direkt.
      </p>

      {/* Primary CTAs — Calendly first, direct checkout secondary */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackBookCall()}
          className="inline-flex items-center gap-2 bg-morsdag-rose text-morsdag-ink font-medium text-sm rounded-full px-6 py-3 hover:bg-morsdag-blush transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-morsdag-rose/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Boka genomgång
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <Link
          href="/checkout-card"
          onClick={() => trackInitiateCheckout({ value: 20000, currency: 'SEK', variant: 'card' })}
          className="inline-flex items-center gap-2 border border-morsdag-rose/40 text-morsdag-rose font-medium text-sm rounded-full px-6 py-3 hover:bg-morsdag-rose/10 hover:border-morsdag-rose/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-morsdag-rose/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Eller säkra plats — 20 000 kr
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      {/* Inline Calendly embed — lower friction than href out */}
      <div className="mt-10">
        <div
          className="calendly-inline-widget rounded-lg overflow-hidden border border-white/[0.08] bg-white"
          data-url={CALENDLY_URL}
          style={{ minWidth: '320px', height: '700px' }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.08]">
        <Link
          href="/morsdag"
          className="text-sm text-white/55 hover:text-white transition-colors"
        >
          ← Tillbaka till erbjudandet
        </Link>
      </div>
    </div>
  );
}

function RoseCheck() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-morsdag-rose/60 text-morsdag-rose"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
