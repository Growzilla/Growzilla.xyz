'use client'

/**
 * /morsdag — Morsdag Launch campaign landing page.
 *
 * Mirrors /agency composition pattern: stacked section components inside
 * a single <main> element. Each section owns its own motion + spacing.
 * Pink accents only via morsdag-* Tailwind tokens. No software UI on this
 * page. No serif fonts. Hairlines, not shadows. Operator-language only.
 */

import Hero from '@/components/morsdag/Hero'
import Problem from '@/components/morsdag/Problem'
import Solution from '@/components/morsdag/Solution'
import Included from '@/components/morsdag/Included'
import Timeline from '@/components/morsdag/Timeline'
import Pricing from '@/components/morsdag/Pricing'
import Fit from '@/components/morsdag/Fit'
import FinalCTA from '@/components/morsdag/FinalCTA'
import Footer from '@/components/morsdag/Footer'

export default function MorsdagPage() {
  return (
    <main className="min-h-screen bg-zilla-black text-white selection:bg-morsdag-rose/30 selection:text-white">
      <Hero />
      <Problem />
      <Solution />
      <Included />
      <Timeline />
      <Pricing />
      <Fit />
      <FinalCTA />
      <Footer />
    </main>
  )
}
