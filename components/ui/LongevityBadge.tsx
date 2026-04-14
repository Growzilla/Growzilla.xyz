'use client'

/**
 * LongevityBadge — pill describing how long an ad has been running.
 * FRESH=blue, ACTIVE=teal, PROVEN=green, SCALING=gold.
 */

export type LongevityFlag = 'FRESH' | 'ACTIVE' | 'PROVEN' | 'SCALING'

export const LONGEVITY_PALETTE: Record<LongevityFlag, { bg: string; text: string; ring: string; label: string }> = {
  FRESH:   { bg: 'rgba(56,189,248,0.10)', text: '#38BDF8', ring: 'rgba(56,189,248,0.25)', label: 'FRESH' },
  ACTIVE:  { bg: 'rgba(45,212,191,0.10)', text: '#2DD4BF', ring: 'rgba(45,212,191,0.25)', label: 'ACTIVE' },
  PROVEN:  { bg: 'rgba(0,255,148,0.10)',  text: '#00FF94', ring: 'rgba(0,255,148,0.25)', label: 'PROVEN' },
  SCALING: { bg: 'rgba(251,191,36,0.10)', text: '#FBBF24', ring: 'rgba(251,191,36,0.25)', label: 'SCALING' },
}

export interface LongevityBadgeProps {
  flag: LongevityFlag
  days?: number
  size?: 'sm' | 'md'
  className?: string
}

export function LongevityBadge({ flag, days, size = 'sm', className = '' }: LongevityBadgeProps) {
  const palette = LONGEVITY_PALETTE[flag]
  const sizeClass = size === 'md' ? 'px-2.5 py-1 text-[12px]' : 'px-2 py-0.5 text-[11px]'
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded ${sizeClass} ${className}`}
      style={{
        background: palette.bg,
        color: palette.text,
        boxShadow: `inset 0 0 0 1px ${palette.ring}`,
        letterSpacing: '0.04em',
      }}
    >
      <span>{palette.label}</span>
      {typeof days === 'number' && (
        <span className="opacity-70 font-normal" style={{ letterSpacing: 0 }}>· {days}d</span>
      )}
    </span>
  )
}
