import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * /api/lead-notify — generic "new lead" capture.
 *
 * On a valid lead it:
 *   1. Pings the operator on WhatsApp via CallMeBot (free, personal alert).
 *   2. Sends an email backup via Resend (reuses RESEND_API_KEY / EMAIL_FROM / EMAIL_TO).
 *
 * Both sends are best-effort: a down service is logged but never fails the
 * request, so the client always sees success and a lead is never lost.
 *
 * Honeypot field `website` must be empty (bots fill it).
 *
 * Env:
 *   CALLMEBOT_PHONE   — your number, country code, digits only, no '+'  (e.g. 46701234567)
 *   CALLMEBOT_APIKEY  — the apikey CallMeBot replied with after activation
 *   RESEND_API_KEY    — (optional) email backup
 */

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  store?: string;
  message?: string;
  website?: string; // honeypot
  source?: string;
  attribution?: Record<string, unknown>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const CALLMEBOT_ENDPOINT = 'https://api.callmebot.com/whatsapp.php';

const FROM_ADDRESS = process.env.EMAIL_FROM || 'Growzilla <hello@growzilla.xyz>';
const TO_ADDRESSES = (process.env.EMAIL_TO ||
  'albert.elmgart@gmail.com,albert@growzilla.xyz,hello@growzilla.xyz')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function clean(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/** Fire a WhatsApp message to the operator's own number via CallMeBot. */
async function sendWhatsApp(
  text: string,
): Promise<{ ok: boolean; status: number; error?: string }> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) {
    return { ok: false, status: 0, error: 'callmebot_not_configured' };
  }
  try {
    const url =
      `${CALLMEBOT_ENDPOINT}?phone=${encodeURIComponent(phone)}` +
      `&text=${encodeURIComponent(text)}` +
      `&apikey=${encodeURIComponent(apikey)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: body.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Email backup so a CallMeBot hiccup never loses the lead. */
async function sendResendBackup(
  apiKey: string,
  args: { subject: string; text: string; replyTo?: string },
): Promise<{ ok: boolean; status: number; error?: string }> {
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: TO_ADDRESSES,
        subject: args.subject,
        text: args.text,
        reply_to: args.replyTo,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: body.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Body;

  // Honeypot — bots fill this; real users never see it.
  if (clean(body.website) !== '') {
    return res.status(202).json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const store = clean(body.store);
  const message = clean(body.message);
  const source = clean(body.source) || 'lead_form';

  if (!name) {
    return res.status(400).json({ error: 'name_required' });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'email_invalid' });
  }

  console.info('[lead-notify]', { name, email, phone, store, source });

  // Build the WhatsApp text — short, scannable on a phone notification.
  const waText = [
    '🟢 New lead',
    name,
    email,
    phone || null,
    store || null,
    message ? `"${message}"` : null,
    `(${source})`,
  ]
    .filter(Boolean)
    .join('\n');

  const wa = await sendWhatsApp(waText);
  if (!wa.ok) {
    console.error('[lead-notify] whatsapp_failed', { status: wa.status, error: wa.error });
  }

  // Email backup (best-effort, only if configured).
  let emailed = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const subject = `[LEAD] ${name} · ${source}`;
    const text = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || '—'}`,
      `Store:   ${store || '—'}`,
      `Message: ${message || '—'}`,
      `Source:  ${source}`,
      '',
      '--- Attribution ---',
      JSON.stringify(body.attribution ?? {}, null, 2),
      '',
      `receivedAt: ${new Date().toISOString()}`,
    ].join('\n');
    const result = await sendResendBackup(apiKey, { subject, text, replyTo: email });
    emailed = result.ok;
    if (!result.ok) {
      console.error('[lead-notify] resend_failed', { status: result.status, error: result.error });
    }
  }

  return res.status(200).json({ ok: true, whatsapp: wa.ok, emailed });
}
