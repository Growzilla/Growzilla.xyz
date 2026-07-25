import React from 'react';
import { ENGINE } from '@/lib/engine/copy';

export default function EngineFooter() {
  return (
    <footer className="border-t border-white/[0.06] py-12 sm:py-14">
      <div className="engine-wrap flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
        <div>
          <a href="/" className="flex items-baseline gap-0.5">
            <span className="font-display text-[16px] font-semibold tracking-[-0.02em] text-white/90">
              Growzill
            </span>
            <span className="font-display text-[16px] font-semibold tracking-[-0.02em] text-[var(--e-neon)]">
              a
            </span>
          </a>
          <p className="mt-4 text-sm text-white/35 max-w-sm leading-relaxed">
            {ENGINE.footer.tagline}
          </p>
          <p className="mt-3 text-[11px] text-white/22">
            {ENGINE.brand} · {ENGINE.legal}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {ENGINE.footer.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="text-[13px] text-white/40 hover:text-white/75 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
