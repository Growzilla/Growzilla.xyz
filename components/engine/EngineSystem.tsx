import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

const colorMap = {
  electric: {
    num: 'text-[var(--e-electric)]',
    bar: 'bg-[var(--e-electric)]',
    border: 'border-[rgba(0,217,255,0.18)]',
    glow: 'shadow-[0_0_40px_rgba(0,217,255,0.06)]',
  },
  neon: {
    num: 'text-[var(--e-neon)]',
    bar: 'bg-[var(--e-neon)]',
    border: 'border-[rgba(0,255,148,0.18)]',
    glow: 'shadow-[0_0_40px_rgba(0,255,148,0.06)]',
  },
};

export default function EngineSystem() {
  const { system } = ENGINE;

  return (
    <section id="system" className="engine-section scroll-mt-24">
      <div className="engine-wrap">
        <p className="engine-eyebrow engine-eyebrow-electric mb-5">{system.eyebrow}</p>
        <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)] max-w-2xl">
          {system.title}
        </h2>

        <div className="mt-10 hidden md:block">
          <div className="engine-flow-line w-full mb-[-5px]" />
        </div>

        <div className="mt-8 md:mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {system.steps.map((step) => {
            const c = colorMap[step.color];
            return (
              <div
                key={step.n}
                className={`engine-panel p-6 sm:p-7 ${c.border} ${c.glow} transition-transform duration-200 hover:-translate-y-0.5`}
              >
                <div className={`h-1 w-10 rounded-full mb-5 ${c.bar}`} />
                <p className={`font-mono text-[12px] font-medium mb-3 ${c.num}`}>{step.n}</p>
                <h3 className="text-[16px] font-semibold text-white/92 mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
