'use client'

import Nav from '@/components/agency/Nav'
import Hero from '@/components/agency/Hero'
import StackStrip from '@/components/agency/StackStrip'
import CaseStudy from '@/components/agency/CaseStudy'
import CreativesShelf from '@/components/agency/CreativesShelf'
import LeadMagnets from '@/components/agency/LeadMagnets'
import Offer from '@/components/agency/Offer'
import Pricing from '@/components/agency/Pricing'
import Timeline from '@/components/agency/Timeline'
import AboutTeaser from '@/components/agency/AboutTeaser'
import CtaAudit from '@/components/agency/CtaAudit'
import FAQ from '@/components/agency/FAQ'
import Footer from '@/components/agency/Footer'

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-zilla-black text-white selection:bg-zilla-neon/30 selection:text-white">
      <Nav />
      <Hero />
      <StackStrip />
      <CaseStudy />
      <CreativesShelf />
      <LeadMagnets />
      <Offer />
      <Pricing />
      <Timeline />
      <AboutTeaser />
      <CtaAudit />
      <FAQ />
      <Footer />
    </main>
  )
}
