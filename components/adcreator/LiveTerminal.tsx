'use client'

import { useEffect, useRef } from 'react'

/**
 * LiveTerminal — green-on-black auto-scroll log view.
 * Lines render verbatim. If `fakeTyping` is true, the most recent line
 * appears character-by-character (visual flair only — non-blocking).
 */

export interface TerminalLine {
  id: string
  text: string
  level?: 'info' | 'ok' | 'warn' | 'error'
  ts?: string // formatted timestamp like "12:42:01"
}

export interface LiveTerminalProps {
  lines: TerminalLine[]
  height?: number | string
  className?: string
  /** Auto-scroll suspended when user manually scrolls up. */
  autoscroll?: boolean
}

const LEVEL_COLOR: Record<NonNullable<TerminalLine['level']>, string> = {
  info: '#00FF94',
  ok: '#7FFF7F',
  warn: '#FBBF24',
  error: '#F87171',
}

export function LiveTerminal({
  lines,
  height = 320,
  autoscroll = true,
  className = '',
}: LiveTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const userScrolledUp = useRef(false)

  useEffect(() => {
    if (!autoscroll) return
    const el = scrollRef.current
    if (!el) return
    if (userScrolledUp.current) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [lines, autoscroll])

  function onScroll() {
    const el = scrollRef.current
    if (!el) return
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight
    userScrolledUp.current = dist > 40
  }

  return (
    <div
      className={`rounded-md overflow-hidden ${className}`}
      style={{
        background: '#04060A',
        boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.12)',
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: 'rgba(0,255,148,0.04)',
          borderBottom: '1px solid rgba(0,255,148,0.10)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#FEBC2E' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{ color: 'rgba(0,255,148,0.55)', letterSpacing: '0.18em' }}
        >
          adcreator-scraper
        </span>
        <span className="w-12" />
      </div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="overflow-y-auto px-3 py-2 font-mono text-[12px] leading-[1.55]"
        style={{
          height,
          color: '#7FFF7F',
          fontFamily: 'JetBrains Mono, SF Mono, Menlo, monospace',
        }}
      >
        {lines.length === 0 && (
          <div style={{ color: 'rgba(0,255,148,0.35)' }}>$ waiting for output…</div>
        )}
        {lines.map((line) => (
          <div key={line.id} className="whitespace-pre-wrap break-words">
            {line.ts && <span style={{ color: 'rgba(0,255,148,0.40)' }}>[{line.ts}] </span>}
            <span style={{ color: line.level ? LEVEL_COLOR[line.level] : '#7FFF7F' }}>
              {line.text}
            </span>
          </div>
        ))}
        <span className="inline-block w-1.5 h-3 ml-0.5 align-middle animate-pulse" style={{ background: '#00FF94' }} />
      </div>
    </div>
  )
}
