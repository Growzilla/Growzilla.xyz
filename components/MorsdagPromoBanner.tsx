'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const MORSDAG_TARGET = new Date('2026-05-31T00:00:00+02:00');
const DISMISS_KEY = 'morsdag-banner-dismissed-v1';

const HIDDEN_PREFIXES = [
  '/morsdag',
  '/admin',
  '/whop',
  '/checkout',
  '/checkout-card',
  '/checkout-bank',
  '/organicdashboard',
  '/dashboard',
  '/login',
];

const pad = (n: number) => n.toString().padStart(2, '0');

const getTimeLeft = (target: Date) => {
  const diff = target.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    expired: diff <= 0,
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped / 3_600_000) % 24),
    minutes: Math.floor((clamped / 60_000) % 60),
  };
};

function usePathnameSafe(): string {
  let appPath: string | null = null;
  let pagesPath: string | null = null;
  try {
    appPath = usePathname();
  } catch {
    appPath = null;
  }
  try {
    const r = useRouter();
    pagesPath = r?.pathname ?? null;
  } catch {
    pagesPath = null;
  }
  return appPath ?? pagesPath ?? '';
}

export const MorsdagPromoBanner: React.FC = () => {
  const pathname = usePathnameSafe();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [left, setLeft] = useState(() => getTimeLeft(MORSDAG_TARGET));

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1');
    }
    const id = setInterval(() => setLeft(getTimeLeft(MORSDAG_TARGET)), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;
  if (dismissed) return null;
  if (left.expired) return null;
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(DISMISS_KEY, '1');
    }
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Morsdag Launch erbjudande"
      className="sticky top-0 z-[60] w-full border-b border-morsdag-rose/15 bg-zilla-black/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6 sm:py-3">
        <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-morsdag-rose sm:inline-block" aria-hidden />

        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
          <div className="flex items-baseline gap-2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-morsdag-ivory sm:text-xs">
            <span className="text-morsdag-rose">Morsdag</span>
            <span className="text-white/40">·</span>
            <span className="text-white/70">31 maj 2026</span>
          </div>

          <span className="hidden h-3 w-px bg-white/10 md:inline-block" aria-hidden />

          <p className="hidden truncate text-[13px] text-white/75 md:block">
            Är du svensk e-handlare? <span className="text-white">Se vårt Morsdags-erbjudande</span>
            <span className="text-white/40"> · Launch live inom 72h</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-morsdag-ivory sm:gap-3 sm:text-xs">
          <span className="rounded-md bg-morsdag-rose/10 px-2 py-1 tabular-nums">{pad(left.days)}d</span>
          <span className="rounded-md bg-morsdag-rose/10 px-2 py-1 tabular-nums">{pad(left.hours)}h</span>
          <span className="hidden rounded-md bg-morsdag-rose/10 px-2 py-1 tabular-nums sm:inline">{pad(left.minutes)}m</span>
        </div>

        <Link
          href="/morsdag"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-morsdag-rose px-3 py-1.5 text-[12px] font-semibold text-morsdag-ink transition-all hover:bg-morsdag-ivory hover:-translate-y-px sm:px-4 sm:text-[13px]"
        >
          <span className="hidden sm:inline">Se erbjudandet</span>
          <span className="sm:hidden">Erbjudande</span>
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Stäng erbjudande"
          className="shrink-0 rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MorsdagPromoBanner;
