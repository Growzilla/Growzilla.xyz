'use client'

import { useEffect } from 'react'

export type LightboxItem = {
  src: string
  alt: string
  platform?: string
  caption?: string
}

export default function Lightbox({
  item,
  onClose,
}: {
  item: LightboxItem | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 sm:p-8 bg-black/85 animate-[landing-fade-up_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 font-mono text-[12px] text-white/50 hover:text-white transition-colors"
        aria-label="Close"
      >
        ESC
      </button>
      <div
        className="max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          className="w-full rounded-lg border border-white/[0.1] object-contain max-h-[75vh]"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          {item.platform && (
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zilla-neon/70">
              {item.platform}
            </span>
          )}
          {item.caption && (
            <p className="text-[14px] text-white/55 text-right">{item.caption}</p>
          )}
        </div>
      </div>
    </div>
  )
}