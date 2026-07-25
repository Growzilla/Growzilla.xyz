import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

type Props = {
  onBookClick?: () => void;
};

export default function EngineClose({ onBookClick }: Props) {
  const { close } = ENGINE;

  return (
    <section id="book" className="engine-section scroll-mt-24 relative overflow-hidden">
      <div
        className="engine-hero-orb engine-hero-orb-neon w-[360px] h-[360px] left-1/2 -translate-x-1/2 top-4 opacity-35"
        aria-hidden
      />
      <div
        className="engine-hero-orb engine-hero-orb-electric w-[240px] h-[240px] right-10 bottom-0 opacity-30"
        aria-hidden
      />
      <div className="engine-wrap relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="engine-eyebrow engine-eyebrow-neon mb-6">{close.eyebrow}</p>
          <h2 className="engine-display text-[clamp(2rem,4.5vw,3.25rem)]">
            {close.title}
          </h2>
          <p className="mt-4 engine-display text-[clamp(1.35rem,3vw,2.1rem)] text-white/50 font-medium">
            {close.sub}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="engine-btn engine-btn-neon engine-btn-lg min-w-[260px] w-full sm:w-auto"
            >
              {ENGINE.cta}
            </button>
            <p className="text-sm text-white/38">{close.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
