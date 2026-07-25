import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

const STATS = [
  { value: '5–10', label: 'Meetings / week', accent: 'neon' as const },
  { value: '30d', label: 'To live pipeline', accent: 'electric' as const },
  { value: 'Min 5', label: 'Guaranteed · month 1', accent: 'gold' as const },
  { value: '$500', label: 'Productized monthly', accent: 'neon' as const },
];

const accentClass = {
  neon: 'text-[var(--e-neon)]',
  electric: 'text-[var(--e-electric)]',
  gold: 'text-[var(--e-gold)]',
};

export default function EngineAuthority() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#0c0c0e]">
      <div className="engine-wrap py-12 sm:py-14">
        <div className="flex flex-col xl:flex-row xl:items-end gap-10 xl:gap-16">
          <div className="xl:max-w-sm shrink-0">
            <p className="engine-eyebrow engine-eyebrow-mute mb-3">Built for funded founders</p>
            <p className="text-[15px] sm:text-base text-white/50 leading-relaxed">
              Operator-led delivery for B2B SaaS teams that need pipeline — not another tool stack.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                Clients under management
              </span>
              {ENGINE.clients.map((c) => (
                <span key={c} className="text-sm font-medium text-white/70">
                  {c}
                </span>
              ))}
              <span className="text-[11px] text-white/25">{ENGINE.legal}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 flex-1">
            {STATS.map((s) => (
              <div key={s.label} className="relative pl-3 border-l border-white/[0.08]">
                <p
                  className={`font-display text-[1.75rem] sm:text-[2rem] font-semibold tracking-[-0.03em] leading-none ${accentClass[s.accent]}`}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] sm:text-xs text-white/35 leading-snug max-w-[8.5rem]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
