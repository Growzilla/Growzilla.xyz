'use client'

/**
 * LongevityBadge — DEPRECATED. Use `StatusBadge` from '@/components/ui/StatusBadge'.
 *
 * Backwards-compatibility shim. Delegates rendering to StatusBadge and preserves
 * the original public API (LongevityFlag type, LONGEVITY_PALETTE constant,
 * LongevityBadge component) so existing consumers keep working without edits.
 *
 * Mapping:
 *   FRESH   → variant="fresh"
 *   ACTIVE  → variant="active"
 *   PROVEN  → variant="proven"
 *   SCALING → variant="scaling"
 */

import { StatusBadge, STATUS_PALETTE } from './StatusBadge'

export type LongevityFlag = 'FRESH' | 'ACTIVE' | 'PROVEN' | 'SCALING'

const FLAG_TO_VARIANT = {
  FRESH: 'fresh',
  ACTIVE: 'active',
  PROVEN: 'proven',
  SCALING: 'scaling',
} as const

// Preserves original { bg, text, ring, label } shape — sourced from StatusBadge.
export const LONGEVITY_PALETTE: Record<LongevityFlag, { bg: string; text: string; ring: string; label: string }> = {
  FRESH:   STATUS_PALETTE.fresh,
  ACTIVE:  STATUS_PALETTE.active,
  PROVEN:  STATUS_PALETTE.proven,
  SCALING: STATUS_PALETTE.scaling,
}

export interface LongevityBadgeProps {
  flag: LongevityFlag
  days?: number
  size?: 'sm' | 'md'
  className?: string
}

export function LongevityBadge({ flag, days, size = 'sm', className = '' }: LongevityBadgeProps) {
  return (
    <StatusBadge
      variant={FLAG_TO_VARIANT[flag]}
      days={days}
      size={size}
      className={className}
    />
  )
}
