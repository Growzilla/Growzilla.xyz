'use client'

import Image from 'next/image'

/**
 * BrandSnapshot — header card for the report.
 * Logo (Brandfetch), name, domain, product summary, market flag, timestamp.
 */

export interface BrandSnapshotProps {
  domain: string
  name?: string
  logoUrl?: string
  productSummary?: string
  /** ISO country code, e.g. "SE" "US" "GB". */
  marketIso?: string
  /** ISO datetime — when the report was generated. */
  generatedAt: string
  className?: string
}

export function BrandSnapshot({
  domain,
  name,
  logoUrl,
  productSummary,
  marketIso,
  generatedAt,
  className = '',
}: BrandSnapshotProps) {
  return (
    <section
      className={`flex items-start gap-4 rounded-lg p-5 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.04)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {logoUrl ? (
          <Image src={logoUrl} alt={name ?? domain} width={56} height={56} unoptimized style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        ) : (
          <span className="text-[18px] font-semibold" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {(name ?? domain).slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-[18px] font-semibold leading-tight truncate" style={{ color: 'rgba(255,255,255,0.95)' }}>
            {name ?? domain}
          </h2>
          {marketIso && (
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.72)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
                letterSpacing: '0.04em',
              }}
              title={`Market: ${marketIso}`}
            >
              <span aria-hidden>{flagEmoji(marketIso)}</span>
              <span>{marketIso}</span>
            </span>
          )}
        </div>
        <a
          href={`https://${domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] hover:underline underline-offset-2"
          style={{ color: 'rgba(255,255,255,0.48)' }}
        >
          {domain}
        </a>
        {productSummary && (
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {productSummary}
          </p>
        )}
      </div>

      <div className="flex-shrink-0 text-right text-[11px] tabular-nums" style={{ color: 'rgba(255,255,255,0.40)' }}>
        <div className="uppercase tracking-wider mb-0.5" style={{ letterSpacing: '0.08em' }}>Generated</div>
        <time dateTime={generatedAt}>{fmtTimestamp(generatedAt)}</time>
      </div>
    </section>
  )
}

function flagEmoji(iso: string): string {
  if (!iso || iso.length !== 2) return '🌐'
  const A = 0x1f1e6
  const a = 'A'.charCodeAt(0)
  const codes = iso.toUpperCase().split('').map((c) => A + (c.charCodeAt(0) - a))
  return String.fromCodePoint(...codes)
}

function fmtTimestamp(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
}
