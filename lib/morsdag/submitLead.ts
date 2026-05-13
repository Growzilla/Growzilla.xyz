import type { MorsdagLeadPayload } from './types';

/**
 * Submit a Morsdag lead. Returns { ok: false } on failure rather than throwing —
 * a network blip should NEVER prevent the user from seeing their result screen.
 */
export async function submitLead(payload: MorsdagLeadPayload): Promise<{ ok: boolean }> {
  try {
    const res = await fetch('/api/morsdag/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
