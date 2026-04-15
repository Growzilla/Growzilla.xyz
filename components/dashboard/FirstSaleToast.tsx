'use client';

/**
 * <FirstSaleToast />
 * ==================
 * Top-right fixed toast stack. Listens for `gz:conversion` CustomEvents
 * dispatched by `useLiveConversions`. Up to 3 toasts visible (oldest drops
 * when a 4th arrives). Each toast auto-dismisses after 12s.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §7
 *
 * NOTE: This is the new event-driven version. The older
 * `components/whop/FirstSaleToast.tsx` (per-link polling) remains in the
 * codebase for backwards-compat with the existing dashboard wiring and is
 * not affected by this file.
 */

import React, { useEffect, useState } from 'react';
import type { LiveConversion } from '@/hooks/useLiveConversions';

interface ToastItem {
  /** Unique key for React; falls back to a synthesized id if backend omits one. */
  key: string;
  row: LiveConversion;
  /** ms timestamp when toast was added (used for auto-dismiss math). */
  bornMs: number;
}

const MAX_STACK = 3;
const DISMISS_MS = 12_000;
const TICK_MS = 5_000; // re-render to refresh timeAgo strings

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return 'just now';
  const s = Math.floor(ms / 1000);
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

function formatAmount(amount: number, currency: string): string {
  // amount is a major-unit decimal (matches /live-conversions contract).
  // If backend ever switches to minor units, divide here based on currency
  // exponent — keep this single point of truth.
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: (currency || 'USD').toUpperCase(),
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Bad currency code → fall back to USD-style formatting w/ symbol.
    return `${(currency || '$')} ${amount.toFixed(2)}`;
  }
}

const FirstSaleToast: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  // Force re-renders so timeAgo strings refresh.
  const [, setTick] = useState(0);

  // Listen for dispatched conversion events.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    function onConversion(e: Event) {
      const row = (e as CustomEvent<LiveConversion>).detail;
      if (!row) return;
      const key = row.id || `gz_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => {
        // De-dupe by key (in case the same row arrives twice from a slow poll).
        if (prev.some((t) => t.key === key)) return prev;
        const next = [...prev, { key, row, bornMs: Date.now() }];
        // Keep only the newest MAX_STACK.
        return next.slice(-MAX_STACK);
      });
    }
    window.addEventListener('gz:conversion', onConversion as EventListener);
    return () => window.removeEventListener('gz:conversion', onConversion as EventListener);
  }, []);

  // Time tick for timeAgo refresh.
  useEffect(() => {
    if (toasts.length === 0) return;
    const id = setInterval(() => setTick((n) => (n + 1) % 1_000_000), TICK_MS);
    return () => clearInterval(id);
  }, [toasts.length]);

  // Auto-dismiss: each render, schedule the soonest expiry.
  useEffect(() => {
    if (toasts.length === 0) return;
    const now = Date.now();
    const soonest = toasts.reduce(
      (min, t) => Math.min(min, t.bornMs + DISMISS_MS - now),
      DISMISS_MS
    );
    const id = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => Date.now() - t.bornMs < DISMISS_MS));
    }, Math.max(100, soonest));
    return () => clearTimeout(id);
  }, [toasts]);

  function dismiss(key: string) {
    setToasts((prev) => prev.filter((t) => t.key !== key));
  }

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((t) => (
        <ToastCard key={t.key} row={t.row} onDismiss={() => dismiss(t.key)} />
      ))}
    </div>
  );
};

interface ToastCardProps {
  row: LiveConversion;
  onDismiss: () => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ row, onDismiss }) => {
  const amount = formatAmount(row.amount, row.currency);
  const subtitleParts: string[] = [];
  if (row.creator) subtitleParts.push(`@${row.creator}`);
  if (row.platform) subtitleParts.push(row.platform);
  const subtitle = subtitleParts.join(' · ');

  return (
    <div
      className="pointer-events-auto rounded-lg w-[320px] px-4 py-3"
      style={{
        background: '#151518',
        border: '1px solid rgba(0,255,148,0.25)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      }}
      role="status"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ color: 'rgba(0,255,148,0.85)' }}
        >
          New sale
        </span>
        <button
          type="button"
          onClick={onDismiss}
          className="text-zinc-500 hover:text-zinc-200 leading-none text-base"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>

      <div
        className="mt-1 font-mono text-[20px] font-semibold leading-tight"
        style={{ color: '#00FF94' }}
      >
        {amount}
      </div>

      <div className="mt-1 text-[12px] text-white/85 truncate" title={row.product?.title || ''}>
        {row.product?.title || 'Product'}
      </div>

      {subtitle && (
        <div className="text-[11px] text-white/55 truncate" title={subtitle}>
          {subtitle}
        </div>
      )}

      {row.hook && (
        <div
          className="mt-1 text-[11px] text-white/45 italic truncate"
          title={row.hook}
        >
          “{row.hook}”
        </div>
      )}

      <div className="mt-1 text-[10px] text-white/30 tabular-nums">
        {timeAgo(row.created_at)}
      </div>
    </div>
  );
};

export default FirstSaleToast;
