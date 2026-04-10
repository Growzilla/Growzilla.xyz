/**
 * Social Integrations API Client
 *
 * Handles platform connections for Instagram, TikTok, YouTube, Meta Ads, Google Ads.
 * Endpoints: GET /api/social/connect/{platform}, GET /api/social/connections/{shop_id}
 */

const API_BASE = process.env.NEXT_PUBLIC_ECOMDASH_API_URL || process.env.ECOMDASH_API_URL || '';

function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('growzilla_token');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type PlatformId = 'instagram' | 'tiktok' | 'youtube' | 'meta_ads' | 'google_ads';

export interface PlatformInfo {
  id: PlatformId;
  name: string;
  description: string;
  category: 'social' | 'advertising';
  brandColor: string;
  configured: boolean;
  comingSoon?: boolean;
}

export interface PlatformConnection {
  id: string;
  platform: PlatformId;
  shopId: string;
  accountName?: string;
  connectedAt: string;
  status: 'active' | 'expired' | 'error';
}

export interface ConnectResponse {
  auth_url?: string;
  configured: boolean;
  message?: string;
}

// ─── API Functions ───────────────────────────────────────────────────────────

/**
 * Get available platforms and their configuration status.
 * Falls back to static platform list if API unavailable.
 */
export async function getPlatforms(): Promise<PlatformInfo[]> {
  try {
    const res = await fetch(`${API_BASE}/api/social/platforms`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      return data.platforms ?? data;
    }
  } catch {
    // API not available — fall back to static list
  }

  // Static fallback (matches inbox spec)
  return [
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Connect your Instagram to see post performance and build your social engine',
      category: 'social',
      brandColor: '#E4405F',
      configured: true,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Connect TikTok to track video performance and post automatically',
      category: 'social',
      brandColor: '#000000',
      configured: true,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Connect YouTube to measure video reach and track creator content performance',
      category: 'social',
      brandColor: '#FF0000',
      configured: true,
    },
    {
      id: 'meta_ads',
      name: 'Meta Ads',
      description: 'Connect Meta Ads to track ad spend and measure blended CAC across campaigns',
      category: 'advertising',
      brandColor: '#0866FF',
      configured: true,
    },
    {
      id: 'google_ads',
      name: 'Google Ads',
      description: 'Connect Google Ads to track ad spend and measure blended ROAS',
      category: 'advertising',
      brandColor: '#4285F4',
      configured: false,
      comingSoon: true,
    },
  ];
}

/**
 * Get active connections for a shop.
 */
export async function getConnections(shopId: string): Promise<PlatformConnection[]> {
  try {
    const res = await fetch(`${API_BASE}/api/social/connections/${encodeURIComponent(shopId)}`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      return data.connections ?? data;
    }
  } catch {
    // API not available
  }
  return [];
}

/**
 * Initiate OAuth connect flow for a platform.
 * Returns auth_url for redirect, or configured:false for coming-soon platforms.
 */
export async function initiateConnect(platform: PlatformId): Promise<ConnectResponse> {
  const res = await fetch(`${API_BASE}/api/social/connect/${platform}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Connection failed' }));
    throw new Error(error.message || `Failed to connect ${platform}`);
  }

  return res.json();
}

/**
 * Disconnect a platform connection.
 */
export async function disconnectPlatform(connectionId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/social/connections/${encodeURIComponent(connectionId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Disconnect failed' }));
    throw new Error(error.message || 'Failed to disconnect');
  }
}
