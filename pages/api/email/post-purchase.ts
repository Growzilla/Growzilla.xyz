import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * /api/email/post-purchase — fired by /email/welcome on mount after a successful
 * Whop checkout redirect. Sends two emails:
 *   1. Operator notification ("paid lead landed, here's the next step")
 *   2. Buyer welcome (Klaviyo invite instructions + intake form + Calendly kickoff link)
 *
 * Trust model: this endpoint is callable by anyone. Worst case: an attacker spams
 * extra welcome emails to addresses they own. Bounded risk (Resend rate-limit + cost).
 * v2: replace with a Whop webhook verified by HMAC signature — see /api/whop/email-paid.ts.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FROM_ADDRESS = process.env.EMAIL_FROM || 'Growzilla <hello@growzilla.xyz>';
const OPERATOR_TO = (process.env.EMAIL_TO ||
  'albert.elmgart@gmail.com,albert@growzilla.xyz,hello@growzilla.xyz')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const CALENDLY_URL =
  process.env.EMAIL_CALENDLY_URL || 'https://calendly.com/albert-elmgart/ecommerce-ai-systems-review';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function send(
  apiKey: string,
  args: { to: string[]; subject: string; html: string; text: string; replyTo?: string },
): Promise<boolean> {
  try {
    const r = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text,
        reply_to: args.replyTo,
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const brand = typeof body.brand === 'string' ? body.brand.trim() : '';
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';

  if (!email) {
    return res.status(400).json({ error: 'Missing buyer email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[post-purchase] RESEND_API_KEY missing');
    return res.status(200).json({ ok: true, emailed: false });
  }

  const safeName = escapeHtml(name || 'there');
  const safeBrand = escapeHtml(brand || 'your brand');

  const buyerHtml = `<!doctype html>
<html><body style="margin:0;padding:0;background:#0A0A0B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#fff;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:0.25em;color:#00FF94;margin-bottom:24px;">◆ WELCOME · NEXT 3 STEPS</div>
  <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px 0;font-weight:600;">${safeName} — payment cleared. The sprint starts now.</h1>
  <p style="font-size:15px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0 0 32px 0;">
    Thanks for trusting us with ${safeBrand}'s reactivation. Here's exactly what happens next.
  </p>

  <h2 style="font-size:18px;margin:0 0 8px 0;font-weight:600;">1. Book your 20-min kickoff call</h2>
  <p style="font-size:14px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0 0 12px 0;">
    Pick a slot in the next 48 hours. We walk through your list, your offer, and lock the sending schedule.
  </p>
  <div style="margin:0 0 28px 0;">
    <a href="${escapeHtml(CALENDLY_URL)}" style="display:inline-block;background:#00FF94;color:#0A0A0B;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;">Book the kickoff →</a>
  </div>

  <h2 style="font-size:18px;margin:0 0 8px 0;font-weight:600;">2. Grant Klaviyo Admin access</h2>
  <p style="font-size:14px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0 0 12px 0;">
    Inside Klaviyo: <em>Account → Settings → Users → Invite User</em>. Email: <code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;">albert@growzilla.xyz</code>, role: Admin. Takes 60 seconds.
  </p>

  <h2 style="font-size:18px;margin:0 0 8px 0;font-weight:600;">3. Reply to this email with your sending schedule</h2>
  <p style="font-size:14px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0 0 32px 0;">
    Days/times we can ship from, blackout dates if any, and your typical offer (discount, bundle, restock, etc).
  </p>

  <div style="background:rgba(0,255,148,0.04);border:1px solid rgba(0,255,148,0.3);border-radius:12px;padding:20px;margin:0 0 32px 0;">
    <div style="font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:0.2em;color:#00FF94;margin-bottom:8px;">◆ TIMELINE</div>
    <p style="font-size:13px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0;">
      <strong style="color:#fff;">Day 1</strong> audit + segmentation · <strong style="color:#fff;">Day 8</strong> first send goes live · <strong style="color:#fff;">Day 30</strong> attribution report + 10% invoiced.
    </p>
  </div>

  <hr style="border:0;border-top:1px solid rgba(255,255,255,0.06);margin:32px 0;">
  <p style="font-size:12px;color:rgba(255,255,255,0.48);margin:0;">
    Order reference: <code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;">${escapeHtml(sessionId || 'n/a')}</code>
  </p>
  <p style="font-size:12px;color:rgba(255,255,255,0.48);margin:16px 0 0 0;">
    — Albert<br><a href="mailto:hello@growzilla.xyz" style="color:rgba(255,255,255,0.64);">hello@growzilla.xyz</a>
  </p>
</div>
</body></html>`;

  const buyerText = `${name || 'there'} — payment cleared. The sprint starts now.

Thanks for trusting us with ${brand || 'your brand'}'s reactivation. Three steps:

1. Book your 20-min kickoff call (next 48h): ${CALENDLY_URL}
2. Grant Klaviyo Admin access: Account → Settings → Users → Invite User → albert@growzilla.xyz, role: Admin.
3. Reply with your sending schedule + blackout dates + typical offer.

Timeline: Day 1 audit, Day 8 first send live, Day 30 attribution report + 10% invoiced.

Order reference: ${sessionId || 'n/a'}

— Albert
hello@growzilla.xyz
`;

  const opHtml = `<pre style="font:13px/1.5 ui-monospace,Menlo,monospace;color:#0f172a;background:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(
    `[PAID] /email sprint sold — $500 cleared

Buyer: ${name || '—'} (${email})
Brand: ${brand || '—'}
Whop session: ${sessionId || 'n/a'}

Next: Calendly invite already in their inbox. Klaviyo Admin grant instructions sent. They've been told to reply with sending schedule.

Decrement EMAIL_SLOTS_REMAINING by 1 in Vercel env when convenient.`,
  )}</pre>`;

  const [buyerOk, opOk] = await Promise.all([
    send(apiKey, {
      to: [email],
      subject: `Welcome to the sprint, ${name || ''}`.trim() + ' — 3 next steps inside',
      html: buyerHtml,
      text: buyerText,
      replyTo: 'albert@growzilla.xyz',
    }),
    send(apiKey, {
      to: OPERATOR_TO,
      subject: `[PAID] /email sprint sold — ${brand || email}`,
      html: opHtml,
      text: `Paid: ${email}, brand ${brand || '—'}, session ${sessionId || 'n/a'}`,
      replyTo: email,
    }),
  ]);

  console.info('[post-purchase]', { email, brand, sessionId, buyerOk, opOk });

  return res.status(200).json({ ok: true, buyerEmailed: buyerOk, operatorNotified: opOk });
}
