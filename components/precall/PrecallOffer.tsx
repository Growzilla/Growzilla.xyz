import React from 'react';

const ENGINES = [
  {
    label: '01 · Content distribution',
    title: 'Founder + company posting, automated',
    body: 'Consistent presence across founder accounts and the company brand — without your team living in Canva and schedulers all week.',
  },
  {
    label: '02 · Outbound conversations',
    title: 'Outreach that starts real dialogues',
    body: 'We automate the motion that opens conversations with the right buyers — so pipeline is not left to hope and random DMs.',
  },
];

const STEPS = [
  'Positioning',
  'Content Engine',
  'Distribution',
  'Outbound',
  'Sales Process',
  'Pipeline & Optimization',
];

const PrecallOffer: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-zilla-neon/80 mb-3">
          The offer
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
          Founder Pipeline OS
        </h2>
        <p className="text-base text-white/55 leading-relaxed mb-10 max-w-2xl">
          For funded B2B AI startups with product-market fit. We turn founder + company
          distribution into booked conversations.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {ENGINES.map((e) => (
            <div
              key={e.label}
              className="rounded-xl border border-white/[0.08] bg-zilla-surface p-5 sm:p-6"
            >
              <p className="font-mono text-[11px] text-zilla-neon/70 mb-3">{e.label}</p>
              <h3 className="text-base font-semibold text-white mb-2">{e.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>

        <p className="text-xs font-medium tracking-[0.14em] uppercase text-white/40 mb-4">
          How we work
        </p>
        <div className="flex flex-wrap gap-2">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.08] bg-zilla-black/40 text-sm text-white/70"
            >
              <span className="font-mono text-[10px] text-zilla-neon/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrecallOffer;
