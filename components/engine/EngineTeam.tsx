import React from 'react';
import Image from 'next/image';
import { ENGINE } from '@/lib/engine/copy';

export default function EngineTeam() {
  const { team } = ENGINE;

  return (
    <section id="team" className="engine-section scroll-mt-24">
      <div className="engine-wrap">
        <p className="engine-eyebrow engine-eyebrow-mute mb-5">{team.eyebrow}</p>
        <h2 className="engine-display text-[clamp(1.9rem,3.6vw,3rem)] max-w-2xl">
          {team.title}
        </h2>

        <div className="mt-12 sm:mt-14 grid sm:grid-cols-3 gap-4">
          {team.members.map((m) => (
            <div key={m.name} className="engine-panel p-7 flex flex-col border-white/[0.07]">
              <div className="mb-5">
                {m.image ? (
                  <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-white/[0.08]">
                    <Image src={m.image} alt={m.name} fill className="object-cover" sizes="64px" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-2xl border border-[rgba(0,217,255,0.25)] bg-[rgba(0,217,255,0.06)] flex items-center justify-center">
                    <span className="font-mono text-xs text-[var(--e-electric)] tracking-wider">
                      AE
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-[15px] font-semibold text-white/92">{m.name}</h3>
              <p className="mt-1 text-xs text-white/40">{m.role}</p>
              <p className="mt-4 text-sm text-white/48 leading-relaxed flex-1">“{m.quote}”</p>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-xs text-white/35 hover:text-[var(--e-electric)] transition-colors duration-150"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
