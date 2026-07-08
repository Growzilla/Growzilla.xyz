const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const CALLMEBOT_ENDPOINT = 'https://api.callmebot.com/whatsapp.php';

const FROM_ADDRESS = process.env.EMAIL_FROM || 'Growzilla <hello@growzilla.xyz>';
const TO_ADDRESSES = (process.env.EMAIL_TO ||
  'albert.elmgart@gmail.com,albert@growzilla.xyz,hello@growzilla.xyz')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export { EMAIL_RE };

export async function sendWhatsApp(
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

export async function sendResendEmail(args: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: boolean; status: number; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 0, error: 'resend_not_configured' };
  }
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