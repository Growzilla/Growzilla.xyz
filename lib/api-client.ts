/**
 * Growzilla API Client
 *
 * Typed client for the ecomdash-api backend.
 * Handles JWT auth for merchant sessions and admin-key auth for admin operations.
 *
 * Error contract (closes I5):
 *   - Every request sends `X-Request-Id` (uuid) so backend logs can be
 *     correlated to a single browser action.
 *   - On non-2xx, `apiFetch` parses the backend envelope and throws `ApiError`.
 *     The envelope shape is shared with `<ErrorCard>` so any caller can `catch`
 *     the error and render `<ErrorCard envelope={err.envelope} />` directly.
 *   - Network/CORS failures synthesize a `network` envelope so callers handle
 *     one error class.
 */

import type { ErrorEnvelope } from '@/components/ErrorCard.types';

export type { ErrorEnvelope } from '@/components/ErrorCard.types';

const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

// ---------------------------------------------------------------------------
// Token storage (client-side)
// ---------------------------------------------------------------------------

let _token: string | null = null;

export function setToken(token: string | null) {
  _token = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('gz_token', token);
    } else {
      localStorage.removeItem('gz_token');
    }
  }
}

export function getToken(): string | null {
  if (_token) return _token;
  if (typeof window !== 'undefined') {
    _token = localStorage.getItem('gz_token');
  }
  return _token;
}

// ---------------------------------------------------------------------------
// ApiError — wraps the backend envelope so callers can render <ErrorCard>
// ---------------------------------------------------------------------------

/**
 * Thrown by `apiFetch` on every non-2xx response and on network/CORS failure.
 * `envelope` matches the backend `{error: {id, code, message, ...}}` contract
 * (or a synthesized `network` envelope on fetch rejection).
 *
 * Use cases:
 *   try { ... } catch (e) {
 *     if (e instanceof ApiError) {
 *       if (e.isTransient()) retry();
 *       else render(<ErrorCard envelope={e.envelope} />);
 *     }
 *   }
 */
export class ApiError extends Error {
  envelope: ErrorEnvelope;
  status: number;

  constructor(envelope: ErrorEnvelope, status: number) {
    super(envelope.error.message || `API ${status}`);
    this.name = 'ApiError';
    this.envelope = envelope;
    this.status = status;
    // Preserve prototype across transpilation targets (ES5 emit safety)
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /** True for 5xx + network errors (safe to retry with backoff). */
  isTransient(): boolean {
    return this.status === 0 || this.status >= 500;
  }

  /** Short error id for support / `/api/_debug/errors/{id}` lookup. */
  getErrorId(): string | null {
    return this.envelope.error.id ?? null;
  }
}

// Type-guard for an envelope-shaped JSON body.
function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (!value || typeof value !== 'object') return false;
  const err = (value as { error?: unknown }).error;
  if (!err || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;
  return typeof e.code === 'string' && typeof e.message === 'string';
}

function makeRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for older runtimes (test envs, very old browsers).
  return 'gz-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ---------------------------------------------------------------------------
// Core fetch wrapper
// ---------------------------------------------------------------------------

interface FetchOpts {
  method?: string;
  body?: unknown;
  params?: Record<string, string>;
  adminKey?: string; // For admin operations
}

async function apiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { method = 'GET', body, params, adminKey } = opts;

  let url = `${API_BASE}${path}`;
  if (params) {
    url += '?' + new URLSearchParams(params).toString();
  }

  const requestId = makeRequestId();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Request-Id': requestId,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (adminKey) {
    headers['X-Admin-Key'] = adminKey;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    // Network / CORS / DNS failure — synthesize an envelope so callers
    // handle one error class.
    const message = e instanceof Error ? e.message : 'Network request failed';
    const envelope: ErrorEnvelope = {
      error: {
        id: null,
        code: 'network',
        message,
        path,
        method,
        trace_id: requestId,
      },
    };
    throw new ApiError(envelope, 0);
  }

  if (!res.ok) {
    // Try to parse the backend envelope; fall back to a synthetic one if the
    // body isn't JSON or doesn't match the contract.
    let envelope: ErrorEnvelope;
    try {
      const parsed: unknown = await res.json();
      envelope = isErrorEnvelope(parsed)
        ? parsed
        : {
            error: {
              id: null,
              code: `http_${res.status}`,
              message:
                (parsed && typeof parsed === 'object' && 'detail' in parsed
                  ? String((parsed as { detail: unknown }).detail)
                  : `API ${res.status}`),
              path,
              method,
              trace_id: requestId,
            },
          };
    } catch {
      const text = await res.text().catch(() => '');
      envelope = {
        error: {
          id: null,
          code: `http_${res.status}`,
          message: text || `API ${res.status}`,
          path,
          method,
          trace_id: requestId,
        },
      };
    }
    throw new ApiError(envelope, res.status);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string | null;
    role: string;
    org_id: string;
  };
  org: {
    id: string;
    name: string;
    slug: string;
    shop_domain: string;
  };
}

export interface DashboardStats {
  yesterday_revenue: number;
  week_avg_revenue: number;
  yesterday_orders: number;
  week_avg_orders: number;
  aov: number;
  revenue_delta: number;
  orders_delta: number;
}

export interface RevenueChartData {
  data: { date: string; revenue: number; orders: number; aov: number }[];
  total_revenue: number;
  total_orders: number;
}

export interface MetaConnectResponse {
  success: boolean;
  ad_account_id: string | null;
  ad_account_name: string | null;
  message: string;
}

export interface MetaFunnelResponse {
  impressions: number;
  clicks: number;
  landing_page_views: number;
  add_to_carts: number;
  purchases: number;
  revenue: number;
  spend: number;
  roas: number;
  by_campaign: CampaignFunnel[];
}

export interface CampaignFunnel {
  campaign_id: string;
  campaign_name: string;
  impressions: number;
  clicks: number;
  landing_page_views: number;
  add_to_carts: number;
  purchases: number;
  revenue: number;
  spend: number;
  roas: number;
}

export interface SankeyData {
  nodes: { id: string; label: string; value: number; column: number }[];
  links: { source: string; target: string; value: number }[];
}

export interface MetaCampaignResponse {
  campaign_id: string;
  campaign_name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roas: number;
  cpa: number;
  ctr: number;
}

export interface BootstrapOrgRequest {
  org_name: string;
  org_slug: string;
  owner_name: string;
  owner_email: string;
  owner_password: string;
  admin_key: string;
}

export interface BootstrapOrgResponse {
  org_id: string;
  org_slug: string;
  owner_id: string;
  owner_username: string;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function login(domain: string, password: string): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: { role: 'org_owner', identifier: domain, password },
  });
  setToken(data.token);
  return data;
}

export async function getMe(): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/api/auth/me');
}

export function logout() {
  setToken(null);
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export async function getDashboardStats(shopId: string): Promise<DashboardStats> {
  return apiFetch<DashboardStats>('/api/dashboard/stats', {
    params: { shop_id: shopId },
  });
}

export async function getRevenueChart(shopId: string, period = '30d'): Promise<RevenueChartData> {
  return apiFetch<RevenueChartData>('/api/dashboard/revenue-chart', {
    params: { shop_id: shopId, period },
  });
}

export async function getTopProducts(shopId: string, limit = 10) {
  return apiFetch<unknown[]>('/api/dashboard/top-products', {
    params: { shop_id: shopId, limit: String(limit) },
  });
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

export async function connectMeta(shopId: string, accessToken: string, adminKey?: string): Promise<MetaConnectResponse> {
  return apiFetch<MetaConnectResponse>('/api/meta/connect', {
    method: 'POST',
    body: { shop_id: shopId, access_token: accessToken },
    adminKey,
  });
}

export async function syncMeta(shopId: string, adminKey?: string): Promise<MetaFunnelResponse> {
  return apiFetch<MetaFunnelResponse>(`/api/meta/sync/${shopId}`, {
    method: 'POST',
    adminKey,
  });
}

export async function getMetaFunnel(shopId: string): Promise<SankeyData> {
  return apiFetch<SankeyData>(`/api/meta/funnel/${shopId}`);
}

export async function getMetaCampaigns(shopId: string): Promise<MetaCampaignResponse[]> {
  return apiFetch<MetaCampaignResponse[]>(`/api/meta/campaigns/${shopId}`);
}

// ---------------------------------------------------------------------------
// UTM / Creators
// ---------------------------------------------------------------------------

export async function getUTMLinks() {
  return apiFetch<unknown[]>('/api/utm/links');
}

export async function generateUTMLink(data: { platform: string; content_type: string; product_url?: string }) {
  return apiFetch<unknown>('/api/utm/generate', { method: 'POST', body: data });
}

export async function getCreators() {
  return apiFetch<unknown[]>('/api/orgs/creators');
}

export async function getOrgDashboard() {
  return apiFetch<unknown>('/api/orgs/dashboard');
}

// ---------------------------------------------------------------------------
// Insights
// ---------------------------------------------------------------------------

export async function getInsights(shopId: string) {
  return apiFetch<unknown>('/api/insights', { params: { shop_id: shopId } });
}

// ---------------------------------------------------------------------------
// Admin: Bootstrap (creates org + owner for a shop)
// ---------------------------------------------------------------------------

export async function bootstrapOrg(shopId: string, data: BootstrapOrgRequest): Promise<BootstrapOrgResponse> {
  return apiFetch<BootstrapOrgResponse>(`/api/shops/${shopId}/bootstrap-org`, {
    method: 'POST',
    body: data,
  });
}

export async function syncShop(shopId: string) {
  return apiFetch<unknown>(`/api/shops/${shopId}/sync`, { method: 'POST' });
}
