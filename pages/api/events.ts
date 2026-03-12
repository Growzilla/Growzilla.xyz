/**
 * POST /api/events
 * ================
 * Receives analytics events from the frontend event tracker.
 * Currently logs to console. Will forward to PostHog or backend when configured.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, session_id, shop_id, timestamp, ...properties } = req.body;

  if (!event) {
    return res.status(400).json({ error: 'Missing event name' });
  }

  // Log for now — wire to PostHog or backend analytics later
  console.log('[event]', {
    event,
    session_id,
    shop_id,
    timestamp,
    ...properties,
  });

  return res.status(200).json({ ok: true });
}
