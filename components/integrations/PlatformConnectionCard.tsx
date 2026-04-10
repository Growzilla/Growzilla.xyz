import React from 'react';
import { PlatformIcon, type Platform, PLATFORM_COLORS } from './PlatformIcon';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PlatformConnectionCardProps {
  /** Platform identifier */
  platform: Platform;
  /** Display name shown on the card (e.g. "Instagram") */
  displayName: string;
  /** Short description of the integration */
  description: string;
  /** Brand color for the connect button */
  brandColor: string;
  /** Whether the platform is currently connected */
  isConnected: boolean;
  /** Username on the connected platform */
  connectedUsername?: string;
  /** ISO timestamp of when the connection was made */
  connectedAt?: string;
  /** Handler for connecting the platform */
  onConnect: () => void;
  /** Handler for disconnecting the platform */
  onDisconnect: () => void;
  /** If true, card is dimmed and shows "coming soon" instead of a button */
  comingSoon?: boolean;
  /** Optional className for the root card */
  className?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// ─── Connected Badge ────────────────────────────────────────────────────────

function ConnectedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      Connected
    </span>
  );
}

// ─── Platform Connection Card ───────────────────────────────────────────────

export function PlatformConnectionCard({
  platform,
  displayName,
  description,
  brandColor,
  isConnected,
  connectedUsername,
  connectedAt,
  onConnect,
  onDisconnect,
  comingSoon = false,
  className,
}: PlatformConnectionCardProps) {
  // ── Coming Soon State ──
  if (comingSoon) {
    return (
      <div
        className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 opacity-75 ${className ?? ''}`}
      >
        <div className="flex items-start gap-4">
          <PlatformIcon platform={platform} size={40} className="flex-shrink-0 opacity-50" />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white/95">
              {displayName}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-white/48 mt-1 leading-relaxed">
              {description}
            </p>
            <p className="text-sm text-zinc-400 dark:text-white/48 italic mt-3">
              {displayName} integration coming soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Connected State ──
  if (isConnected) {
    return (
      <div
        className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 ${className ?? ''}`}
      >
        <div className="flex items-start gap-4">
          <PlatformIcon platform={platform} size={40} className="flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white/95">
                {displayName}
              </h3>
              <ConnectedBadge />
            </div>
            {connectedUsername && (
              <p className="text-xs text-zinc-600 dark:text-white/72 mt-1.5">
                @{connectedUsername}
              </p>
            )}
            {connectedAt && (
              <p className="text-xs text-zinc-400 dark:text-white/48 mt-1">
                Connected {formatTimeAgo(connectedAt)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onDisconnect}
            className="flex-shrink-0 text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors duration-150"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  // ── Disconnected State ──
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 ${className ?? ''}`}
    >
      <div className="flex items-start gap-4">
        <PlatformIcon platform={platform} size={40} className="flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white/95">
            {displayName}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-white/48 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onConnect}
          className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
          style={{ backgroundColor: brandColor }}
        >
          Connect {displayName}
        </button>
      </div>
    </div>
  );
}
