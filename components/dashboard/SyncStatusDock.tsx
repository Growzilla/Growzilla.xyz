/**
 * SyncStatusDock — fixed-position UI surface for install-time sync progress.
 *
 * Closes invariant I3 (display half) from syncduringinstall.md.
 *
 * Rules:
 *   - Fixed bottom-4 right-4, two stacked cards, z-40. Dashboard-clean (no neon).
 *   - Each card: phase name + status pill + count/total + spinner|check.
 *   - Auto-fade 5s after both phases reach `done`. Unmount at 6s.
 *   - Purely informational; no interactive elements.
 *   - Renders nothing if shopId is undefined.
 */

import { useEffect, useState } from 'react';
import { useSyncStatus, type SyncPhase } from '@/hooks/useSyncStatus';

type Visibility = 'visible' | 'fading' | 'gone';

const FADE_AT_MS = 5000;
const UNMOUNT_AT_MS = 6000;

export type SyncStatusDockProps = {
  shopId: string | undefined;
  className?: string;
};

function PhaseRow({ name, phase }: { name: string; phase: SyncPhase }) {
  const isDone = phase.status === 'done';
  const isRunning = phase.status === 'running';
  const isError = phase.status === 'error';
  const isPending = phase.status === 'pending';

  // Status pill color (dashboard-clean: zinc surfaces, single accent only on done).
  const pillClass = isDone
    ? 'bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]/30'
    : isError
    ? 'bg-zinc-800 text-zinc-300 border-white/10'
    : isRunning
    ? 'bg-zinc-800 text-zinc-200 border-white/10'
    : 'bg-zinc-800 text-zinc-400 border-white/10';

  const pillLabel = isDone
    ? 'Done'
    : isError
    ? 'Retrying'
    : isRunning
    ? 'Running'
    : 'Pending';

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-[#151518] px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-[13px] font-medium text-white/95 truncate">{name}</span>
        <span
          className={
            'inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ' +
            pillClass
          }
        >
          {pillLabel}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-mono text-[12px] text-white/72 tabular-nums">
          {phase.count.toLocaleString()}
          {phase.total > 0 ? ` / ${phase.total.toLocaleString()}` : ''}
        </span>
        {isDone ? (
          <span aria-hidden className="text-[#00FF94] text-[13px] leading-none">
            ✓
          </span>
        ) : isPending || isRunning || isError ? (
          <Spinner />
        ) : null}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3 w-3 animate-spin rounded-full border border-white/20 border-t-white/72"
    />
  );
}

export function SyncStatusDock({ shopId, className }: SyncStatusDockProps) {
  const state = useSyncStatus(shopId);
  const [visibility, setVisibility] = useState<Visibility>('visible');

  const bothDone =
    state.products.status === 'done' && state.orders.status === 'done';

  // Fade + unmount lifecycle once both phases reach done.
  useEffect(() => {
    if (!bothDone) {
      // Reset visibility if we ever leave the done state (e.g. lkg fallback).
      setVisibility('visible');
      return;
    }
    const fadeT = setTimeout(() => setVisibility('fading'), FADE_AT_MS);
    const unmountT = setTimeout(() => setVisibility('gone'), UNMOUNT_AT_MS);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(unmountT);
    };
  }, [bothDone]);

  if (!shopId) return null;
  if (visibility === 'gone') return null;

  const opacityClass = visibility === 'fading' ? 'opacity-0' : 'opacity-100';
  const root =
    'fixed bottom-4 right-4 z-40 flex flex-col gap-2 w-[280px] transition-opacity duration-1000 ease-out ' +
    opacityClass +
    (className ? ' ' + className : '');

  return (
    <div
      className={root}
      role="status"
      aria-live="polite"
      data-testid="sync-status-dock"
    >
      <PhaseRow name="Products" phase={state.products} />
      <PhaseRow name="Orders" phase={state.orders} />
    </div>
  );
}

export default SyncStatusDock;
