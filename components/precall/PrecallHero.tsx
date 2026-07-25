import React from 'react';

const PrecallHero: React.FC = () => {
  return (
    <section className="pt-24 pb-6 sm:pt-28 sm:pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] text-white/55 text-xs font-medium tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zilla-neon/80" />
          LinkedIn system · 5–10 qualified meetings / week
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
          How to book 5–10 qualified meetings every week on LinkedIn
        </h1>

        <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          Watch this short system breakdown first. Even if you never work with us,
          you&apos;ll leave knowing exactly how the engine works — then book a fit call
          only if it still makes sense.
        </p>

        <p className="mt-5 text-xs text-white/40">
          ~15–18 min · Not a pitch · Diagnosis first
        </p>
      </div>
    </section>
  );
};

export default PrecallHero;
