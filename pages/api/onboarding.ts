/**
 * POST /api/onboarding
 * ====================
 * Stores onboarding questionnaire answers.
 * Forwards to backend POST /api/shops/{shop_id}/onboarding when endpoint exists.
 * Falls back to local logging until then.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { shop_id, store_domain, answers } = req.body;

  if (!shop_id || !answers) {
    return res.status(400).json({ error: 'Missing shop_id or answers' });
  }

  // Log onboarding completion
  console.log('[onboarding]', { shop_id, store_domain, answers });

  // Try forwarding to backend (fire-and-forget if endpoint doesn't exist yet)
  try {
    const backendRes = await fetch(`${API_BASE}/api/shops/${shop_id}/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization ? { Authorization: req.headers.authorization as string } : {}),
      },
      body: JSON.stringify({ answers }),
    });

    if (backendRes.ok) {
      return res.status(200).json({ ok: true, forwarded: true });
    }
  } catch {
    // Backend endpoint doesn't exist yet — that's fine
  }

  return res.status(200).json({ ok: true, forwarded: false });
}
