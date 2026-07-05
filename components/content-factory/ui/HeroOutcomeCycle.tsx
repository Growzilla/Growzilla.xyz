'use client'

import { useEffect, useState } from 'react'

const WORDS = [
  'attention',
  'customers',
  'investors',
  'leads',
  'visibility',
  'momentum',
  'authority',
  'growth',
] as const

export default function HeroOutcomeCycle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span
      key={WORDS[index]}
      className="inline-block text-zilla-neon landing-word-cycle"
      aria-live="polite"
    >
      {WORDS[index]}
    </span>
  )
}