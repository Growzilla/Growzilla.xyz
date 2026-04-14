'use client'

import { LONGEVITY_PALETTE, type LongevityFlag } from '@/components/ui/LongevityBadge'

/**
 * CompetitorCard — one competitor brand's ad-spend snapshot.
 * Shows name, domain, total active ads, and a stacked longevity bar
 * (FRESH/ACTIVE/PROVEN/SCALING) with proportional segments.
 */

export interface LongevityDistribution {
  FRESH: number
  ACTIVE: number
  PROVEN: number
  SCALING: number
}

export interface CompetitorCardProps {
  name: string
  url: string
  activeAdCount: number
  distribution: LongevityDistribution
  metaAdLibraryUrl?: string
  className?: string
}

const ORDER: LongevityFlag[] = ['FRESH', 'ACTIVE', 'PROVEN', 'SCALING']

export function CompetitorCard({
  name,
  url,
  activeAdCount,
  distribution,
  metaAdLibraryUrl,
  className = '',
}: CompetitorCardProps) {
  const total = ORDER.reduce((s, k) => s + (distribution[k] || 0), 0) || 1
  const cleanUrl = stripProtocol(url)

  return (
    <article
      className={`rounded-md p-4 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold leading-tight truncate" style={{ color: 'rgba(255,255,255,0.95)' }}>
            {name}
          </h3>
          <a
            href={url.startsWith('http') ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] truncate block hover:underline underline-offset-2"
            style={{ color: 'rgba(255,255,255,0.48)' }}
          >
            {cleanUrl}
          </a>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[18px] font-semibold tabular-nums leading-none" style={{ color: '#00FF94' }}>
            {activeAdCount}
          </div>
          <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255,255,255,0.40)', letterSpacing: '0.08em' }}>
            Active ads
          </div>
        </div>
      </header>

      <div
        className="flex w-full h-2 rounded overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        role="img"
        aria-label={`Longevity distribution: ${ORDER.map((k) => `${k} ${distribution[k] || 0}`).join(', ')}`}
      >
        {ORDER.map((k) => {
          const v = distribution[k] || 0
          if (v === 0) return null
          const pct = (v / total) * 100
          return (
            <span
              key={k}
              className="block h-full"
              style={{
                width: `${pct}%`,
                background: LONGEVITY_PALETTE[k].text,
                opacity: 0.9,
              }}
              title={`${k}: ${v}`}
            />
          )
        })}
      </div>

      <div className="mt-2 flex items-center gap-3 flex-wrap text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
        {ORDER.map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5 tabular-nums">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: LONGEVITY_PALETTE[k].text }}
            />
            <span style={{ letterSpacing: '0.04em' }}>{k}</span>
            <span style={{ color: 'rgba(255,255,255,0.40)' }}>{distribution[k] || 0}</span>
          </span>
        ))}
      </div>

      {metaAdLibraryUrl && (
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a
            href={metaAdLibraryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium hover:underline underline-offset-2"
            style={{ color: 'rgba(0,255,148,0.85)' }}
          >
            Open in Meta Ad Library ↗
          </a>
        </div>
      )}
    </article>
  )
}

function stripProtocol(u: string): string {
  return u.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}
