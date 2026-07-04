import Head from 'next/head'
import type { GetStaticProps } from 'next'

import '@/styles/landing.css'

import Nav from '@/components/content-factory/Nav'
import Footer from '@/components/content-factory/Footer'
import Hero from '@/components/content-factory/sections/Hero'
import MillionViews from '@/components/content-factory/sections/MillionViews'
import Mechanism from '@/components/content-factory/sections/Mechanism'
import Proof from '@/components/content-factory/sections/Proof'
import CaseStudies from '@/components/content-factory/sections/CaseStudies'
import ZeroToOne from '@/components/content-factory/sections/ZeroToOne'
import Problem from '@/components/content-factory/sections/Problem'
import CmoComparison from '@/components/content-factory/sections/CmoComparison'
import Offers from '@/components/content-factory/sections/Offers'
import Process from '@/components/content-factory/sections/Process'
import Team from '@/components/content-factory/sections/Team'
import Apply from '@/components/content-factory/sections/Apply'

import { fetchTrustLogos, type BrandLogo } from '@/lib/brandfetch'

type Props = {
  logos: BrandLogo[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logos = await fetchTrustLogos(process.env.BRANDFETCH_CLIENT_ID ?? '')
  return {
    props: { logos },
    revalidate: 86400,
  }
}

export default function Home({ logos }: Props) {
  return (
    <>
      <Head>
        <title>Growzilla · Attention Is All You Need</title>
        <meta
          name="description"
          content="We take startups from 0 to 1 on content and media buying. One reel a day. Meta, Instagram, TikTok. Build the engine before the CMO hire."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla Content Factory" />
        <meta
          property="og:description"
          content="We build the content engine behind successful startups. 0 to 1 on content and media buying."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#0A0A0B" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white selection:bg-zilla-neon/30">
        <Nav />
        <main>
          <Hero logos={logos} />
          <MillionViews />
          <Mechanism />
          <Proof />
          <CaseStudies />
          <ZeroToOne />
          <Problem />
          <CmoComparison />
          <Offers />
          <Process />
          <Team />
          <Apply />
        </main>
        <Footer />
      </div>
    </>
  )
}