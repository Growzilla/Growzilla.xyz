import Head from 'next/head'
import type { GetStaticProps } from 'next'

import '@/styles/landing.css'

import Nav from '@/components/content-factory/Nav'
import Footer from '@/components/content-factory/Footer'
import Hero from '@/components/content-factory/sections/Hero'
import MillionViews from '@/components/content-factory/sections/MillionViews'
import CmoComparison from '@/components/content-factory/sections/CmoComparison'
import CombinedProof from '@/components/content-factory/sections/CombinedProof'
import AuditTeaser from '@/components/content-factory/sections/AuditTeaser'
import Offers from '@/components/content-factory/sections/Offers'
import MeetTeamSection from '@/components/content-factory/sections/MeetTeamSection'
import Inbound from '@/components/content-factory/sections/Inbound'
import Close from '@/components/content-factory/sections/Close'

import { GROWZILLA_SOCIALS } from '@/lib/content-factory/socials'
import {
  fetchGrowzillaSocialLogos,
  fetchHeroWheelLogos,
  type HeroWheelLogo,
} from '@/lib/brandfetch'
import type { SocialLink } from '@/components/content-factory/ui/SocialStrip'

type Props = {
  logos: HeroWheelLogo[]
  socials: SocialLink[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const apiKey = process.env.BRANDFETCH_CLIENT_ID ?? ''
  const [logos, socials] = await Promise.all([
    fetchHeroWheelLogos(apiKey),
    fetchGrowzillaSocialLogos(GROWZILLA_SOCIALS, apiKey),
  ])
  return {
    props: { logos, socials },
    revalidate: 86400,
  }
}

export default function Home({ logos, socials }: Props) {
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
          <CmoComparison />
          <AuditTeaser />
          <Offers />
          <CombinedProof />
          <MeetTeamSection />
          <Inbound />
          <Close />
        </main>
        <Footer socials={socials} />
      </div>
    </>
  )
}