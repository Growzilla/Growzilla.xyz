import React, { useEffect, useState } from 'react';
import { ENGINE } from '@/lib/engine/copy';

const LINKS = [
  { href: '#system', label: 'System' },
  { href: '#journey', label: '30 days' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#team', label: 'Team' },
];

type Props = {
  onBookClick?: () => void;
};

export default function EngineNav({ onBookClick }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`engine-nav ${scrolled ? 'engine-nav-scrolled' : ''}`}>
      <div className="engine-wrap h-[4.25rem] flex items-center justify-between gap-4">
        <a href="/" className="flex items-baseline gap-0.5" aria-label="Growzilla">
          <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-white/95">
            Growzill
          </span>
          <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-[var(--e-neon)]">
            a
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-[13px] text-white/40 hover:text-white/85 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onBookClick}
          className="engine-btn engine-btn-neon !h-10 !px-4 !text-[13px]"
        >
          {ENGINE.cta}
        </button>
      </div>
    </header>
  );
}
