import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Agency landing-page lead magnet capture.
 * Captures: domain (any TLD — NOT .myshopify.com required), name, email, revenue band.
 * Honeypot field `website` must be empty.
 *
 * Forwards to backend leads endpoint when ECOMDASH_API_URL is set.
 * Falls back to a 202-accepted log so the form never breaks during dev.
 */

type Body = {
  domain?: string
  name?: string
  email?: string
  revenueBand?: string
  website?: string // honeypot
  source?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = (req.body || {}) as Body

  // Honeypot — bots fill this; real users don't see it.
  if (body.website && body.website.trim() !== '') {
    return res.status(202).json({ ok: true })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const domain = normalizeDomain(body.domain || '')
  const revenueBand = (body.revenueBand || '').trim()

  if (!name || name.length < 1) {
    return res.status(400).json({ error: 'name_required' })
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'email_invalid' })
  }
  if (!domain || !domain.includes('.')) {
    return res.status(400).json({ error: 'domain_invalid' })
  }

  const payload = {
    name,
    email,
    domain,
    revenue_band: revenueBand,
    source: body.source || 'agency_lead_magnet',
    received_at: new Date().toISOString(),
  }

  const upstream =
    process.env.ECOMDASH_API_URL ||
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_ECOMDASH_API_URL

  if (upstream) {
    try {
      const r = await fetch(`${upstream.replace(/\/$/, '')}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      // Pass-through 4xx as 400 (validation), swallow 5xx (don't break form)
      if (r.status >= 400 && r.status < 500) {
        return res.status(400).json({ error: 'upstream_rejected' })
      }
    } catch {
      // Network error — log and accept anyway so the lead isn't lost client-side
      console.error('[agency-lead] upstream unreachable, payload:', payload)
    }
  } else {
    console.log('[agency-lead] no upstream configured, payload:', payload)
  }

  return res.status(202).json({ ok: true })
}
