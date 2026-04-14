'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AngleBadge } from '@/components/ui/AngleBadge'
import { LongevityBadge, type LongevityFlag } from '@/components/ui/LongevityBadge'

/**
 * AdCard — competitor ad tile.
 * Thumbnail auto-selects 4:5 or 16:9 based on `ratio` prop.
 * Hook line clamps to 2 lines. Click-through opens Meta Ad Library.
 */

export interface AdCardProps {
  /** Internal ID like "A-C2-4" used by BriefCard cross-references. */
  id: string
  hook: string
  thumbnailUrl?: string
  ratio?: '4:5' | '16:9'
  angle: string
  longevityFlag: LongevityFlag
  daysActive?: number
  competitorName: string
  metaAdLibraryUrl?: string
  className?: string
}

export function AdCard({
  id,
  hook,
  thumbnailUrl,
  ratio = '4:5',
  angle,
  longevityFlag,
  daysActive,
  competitorName,
  metaAdLibraryUrl,
  className = '',
}: AdCardProps) {
  const [highlight, setHighlight] = useState(false)

  // Cross-component highlight via window event (BriefCard fires `gz:highlight-ad`)
  useEffect(() => {
    function onHighlight(e: Event) {
      const ce = e as CustomEvent<{ adId?: string }>
      if (ce.detail?.adId === id) {
        setHighlight(true)
        const t = setTimeout(() => setHighlight(false), 1600)
        return () => clearTimeout(t)
      }
    }
    window.addEventListener('gz:highlight-ad', onHighlight as EventListener)
    return () => window.removeEventListener('gz:highlight-ad', onHighlight as EventListener)
  }, [id])

  const aspectClass = ratio === '16:9' ? 'aspect-video' : 'aspect-[4/5]'

  return (
    <article
      data-ad-id={id}
      className={`group flex flex-col rounded-md overflow-hidden transition-all duration-200 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: highlight
          ? 'inset 0 0 0 1.5px rgba(0,255,148,0.55), 0 0 24px rgba(0,255,148,0.18)'
          : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden`} style={{ background: 'rgba(255,255,255,0.02)' }}>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={hook}
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[11px]" style={{ color: 'rgba(255,255,255,0.30)' }}>
            no preview
          </div>
        )}
        <span
          className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-mono"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}
        >
          {id}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p
          className="text-[13px] leading-snug"
          style={{
            color: 'rgba(255,255,255,0.92)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {hook}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <AngleBadge angle={angle} />
          <LongevityBadge flag={longevityFlag} days={daysActive} />
        </div>
        <div className="flex items-center justify-between text-[11px]" style={{ color: 'rgba(255,255,255,0.48)' }}>
          <span className="truncate">{competitorName}</span>
          {metaAdLibraryUrl && (
            <a
              href={metaAdLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline-offset-2 hover:underline shrink-0 ml-2"
              style={{ color: 'rgba(0,255,148,0.75)' }}
            >
              Ad Library ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
