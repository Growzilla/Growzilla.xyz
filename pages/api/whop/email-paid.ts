import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * /api/whop/email-paid — Whop webhook handler (v2 hardening, currently STUB).
 *
 * v1 ships with /api/email/post-purchase triggered from /email/welcome on mount,
 * which is good enough for the cold-traffic volume we expect at founding-rate.
 *
 * v2 wiring (when needed):
 *   1. Configure Whop webhook endpoint: https://growzilla.xyz/api/whop/email-paid
 *   2. Whop signs payloads with HMAC SHA-256, header: `Whop-Signature: sha256=<hex>`
 *   3. Verify with crypto.timingSafeEqual against process.env.WHOP_WEBHOOK_SECRET
 *   4. On valid `membership.created` or `payment.succeeded` with product_id =
 *      EMAIL_WHOP_PRODUCT_ID, fire the same post-purchase emails as v1 + decrement
 *      EMAIL_SLOTS_REMAINING in Vercel KV.
 *
 * This stub returns 200 so Whop won't disable the endpoint if it's configured early.
 * It does NOT yet send emails or persist anything — that lives in /api/email/post-purchase.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.info('[whop-webhook:stub] received event', {
    headers: { signature: req.headers['whop-signature'] ? 'present' : 'absent' },
    body_keys: req.body && typeof req.body === 'object' ? Object.keys(req.body) : null,
  });

  return res.status(200).json({ ok: true, stub: true });
}
