import React from 'react';
import { ENGINE } from '@/lib/engine/copy';
import EngineConnectStage from './EngineConnectStage';

type Props = {
  linkedinLogo: string;
  growzillaLogo: string;
};

type HeroProps = Props & {
  onBookClick?: () => void;
};

export default function EngineHero({ linkedinLogo, growzillaLogo, onBookClick }: HeroProps) {
  const { hero } = ENGINE;

  return (
    <section id="top" className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      <div
        className="engine-hero-orb engine-hero-orb-electric w-[320px] h-[320px] -top-16 -left-16 opacity-55"
        aria-hidden
      />
      <div
        className="engine-hero-orb engine-hero-orb-neon w-[360px] h-[360px] top-16 right-[-60px] opacity-45"
        aria-hidden
      />
      <div
        className="engine-hero-orb engine-hero-orb-gold w-[220px] h-[220px] bottom-24 left-1/3 opacity-35"
        aria-hidden
      />
      <div className="engine-grid" aria-hidden />

      <div className="engine-wrap relative">
        <div className="max-w-4xl">
          <p className="engine-eyebrow engine-eyebrow-electric mb-6">{hero.eyebrow}</p>

          <h1 className="engine-display text-[clamp(2.4rem,6.2vw,4.75rem)]">
            <span className="block text-white/95">We turn your LinkedIn into a</span>
            <span className="block mt-1 sm:mt-2">
              <span className="text-white/95">repeatable </span>
              <span className="text-[var(--e-neon)]">sales engine</span>
              <span className="text-white/95">.</span>
            </span>
          </h1>

          <p className="engine-body mt-7 sm:mt-8 max-w-xl text-[17px] sm:text-[18px]">
            {hero.sub}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="engine-btn engine-btn-neon engine-btn-lg w-full sm:w-auto"
            >
              {ENGINE.cta}
            </button>
            <a
              href={ENGINE.secondaryHref}
              className="engine-btn engine-btn-ghost engine-btn-lg w-full sm:w-auto"
            >
              {ENGINE.secondary}
            </a>
          </div>

          <p className="mt-7 text-[12px] sm:text-[13px] text-white/38 tracking-wide">
            {hero.trust.join('  ·  ')}
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          <EngineConnectStage linkedinLogo={linkedinLogo} growzillaLogo={growzillaLogo} />
        </div>
      </div>
    </section>
  );
}
