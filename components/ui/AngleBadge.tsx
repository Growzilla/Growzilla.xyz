'use client'

/**
 * AngleBadge — pill displaying an ad angle (Gift / Memory / HomeDecor / etc.)
 * Color-coded palette below. Unknown angles fall back to neutral.
 *
 * Design: dashboard mode (Linear-clean), no glow.
 */

export const ANGLE_PALETTE: Record<string, { bg: string; text: string; ring: string }> = {
  Gift:        { bg: 'rgba(244,114,182,0.10)', text: '#F472B6', ring: 'rgba(244,114,182,0.25)' }, // pink
  Memory:      { bg: 'rgba(139,92,246,0.10)',  text: '#A78BFA', ring: 'rgba(139,92,246,0.25)' }, // violet
  HomeDecor:   { bg: 'rgba(251,191,36,0.10)',  text: '#FBBF24', ring: 'rgba(251,191,36,0.25)' }, // amber
  Lifestyle:   { bg: 'rgba(56,189,248,0.10)',  text: '#38BDF8', ring: 'rgba(56,189,248,0.25)' }, // sky
  Status:      { bg: 'rgba(232,121,249,0.10)', text: '#E879F9', ring: 'rgba(232,121,249,0.25)' }, // fuchsia
  Performance: { bg: 'rgba(0,255,148,0.10)',   text: '#00FF94', ring: 'rgba(0,255,148,0.25)' },  // brand green
  Discount:    { bg: 'rgba(239,68,68,0.10)',   text: '#F87171', ring: 'rgba(239,68,68,0.25)' },   // red
  Trust:       { bg: 'rgba(45,212,191,0.10)',  text: '#2DD4BF', ring: 'rgba(45,212,191,0.25)' }, // teal
  Curiosity:   { bg: 'rgba(165,180,252,0.10)', text: '#A5B4FC', ring: 'rgba(165,180,252,0.25)' },// indigo-300
  SocialProof: { bg: 'rgba(132,204,22,0.10)',  text: '#A3E635', ring: 'rgba(132,204,22,0.25)' }, // lime
  FOMO:        { bg: 'rgba(251,146,60,0.10)',  text: '#FB923C', ring: 'rgba(251,146,60,0.25)' }, // orange
  Education:   { bg: 'rgba(96,165,250,0.10)',  text: '#60A5FA', ring: 'rgba(96,165,250,0.25)' }, // blue
}

const NEUTRAL = { bg: 'rgba(255,255,255,0.04)', text: 'rgba(255,255,255,0.72)', ring: 'rgba(255,255,255,0.10)' }

export interface AngleBadgeProps {
  angle: string
  size?: 'sm' | 'md'
  className?: string
}

export function AngleBadge({ angle, size = 'sm', className = '' }: AngleBadgeProps) {
  const palette = ANGLE_PALETTE[angle] ?? NEUTRAL
  const sizeClass = size === 'md' ? 'px-2.5 py-1 text-[12px]' : 'px-2 py-0.5 text-[11px]'
  return (
    <span
      className={`inline-flex items-center font-medium rounded ${sizeClass} ${className}`}
      style={{
        background: palette.bg,
        color: palette.text,
        boxShadow: `inset 0 0 0 1px ${palette.ring}`,
        letterSpacing: '0.01em',
      }}
    >
      {angle}
    </span>
  )
}
