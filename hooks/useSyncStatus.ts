/**
 * useSyncStatus
 * =============
 * Polls `GET /api/shops/{shop_id}/sync/status` (S32 spec §6.1) and returns the
 * current `SyncStatusShape` plus a refresh fn. Adaptive cadence:
 *   - either resource is `running` → poll every 3s (fast for the install-time
 *     spinner; merchant is staring at the screen).
 *   - both are `done` and last refresh > 60s ago → 30s heartbeat (covers the
 *     "user opens dashboard a day later, products were re-synced offline" case).
 *   - both `done` and recent → stop polling until a window event nudges us.
 *
 * Why a hook here (not in fe-ui's design system package)?
 *   The fe-ui agent owns `<SyncStatusDock>` (the visual). The polling/state
 *   logic is a dashboard concern, lives close to the consumer, and decouples
 *   the modal's I3 gate from any UI-shell roll-out timing. fe-ui's hook can
 *   later wrap or replace this one — same return shape.
 *
 * Failure tolerance:
 *   - 401/403 → returns last-known status (keeps the UI from flickering when a
 *     token expires mid-session).
 *   - 404 / 5xx / network → silent; retries on next interval.
 *   - shopId change → AbortController cancels the in-flight request.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SyncStatusShape } from '@/components/dashboard/CreateLinkModal';

const FAST_POLL_MS = 3_000;
const SLOW_POLL_MS = 30_000;

const API_BASE =
  process.env.NEXT_PUBLIC_ECOMDASH_API_URL ||
  process.env.ECOMDASH_API_URL ||
  '';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('gz_token');
}

/**
 * Default `pending` status for first-render and for shops where the row exists
 * but no sync has fired yet. Keeps the I3 gate disabled until the backend
 * confirms `done` (fail-closed).
 */
const DEFAULT_STATUS: SyncStatusShape = {
  products: { status: 'pending', count: 0, total: null, syncedAt: null },
  orders: { status: 'pending', count: 0, total: null, syncedAt: null },
  error: null,
};

export interface UseSyncStatusReturn {
  status: SyncStatusShape;
  /** True until the first successful response (lets the UI show a skeleton). */
  loading: boolean;
  /** Last fetch error message — UI may surface it; nullable on success. */
  error: string | null;
  /** Force an immediate refetch (e.g., after the user clicks "Sync now"). */
  refresh: () => void;
}

export function useSyncStatus(shopId: string | null | undefined): UseSyncStatusReturn {
  const [status, setStatus] = useState<SyncStatusShape>(DEFAULT_STATUS);
  const [loading, setLoading] = useState<boolean>(Boolean(shopId));
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Mirror of `status` for synchronous reads inside the polling loop —
  // avoids stale-closure reads and the StrictMode double-fire risk of
  // computing the next delay inside a setState updater.
  const statusRef = useRef<SyncStatusShape>(DEFAULT_STATUS);
  const refreshSeq = useRef<number>(0);
  const [refreshTick, setRefreshTick] = useState(0);

  const refresh = useCallback(() => {
    refreshSeq.current += 1;
    setRefreshTick((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }
    if (typeof window === 'undefined') return;

    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    async function pollOnce() {
      if (cancelled) return;

      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const headers: Record<string, string> = { Accept: 'application/json' };
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;

        const url = `${API_BASE}/api/shops/${encodeURIComponent(shopId!)}/sync/status`;
        const res = await fetch(url, { headers, signal: ac.signal });

        // Auth failure → keep prior status, don't downgrade UI.
        if (res.status === 401 || res.status === 403) {
          setError('unauthorized');
        } else if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        } else {
          const json = (await res.json()) as Partial<SyncStatusShape>;
          if (!cancelled) {
            // Coerce server payload into the local shape, defending against
            // missing fields (a forward-compat backend may add new ones).
            const next: SyncStatusShape = {
              products: {
                status: (json.products?.status ?? 'pending') as SyncStatusShape['products']['status'],
                count: json.products?.count ?? 0,
                total: json.products?.total ?? null,
                syncedAt: json.products?.syncedAt ?? null,
              },
              orders: json.orders
                ? {
                    status: (json.orders.status ?? 'pending') as SyncStatusShape['products']['status'],
                    count: json.orders.count ?? 0,
                    total: json.orders.total ?? null,
                    syncedAt: json.orders.syncedAt ?? null,
                  }
                : undefined,
              error: json.error ?? null,
            };
            statusRef.current = next;
            setStatus(next);
            setError(null);
          }
        }
      } catch (e) {
        if ((e as Error)?.name === 'AbortError') return;
        if (!cancelled) setError((e as Error).message || 'fetch_failed');
      } finally {
        if (!cancelled) {
          setLoading(false);
          // Cadence: fast while either resource is still pending/running, slow
          // once everything has landed. Reads `statusRef` (set synchronously
          // above) so we never schedule against stale state.
          const curr = statusRef.current;
          const isRunning =
            curr.products.status === 'running' ||
            curr.products.status === 'pending' ||
            curr.orders?.status === 'running' ||
            curr.orders?.status === 'pending';
          const delay = isRunning ? FAST_POLL_MS : SLOW_POLL_MS;
          timerId = setTimeout(pollOnce, delay);
        }
      }
    }

    // Tiny initial debounce so multiple consumers mounting at once don't
    // hammer the same tick.
    timerId = setTimeout(pollOnce, 200);

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
      abortRef.current?.abort();
    };
    // `refreshTick` re-runs the effect and kicks off a fresh poll cycle on demand.
  }, [shopId, refreshTick]);

  return { status, loading, error, refresh };
}
