import type { MorsdagLeadPayload, MorsdagQuizData } from './types';

/**
 * Submit a Morsdag lead. Returns { ok: false } on failure rather than throwing —
 * a network blip should NEVER prevent the user from seeing their result screen.
 *
 * Two kinds: 'partial' fires after Step 1 validates (so we capture the contact even
 * if the user bails mid-quiz); 'final' fires after Step 9 with score + route.
 */
export async function submitLead(
  payload: MorsdagLeadPayload | (MorsdagQuizData & { kind: 'partial'; id?: string }),
): Promise<{ ok: boolean; id?: string }> {
  try {
    const res = await fetch('/api/morsdag/submit', {
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
