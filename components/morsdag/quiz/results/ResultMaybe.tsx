'use client';

import Link from 'next/link';

export default function ResultMaybe() {
  return (
    <div className="w-full">
      <div className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-morsdag-rose/70">
        Möjligt
      </div>
      <h1 className="font-display text-[32px] sm:text-[44px] leading-[1.05] text-white tracking-tight">
        Det kan finnas potential — men vi behöver granska caset.
      </h1>
      <p className="mt-5 text-[15px] sm:text-base text-white/70 leading-relaxed max-w-xl">
        Era svar visar att kampanjen kan vara relevant, men det beror på produkt, marginaler,
        leverans och budget. Skicka in ansökan så återkommer vi om vi ser ett tydligt case.
      </p>

      <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-5">
        <p className="text-[14px] text-white/80 leading-relaxed">
          Tack — vi granskar caset och återkommer om det finns en tydlig möjlighet.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-white/[0.08]">
        <Link
          href="/morsdag"
          className="text-sm text-white/55 hover:text-white transition-colors"
        >
          Tillbaka till erbjudandet
        </Link>
      </div>
    </div>
  );
}
