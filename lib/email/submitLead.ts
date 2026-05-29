import type { EmailLeadPayload, EmailQuizData } from './types';

/**
 * Submit an email-reactivation lead. Returns { ok: false } on failure rather than
 * throwing — a network blip must never prevent the user from seeing their result.
 *
 * 'partial' fires after Step 2 (contact) so we capture the lead even on bail.
 * 'final' fires after Step 5 with score + route + floorUsd.
 */
export async function submitLead(
  payload: EmailLeadPayload | (EmailQuizData & { kind: 'partial'; id?: string }),
): Promise<{ ok: boolean; id?: string }> {
  try {
    const res = await fetch('/api/email/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch {
    return { ok: false };
  }
}
