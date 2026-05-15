import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/**
 * /api/morsdag/submit — receives quiz leads (partial after Step 1, final after Step 9)
 * and forwards to Resend so they hit albert.elmgart@gmail.com + albert@growzilla.xyz.
 *
 * Never throws to the client — submitLead.ts treats network failures as soft so the user
 * always sees their result screen.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
// Sender + recipients are env-configurable so the operator can flip to a verified
// Resend domain (e.g. brief@weeklybrief.xyz) without redeploying. Defaults match
// the operator's chosen identity (albert@growzilla.xyz) — but Resend will 403
// until that domain is verified at https://resend.com/domains.
const FROM_ADDRESS = process.env.MORSDAG_FROM || 'Morsdag Launch <albert@growzilla.xyz>';
const TO_ADDRESSES = (process.env.MORSDAG_TO || 'albert.elmgart@gmail.com,albert@growzilla.xyz')
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
  const foretag = c.foretag || '—';
  const namn = c.namn || '—';

  const tag =
    kind === 'partial'
      ? '[PARTIAL]'
      : route === 'good'
        ? '[GOOD ✓]'
        : route === 'maybe'
          ? '[MAYBE]'
          : '[BAD]';

  const subject = `${tag} Morsdag lead · ${foretag} (${namn})`;

  const lines: string[] = [
    `id: ${id}`,
    `kind: ${kind}`,
    `route: ${route}`,
    `score: ${score}`,
    '',
    '--- Contact ---',
    `Namn: ${c.namn ?? '—'}`,
    `Företag: ${c.foretag ?? '—'}`,
    `Email: ${c.email ?? '—'}`,
    `Telefon: ${c.telefon ?? '—'}`,
    `URL: ${c.url ?? '—'}`,
    '',
    '--- Quiz ---',
    `Platform: ${payload.platform ?? '—'}`,
    `Revenue: ${payload.revenue ?? '—'}`,
    `ProductFit: ${payload.productFit ?? '—'}`,
    `Fulfillment: ${payload.fulfillment ?? '—'}`,
    `Budget: ${payload.budget ?? '—'}`,
    `AdBudget: ${payload.adBudget ?? '—'}`,
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

  // Contact email/foretag/namn always required. For 'final' we also require route + score.
  if (!contact.email || !contact.foretag || !contact.namn) {
    return res.status(400).json({ error: 'Missing required contact fields' });
  }
  if (kind === 'final' && (!payload.route || typeof payload.score !== 'number')) {
    return res.status(400).json({ error: 'Missing route/score for final submit' });
  }

  const id = (typeof payload.id === 'string' && payload.id) || crypto.randomUUID();

  console.info('[morsdag-lead]', { id, kind, route: payload.route, score: payload.score, contact });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const { subject, text, html } = buildEmail(kind, id, { ...payload, id });
    const result = await sendResend(apiKey, { subject, text, html, replyTo: contact.email });
    if (!result.ok) {
      console.error('[morsdag-lead] resend_failed', {
        id,
        kind,
        status: result.status,
        error: result.error,
      });
    }
    return res.status(200).json({ ok: true, id, emailed: result.ok });
  }

  console.warn('[morsdag-lead] RESEND_API_KEY missing — lead logged only');
  return res.status(200).json({ ok: true, id, emailed: false });
}
