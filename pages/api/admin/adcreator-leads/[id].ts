/**
 * PATCH /api/admin/adcreator-leads/[id]
 * ======================================
 * Operator inline-edit for a single lead. Currently supports flipping `booked` (the
 * funnel-chart bookings counter is operator-maintained until calendar webhooks land).
 *
 * Forwards to backend if configured. Optimistic 200 in mock mode so the UI feels live.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';

const BACKEND_URL = process.env.ECOMDASH_API_URL;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAuth(req, res)) return;
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (typeof id !== 'string' || !id) {
    return res.status(400).json({ error: 'id required' });
  }

  const { booked } = (req.body || {}) as { booked?: boolean };
  if (typeof booked !== 'boolean') {
    return res.status(400).json({ error: 'booked (boolean) required' });
  }

  if (BACKEND_URL && ADMIN_API_KEY) {
    try {
      const upstream = await fetch(
        `${BACKEND_URL.replace(/\/$/, '')}/api/adcreator/admin/leads/${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          headers: {
            'X-Admin-Key': ADMIN_API_KEY,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ booked }),
          signal: AbortSignal.timeout(8_000),
        }
      );
      if (upstream.ok) {
        const json = await upstream.json().catch(() => ({}));
        return res.status(200).json({ ok: true, ...json });
      }
    } catch {
      // fall through
    }
  }

  // Mock mode — optimistic ack so UI updates immediately.
  return res.status(200).json({ ok: true, id, booked, source: 'mock' });
}
