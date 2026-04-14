import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
  LiveTerminal,
  PhaseChecklist,
  type PhaseItem,
  type TerminalLine,
} from '@/components/adcreator'

/**
 * /adcreator/run/[jobId] — live processing view.
 *
 * Layout:
 *   ≥768px: 60/40 split (terminal | checklist)
 *   <768px: stacked (checklist on top, terminal below; independent scroll)
 *
 * Connection: EventSource → /api/adcreator/status/{jobId} (proxied to backend).
 * Backend frame conventions (defensive parser — tolerates either shape):
 *   {"type":"line","line":{id,text,level?,ts?}}
 *   {"type":"phase","items":PhaseItem[]}
 *   {"type":"meta","elapsedMs":N,"estimatedRemainingMs":N}
 *   {"type":"done","jobId":"..."}
 *   {"type":"error","message":"..."}
 *
 * Failure modes handled:
 *   1. EventSource native auto-reconnect (browser default).
 *   2. Manual full-reload after 5 reconnects to clear ghost state.
 *   3. `error` frame → clean panel + retry / book-call.
 *   4. Refresh mid-run → reconnects from current backend state.
 */

const DEFAULT_PHASES: PhaseItem[] = [
  { id: 'intake', label: 'Brand intake', status: 'pending' },
  { id: 'discover', label: 'Discover competitors', status: 'pending' },
  { id: 'scrape', label: 'Scrape Meta Ad Library', status: 'pending' },
  { id: 'tag', label: 'Tag ads (DeepSeek)', status: 'pending' },
  { id: 'briefs', label: 'Generate 5 briefs', status: 'pending' },
  { id: 'render', label: 'Render PDF', status: 'pending' },
]

type RunState = 'connecting' | 'streaming' | 'done' | 'error'

export default function AdcreatorRunPage() {
  const router = useRouter()
  const jobIdRaw = router.query.jobId
  const jobId = typeof jobIdRaw === 'string' ? jobIdRaw : Array.isArray(jobIdRaw) ? jobIdRaw[0] : ''

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [phases, setPhases] = useState<PhaseItem[]>(DEFAULT_PHASES)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [estimatedRemainingMs, setEstimatedRemainingMs] = useState(180_000) // 3 min default
  const [state, setState] = useState<RunState>('connecting')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const startedAtRef = useRef<number>(Date.now())
  const reconnectsRef = useRef(0)

  // Client-side ticking elapsed clock — backend `meta` frame can override.
  useEffect(() => {
    if (state === 'done' || state === 'error') return
    const t = setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current)
    }, 500)
    return () => clearInterval(t)
  }, [state])

  // EventSource connection — re-runs only when jobId becomes available.
  useEffect(() => {
    if (!jobId) return
    if (jobId === 'honeypot-bounced') {
      // Bot-bounce target; show a generic "we'll be in touch" view.
      setState('done')
      setLines([{ id: 'hb', text: '$ no-op', level: 'info' }])
      return
    }

    const url = `/api/adcreator/status/${encodeURIComponent(jobId)}`
    const es = new EventSource(url)
    setState('connecting')

    es.onopen = () => {
      setState('streaming')
    }

    es.onmessage = (ev) => {
      handleFrame(ev.data)
    }

    es.onerror = () => {
      reconnectsRef.current += 1
      if (reconnectsRef.current > 5) {
        es.close()
        setState('error')
        setErrorMsg('Lost connection to the report engine. Try again in a moment.')
      }
      // EventSource auto-reconnects until we close it.
    }

    function handleFrame(raw: string) {
      let frame: unknown
      try {
        frame = JSON.parse(raw)
      } catch {
        // Plain text line as a fallback — render it as info.
        setLines((prev) => [...prev, { id: lineId(), text: raw, level: 'info' }])
        return
      }
      if (!frame || typeof frame !== 'object') return
      const f = frame as Record<string, unknown>

      switch (f.type) {
        case 'line': {
          const line = f.line as Partial<TerminalLine> | undefined
          if (!line || typeof line.text !== 'string') return
          const newLine: TerminalLine = {
            id: typeof line.id === 'string' ? line.id : lineId(),
            text: line.text,
            level: line.level,
            ts: line.ts,
          }
          setLines((prev) => [...prev, newLine])
          return
        }
        case 'phase': {
          const items = Array.isArray(f.items) ? (f.items as PhaseItem[]) : null
          if (items) setPhases(items)
          return
        }
        case 'meta': {
          if (typeof f.elapsedMs === 'number') {
            setElapsedMs(f.elapsedMs)
            startedAtRef.current = Date.now() - f.elapsedMs
          }
          if (typeof f.estimatedRemainingMs === 'number') {
            setEstimatedRemainingMs(f.estimatedRemainingMs)
          }
          return
        }
        case 'done': {
          setState('done')
          es.close()
          // Brief fade — let the user see the last bit before redirect.
          setTimeout(() => {
            router.push(`/adcreator/report/${encodeURIComponent(jobId)}`)
          }, 800)
          return
        }
        case 'error': {
          setState('error')
          setErrorMsg(typeof f.message === 'string' ? f.message : 'The report engine returned an error.')
          es.close()
          return
        }
      }
    }

    return () => {
      es.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId])

  // If router hasn't provided jobId yet, render a skeleton (no connection attempt).
  if (!jobId) {
    return (
      <RunShell title="Loading…">
        <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Preparing your job…</div>
      </RunShell>
    )
  }

  if (state === 'error') {
    return (
      <RunShell title="Something went wrong">
        <ErrorPanel message={errorMsg ?? 'Unknown error.'} jobId={jobId} />
      </RunShell>
    )
  }

  return (
    <RunShell title="Building your report">
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <div className="order-2 md:order-1">
          <LiveTerminal lines={lines} height={420} />
        </div>
        <div className="order-1 md:order-2">
          <PhaseChecklist
            items={phases}
            elapsedMs={elapsedMs}
            estimatedRemainingMs={estimatedRemainingMs}
          />
          <p className="mt-3 text-[11px] text-center" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Refresh-safe — your job runs server-side.
          </p>
        </div>
      </div>

      {state === 'done' && (
        <p className="mt-6 text-center text-[13px]" style={{ color: 'rgba(0,255,148,0.85)' }}>
          Done — opening your report…
        </p>
      )}
    </RunShell>
  )
}

let lineCounter = 0
function lineId(): string {
  lineCounter += 1
  return `c-${lineCounter}-${Date.now().toString(36)}`
}

function RunShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>{title} · Adcreator | Growzilla</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main
        className="min-h-screen"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0,255,148,0.06) 0%, transparent 60%), #050608',
          color: 'rgba(255,255,255,0.95)',
          fontFamily: 'Inter, "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10">
          <header className="mb-6 flex items-center justify-between gap-3">
            <Link
              href="/adcreator"
              className="text-[12px] hover:underline underline-offset-2"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              ← Adcreator
            </Link>
            <h1 className="text-[14px] font-semibold tracking-wide uppercase" style={{ letterSpacing: '0.10em' }}>
              {title}
            </h1>
            <span className="w-12" />
          </header>
          {children}
        </div>
      </main>
    </>
  )
}

function ErrorPanel({ message, jobId }: { message: string; jobId: string }) {
  return (
    <div
      className="rounded-lg p-6 text-center"
      style={{
        background: 'rgba(244,114,114,0.05)',
        boxShadow: 'inset 0 0 0 1px rgba(244,114,114,0.25)',
      }}
    >
      <div className="text-[14px] font-semibold mb-1" style={{ color: '#F87171' }}>
        Report engine hit a snag
      </div>
      <p className="text-[13px] leading-relaxed mx-auto max-w-md" style={{ color: 'rgba(255,255,255,0.72)' }}>
        {message}
      </p>
      <p className="mt-1 text-[11px] tabular-nums" style={{ color: 'rgba(255,255,255,0.40)' }}>
        Job ID: {jobId}
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/adcreator"
          className="rounded-md px-4 py-2 text-[13px] font-semibold text-black"
          style={{ background: '#00FF94' }}
        >
          Try again
        </Link>
        <a
          href="https://calendly.com/growzilla?utm_source=adcreator&utm_medium=error_panel"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-4 py-2 text-[13px] font-semibold"
          style={{
            color: 'rgba(255,255,255,0.92)',
            background: 'rgba(255,255,255,0.04)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
          }}
        >
          Book a 15-min call
        </a>
      </div>
    </div>
  )
}
