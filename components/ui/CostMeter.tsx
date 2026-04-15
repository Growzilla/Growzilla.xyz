'use client'

/**
 * CostMeter — progress bar + current/budget readout for cost/quota displays.
 *
 * Thresholds (against current_usd / budget_usd ratio):
 *   < 80%  → brand green  (#00FF94)
 *   80-95% → amber        (#FBBF24)
 *   ≥ 95%  → red          (#F87171)
 *
 * Variants:
 *   'compact' — single line: label · $X / $Y · N%  with 2px bar under
 *   'full'    — stacked: label row + bar + readout row
 *
 * Dashboard-clean mode (Linear style): subtle border, no glow, no pulse.
 */

export interface CostMeterProps {
  current_usd: number
  budget_usd: number
  label?: string
  variant?: 'compact' | 'full'
  className?: string
}

const GREEN = '#00FF94'
const AMBER = '#FBBF24'
const RED = '#F87171'
const TRACK = 'rgba(255,255,255,0.08)'

function thresholdColor(pct: number): string {
  if (pct >= 95) return RED
  if (pct >= 80) return AMBER
  return GREEN
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export function CostMeter({
  current_usd,
  budget_usd,
  label = 'DeepSeek spend',
  variant = 'full',
  className = '',
}: CostMeterProps) {
  const safeBudget = budget_usd > 0 ? budget_usd : 1
  const rawPct = (current_usd / safeBudget) * 100
  const pct = Math.max(0, Math.min(100, rawPct))
  const color = thresholdColor(rawPct)
  const pctLabel = `${rawPct.toFixed(rawPct >= 10 ? 0 : 1)}%`

  if (variant === 'compact') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-baseline justify-between gap-3 text-[12px]">
          <span className="truncate" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {label}
          </span>
          <span className="font-medium tabular-nums" style={{ color: 'rgba(255,255,255,0.92)' }}>
            {fmt(current_usd)} / {fmt(budget_usd)}
            <span className="ml-2" style={{ color }}>
              {pctLabel}
            </span>
          </span>
        </div>
        <div
          className="mt-1.5 h-[2px] w-full overflow-hidden rounded-full"
          style={{ background: TRACK }}
          role="progressbar"
          aria-valuenow={Math.round(rawPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    )
  }

  // variant === 'full'
  return (
    <div
      className={`w-full rounded-lg p-3.5 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.02)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.48)' }}>
          {label}
        </span>
        <span className="text-[12px] tabular-nums font-medium" style={{ color }}>
          {pctLabel}
        </span>
      </div>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: TRACK }}
        role="progressbar"
        aria-valuenow={Math.round(rawPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-3 text-[13px] tabular-nums">
        <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
          {fmt(current_usd)}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.48)' }}>of {fmt(budget_usd)}</span>
      </div>
    </div>
  )
}
