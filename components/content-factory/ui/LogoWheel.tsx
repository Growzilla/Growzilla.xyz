'use client'

import { useState } from 'react'
import type { HeroWheelLogo } from '@/lib/brandfetch'
import { PlatformLogoFallback } from '@/lib/content-factory/platform-logo-fallbacks'

/** Semicircle arc angles (degrees) — 5 platform logos, upright */
const ARC_ANGLES = [-60, -30, 0, 30, 60] as const
const ARC_RADIUS_DESKTOP = 92

type CardSize = 'sm' | 'md' | 'lg'

const SIZE: Record<
  CardSize,
  { icon: string; name: string; fallbackPx: number }
> = {
  sm: {
    icon: 'h-12 w-12',
    name: 'text-[11px] font-mono uppercase tracking-[0.08em] text-white/80',
    fallbackPx: 48,
  },
  md: {
    icon: 'h-[3.25rem] w-[3.25rem]',
    name: 'text-[12px] font-display font-medium tracking-[-0.01em] text-white/85',
    fallbackPx: 52,
  },
  lg: {
    icon: 'h-[4.5rem] w-[4.5rem]',
    name: 'text-[15px] font-display font-medium tracking-[-0.01em] text-white/85',
    fallbackPx: 72,
  },
}

function WheelLogo({ logo, size }: { logo: HeroWheelLogo; size: CardSize }) {
  const [src, setSrc] = useState(logo.symbolSrc)
  const [failed, setFailed] = useState(false)
  const { icon, fallbackPx } = SIZE[size]

  if (failed) {
    return <PlatformLogoFallback domain={logo.domain} size={fallbackPx} />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={logo.name}
      width={128}
      height={128}
      className={`${icon} object-contain`}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (src === logo.symbolSrc) {
          setSrc(logo.iconSrc)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

function LogoCard({ logo, size }: { logo: HeroWheelLogo; size: CardSize }) {
  const { name } = SIZE[size]

  return (
    <div className="landing-logo-card group flex flex-col items-center gap-2 sm:gap-2.5 min-w-0">
      <div className="transition-[filter] duration-200 group-hover:drop-shadow-[0_0_22px_rgba(0,255,148,0.28)] group-hover:brightness-110">
        <WheelLogo logo={logo} size={size} />
      </div>
      <span className={`${name} text-center leading-tight max-w-[5.5rem] sm:max-w-none`}>
        {logo.name}
      </span>
    </div>
  )
}

export default function LogoWheel({ logos }: { logos: HeroWheelLogo[] }) {
  const rowOne = logos.slice(0, 3)
  const rowTwo = logos.slice(3)

  return (
    <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/[0.06]">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 sm:mb-10">
        Where we distribute
      </p>

      {/* Phone: 3 + 2 grid */}
      <div className="sm:hidden max-w-[340px] mx-auto px-1">
        <div className="grid grid-cols-3 gap-x-1 gap-y-7">
          {rowOne.map((logo) => (
            <LogoCard key={logo.domain} logo={logo} size="sm" />
          ))}
        </div>
        <div className="mt-7 flex justify-center gap-12">
          {rowTwo.map((logo) => (
            <LogoCard key={logo.domain} logo={logo} size="sm" />
          ))}
        </div>
      </div>

      {/* Tablet: flex row with wrap */}
      <div className="hidden sm:flex md:hidden flex-wrap items-end justify-center gap-x-7 gap-y-6 px-4">
        {logos.map((logo) => (
          <LogoCard key={logo.domain} logo={logo} size="md" />
        ))}
      </div>

      {/* Desktop: semicircle arc */}
      <div className="hidden md:block relative mx-auto h-[220px] max-w-5xl overflow-visible px-8">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0">
          {logos.map((logo, i) => {
            const angle = ARC_ANGLES[i] ?? 0
            return (
              <div
                key={logo.domain}
                className="absolute left-0 bottom-0 origin-bottom"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${ARC_RADIUS_DESKTOP}px)`,
                }}
              >
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <LogoCard logo={logo} size="lg" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}