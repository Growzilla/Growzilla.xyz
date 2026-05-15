'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function MetaPixelAppPageviews() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
    if (typeof fbq === 'function') {
      fbq('track', 'PageView')
    }
  }, [pathname])

  return null
}
