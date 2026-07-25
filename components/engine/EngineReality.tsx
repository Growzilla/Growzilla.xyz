import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

const toneBorder = {
  mute: 'border-white/[0.08]',
  electric: 'border-[rgba(0,217,255,0.2)] hover:border-[rgba(0,217,255,0.35)]',
  neon: 'border-[rgba(0,255,148,0.18)] hover:border-[rgba(0,255,148,0.32)]',
};

const toneNum = {
  mute: 'text-white/25',
  electric: 'text-[var(--e-electric)]',
  neon: 'text-[var(--e-neon)]',
};

export default function EngineReality() {
  const { reality } = ENGINE;

  return (
    <section id="reality" className="engine-section scroll-mt-24">
      <div className="engine-wrap">
        <p className="engine-eyebrow engine-eyebrow-mute mb-5">{reality.eyebrow}</p>
        <h2 className="engine-display text-[clamp(1.85rem,3.8vw,3rem)] max-w-3xl">
          {reality.title}
        </h2>

        <div className="mt-12 sm:mt-14 grid md:grid-cols-3 gap-4">
          {reality.cards.map((card, i) => (
            <div
              key={card.title}
              className={`engine-panel p-7 sm:p-8 transition-colors duration-200 ${toneBorder[card.tone]}`}
            >
              <p className={`font-mono text-[11px] mb-5 ${toneNum[card.tone]}`}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-[16px] font-semibold text-white/92 tracking-tight mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
