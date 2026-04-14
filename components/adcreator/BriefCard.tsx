'use client'

import { AngleBadge } from '@/components/ui/AngleBadge'

/**
 * BriefCard — one of 5 ready-to-run ad briefs.
 * `inspiredBy` is an array of AdCard ids ("A-C2-4"). Hovering an ID
 * dispatches `gz:highlight-ad` so the matching AdCard glows.
 */

export interface BriefCardProps {
  number: 1 | 2 | 3 | 4 | 5 | number
  angle: string
  hypothesis: string
  primaryText: string
  headline: string
  description: string
  cta: string
  visualConcept: string
  productionNote?: string
  inspiredBy: string[]
  className?: string
}

export function BriefCard({
  number,
  angle,
  hypothesis,
  primaryText,
  headline,
  description,
  cta,
  visualConcept,
  productionNote,
  inspiredBy,
  className = '',
}: BriefCardProps) {
  function highlightAd(adId: string) {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('gz:highlight-ad', { detail: { adId } }))
  }

  return (
    <article
      className={`rounded-md p-5 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md text-[12px] font-semibold tabular-nums"
            style={{ background: 'rgba(0,255,148,0.10)', color: '#00FF94', boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.30)' }}
          >
            {number}
          </span>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.40)', letterSpacing: '0.08em' }}>
              Ad Brief
            </div>
            <AngleBadge angle={angle} size="md" />
          </div>
        </div>
      </header>

      <Section label="Hypothesis">
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
          {hypothesis}
        </p>
      </Section>

      <Section label="Primary text">
        <p
          className="text-[13px] leading-relaxed whitespace-pre-wrap"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          {primaryText}
        </p>
      </Section>

      <Section label="Headline">
        <p className="text-[15px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
          {headline}
        </p>
      </Section>

      <Section label="Description">
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
          {description}
        </p>
      </Section>

      <Section label="CTA">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-semibold tracking-wider uppercase"
          style={{ background: 'rgba(0,255,148,0.10)', color: '#00FF94', boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.30)', letterSpacing: '0.08em' }}
        >
          {cta}
        </span>
      </Section>

      <Section label="Visual concept">
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
          {visualConcept}
        </p>
      </Section>

      {productionNote && (
        <Section label="Production note">
          <p className="text-[12px] italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
            {productionNote}
          </p>
        </Section>
      )}

      <footer className="mt-4 pt-3 flex flex-wrap items-center gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-[11px] mr-1" style={{ color: 'rgba(255,255,255,0.48)' }}>
          Inspired by:
        </span>
        {inspiredBy.map((adId) => (
          <button
            key={adId}
            type="button"
            onMouseEnter={() => highlightAd(adId)}
            onFocus={() => highlightAd(adId)}
            className="text-[11px] font-mono px-1.5 py-0.5 rounded transition-colors duration-150"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.78)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
              letterSpacing: '0.02em',
            }}
          >
            {adId}
          </button>
        ))}
      </footer>
    </article>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 last:mb-0">
      <div
        className="text-[10px] uppercase tracking-wider mb-1"
        style={{ color: 'rgba(255,255,255,0.40)', letterSpacing: '0.08em' }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}
