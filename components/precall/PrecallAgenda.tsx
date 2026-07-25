import React from 'react';

const CHAPTERS = [
  { n: '01', title: 'The promise: 5–10 qualified meetings / week', time: '2 min' },
  { n: '02', title: 'Why founders stall on LinkedIn', time: '3 min' },
  { n: '03', title: 'Step 1 — Content foundation (10% → 90%+)', time: '4 min' },
  { n: '04', title: 'Step 2 — Outreach engine (never sell first)', time: '4 min' },
  { n: '05', title: 'The compounding loop + daily life', time: '3 min' },
  { n: '06', title: 'Objections, fit call, next step', time: '2 min' },
];

const PrecallAgenda: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-zilla-neon/80 mb-3">
          Agenda
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          What the video walks you through
        </h2>
        <p className="text-sm text-white/50 mb-8 max-w-xl">
          Same structure as the recording. Skim this if you&apos;re short on time — then
          book only if the system still feels like the missing piece.
        </p>

        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {CHAPTERS.map((c) => (
            <li
              key={c.n}
              className="flex items-baseline justify-between gap-4 py-3.5"
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="font-mono text-xs text-zilla-neon/70 shrink-0">{c.n}</span>
                <span className="text-sm sm:text-base text-white/85">{c.title}</span>
              </div>
              <span className="text-xs text-white/35 shrink-0 tabular-nums">{c.time}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PrecallAgenda;
