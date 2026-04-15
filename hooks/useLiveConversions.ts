/**
 * useLiveConversions
 * ==================
 * Polls `/api/utm/live-conversions/{shopId}?since=<iso>` every 10s and dispatches
 * a `gz:conversion` CustomEvent for each new row.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §7
 *
 * Why an event instead of state? The toast component is mounted at a different
 * level than the data hook (top-of-app vs anywhere). A global event lets any
 * listener react without prop drilling.
 *
 * Failure tolerance:
 *   - Backend 404 / timeout / abort → silent no-op, retries next interval.
 *   - Tab hidden → skip fetch, sleep one interval (saves quota + battery).
 *   - shopId change → AbortController cancels in-flight; cursor scoped per shop.
 *
 * No React state — this hook is side-effect only and returns void.
 */

import { useEffect, useRef } from 'react';

export interface LiveConversion {
  id: string;
  amount: number;
  currency: string;
  product: { id: string; title: string; image_url: string | null };
  creator: string | null;
  platform: string;
  hook: string | null;
  created_at: string;
}

/**
 * Wire shape returned by `GET /api/utm/live-conversions/{shop_id}` (S32 spec).
 * Field names diverge from the toast-ready `LiveConversion` above — we adapt
 * once in `adaptLiveConversion` so the rest of the pipeline stays stable.
 */
interface BackendLiveConversion {
  conversion_id: string;
  utm_link_id?: string | null;
  short_code?: string | null;
  order_id?: string | null;
  order_name?: string | null;
  revenue: number | string;
  currency: string;
  matched_at: string;
  creator_username?: string | null;
  creator_handle?: string | null;
  // Optional enrichments backend may add later — accept defensively.
  product?: { id?: string | null; title?: string | null; image_url?: string | null } | null;
  platform?: string | null;
  hook?: string | null;
}

function adaptLiveConversion(r: BackendLiveConversion): LiveConversion {
  const amount = typeof r.revenue === 'string' ? parseFloat(r.revenue) : r.revenue;
  return {
    id: r.conversion_id,
    amount: Number.isFinite(amount) ? amount : 0,
    currency: r.currency || 'USD',
    product: {
      id: r.product?.id ?? r.utm_link_id ?? r.conversion_id,
      // Order name (`#1042`) is the most useful fallback we have until product
      // join lands — better than rendering a literal "Product".
      title: r.product?.title ?? r.order_name ?? 'Order',
      image_url: r.product?.image_url ?? null,
    },
    creator: r.creator_username ?? r.creator_handle ?? null,
    platform: r.platform ?? '',
    hook: r.hook ?? null,
    created_at: r.matched_at,
  };
}

const POLL_MS = 10_000;
const LOOKBACK_MS = 60 * 60 * 1000; // 1 hour on first load if no cursor stored

const API_BASE =
  process.env.NEXT_PUBLIC_ECOMDASH_API_URL ||
  process.env.ECOMDASH_API_URL ||
  '';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('gz_token');
}

export function useLiveConversions(shopId: string | null | undefined): void {
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!shopId) return;
    if (typeof window === 'undefined') return;

    const sessionKey = `gz:lastConversionAt:${shopId}`;
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    async function pollOnce() {
      if (cancelled) return;

      // Pause when tab hidden — saves quota + battery; resumes when user returns.
      if (document.visibilityState === 'hidden') {
        timerId = setTimeout(pollOnce, POLL_MS);
        return;
      }

      const since =
        window.sessionStorage.getItem(sessionKey) ||
        new Date(Date.now() - LOOKBACK_MS).toISOString();

      // Cancel any prior in-flight request before kicking a new one.
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const headers: Record<string, string> = { Accept: 'application/json' };
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;

        const url = `${API_BASE}/api/utm/live-conversions/${encodeURIComponent(
          shopId!
        )}?since=${encodeURIComponent(since)}`;

        const res = await fetch(url, { headers, signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        // Backend (S32) returns `LiveConversionItem[]` directly. Stay lenient:
        // also accept `{rows:[...]}` / `{conversions:[...]}` for forward-compat.
        const raw: BackendLiveConversion[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.rows)
          ? json.rows
          : Array.isArray(json?.conversions)
          ? json.conversions
          : [];

        // Map backend wire shape → toast-ready shape. Backend uses
        // `conversion_id`/`revenue`/`matched_at`/`creator_username`; our toast
        // wants `id`/`amount`/`created_at`/`creator`. Single point of mapping —
        // contract change touches only this block.
        const rows: LiveConversion[] = raw.map(adaptLiveConversion);

        if (rows.length) {
          // Dispatch oldest → newest so toast stack ordering matches arrival order.
          const sorted = [...rows].sort((a, b) =>
            a.created_at.localeCompare(b.created_at)
          );
          for (const row of sorted) {
            window.dispatchEvent(
              new CustomEvent<LiveConversion>('gz:conversion', { detail: row })
            );
          }
          window.sessionStorage.setItem(
            sessionKey,
            sorted[sorted.length - 1].created_at
          );
        }
      } catch {
        // Silent — endpoint may be 404 (not yet shipped), network blip, or abort.
        // Retry happens on the next interval anyway.
      } finally {
        if (!cancelled) timerId = setTimeout(pollOnce, POLL_MS);
      }
    }

    // Kick the loop. Tiny initial delay so callers mounting many hooks don't
    // hammer at exactly the same tick.
    timerId = setTimeout(pollOnce, 250);

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
      abortRef.current?.abort();
    };
  }, [shopId]);
}
