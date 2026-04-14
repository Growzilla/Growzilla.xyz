import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * /api/adcreator/* — catch-all proxy to the adcreator backend.
 *
 * Why a Next API proxy at all (vs hitting the backend from the browser)?
 *   1. Hides backend host from clients (no CORS dance, no env leak).
 *   2. Lets us inject headers (admin key, source attribution) server-side.
 *   3. SSE-aware: Next.js' default body parser would buffer event-stream
 *      responses and break live status; this handler manually pipes the
 *      stream byte-for-byte and flushes headers immediately.
 *
 * Backend env: ADCREATOR_API_URL (e.g. https://ecomdash-api.onrender.com).
 * Falls back to ECOMDASH_API_URL so we don't have to add a new Vercel env
 * before the dedicated service exists.
 */

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    // SSE responses must NOT be buffered — see the manual stream pipe below.
    responseLimit: false,
  },
}

const TIMEOUT_MS = 60_000 // long enough to cover Render cold-start

function backendBase(): string | null {
  const url = process.env.ADCREATOR_API_URL || process.env.ECOMDASH_API_URL
  if (!url) return null
  return url.replace(/\/$/, '')
}

function buildBackendUrl(path: string[] | string | undefined, query: NextApiRequest['query']): string | null {
  const base = backendBase()
  if (!base) return null
  const segments = Array.isArray(path) ? path : path ? [path] : []
  const cleanSegments = segments.filter((s) => typeof s === 'string' && s.length > 0)
  const pathStr = cleanSegments.join('/')
  // Strip out the catch-all `path` key — it's only the route param, not a real query.
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (key === 'path') continue
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else if (value != null) {
      params.append(key, value)
    }
  }
  const qs = params.toString()
  return `${base}/api/adcreator/${pathStr}${qs ? `?${qs}` : ''}`
}

function isSseRequest(req: NextApiRequest, path: string[] | string | undefined): boolean {
  // Backend convention: anything under /status/* is a Server-Sent Events stream.
  const segs = Array.isArray(path) ? path : path ? [path] : []
  if (segs[0] === 'status') return true
  const accept = (req.headers.accept || '').toString().toLowerCase()
  return accept.includes('text/event-stream')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const target = buildBackendUrl(req.query.path as string[] | undefined, req.query)
  if (!target) {
    res.status(503).json({
      error: 'Adcreator backend not configured',
      hint: 'Set ADCREATOR_API_URL (or ECOMDASH_API_URL) in Vercel env',
    })
    return
  }

  const sse = isSseRequest(req, req.query.path as string[] | undefined)

  // Forward only the headers we care about.
  const fwdHeaders: Record<string, string> = {}
  if (req.headers['content-type']) fwdHeaders['content-type'] = String(req.headers['content-type'])
  if (req.headers['accept']) fwdHeaders['accept'] = String(req.headers['accept'])
  if (req.headers['authorization']) fwdHeaders['authorization'] = String(req.headers['authorization'])
  if (process.env.ADMIN_API_KEY) fwdHeaders['x-admin-key'] = process.env.ADMIN_API_KEY

  // Build body. Don't send a body for GET/HEAD (some upstreams reject it).
  let body: BodyInit | undefined
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    if (req.body && typeof req.body === 'object') {
      body = JSON.stringify(req.body)
      fwdHeaders['content-type'] = fwdHeaders['content-type'] || 'application/json'
    } else if (typeof req.body === 'string') {
      body = req.body
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  // If the client disconnects mid-stream, abort the upstream fetch too.
  req.on('close', () => controller.abort())

  let upstream: Response
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers: fwdHeaders,
      body,
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeout)
    const aborted = err instanceof Error && err.name === 'AbortError'
    if (aborted && req.destroyed) {
      // Client disappeared — nothing to send.
      return
    }
    res.status(502).json({
      error: 'Upstream request failed',
      detail: err instanceof Error ? err.message : String(err),
    })
    return
  }

  // Mirror status + safe headers.
  res.status(upstream.status)
  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase()
    // Hop-by-hop or framing headers we should not blindly forward.
    if (lower === 'content-encoding' || lower === 'content-length' || lower === 'transfer-encoding' || lower === 'connection') {
      return
    }
    res.setHeader(key, value)
  })

  if (sse) {
    // Force SSE-friendly headers and disable any intermediary buffering.
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    if (typeof res.flushHeaders === 'function') res.flushHeaders()
  }

  if (!upstream.body) {
    clearTimeout(timeout)
    res.end()
    return
  }

  // Pipe the upstream body to the client byte-for-byte.
  const reader = upstream.body.getReader()
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      if (value) {
        res.write(Buffer.from(value))
      }
    }
  } catch (err) {
    // Common: client disconnected mid-stream. Don't crash the route.
    if (!(err instanceof Error && err.name === 'AbortError')) {
      console.error('[adcreator-proxy] stream error', err)
    }
  } finally {
    clearTimeout(timeout)
    try {
      reader.releaseLock()
    } catch {
      /* noop */
    }
    res.end()
  }
}
