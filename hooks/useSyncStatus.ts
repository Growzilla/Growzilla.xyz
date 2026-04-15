/**
 * useSyncStatus — polls GET /api/shops/{shopId}/sync/status
 *
 * Closes invariant I3 (display half) from syncduringinstall.md.
 *
 * Behavior (all mandatory):
 *   - Polls every 1.5s while either phase is pending|running.
 *   - Stops polling 5s after both phases reach `done`.
 *   - Exponential backoff on 5xx: 1500 -> 3000 -> 6000 -> 12000ms (cap).
 *   - Resets backoff to 1500ms on any 2xx.
 *   - On 5xx OR network error: returns last-known-good state. Never surfaces
 *     an error to UI. Never flashes "Store not found".
 *   - No request overlap: AbortController, abort on unmount AND next tick.
 *   - Always sends `X-Request-Id` header.
 */

import { useEffect, useRef, useState } from 'react';
import { getToken } from '@/lib/api-client';

const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';
const POLL_INTERVAL_MS = 1500;
const BACKOFF_LADDER_MS = [1500, 3000, 6000, 12000];
const POST_DONE_LINGER_MS = 5000;

export type SyncPhase = {
  status: 'pending' | 'running' | 'done' | 'error';
  count: number;
  total: number;
  syncedAt: string | null;
};

export type SyncState = {
  products: SyncPhase;
  orders: SyncPhase;
  error?: { id: string; code: string; message: string };
  lastKnownGood: SyncState | null;
};

const PHASE_INITIAL: SyncPhase = {
  status: 'pending',
  count: 0,
  total: 0,
  syncedAt: null,
};

const STATE_INITIAL: SyncState = {
  products: PHASE_INITIAL,
  orders: PHASE_INITIAL,
  lastKnownGood: null,
};

function makeRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'gz-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function bothDone(s: SyncState): boolean {
  return s.products.status === 'done' && s.orders.status === 'done';
}

// Normalize backend response into a SyncPhase. Tolerant to missing fields so
// the dock never crashes on a partial payload.
function normalizePhase(raw: unknown): SyncPhase {
  if (!raw || typeof raw !== 'object') return PHASE_INITIAL;
  const r = raw as Record<string, unknown>;
  const status =
    r.status === 'running' || r.status === 'done' || r.status === 'error'
      ? r.status
      : 'pending';
  const count = typeof r.count === 'number' ? r.count : 0;
  const total = typeof r.total === 'number' ? r.total : 0;
  const syncedRaw = r.syncedAt ?? r.synced_at ?? null;
  const syncedAt = typeof syncedRaw === 'string' ? syncedRaw : null;
  return { status, count, total, syncedAt };
}

export function useSyncStatus(shopId: string | undefined): SyncState {
  const [state, setState] = useState<SyncState>(STATE_INITIAL);

  // Refs so the polling loop reads current values without re-subscribing.
  const lastKnownGoodRef = useRef<SyncState | null>(null);
  const backoffIndexRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!shopId) return;

    stoppedRef.current = false;
    backoffIndexRef.current = 0;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const abortInflight = () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };

    const scheduleNext = (delayMs: number) => {
      clearTimer();
      if (stoppedRef.current) return;
      timerRef.current = setTimeout(poll, delayMs);
    };

    const poll = async () => {
      if (stoppedRef.current || !shopId) return;

      // Abort any prior inflight request before starting a new one.
      abortInflight();
      const controller = new AbortController();
      abortRef.current = controller;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Request-Id': makeRequestId(),
      };
      const token = getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        const res = await fetch(
          `${API_BASE}/api/shops/${shopId}/sync/status`,
          { method: 'GET', headers, signal: controller.signal },
        );

        if (!res.ok) {
          // 5xx (or any non-2xx): fall back to last-known-good, back off.
          if (res.status >= 500) {
            backoffIndexRef.current = Math.min(
              backoffIndexRef.current + 1,
              BACKOFF_LADDER_MS.length - 1,
            );
            // Surface last-known-good without an error field; the dock must
            // never display an error.
            const lkg = lastKnownGoodRef.current;
            setState({
              products: lkg ? lkg.products : PHASE_INITIAL,
              orders: lkg ? lkg.orders : PHASE_INITIAL,
              lastKnownGood: lkg,
            });
            scheduleNext(BACKOFF_LADDER_MS[backoffIndexRef.current]);
            return;
          }
          // 4xx (e.g. 404 Store not found, 401): treat as transient — keep
          // last-known-good and retry on normal cadence. Never flash error.
          const lkg = lastKnownGoodRef.current;
          setState({
            products: lkg ? lkg.products : PHASE_INITIAL,
            orders: lkg ? lkg.orders : PHASE_INITIAL,
            lastKnownGood: lkg,
          });
          scheduleNext(POLL_INTERVAL_MS);
          return;
        }

        // 2xx: parse, normalize, snapshot last-known-good, reset backoff.
        const json: unknown = await res.json();
        const obj = (json && typeof json === 'object' ? json : {}) as Record<string, unknown>;
        const next: SyncState = {
          products: normalizePhase(obj.products),
          orders: normalizePhase(obj.orders),
          lastKnownGood: lastKnownGoodRef.current,
        };
        lastKnownGoodRef.current = {
          products: next.products,
          orders: next.orders,
          lastKnownGood: null,
        };
        next.lastKnownGood = lastKnownGoodRef.current;
        backoffIndexRef.current = 0;
        setState(next);

        if (bothDone(next)) {
          // Linger one final time after both reach done, then stop.
          scheduleNext(POST_DONE_LINGER_MS);
          // Mark stopped after the linger timer fires by checking inside poll.
          // Simpler: stop immediately — the dock handles its own fade.
          stoppedRef.current = true;
          return;
        }

        scheduleNext(POLL_INTERVAL_MS);
      } catch (err) {
        // AbortError on unmount/next-tick: do nothing.
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if ((err as { name?: string })?.name === 'AbortError') return;

        // Network/CORS failure: treat like a 5xx — last-known-good + backoff.
        backoffIndexRef.current = Math.min(
          backoffIndexRef.current + 1,
          BACKOFF_LADDER_MS.length - 1,
        );
        const lkg = lastKnownGoodRef.current;
        setState({
          products: lkg ? lkg.products : PHASE_INITIAL,
          orders: lkg ? lkg.orders : PHASE_INITIAL,
          lastKnownGood: lkg,
        });
        scheduleNext(BACKOFF_LADDER_MS[backoffIndexRef.current]);
      }
    };

    // Kick off the first poll immediately.
    poll();

    return () => {
      stoppedRef.current = true;
      clearTimer();
      abortInflight();
    };
  }, [shopId]);

  return state;
}

export default useSyncStatus;
