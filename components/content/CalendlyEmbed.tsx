'use client'

/**
 * Calendly inline widget for the content-consult booking.
 * Themed to match zilla-black + neon via Calendly's color query params.
 * Loads the external widget.js once, client-side only.
 */

import { useEffect, useRef } from 'react'

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

// Base booking URL + dark-theme params so the embed matches the page.
const CALENDLY_URL =
  'https://calendly.com/albert-elmgart/growzilla-content-consult' +
  '?hide_gdpr_banner=1&background_color=0a0a0b&text_color=ffffff&primary_color=00ff94'

type Prefill = { name?: string; email?: string }

type CalendlyGlobal = {
  initInlineWidget: (opts: {
    url: string
    parentElement: HTMLElement
    prefill?: Prefill
  }) => void
}

/**
 * Inline Calendly widget for the content-consult booking.
 * Initialized explicitly via initInlineWidget so it works even when this
 * component mounts late (after the qualify quiz), past widget.js auto-init.
 * Optional prefill pre-fills the booker's name + email from the lead form.
 */
export default function CalendlyEmbed({ prefill }: { prefill?: Prefill }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const w = window as unknown as { Calendly?: CalendlyGlobal }

    const init = () => {
      if (cancelled || !ref.current || !w.Calendly) return
      ref.current.innerHTML = ''
      w.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: ref.current,
        prefill: prefill ? { name: prefill.name, email: prefill.email } : {},
      })
    }

    if (w.Calendly) {
      init()
      return
    }

    let script = document.querySelector(
      `script[src="${SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', init)
    return () => {
      cancelled = true
      script?.removeEventListener('load', init)
    }
  }, [prefill?.name, prefill?.email])

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden border border-white/[0.08]"
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}
