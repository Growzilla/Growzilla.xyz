import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

export default function EngineProof() {
  const { proof } = ENGINE;

  return (
    <section id="proof" className="engine-section scroll-mt-24">
      <div className="engine-wrap">
        <p className="engine-eyebrow engine-eyebrow-mute mb-5">{proof.eyebrow}</p>
        <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)] max-w-3xl">
          {proof.title}
        </h2>

        <div className="mt-12 sm:mt-14 grid md:grid-cols-2 gap-4">
          <div className="engine-panel p-8 sm:p-10 opacity-90">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/30 mb-6">Before</p>
            <p className="font-display text-[3.5rem] sm:text-[4rem] font-semibold tracking-[-0.04em] text-white/30 leading-none">
              {proof.before.metric}
            </p>
            <p className="mt-2 text-sm text-white/30">{proof.before.label}</p>
            <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
              {proof.before.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-white/38">
                  <span className="text-white/20">×</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="engine-panel engine-panel-neon p-8 sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--e-neon)] mb-6">
              After
            </p>
            <p className="font-display text-[3.5rem] sm:text-[4rem] font-semibold tracking-[-0.04em] text-white/95 leading-none">
              {proof.after.metric}
            </p>
            <p className="mt-2 text-sm text-white/50">{proof.after.label}</p>
            <ul className="mt-8 space-y-3 border-t border-[rgba(0,255,148,0.12)] pt-6">
              {proof.after.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-white/70">
                  <span className="engine-check !w-4 !h-4 !text-[9px]" aria-hidden>
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-xs text-white/28 max-w-xl">{proof.caption}</p>
      </div>
    </section>
  );
}
