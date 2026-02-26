const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://ecomdash-api.onrender.com';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('gz_token');
}

function setToken(token: string) {
  localStorage.setItem('gz_token', token);
}

function clearToken() {
  localStorage.removeItem('gz_token');
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearToken();
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `API error ${res.status}`);
  }
  return res.json();
}

// Auth
export async function login(role: 'org_owner' | 'creator', identifier: string, password: string) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ role, identifier, password }),
  });
  setToken(data.token);
  return data; // { token, user, org }
}

export async function getMe() {
  return apiFetch('/api/auth/me');
}

export function logout() {
  clearToken();
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// UTM Links
export async function generateUTMLink(platform: string, contentType: string, productUrl?: string) {
  return apiFetch('/api/utm/generate', {
    method: 'POST',
    body: JSON.stringify({ platform, content_type: contentType, product_url: productUrl || null }),
  });
}

export async function updateLinkPostUrl(linkId: string, contentPostUrl: string) {
  return apiFetch(`/api/utm/links/${linkId}`, {
    method: 'PATCH',
    body: JSON.stringify({ content_post_url: contentPostUrl }),
  });
}

export async function getLinks() {
  return apiFetch('/api/utm/links');
}

export async function getLinkStats(linkId: string) {
  return apiFetch(`/api/utm/links/${linkId}/stats`);
}

// Org
export async function getOrgDashboard() {
  return apiFetch('/api/orgs/dashboard');
}

export async function inviteCreator(username: string, name: string, password: string) {
  return apiFetch('/api/orgs/invite', {
    method: 'POST',
    body: JSON.stringify({ username, name, password }),
  });
}

export async function getCreators() {
  return apiFetch('/api/orgs/creators');
}

export { getToken, setToken, clearToken };
