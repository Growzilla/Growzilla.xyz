import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

export default function EnginePricing() {
  const { pricing } = ENGINE;

  return (
    <section id="pricing" className="engine-section scroll-mt-24 relative overflow-hidden">
      <div
        className="engine-hero-orb engine-hero-orb-gold w-[360px] h-[360px] left-1/2 -translate-x-1/2 top-20 opacity-40"
        aria-hidden
      />
      <div className="engine-wrap relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="engine-eyebrow engine-eyebrow-gold mb-5">{pricing.eyebrow}</p>
          <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)] mx-auto">
            {pricing.title}
          </h2>
        </div>

        <div className="mt-12 sm:mt-14 max-w-md mx-auto">
          <div className="engine-panel engine-panel-neon p-8 sm:p-10">
            <p className="text-[13px] text-white/45 mb-4">{pricing.product}</p>
            <div className="flex items-end gap-2">
              <span className="font-display text-[3.75rem] sm:text-[4.25rem] font-semibold tracking-[-0.04em] leading-none text-white/95">
                ${pricing.price}
              </span>
              <span className="text-base text-white/40 mb-2">{pricing.period}</span>
            </div>

            <ul className="mt-8 space-y-3.5 border-t border-white/[0.07] pt-7">
              {pricing.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="engine-check mt-0.5" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-white/32 leading-relaxed">{pricing.footnote}</p>

            <div className="engine-panel-gold mt-7 rounded-xl p-5 border border-[rgba(255,184,77,0.28)]">
              <p className="engine-eyebrow engine-eyebrow-gold mb-2">Guarantee</p>
              <p className="text-[14px] font-semibold text-white/92 mb-2 leading-snug">
                {pricing.guaranteeTitle}
              </p>
              <p className="text-sm text-white/50 leading-relaxed">{pricing.guaranteeBody}</p>
            </div>

            <a
              href={ENGINE.ctaHref}
              className="engine-btn engine-btn-neon engine-btn-lg w-full mt-8"
            >
              {ENGINE.cta}
            </a>
            <p className="mt-4 text-center text-[12px] text-white/30">
              15-minute fit call · honest yes or no
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
