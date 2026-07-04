'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import SectionRule from '../ui/SectionRule'
import type { LightboxItem } from '../ui/Lightbox'

const Lightbox = dynamic(() => import('../ui/Lightbox'), { ssr: false })

const THUMBS: LightboxItem[] = [
  { src: '/sm-thumbnails/post-sarah-ig-01.jpg', alt: 'Instagram reel', platform: 'IG' },
  { src: '/sm-thumbnails/post-aisha-tt-01.jpg', alt: 'TikTok reel', platform: 'TT' },
  { src: '/sm-thumbnails/post-marcus-yt-01.jpg', alt: 'YouTube short', platform: 'YT' },
  { src: '/sm-thumbnails/post-jake-tt-01.jpg', alt: 'TikTok reel', platform: 'TT' },
  { src: '/sm-thumbnails/post-priya-ig-01.jpg', alt: 'Instagram reel', platform: 'IG' },
  { src: '/sm-thumbnails/post-sarah-tt-02.jpg', alt: 'TikTok reel', platform: 'TT' },
]

export default function Portfolio() {
  const [active, setActive] = useState<LightboxItem | null>(null)

  return (
    <SectionRule id="portfolio" label="Portfolio">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display font-medium text-[32px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] text-white/95">
          Real content we&apos;ve shipped.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {THUMBS.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            className="relative aspect-square rounded-lg border border-white/[0.08] overflow-hidden bg-[#0C0C0D] hover:border-white/[0.16] transition-colors duration-150"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {item.platform && (
              <span className="absolute top-2.5 right-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70 bg-black/50 px-1.5 py-0.5 rounded">
                {item.platform}
              </span>
            )}
          </button>
        ))}
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </SectionRule>
  )
}