import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

export default function EngineOutcome() {
  const { outcome } = ENGINE;

  return (
    <section id="outcome" className="engine-section scroll-mt-24 relative overflow-hidden">
      <div
        className="engine-hero-orb engine-hero-orb-neon w-[500px] h-[500px] -right-40 top-1/2 -translate-y-1/2 opacity-40"
        aria-hidden
      />
      <div className="engine-wrap relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="engine-eyebrow engine-eyebrow-neon mb-5">{outcome.eyebrow}</p>
            <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)]">
              {outcome.title}
            </h2>
          </div>
          <ul className="lg:col-span-7 space-y-5">
            {outcome.items.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <span className="engine-check mt-0.5" aria-hidden>
                  ✓
                </span>
                <div>
                  <span className="font-mono text-[10px] text-white/25 mr-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] sm:text-base text-white/75 leading-relaxed">
                    {item}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
