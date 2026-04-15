/**
 * /api/error-lookup — server-side proxy for /install-repair.
 *
 * Holds ADMIN_API_KEY so the client never sees it. Client passes ?id=ABC123
 * (6-char alphanumeric, validated). Proxy fetches the persisted envelope
 * from the backend's /api/_debug/errors/{id} and forwards the body.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §6.4
 *
 * SECURITY: process.env.ADMIN_API_KEY is referenced ONLY in this file.
 */

import type { NextApiRequest, NextApiResponse } from 'next'

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  process.env.ECOMDASH_API_URL ||
  'https://ecomdash-api.onrender.com'

const ID_RE = /^[A-Z0-9]{6}$/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: { id: null, code: 'method_not_allowed', message: 'GET only.' } })
  }

  const id = String(req.query.id || '').trim()
  if (!ID_RE.test(id)) {
    return res
      .status(400)
      .json({ error: { id: null, code: 'bad_id', message: 'Expected 6-char A-Z0-9 id.' } })
  }

  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) {
    // Fail gracefully so /install-repair still renders the generic copy.
    return res
      .status(503)
      .json({
        error: {
          id,
          code: 'lookup_unavailable',
          message: 'Error lookup is not configured.',
        },
      })
  }

  try {
    const upstream = await fetch(`${BACKEND_API_URL}/api/_debug/errors/${id}`, {
      method: 'GET',
      headers: { 'X-Admin-Key': adminKey, Accept: 'application/json' },
    })

    let body: unknown
    try {
      body = await upstream.json()
    } catch {
      body = {
        error: {
          id,
          code: `http_${upstream.status}`,
          message: `Upstream returned non-JSON (HTTP ${upstream.status}).`,
        },
      }
    }
    return res.status(upstream.status).json(body)
  } catch (err) {
    return res.status(502).json({
      error: {
        id,
        code: 'upstream_unreachable',
        message: err instanceof Error ? err.message : 'Backend unreachable.',
      },
    })
  }
}
