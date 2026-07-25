import React from 'react';
import Image from 'next/image';
import { ENGINE } from '@/lib/engine/copy';

type Props = {
  linkedinLogo?: string;
  growzillaLogo: string;
};

/** Official LinkedIn mark — vector, always crisp on dark */
function LinkedInMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function EngineConnectStage({ growzillaLogo }: Props) {
  const { connect } = ENGINE;

  return (
    <div className="engine-stage p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
        <div className="lg:w-[38%] shrink-0">
          <p className="engine-eyebrow engine-eyebrow-electric mb-3">{connect.eyebrow}</p>
          <h2 className="engine-display text-[1.65rem] sm:text-[2rem] leading-[1.1]">
            {connect.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/50 max-w-sm">
            {connect.body}
          </p>
          <ul className="mt-6 space-y-2.5">
            {connect.outcomes.map((o) => (
              <li key={o} className="flex items-center gap-2.5 text-sm text-white/65">
                <span className="engine-check" aria-hidden>
                  ✓
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-3">
            <div className="engine-node engine-node-linkedin flex-1">
              <div
                className="relative h-12 w-12 rounded-xl shrink-0 flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(145deg, #0A66C2 0%, #004182 100%)',
                  boxShadow: '0 0 0 1px rgba(10, 102, 194, 0.45)',
                }}
                aria-label="LinkedIn"
              >
                <LinkedInMark className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--e-electric)] mb-0.5">
                  Source
                </p>
                <p className="text-sm font-semibold text-white/90 truncate">{connect.from}</p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-center gap-1 w-16 shrink-0">
              <div className="engine-beam w-full" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                connect
              </span>
            </div>
            <div className="sm:hidden flex items-center gap-2 px-1">
              <div className="engine-beam flex-1" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                connect
              </span>
              <div className="engine-beam flex-1" />
            </div>

            <div className="engine-node engine-node-growzilla flex-1">
              <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-white/[0.04] border border-[rgba(0,255,148,0.2)] shrink-0 flex items-center justify-center">
                <Image
                  src={growzillaLogo}
                  alt="Growzilla"
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--e-neon)] mb-0.5">
                  Engine
                </p>
                <p className="text-sm font-semibold text-white/90 truncate">{connect.to}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { label: 'Content', color: 'var(--e-electric)' },
              { label: 'Outreach', color: 'var(--e-mint)' },
              { label: 'Booked calls', color: 'var(--e-neon)' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/[0.06] bg-black/30 px-3 py-3 text-center"
              >
                <div
                  className="mx-auto mb-2 h-0.5 w-8 rounded-full opacity-80"
                  style={{ background: s.color }}
                />
                <p className="text-[11px] sm:text-xs text-white/50 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
