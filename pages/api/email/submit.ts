import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/**
 * /api/email/submit — receives /email/quiz leads (partial after Step 2, final after Step 5)
 * and forwards via Resend to the operator inbox.
 *
 * Never throws to the client — submitLead.ts treats network failures as soft so the
 * user always sees their result screen.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const FROM_ADDRESS = process.env.EMAIL_FROM || 'Growzilla <hello@growzilla.xyz>';
const TO_ADDRESSES = (process.env.EMAIL_TO ||
  'albert.elmgart@gmail.com,albert@growzilla.xyz,hello@growzilla.xyz')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

type Kind = 'partial' | 'final';

function asKind(v: unknown): Kind {
  return v === 'partial' ? 'partial' : 'final';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(
  kind: Kind,
  id: string,
  payload: Record<string, unknown>,
): { subject: string; text: string; html: string } {
  const c = (payload.contact as Record<string, string> | undefined) ?? {};
  const route = (payload.route as string | undefined) ?? '—';
  const score = (payload.score as number | undefined) ?? 0;
  const floor = (payload.floorUsd as number | undefined) ?? 0;
  const brand = c.brand || '—';
  const name = c.name || '—';

  const tag =
    kind === 'partial'
      ? '[PARTIAL]'
      : route === 'good'
        ? '[GOOD ✓]'
        : route === 'maybe'
          ? '[MAYBE]'
          : '[BAD]';

  const subject = `${tag} /email lead · ${brand} (${name})`;

  const lines: string[] = [
    `id: ${id}`,
    `kind: ${kind}`,
    `route: ${route}`,
    `score: ${score}`,
    `floor (USD): $${floor.toLocaleString()}`,
    '',
    '--- Contact ---',
    `Name: ${c.name ?? '—'}`,
    `Brand: ${c.brand ?? '—'}`,
    `Email: ${c.email ?? '—'}`,
    `URL: ${c.url ?? '—'}`,
    `Phone: ${c.phone ?? '—'}`,
    '',
    '--- Quiz ---',
    `Growth strategy: ${payload.growthStrategy ?? '—'}`,
    `List size: ${payload.listSize ?? '—'}`,
    `AOV: ${payload.aov ?? '—'}`,
    `Temp: ${payload.temp ?? '—'}`,
    `Urgency: ${payload.urgency ?? '—'}`,
    '',
    '--- Notes ---',
    String(payload.notes || '—'),
    '',
    '--- Attribution ---',
    JSON.stringify(payload.attribution ?? {}, null, 2),
    '',
    `submittedAt: ${payload.submittedAt ?? '—'}`,
  ];
  const text = lines.join('\n');
  const html = `<pre style="font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;color:#0f172a;background:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(text)}</pre>`;

  return { subject, text, html };
}

async function sendResend(
  apiKey: string,
  args: { subject: string; text: string; html: string; replyTo?: string },
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
        html: args.html,
        reply_to: args.replyTo,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: body.slice(0, 500) };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
  const contact = (payload.contact && typeof payload.contact === 'object'
    ? (payload.contact as Record<string, string>)
    : {}) as Record<string, string>;
  const kind = asKind(payload.kind);

  if (!contact.email || !contact.brand || !contact.name) {
    return res.status(400).json({ error: 'Missing required contact fields' });
  }
  if (kind === 'final' && (!payload.route || typeof payload.score !== 'number')) {
    return res.status(400).json({ error: 'Missing route/score for final submit' });
  }

  const id = (typeof payload.id === 'string' && payload.id) || crypto.randomUUID();

  console.info('[email-lead]', {
    id,
    kind,
    route: payload.route,
    score: payload.score,
    floor: payload.floorUsd,
    contact,
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const { subject, text, html } = buildEmail(kind, id, { ...payload, id });
    const result = await sendResend(apiKey, { subject, text, html, replyTo: contact.email });
    if (!result.ok) {
      console.error('[email-lead] resend_failed', {
        id,
        kind,
        status: result.status,
        error: result.error,
      });
    }
    return res.status(200).json({ ok: true, id, emailed: result.ok });
  }

  console.warn('[email-lead] RESEND_API_KEY missing — lead logged only');
  return res.status(200).json({ ok: true, id, emailed: false });
}
