'use client'

/**
 * StatusBadge — generic status pill with 5 variants.
 *
 * Variants:
 *   fresh    — cyan/sky    (new, just-started)
 *   active   — teal        (in-progress, running)
 *   proven   — brand green (validated, scaling-ready)
 *   scaling  — gold        (winner, scaling up)
 *   custom   — caller provides { label, color }
 *
 * Successor to LongevityBadge. LongevityBadge.tsx is kept as a re-export shim
 * so existing consumers (AdCard, CompetitorCard) don't change.
 *
 * Dashboard-clean mode: subtle tinted bg + inset ring + colored text. No glow.
 */

export type StatusVariant = 'fresh' | 'active' | 'proven' | 'scaling' | 'custom'

type Palette = { bg: string; text: string; ring: string; label: string }

export const STATUS_PALETTE: Record<Exclude<StatusVariant, 'custom'>, Palette> = {
  fresh:   { bg: 'rgba(56,189,248,0.10)', text: '#38BDF8', ring: 'rgba(56,189,248,0.25)', label: 'FRESH' },
  active:  { bg: 'rgba(45,212,191,0.10)', text: '#2DD4BF', ring: 'rgba(45,212,191,0.25)', label: 'ACTIVE' },
  proven:  { bg: 'rgba(0,255,148,0.10)',  text: '#00FF94', ring: 'rgba(0,255,148,0.25)', label: 'PROVEN' },
  scaling: { bg: 'rgba(251,191,36,0.10)', text: '#FBBF24', ring: 'rgba(251,191,36,0.25)', label: 'SCALING' },
}

export interface StatusBadgeProps {
  variant: StatusVariant
  /** Override the default variant label. For `custom`, this is required. */
  label?: string
  /** Optional numeric suffix (e.g. days, runs). Rendered as "· Nd" for days, or plain. */
  days?: number
  /** Free-form suffix after the label (e.g. "48 runs"). Takes precedence over `days`. */
  suffix?: string
  /** Required for `custom`; ignored otherwise. Hex or rgba. */
  color?: string
  size?: 'sm' | 'md'
  className?: string
}

function hexToRgba(hex: string, alpha: number): string {
  // Accept #RGB, #RRGGBB, or pass-through rgba()/rgb()
  if (hex.startsWith('rgb')) return hex
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function StatusBadge({
  variant,
  label,
  days,
  suffix,
  color,
  size = 'sm',
  className = '',
}: StatusBadgeProps) {
  let palette: Palette
  if (variant === 'custom') {
    const c = color ?? 'rgba(255,255,255,0.72)'
    palette = {
      bg: hexToRgba(c, 0.10),
      text: c,
      ring: hexToRgba(c, 0.25),
      label: label ?? '—',
    }
  } else {
    const p = STATUS_PALETTE[variant]
    palette = { ...p, label: label ?? p.label }
  }

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
      {suffix ? (
        <span className="opacity-70 font-normal" style={{ letterSpacing: 0 }}>· {suffix}</span>
      ) : typeof days === 'number' ? (
        <span className="opacity-70 font-normal" style={{ letterSpacing: 0 }}>· {days}d</span>
      ) : null}
    </span>
  )
}
