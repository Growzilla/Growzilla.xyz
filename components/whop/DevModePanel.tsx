'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { syncShop } from '@/lib/api-client';

const LS_FEATURES_KEY = 'gz_dev_features';

interface DevModePanelProps {
  shopDomain: string;
  shopId: string;
  lastSyncAt?: string | null;
  isTestStore: boolean;
}

interface FeatureFlags {
  showMockData: boolean;
  verboseLogging: boolean;
  showApiLatency: boolean;
  bypassCache: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  showMockData: true,
  verboseLogging: false,
  showApiLatency: false,
  bypassCache: false,
};

function loadFeatureFlags(): FeatureFlags {
  if (typeof window === 'undefined') return DEFAULT_FLAGS;
  const raw = localStorage.getItem(LS_FEATURES_KEY);
  if (!raw) return DEFAULT_FLAGS;
  try {
    return { ...DEFAULT_FLAGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_FLAGS;
  }
}

function saveFeatureFlags(flags: FeatureFlags) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_FEATURES_KEY, JSON.stringify(flags));
}

const DevModePanel: React.FC<DevModePanelProps> = ({
  shopDomain,
  shopId,
  lastSyncAt,
  isTestStore,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<'success' | 'error' | null>(null);
  const [flags, setFlags] = useState<FeatureFlags>(loadFeatureFlags);

  // Don't render if not a test store
  if (!isTestStore) return null;

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      await syncShop(shopId);
      setSyncResult('success');
      setTimeout(() => setSyncResult(null), 3000);
    } catch {
      setSyncResult('error');
      setTimeout(() => setSyncResult(null), 5000);
    } finally {
      setSyncing(false);
    }
  }, [shopId]);

  const toggleFlag = useCallback((key: keyof FeatureFlags) => {
    setFlags((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveFeatureFlags(next);
      return next;
    });
  }, []);

  const formatSyncTime = (iso: string | null | undefined) => {
    if (!iso) return 'Never';
    try {
      const d = new Date(iso);
      const now = Date.now();
      const diff = now - d.getTime();
      if (diff < 60_000) return 'Just now';
      if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
      if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
      return d.toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  };

  const shortDomain = shopDomain.replace('.myshopify.com', '');

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      style={{ maxWidth: 320 }}
    >
      {/* Collapsed badge */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 hover:brightness-110"
        style={{
          backgroundColor: 'rgba(255, 171, 0, 0.1)',
          border: '1px solid rgba(255, 171, 0, 0.2)',
          color: '#FFAB00',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFAB00] animate-pulse" />
        DEV MODE
        <svg
          className={`w-3 h-3 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="mt-2 rounded-lg overflow-hidden"
            style={{
              backgroundColor: '#151518',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <div className="text-xs font-medium text-white">{shortDomain}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Test store</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                <span className="text-[10px] text-gray-400">Connected</span>
              </div>
            </div>

            {/* Sync section */}
            <div
              className="px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-gray-400">Last sync</span>
                <span className="text-[11px] text-gray-300 font-mono">
                  {formatSyncTime(lastSyncAt)}
                </span>
              </div>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 disabled:opacity-50"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: syncing ? '#9CA3AF' : '#E5E7EB',
                }}
              >
                {syncing ? (
                  <>
                    <span
                      className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"
                    />
                    Syncing...
                  </>
                ) : syncResult === 'success' ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-[#00FF94]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Sync complete
                  </>
                ) : syncResult === 'error' ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Sync failed
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                    Trigger Sync
                  </>
                )}
              </button>
            </div>

            {/* Feature toggles */}
            <div className="px-4 py-3">
              <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Feature Flags
              </div>
              {(Object.entries(flags) as [keyof FeatureFlags, boolean][]).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-[11px] text-gray-400">
                    {key === 'showMockData' && 'Show mock data'}
                    {key === 'verboseLogging' && 'Verbose logging'}
                    {key === 'showApiLatency' && 'Show API latency'}
                    {key === 'bypassCache' && 'Bypass cache'}
                  </span>
                  <button
                    onClick={() => toggleFlag(key)}
                    className="relative w-7 h-4 rounded-full transition-colors duration-150"
                    style={{
                      backgroundColor: value ? 'rgba(0, 255, 148, 0.3)' : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-150"
                      style={{
                        left: value ? 14 : 2,
                        backgroundColor: value ? '#00FF94' : '#6B7280',
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Shop ID (for debugging) */}
            <div
              className="px-4 py-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[9px] text-gray-600 font-mono break-all">
                ID: {shopId}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevModePanel;
