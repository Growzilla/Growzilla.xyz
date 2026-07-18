import React from 'react';

const GOOD = [
  'B2B / SaaS / AI founders',
  'Can invest in growth',
  'Want conversations, not vanity metrics',
  'Willing to show up to discovery calls',
];

const BAD = [
  'Want tips, not a system',
  'No budget / tire-kicking',
  'Need magic with zero access',
  'Want free closing without running the machine',
];

const PrecallFit: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-zilla-neon/80 mb-3">
          Fit
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
          Who this is for
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zilla-neon/20 bg-zilla-neon/[0.04] p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-zilla-neon mb-4">Good fit</h3>
            <ul className="space-y-3">
              {GOOD.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zilla-neon shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-zilla-surface p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-white/50 mb-4">Not a fit</h3>
            <ul className="space-y-3">
              {BAD.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/45">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrecallFit;
