/**
 * ErrorCard — universal error surface with copy-JSON button.
 *
 * Closes invariant I5 on the client side. Every 4xx/5xx from the backend
 * arrives as { error: { id, code, message, file, line, ... } }. Operator
 * (or LLM) pastes the copied JSON into chat; `GET /api/_debug/errors/{id}`
 * returns the full persisted context.
 *
 * Matches spec: /dev/growzillaAssets/patterns/syncduringinstall.md §6.4
 *
 * Ownership note: created by fe-growth during Session 32 to unblock
 * /setup + /install-repair. Lives at the shared spec path so fe-ui can
 * extend (alternate styles, richer actions) without relocation.
 */

import { useState } from 'react'

export interface ErrorDetail {
  id: string | null
  code: string
  message: string
  file?: string | null
  line?: number | null
  shop_id?: string | null
  trace_id?: string | null
  path?: string | null
  method?: string | null
}

export interface ErrorEnvelope {
  error: ErrorDetail
}

export interface ErrorCardProps {
  envelope: ErrorEnvelope
  className?: string
}

export function ErrorCard({ envelope, className = '' }: ErrorCardProps) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const e = envelope?.error ?? {
    id: null,
    code: 'unknown',
    message: 'Unknown error (no envelope).',
  }
  const jsonString = JSON.stringify(envelope ?? { error: e }, null, 2)

  async function onCopy() {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(jsonString)
        setCopied(true)
        setCopyFailed(false)
        setTimeout(() => setCopied(false), 1800)
        return
      }
      throw new Error('clipboard unavailable')
    } catch {
      // Failure mode #13: Clipboard API blocked. Fall back to selectable text.
      setCopyFailed(true)
      setShowFallback(true)
    }
  }

  return (
    <div
      className={`rounded-lg p-4 text-sm ${className}`}
      role="alert"
      style={{
        background: 'rgba(244,114,114,0.06)',
        boxShadow: 'inset 0 0 0 1px rgba(244,114,114,0.30)',
        color: 'rgba(255,255,255,0.95)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <code
          className="font-mono text-[12px]"
          style={{ color: '#F87171', letterSpacing: '0.02em' }}
        >
          {e.id ? `${e.id} · ${e.code}` : e.code}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className="text-[11px] font-semibold underline-offset-2 hover:underline"
          style={{ color: 'rgba(244,114,114,0.95)' }}
        >
          {copied ? 'Copied ✓' : copyFailed ? 'Copy failed — select below' : 'Copy error'}
        </button>
      </div>
      <p className="mt-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.88)' }}>
        {e.message}
      </p>
      {(e.file || e.line != null) && (
        <p className="mt-1 text-[11px] tabular-nums" style={{ color: 'rgba(244,114,114,0.70)' }}>
          {e.file}
          {e.line != null ? `:${e.line}` : ''}
        </p>
      )}
      {showFallback && (
        <pre
          className="mt-3 p-2 rounded-md text-[11px] overflow-x-auto whitespace-pre-wrap select-all"
          style={{
            background: 'rgba(0,0,0,0.35)',
            color: 'rgba(255,255,255,0.80)',
            fontFamily: 'JetBrains Mono, SF Mono, Menlo, monospace',
          }}
        >
          {jsonString}
        </pre>
      )}
    </div>
  )
}
