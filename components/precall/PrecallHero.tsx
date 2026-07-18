import React from 'react';

const PrecallHero: React.FC = () => {
  return (
    <section className="pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zilla-neon/25 bg-zilla-neon/[0.06] text-zilla-neon text-xs font-medium tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zilla-neon" />
          Founder Pipeline OS · Funded B2B AI
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
          Watch this before your strategy call
        </h1>

        <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          How funded AI startups turn founder content + outbound into a conversation
          machine — and whether we&apos;re the right partner for you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#video"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zilla-neon text-zilla-black font-semibold text-sm hover:bg-zilla-glow transition-colors w-full sm:w-auto"
          >
            Watch the precall video
          </a>
          <a
            href="#book"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/12 text-white/85 font-medium text-sm hover:border-white/25 hover:bg-white/[0.03] transition-colors w-full sm:w-auto"
          >
            Book the call →
          </a>
        </div>

        <p className="mt-5 text-xs text-white/40">
          ~20–30 min · No pitch · Diagnosis first
        </p>
      </div>
    </section>
  );
};

export default PrecallHero;
