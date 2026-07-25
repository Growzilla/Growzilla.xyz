import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

export default function EngineJourney() {
  const { journey } = ENGINE;

  return (
    <section id="journey" className="engine-section scroll-mt-24 relative overflow-hidden">
      <div
        className="engine-hero-orb engine-hero-orb-electric w-[400px] h-[400px] -left-32 top-20 opacity-50"
        aria-hidden
      />
      <div className="engine-wrap relative">
        <p className="engine-eyebrow engine-eyebrow-electric mb-5">{journey.eyebrow}</p>
        <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)] max-w-3xl">
          {journey.title}
        </h2>

        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-[18px] left-[6%] right-[6%] h-px">
            <div className="h-full w-full bg-gradient-to-r from-[rgba(0,217,255,0.35)] via-[rgba(0,255,148,0.45)] to-[var(--e-neon)]" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {journey.weeks.map((w, i) => {
              const isLast = i === journey.weeks.length - 1;
              const isElectric = w.color === 'electric';
              return (
                <div key={w.label} className="relative">
                  <div
                    className={`relative z-10 mb-5 h-2.5 w-2.5 rounded-full ${
                      isLast
                        ? 'bg-[var(--e-neon)] shadow-[0_0_18px_rgba(0,255,148,0.55)]'
                        : isElectric
                          ? 'bg-[var(--e-electric)] shadow-[0_0_14px_rgba(0,217,255,0.4)]'
                          : 'bg-[var(--e-neon)]/80'
                    }`}
                  />
                  <p
                    className={`font-mono text-[10px] uppercase tracking-[0.16em] mb-2 ${
                      isElectric ? 'text-[var(--e-electric)]/80' : 'text-[var(--e-neon)]/80'
                    }`}
                  >
                    {w.label}
                  </p>
                  <h3 className="text-[15px] font-semibold text-white/90 mb-2">{w.title}</h3>
                  <p className="text-sm text-white/42 leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
