import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

export default function EngineFreedom() {
  const { freedom } = ENGINE;

  return (
    <section id="freedom" className="engine-section scroll-mt-24">
      <div className="engine-wrap">
        <p className="engine-eyebrow engine-eyebrow-mute mb-5">{freedom.eyebrow}</p>
        <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)] max-w-2xl">
          {freedom.title}
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {freedom.items.map((item, i) => (
            <div
              key={item.title}
              className="engine-panel p-7 flex gap-5 items-start border-white/[0.07]"
            >
              <span
                className={`font-mono text-[12px] mt-0.5 ${
                  i % 2 === 0 ? 'text-[var(--e-electric)]' : 'text-[var(--e-neon)]'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-white/90 mb-1.5">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
