'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function MinimalNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/morsdag"
          className="flex items-center gap-2.5 group"
          aria-label="Tillbaka till Morsdag Launch"
        >
          <Image
            src="/images/growzilla-kaiju.png"
            alt=""
            width={36}
            height={36}
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-150"
            priority
          />
          <span className="font-display text-[15px] sm:text-base font-medium tracking-tight text-white">
            GROWZILLA
          </span>
        </Link>

        <Link
          href="/morsdag"
          className="text-[12px] sm:text-[13px] text-white/45 hover:text-white/85 transition-colors duration-150"
        >
          ← Tillbaka
        </Link>
      </div>
    </header>
  )
}
