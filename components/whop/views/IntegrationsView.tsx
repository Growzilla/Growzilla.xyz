'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  getPlatforms,
  getConnections,
  initiateConnect,
  disconnectPlatform,
  type PlatformInfo,
  type PlatformConnection,
  type PlatformId,
} from '@/lib/api/social';

// ─── Platform Icons (inline SVG) ────────────────────────────────────────────

const PlatformIcon: React.FC<{ platform: PlatformId; color: string }> = ({ platform, color }) => {
  const iconClass = 'w-6 h-6';

  switch (platform) {
    case 'instagram':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
          <circle cx="18" cy="6" r="1.5" fill={color} />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 3 4.5 6 4.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="4" stroke={color} strokeWidth="1.5" />
          <path d="M10 9l5 3-5 3V9z" fill={color} />
        </svg>
      );
    case 'meta_ads':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
          <path d="M8 15c0-3 1.5-6 4-6s4 3 4 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'google_ads':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M5 19l7-14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 5l7 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="5" cy="19" r="2" fill={color} />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        </svg>
      );
  }
};

// ─── Platform Connection Card (inline — swap for fe-ui PlatformConnectionCard later) ─

interface PlatformCardProps {
  platform: PlatformInfo;
  connection?: PlatformConnection;
  onConnect: (platformId: PlatformId) => void;
  onDisconnect: (connectionId: string) => void;
  connecting: PlatformId | null;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  connection,
  onConnect,
  onDisconnect,
  connecting,
}) => {
  const isConnected = !!connection && connection.status === 'active';
  const isComingSoon = platform.comingSoon || !platform.configured;
  const isConnecting = connecting === platform.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="rounded-lg p-5"
      style={{
        backgroundColor: '#151518',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon container with brand color tint */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${platform.brandColor}15` }}
          >
            <PlatformIcon platform={platform.id} color={platform.brandColor} />
          </div>
          <div>
            <h3
              className="text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.95)' }}
            >
              {platform.name}
            </h3>
            {isConnected && connection?.accountName && (
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.48)' }}>
                {connection.accountName}
              </p>
            )}
          </div>
        </div>

        {/* Status / Action */}
        <div className="flex items-center">
          {isComingSoon ? (
            <span
              className="text-xs italic"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Coming soon
            </span>
          ) : isConnected ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#00FF94' }}>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#00FF94' }}
                />
                Connected
              </span>
              <button
                onClick={() => onDisconnect(connection!.id)}
                className="text-xs px-2 py-1 rounded transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => onConnect(platform.id)}
              disabled={isConnecting}
              className="text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-150 disabled:opacity-50"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                if (!isConnecting) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.95)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.72)';
              }}
            >
              {isConnecting ? (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="7" />
                  </svg>
                  Connecting…
                </span>
              ) : (
                'Connect'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className="text-xs mt-3 leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.48)' }}
      >
        {platform.description}
      </p>

      {/* Connected since */}
      {isConnected && connection?.connectedAt && (
        <p
          className="text-xs mt-2"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          Connected {new Date(connection.connectedAt).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
};

// ─── Integrations View ───────────────────────────────────────────────────────

interface IntegrationsViewProps {
  shopId?: string;
}

const IntegrationsView: React.FC<IntegrationsViewProps> = ({ shopId }) => {
  const [platforms, setPlatforms] = useState<PlatformInfo[]>([]);
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [connecting, setConnecting] = useState<PlatformId | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Check for ?connected= callback param
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('connected');
    if (connected) {
      setToast({ message: `${connected} connected successfully!`, type: 'success' });
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('connected');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [platformList, connectionList] = await Promise.all([
        getPlatforms(),
        shopId ? getConnections(shopId) : Promise.resolve([]),
      ]);

      // Mark platforms as comingSoon if backend says not configured
      const enriched = platformList.map((p) => ({
        ...p,
        comingSoon: p.comingSoon || !p.configured,
      }));

      setPlatforms(enriched);
      setConnections(connectionList);
    } catch {
      // Fail silently — static fallback already in getPlatforms
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleConnect = async (platformId: PlatformId) => {
    setConnecting(platformId);
    try {
      const response = await initiateConnect(platformId);

      if (response.auth_url) {
        // Redirect to OAuth
        window.location.href = response.auth_url;
        return;
      }

      if (!response.configured) {
        // Platform not configured — show inline message
        const platform = platforms.find((p) => p.id === platformId);
        setToast({
          message: `${platform?.name || platformId} integration coming soon`,
          type: 'error',
        });
      }
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Connection failed',
        type: 'error',
      });
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      await disconnectPlatform(connectionId);
      setConnections((prev) => prev.filter((c) => c.id !== connectionId));
      setToast({ message: 'Disconnected successfully', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Disconnect failed',
        type: 'error',
      });
    }
  };

  const getConnectionForPlatform = (platformId: PlatformId) =>
    connections.find((c) => c.platform === platformId && c.status === 'active');

  const socialPlatforms = platforms.filter((p) => p.category === 'social');
  const advertisingPlatforms = platforms.filter((p) => p.category === 'advertising');

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {[1, 2].map((section) => (
          <div key={section}>
            <div className="h-3 w-32 rounded mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((card) => (
                <div
                  key={card}
                  className="rounded-lg p-5 h-28"
                  style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium"
          style={{
            backgroundColor: toast.type === 'success' ? 'rgba(0,255,148,0.1)' : 'rgba(255,51,102,0.1)',
            color: toast.type === 'success' ? '#00FF94' : '#FF3366',
            border: `1px solid ${toast.type === 'success' ? 'rgba(0,255,148,0.2)' : 'rgba(255,51,102,0.2)'}`,
          }}
        >
          {toast.type === 'success' ? (
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {toast.message}
        </motion.div>
      )}

      {/* Social Platforms */}
      {socialPlatforms.length > 0 && (
        <section>
          <h2
            className="text-sm font-medium uppercase tracking-wider mb-4"
            style={{ color: 'rgba(255,255,255,0.48)' }}
          >
            Social Platforms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialPlatforms.map((platform, i) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: i * 0.05, ease: 'easeOut' }}
              >
                <PlatformCard
                  platform={platform}
                  connection={getConnectionForPlatform(platform.id)}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  connecting={connecting}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Advertising */}
      {advertisingPlatforms.length > 0 && (
        <section>
          <h2
            className="text-sm font-medium uppercase tracking-wider mb-4"
            style={{ color: 'rgba(255,255,255,0.48)' }}
          >
            Advertising
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advertisingPlatforms.map((platform, i) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: (socialPlatforms.length + i) * 0.05, ease: 'easeOut' }}
              >
                <PlatformCard
                  platform={platform}
                  connection={getConnectionForPlatform(platform.id)}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  connecting={connecting}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default IntegrationsView;
