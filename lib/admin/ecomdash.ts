const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

function getApiKey(): string {
  const key = process.env.RENDER_API_KEY;
  if (!key) throw new Error('RENDER_API_KEY env var is required');
  return key;
}

interface FetchOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string>;
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, params } = options;

  let url = `${API_BASE}${path}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers: Record<string, string> = {
    'X-API-Key': getApiKey(),
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error');
    throw new Error(`EcomDash API ${res.status}: ${text}`);
  }

  return res.json();
}

// === Shop Endpoints ===

export async function getShop(domain: string) {
  return apiFetch<Record<string, unknown>>(`/api/shops/${encodeURIComponent(domain)}`);
}

export async function syncShop(shopId: string) {
  return apiFetch<Record<string, unknown>>(`/api/shops/${encodeURIComponent(shopId)}/sync`, {
    method: 'POST',
  });
}

// === Dashboard Endpoints ===

export async function getDashboardStats(shopId: string) {
  return apiFetch<Record<string, unknown>>('/api/dashboard/stats', {
    params: { shop_id: shopId },
  });
}

export async function getRevenueChart(shopId: string, period = '30d') {
  return apiFetch<Record<string, unknown>>('/api/dashboard/revenue-chart', {
    params: { shop_id: shopId, period },
  });
}

export async function getTopProducts(shopId: string) {
  return apiFetch<Record<string, unknown>>('/api/dashboard/top-products', {
    params: { shop_id: shopId },
  });
}

export async function getDashboardSummary(shopId: string) {
  return apiFetch<Record<string, unknown>>('/api/dashboard/summary', {
    params: { shop_id: shopId },
  });
}

// === Insight Endpoints ===

export async function getInsights(shopId: string) {
  return apiFetch<Record<string, unknown>>('/api/insights', {
    params: { shop_id: shopId },
  });
}

export async function getInsightStats(shopId: string) {
  return apiFetch<Record<string, unknown>>(`/api/insights/stats/${encodeURIComponent(shopId)}`);
}

export async function dismissInsight(insightId: string) {
  return apiFetch<Record<string, unknown>>(`/api/insights/${encodeURIComponent(insightId)}/dismiss`, {
    method: 'POST',
  });
}

export async function actionInsight(insightId: string) {
  return apiFetch<Record<string, unknown>>(`/api/insights/${encodeURIComponent(insightId)}/action`, {
    method: 'POST',
  });
}
