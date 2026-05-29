import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * /api/email/lead-magnet — fires the personalized "Dormant Revenue Audit" report
 * to the lead's inbox.
 *
 * v1: report is rendered as rich HTML in the email body itself — buyer's inbox is
 * the report viewer. No PDF download, no Downloads/ folder, no "where did that
 * file go" friction. CTAs are clickable.
 *
 * v2 (when needed): swap to puppeteer-core + @sparticuz/chromium-min to attach
 * a printable PDF in addition to the HTML body. Function size +~50MB on Vercel.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FROM_ADDRESS = process.env.EMAIL_FROM || 'Growzilla <hello@growzilla.xyz>';
const CALENDLY_URL =
  process.env.EMAIL_CALENDLY_URL || 'https://calendly.com/albert-elmgart/ecommerce-ai-systems-review';
const WHATSAPP_NUMBER = process.env.EMAIL_WHATSAPP_NUMBER || '46725597280';

type Temp = 'warm' | 'cool' | 'cold';

const TEMP_RATES: Record<Temp, { low: number; mid: number; high: number; label: string }> = {
  warm: { low: 0.06, mid: 0.1, high: 0.15, label: 'Warm (30–90 days quiet)' },
  cool: { low: 0.03, mid: 0.05, high: 0.08, label: 'Cool (90–180 days quiet)' },
  cold: { low: 0.01, mid: 0.02, high: 0.04, label: 'Cold (180+ days quiet)' },
};

function fmtUsd(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildReportHtml(args: {
  name: string;
  brand: string;
  listSize: number;
  aov: number;
  temp: Temp;
}): { subject: string; html: string; text: string } {
  const { name, brand, listSize, aov, temp } = args;
  const rates = TEMP_RATES[temp];

  const floor = listSize * rates.low * aov;
  const mid = listSize * rates.mid * aov;
  const high = listSize * rates.high * aov;
  const yourShare = mid * 0.9;
  const ourFee = mid * 0.1;

  const safeName = escapeHtml(name);
  const safeBrand = escapeHtml(brand);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Albert — I just got the dormant revenue audit for ${brand}. My floor is around ${fmtUsd(floor)}. Wanted to chat before I commit.`,
  )}`;

  const subject = `Your dormant revenue audit, ${name} — ${fmtUsd(floor)} floor`;

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#0A0A0B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#fff;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:0.25em;color:#00FF94;margin-bottom:24px;">◆ DORMANT REVENUE AUDIT</div>
  <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px 0;font-weight:600;">${safeName}, here's the floor on ${safeBrand}.</h1>
  <p style="font-size:15px;line-height:1.6;color:rgba(255,255,255,0.72);margin:0 0 32px 0;">
    Based on what you plugged in — ${listSize.toLocaleString()} dormant subscribers, ${fmtUsd(aov)} AOV, ${rates.label.toLowerCase()} — here's what your list is sitting on, anchored to Klaviyo's 2025 benchmark report.
  </p>

  <div style="background:#151518;border:1px solid rgba(0,255,148,0.3);border-radius:12px;padding:24px;margin:0 0 32px 0;">
    <div style="font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:0.2em;color:rgba(255,255,255,0.48);margin-bottom:8px;">YOUR 30-DAY FLOOR</div>
    <div style="font-size:40px;font-weight:600;color:#00FF94;line-height:1;margin-bottom:8px;">${fmtUsd(floor)}</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.64);margin-bottom:16px;">Realistic mid-case: <strong style="color:#fff;">${fmtUsd(mid)}</strong> · Upside: ${fmtUsd(high)}</div>
    <div style="display:table;width:100%;border-collapse:collapse;">
      <div style="display:table-row;">
        <div style="display:table-cell;padding:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:8px 0 0 8px;width:50%;">
          <div style="font:10px/1 ui-monospace,Menlo,monospace;letter-spacing:0.2em;color:rgba(255,255,255,0.48);margin-bottom:4px;">YOU KEEP (90%)</div>
          <div style="font-size:20px;font-weight:600;">${fmtUsd(yourShare)}</div>
        </div>
        <div style="display:table-cell;padding:12px;background:rgba(0,255,148,0.04);border:1px solid rgba(0,255,148,0.3);border-radius:0 8px 8px 0;width:50%;">
          <div style="font:10px/1 ui-monospace,Menlo,monospace;letter-spacing:0.2em;color:rgba(255,255,255,0.48);margin-bottom:4px;">GROWZILLA FEE (10%)</div>
          <div style="font-size:20px;font-weight:600;color:#00FF94;">${fmtUsd(ourFee)}</div>
        </div>
      </div>
    </div>
  </div>

  <h2 style="font-size:18px;line-height:1.3;margin:0 0 12px 0;font-weight:600;">5 deliverability checks you can run in 10 minutes</h2>
  <ol style="font-size:14px;line-height:1.7;color:rgba(255,255,255,0.72);padding-left:20px;margin:0 0 32px 0;">
    <li>Run <a href="https://www.mail-tester.com" style="color:#00FF94;">mail-tester.com</a> on a fresh Klaviyo send — anything below 8/10 is leaving revenue on the table.</li>
    <li>Check SPF, DKIM, DMARC alignment in your Klaviyo Account → Email deliverability tab. Misalignment = inbox-tab spam.</li>
    <li>Pull your last 30 days of campaign open rates. Under 18% on a Mature send = sender reputation is hurting.</li>
    <li>Audit your suppression list — anything bouncing 3+ times in the last 90 days should be hard-suppressed, not soft.</li>
    <li>Look at your complaint rate. Above 0.10% over a rolling 7-day window and Gmail will start throttling you.</li>
  </ol>

  <h2 style="font-size:18px;line-height:1.3;margin:0 0 12px 0;font-weight:600;">What you'd get if we ran the sprint</h2>
  <ul style="font-size:14px;line-height:1.7;color:rgba(255,255,255,0.72);padding-left:20px;margin:0 0 32px 0;">
    <li>Klaviyo deliverability audit — SPF/DKIM/DMARC, sender warm-up, list hygiene</li>
    <li>Dormant list segmented into 4 tiers (VIP / CORE / LOW / LEADS)</li>
    <li>5–13 emails written tier-asymmetric — VIPs get a personal founder note, cold leads get a re-acquisition offer</li>
    <li>Full Klaviyo flow + segment wiring, ready to ship</li>
    <li>Day-2 and Day-7 deliverability health gates before the bigger cohorts launch</li>
    <li>Day-30 attribution report with screenshots + clean handover. You keep every asset.</li>
  </ul>

  <div style="background:rgba(0,255,148,0.04);border:1px solid rgba(0,255,148,0.3);border-radius:12px;padding:20px;margin:0 0 32px 0;">
    <div style="font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:0.2em;color:#00FF94;margin-bottom:8px;">◆ THE FLOOR GUARANTEE</div>
    <p style="font-size:14px;line-height:1.6;color:rgba(255,255,255,0.85);margin:0;">
      $500 setup. 10% of recovered revenue. If 30 days end and Klaviyo-attributed revenue from our sequences hasn't hit your floor of <strong style="color:#00FF94;">${fmtUsd(floor)}</strong>, we don't disappear. We keep building — new offers, new sequences, new sends — until it does. No new invoice. We finish the job.
    </p>
  </div>

  <div style="text-align:center;margin:32px 0;">
    <a href="https://growzilla.xyz/email/buy" style="display:inline-block;background:#00FF94;color:#0A0A0B;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;">Lock my slot — $500 →</a>
  </div>

  <div style="text-align:center;margin:24px 0;font-size:13px;color:rgba(255,255,255,0.64);">
    or <a href="${escapeHtml(CALENDLY_URL)}" style="color:#00FF94;">book a 15-min call</a> · <a href="${escapeHtml(whatsappLink)}" style="color:#00FF94;">message Albert on WhatsApp</a>
  </div>

  <hr style="border:0;border-top:1px solid rgba(255,255,255,0.06);margin:32px 0;">
  <p style="font-size:12px;line-height:1.6;color:rgba(255,255,255,0.48);margin:0;">
    Math: list × Klaviyo's 2025 lower-bound reactivation rate × your AOV. We quote the floor, not the ceiling — real results are usually higher. The 10% fee bills only against revenue Klaviyo attributes to our sequences during the 30-day window, net of your prior 30-day baseline.
  </p>
  <p style="font-size:12px;color:rgba(255,255,255,0.48);margin:16px 0 0 0;">
    — Albert<br><a href="mailto:hello@growzilla.xyz" style="color:rgba(255,255,255,0.64);">hello@growzilla.xyz</a> · growzilla.xyz
  </p>
</div>
</body></html>`;

  const text = `${name}, here's the floor on ${brand}.

Based on ${listSize.toLocaleString()} dormant subscribers, ${fmtUsd(aov)} AOV, ${rates.label.toLowerCase()}:

YOUR 30-DAY FLOOR: ${fmtUsd(floor)}
Mid-case: ${fmtUsd(mid)} · Upside: ${fmtUsd(high)}
You keep (90%): ${fmtUsd(yourShare)} · Our fee (10%): ${fmtUsd(ourFee)}

5 deliverability checks you can run in 10 minutes:
1. mail-tester.com on a fresh Klaviyo send — under 8/10 = leaving revenue on the table
2. Verify SPF/DKIM/DMARC alignment in Klaviyo
3. Last 30 days open rate under 18% = sender reputation hurt
4. Audit suppression list — bounces 3+ in 90 days should be hard
5. Complaint rate above 0.10% = Gmail throttling

The Floor Guarantee: $500 setup. 10% of recovered revenue. If 30 days end and Klaviyo-attributed revenue from our sequences hasn't hit ${fmtUsd(floor)}, we keep building until it does. No new invoice.

Lock a slot: https://growzilla.xyz/email/buy
Book a call: ${CALENDLY_URL}
WhatsApp: ${whatsappLink}

— Albert
hello@growzilla.xyz
`;

  return { subject, html, text };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
  const contact = (body.contact && typeof body.contact === 'object'
    ? (body.contact as Record<string, string>)
    : {}) as Record<string, string>;
  const listSize = typeof body.listSize === 'number' ? body.listSize : 0;
  const aov = typeof body.aov === 'number' ? body.aov : 0;
  const temp: Temp = (body.temp === 'warm' || body.temp === 'cold' ? body.temp : 'cool') as Temp;

  if (!contact.email || !contact.brand || !contact.name) {
    return res.status(400).json({ error: 'Missing required contact fields' });
  }
  if (listSize <= 0 || aov <= 0) {
    return res.status(400).json({ error: 'Missing list size or AOV' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[lead-magnet] RESEND_API_KEY missing — skipping send');
    return res.status(200).json({ ok: true, emailed: false });
  }

  const report = buildReportHtml({
    name: contact.name,
    brand: contact.brand,
    listSize,
    aov,
    temp,
  });

  try {
    const r = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [contact.email],
        subject: report.subject,
        html: report.html,
        text: report.text,
        reply_to: 'albert@growzilla.xyz',
      }),
    });
    if (!r.ok) {
      const errBody = await r.text().catch(() => '');
      console.error('[lead-magnet] resend_failed', { status: r.status, error: errBody.slice(0, 500) });
      return res.status(200).json({ ok: true, emailed: false });
    }
    return res.status(200).json({ ok: true, emailed: true });
  } catch (e) {
    console.error('[lead-magnet] send_error', e instanceof Error ? e.message : String(e));
    return res.status(200).json({ ok: true, emailed: false });
  }
}
