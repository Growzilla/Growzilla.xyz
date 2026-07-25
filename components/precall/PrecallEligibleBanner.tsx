import React from 'react';

type Props = {
  eligible: boolean | null;
};

/**
 * Top-of-/call banner after homepage qualify modal.
 * eligible=true  → congrats path
 * eligible=false → soft path (no fake congrats)
 * eligible=null  → direct visit / shared link
 */
export default function PrecallEligibleBanner({ eligible }: Props) {
  if (eligible === true) {
    return (
      <section className="pt-20 sm:pt-24 pb-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl border border-zilla-neon/30 bg-zilla-neon/[0.04] px-5 py-5 sm:px-6 sm:py-6 shadow-[inset_0_0_0_1px_rgba(0,255,148,0.06)]">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-zilla-neon/80 mb-2">
              Fit check complete
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Congrats — you&apos;re eligible.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/55 leading-relaxed max-w-xl">
              See the video below on how we book{' '}
              <span className="text-white/75">5–10 qualified meetings</span> every week
              on LinkedIn. Then book a fit call if it still makes sense.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (eligible === false) {
    return (
      <section className="pt-20 sm:pt-24 pb-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl border border-white/[0.1] bg-zilla-surface px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/40 mb-2">
              System overview
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Watch how the LinkedIn engine works
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/55 leading-relaxed max-w-xl">
              Based on your answers we may not be the right partner yet — still worth
              watching how we book 5–10 qualified meetings a week. Book only if it fits.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
