/**
 * install-client — install/setup-scoped fetch helper.
 *
 * Stand-in for the eventual fe-ui T3 api-client envelope upgrade. Until
 * `lib/api-client.ts` learns to throw `ApiError(envelope)`, this file
 * gives `pages/setup.tsx` and `pages/install-repair.tsx` exactly the
 * surface the spec assumes:
 *   - `apiPost(path, body)` -> JSON | throws ApiError(envelope)
 *   - `setJwt(token)` shared with api-client's localStorage key 'gz_token'
 *   - `ApiError extends Error` carrying the parsed `{error:{...}}` envelope
 *
 * NEVER touches lib/api-client.ts (read-only for fe-growth). When fe-ui
 * upgrades api-client, this file becomes a thin re-export.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §6.3, §7
 */

import type { ErrorEnvelope } from '@/components/ErrorCard'

const API_BASE =
  process.env.NEXT_PUBLIC_ECOMDASH_API_URL ||
  process.env.ECOMDASH_API_URL ||
  'https://ecomdash-api.onrender.com'

const TOKEN_KEY = 'gz_token'

let _jwt: string | null = null

export function setJwt(token: string | null) {
  _jwt = token
  if (typeof window !== 'undefined') {
    if (token) window.localStorage.setItem(TOKEN_KEY, token)
    else window.localStorage.removeItem(TOKEN_KEY)
  }
}

export function getJwt(): string | null {
  if (_jwt) return _jwt
  if (typeof window !== 'undefined') {
    _jwt = window.localStorage.getItem(TOKEN_KEY)
  }
  return _jwt
}

/**
 * Generates an X-Request-Id per call so backend can correlate logs to UI
 * errors when the operator pastes the envelope into chat.
 */
function nextRequestId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export class ApiError extends Error {
  envelope: ErrorEnvelope
  status: number
  constructor(envelope: ErrorEnvelope, status: number) {
    super(envelope?.error?.message || `API ${status}`)
    this.name = 'ApiError'
    this.envelope = envelope
    this.status = status
  }
}

interface RequestOpts {
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
}

async function request<T>(method: string, path: string, opts: RequestOpts = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Request-Id': nextRequestId(),
    ...(opts.headers ?? {}),
  }
  const jwt = getJwt()
  if (jwt) headers['Authorization'] = `Bearer ${jwt}`

  const url = path.startsWith('http') ? path : `${API_BASE}${path}`

  let res: Response
  try {
    res = await fetch(url, {
      method,
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
    })
  } catch (err) {
    // Network-level failure — backend unreachable, CORS, abort. Wrap as envelope.
    throw new ApiError(
      {
        error: {
          id: null,
          code: 'network_error',
          message: err instanceof Error ? err.message : 'Network error',
          path,
          method,
        },
      },
      0
    )
  }

  if (res.ok) {
    if (res.status === 204) return undefined as T
    return (await res.json()) as T
  }

  // Try to parse the spec envelope; tolerate non-JSON / minimal-shape responses.
  let envelope: ErrorEnvelope
  try {
    const body = (await res.json()) as ErrorEnvelope | { detail?: string; message?: string }
    if ((body as ErrorEnvelope)?.error?.code) {
      envelope = body as ErrorEnvelope
    } else {
      const detail =
        (body as { detail?: string; message?: string }).detail ??
        (body as { message?: string }).message ??
        `HTTP ${res.status}`
      envelope = {
        error: {
          id: null,
          code: `http_${res.status}`,
          message: typeof detail === 'string' ? detail : JSON.stringify(detail),
          path,
          method,
        },
      }
    }
  } catch {
    envelope = {
      error: {
        id: null,
        code: `http_${res.status}`,
        message: `HTTP ${res.status}`,
        path,
        method,
      },
    }
  }
  throw new ApiError(envelope, res.status)
}

export const api = {
  get: <T = unknown>(path: string, opts?: RequestOpts) => request<T>('GET', path, opts),
  post: <T = unknown>(path: string, body?: unknown, opts?: RequestOpts) =>
    request<T>('POST', path, { ...opts, body }),
  patch: <T = unknown>(path: string, body?: unknown, opts?: RequestOpts) =>
    request<T>('PATCH', path, { ...opts, body }),
  setJwt,
  getJwt,
}

export type { ErrorEnvelope } from '@/components/ErrorCard'
