'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#case-study', label: 'Work' },
  { href: '#offer', label: 'Offer' },
  { href: '/agency/vault', label: 'Knowledge Base' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-zilla-black/85 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-baseline gap-0.5 group shrink-0"
          aria-label="Growzilla — home"
        >
          <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-white/95">
            Growzill
          </span>
          <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-zilla-neon">
            a
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://calendly.com/albert-growzilla/growzilla-install"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 h-9 px-4 rounded-md bg-zilla-neon text-black text-[13px] font-semibold hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px]"
        >
          Book a call
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </nav>
    </header>
  )
}
