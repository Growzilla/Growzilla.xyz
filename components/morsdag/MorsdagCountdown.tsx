'use client'

/**
 * MorsdagCountdown — countdown to Mors dag 2026 (31 maj 00:00 CEST).
 *
 * Renders 4 tabular-num cells: dagar / timmar / minuter / sekunder.
 * Single setInterval(1000). Hydration-safe: gated on a `mounted` flag so
 * SSR ships placeholder zeros and the live tick takes over post-hydration.
 *
 * `compact` shrinks cell sizing for inline use in FinalCTA.
 */

import { useEffect, useState } from 'react'

const TARGET_ISO = '2026-05-31T00:00:00+02:00'
const TARGET_MS = new Date(TARGET_ISO).getTime()

type Parts = { days: number; hours: number; minutes: number; seconds: number }

function diff(now: number): Parts {
  const delta = Math.max(0, TARGET_MS - now)
  const days = Math.floor(delta / 86_400_000)
  const hours = Math.floor((delta % 86_400_000) / 3_600_000)
  const minutes = Math.floor((delta % 3_600_000) / 60_000)
  const seconds = Math.floor((delta % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

const LABELS: Array<keyof Parts> = ['days', 'hours', 'minutes', 'seconds']
const LABEL_TEXT: Record<keyof Parts, string> = {
  days: 'Dagar',
  hours: 'Timmar',
  minutes: 'Minuter',
  seconds: 'Sekunder',
}

export default function MorsdagCountdown({
  compact = false,
}: {
  compact?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const [parts, setParts] = useState<Parts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setMounted(true)
    const tick = () => setParts(diff(Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const expired =
    mounted &&
    parts.days === 0 &&
    parts.hours === 0 &&
    parts.minutes === 0 &&
    parts.seconds === 0 &&
    Date.now() >= TARGET_MS

  if (expired) {
    return (
      <div
        className={`font-display ${
          compact ? 'text-xl' : 'text-3xl sm:text-4xl'
        } text-morsdag-ivory`}
      >
        Mors dag är här
      </div>
    )
  }

  const cellNumber = compact
    ? 'font-display text-2xl sm:text-3xl text-morsdag-ivory tabular-nums leading-none'
    : 'font-display text-4xl sm:text-5xl text-morsdag-ivory tabular-nums leading-none'
  const cellLabel = compact
    ? 'text-[9px] uppercase tracking-[0.2em] text-white/45 mt-1'
    : 'text-[10px] uppercase tracking-[0.2em] text-white/50 mt-2'
  const cellWrap = compact
    ? 'min-w-[64px] sm:min-w-[72px] px-3 py-3 rounded-md border border-morsdag-rose/15 bg-morsdag-ink/30'
    : 'min-w-[88px] sm:min-w-[112px] px-4 py-4 sm:px-5 sm:py-5 rounded-lg border border-morsdag-rose/20 bg-morsdag-ink/30'

  return (
    <div
      className={`flex gap-2 sm:gap-3 ${compact ? 'justify-center' : ''}`}
      aria-label="Tid kvar till Mors dag"
      role="timer"
    >
      {LABELS.map((key) => (
        <div key={key} className={`flex flex-col items-center ${cellWrap}`}>
          <span className={cellNumber}>
            {String(parts[key]).padStart(2, '0')}
          </span>
          <span className={cellLabel}>{LABEL_TEXT[key]}</span>
        </div>
      ))}
    </div>
  )
}
