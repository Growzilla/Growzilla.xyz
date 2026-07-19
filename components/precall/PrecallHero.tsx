import React from 'react';

const PrecallHero: React.FC = () => {
  return (
    <section className="pt-24 pb-6 sm:pt-28 sm:pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zilla-neon/25 bg-zilla-neon/[0.06] text-zilla-neon text-xs font-medium tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zilla-neon" />
          LinkedIn system · 5–10 discovery calls / week
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
          Watch this before your strategy call
        </h1>

        <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          How to get 5–10 repeatable discovery calls every week from LinkedIn — without
          you doing the posting or outreach. Then book below if we&apos;re a fit.
        </p>

        <p className="mt-5 text-xs text-white/40">
          ~15–20 min · No pitch · Diagnosis first
        </p>
      </div>
    </section>
  );
};

export default PrecallHero;
