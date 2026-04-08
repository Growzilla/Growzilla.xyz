/**
 * Proxy endpoint for admin database browser.
 * Forwards requests to ecomdash-api /api/admin/data/* endpoints.
 *
 * GET /api/admin/database?tab=overview|shops|orders|products|users|organizations|events|onboarding
 *     &skip=0&limit=50&search=&shop_id=&event_name=&id=
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';

const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

function getAdminKey(): string {
  // Admin key = first 16 chars of backend SECRET_KEY
  // We store it as BACKEND_ADMIN_KEY in Vercel env, or derive from SECRET_KEY
  const key = process.env.BACKEND_ADMIN_KEY || process.env.ADMIN_API_KEY || process.env.ADMIN_PASSWORD;
  if (!key) {
    throw new Error('BACKEND_ADMIN_KEY or ADMIN_PASSWORD env var is required');
  }
  return key;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  const { tab = 'overview', skip, limit, search, shop_id, event_name, id } = req.query;

  let path = '/api/admin/data';
  const params = new URLSearchParams();

  switch (tab) {
    case 'overview':
      path += '/overview';
      break;
    case 'shops':
      if (id) {
        path += `/shops/${id}`;
      } else {
        path += '/shops';
        if (skip) params.set('skip', String(skip));
        if (limit) params.set('limit', String(limit));
        if (search) params.set('search', String(search));
      }
      break;
    case 'orders':
      path += '/orders';
      if (skip) params.set('skip', String(skip));
      if (limit) params.set('limit', String(limit));
      if (search) params.set('search', String(search));
      if (shop_id) params.set('shop_id', String(shop_id));
      break;
    case 'products':
      path += '/products';
      if (skip) params.set('skip', String(skip));
      if (limit) params.set('limit', String(limit));
      if (search) params.set('search', String(search));
      if (shop_id) params.set('shop_id', String(shop_id));
      break;
    case 'users':
      path += '/users';
      if (skip) params.set('skip', String(skip));
      if (limit) params.set('limit', String(limit));
      break;
    case 'organizations':
      path += '/organizations';
      if (skip) params.set('skip', String(skip));
      if (limit) params.set('limit', String(limit));
      break;
    case 'events':
      path += '/events';
      if (skip) params.set('skip', String(skip));
      if (limit) params.set('limit', String(limit));
      if (event_name) params.set('event_name', String(event_name));
      break;
    case 'onboarding':
      path += '/onboarding';
      if (skip) params.set('skip', String(skip));
      if (limit) params.set('limit', String(limit));
      break;
    default:
      return res.status(400).json({ error: `Unknown tab: ${tab}` });
  }

  const qs = params.toString();
  const url = `${API_BASE}${path}${qs ? `?${qs}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Admin-Key': getAdminKey(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => 'Unknown error');
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    return res.json({ data });
  } catch (err) {
    return res.status(502).json({ error: `Backend error: ${(err as Error).message}` });
  }
}
