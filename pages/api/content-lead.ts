import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * /api/content-lead — Content Studio (/content) lead capture.
 *
 * On a valid lead it fires three best-effort notifications in parallel:
 *   1. WhatsApp ping to the operator via CallMeBot (instant phone alert).
 *   2. Email to the operator via Resend (durable backup; reuses EMAIL_TO inboxes).
 *   3. Drop into Hermes's CRM via an HTTP endpoint (HERMES_DROP_URL), using the
 *      exact crm.py `bulk` contacts JSON shape so Hermes can update Albert.
 *
 * All three are best-effort: a down service is logged but never fails the
 * request, so the client always sees success and a lead is never lost.
 *
 * Reuses the SAME env vars as /api/lead-notify so it inherits whatever is
 * already configured in Vercel — no new wiring needed for email/WhatsApp.
 *
 * Honeypot field `nickname` must be empty (bots fill it).
 *
 * Env:
 *   CALLMEBOT_PHONE   — operator number, country code, digits only, no '+'
 *   CALLMEBOT_APIKEY  — CallMeBot apikey
 *   RESEND_API_KEY    — email backup (transactional notification to your own inboxes)
 *   EMAIL_FROM        — defaults to "Growzilla <hello@growzilla.xyz>"
 *   EMAIL_TO          — comma list, defaults to albert's inboxes
 *   HERMES_DROP_URL   — (optional) Hermes HTTP ingest endpoint; if unset, drop is skipped
 *   HERMES_DROP_TOKEN — (optional) bearer token for the Hermes endpoint
 */

type Body = {
  name?: string;
  email?: string;
  brand?: string; // brand name or website
  message?: string;
  nickname?: string; // honeypot
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

/** Treat the brand field as a domain if it has no spaces and contains a dot. */
function asDomain(brand: string): string {
  const b = brand
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');
  return !b.includes(' ') && b.includes('.') ? b : '';
}

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

async function sendResend(
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

/** Best-effort drop into Hermes's CRM. Shape matches crm.py `bulk` contacts schema. */
async function dropToHermes(args: {
  name: string;
  email: string;
  brand: string;
  message: string;
  source: string;
}): Promise<{ ok: boolean; skipped?: boolean; status?: number; error?: string }> {
  const url = process.env.HERMES_DROP_URL;
  if (!url) return { ok: false, skipped: true };

  const [first, ...rest] = args.name.split(/\s+/);
  const payload = {
    contacts: [
      {
        email: args.email,
        first_name: first || args.name,
        last_name: rest.join(' '),
        brand_name: args.brand,
        brand_domain: asDomain(args.brand),
        tags: 'content-studio,inbound,content-sprint',
        meta: {
          message: args.message,
          source: args.source,
          received_at: new Date().toISOString(),
        },
      },
    ],
    notes: args.message
      ? [{ email: args.email, content: `Content lead: ${args.message}` }]
      : [],
  };

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (process.env.HERMES_DROP_TOKEN) {
      headers.Authorization = `Bearer ${process.env.HERMES_DROP_TOKEN}`;
    }
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: body.slice(0, 300) };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Body;

  // Honeypot — bots fill this; real users never see it.
  if (clean(body.nickname) !== '') {
    return res.status(202).json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const brand = clean(body.brand);
  const message = clean(body.message);
  const source = clean(body.source) || 'content_studio';

  if (!name) {
    return res.status(400).json({ error: 'name_required' });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'email_invalid' });
  }

  console.info('[content-lead]', { name, email, brand, source });

  const waText = [
    '🎬 New Content Studio lead',
    name,
    email,
    brand || null,
    message ? `"${message}"` : null,
    `(${source})`,
  ]
    .filter(Boolean)
    .join('\n');

  const emailText = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Brand:   ${brand || '—'}`,
    `Message: ${message || '—'}`,
    `Source:  ${source}`,
    '',
    '--- Attribution ---',
    JSON.stringify(body.attribution ?? {}, null, 2),
    '',
    `receivedAt: ${new Date().toISOString()}`,
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;

  // Fire all three in parallel — none of them can break the request.
  const [wa, mail, hermes] = await Promise.all([
    sendWhatsApp(waText),
    apiKey
      ? sendResend(apiKey, {
          subject: `[CONTENT LEAD] ${name}${brand ? ` · ${brand}` : ''}`,
          text: emailText,
          replyTo: email,
        })
      : Promise.resolve({ ok: false, status: 0, error: 'resend_not_configured' as string }),
    dropToHermes({ name, email, brand, message, source }),
  ]);

  if (!wa.ok && wa.error !== 'callmebot_not_configured') {
    console.error('[content-lead] whatsapp_failed', { status: wa.status, error: wa.error });
  }
  if (!mail.ok && mail.error !== 'resend_not_configured') {
    console.error('[content-lead] resend_failed', { status: mail.status, error: mail.error });
  }
  if (!hermes.ok && !hermes.skipped) {
    console.error('[content-lead] hermes_drop_failed', { status: hermes.status, error: hermes.error });
  }

  return res.status(200).json({
    ok: true,
    whatsapp: wa.ok,
    emailed: mail.ok,
    hermes: hermes.ok,
  });
}
