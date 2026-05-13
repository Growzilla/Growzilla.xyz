import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body ?? {};
  const contact = (payload && typeof payload === 'object' && payload.contact) || {};

  if (
    !contact.email ||
    !contact.foretag ||
    !contact.namn ||
    !payload.route ||
    typeof payload.score !== 'number'
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = crypto.randomUUID();

  // Visible in Vercel logs for triage while the webhook side is wired.
  console.info('[morsdag-lead]', { id, ...payload });

  // TODO: wire to Resend / Slack webhook / Notion / Airtable here

  return res.status(200).json({ ok: true, id });
}
