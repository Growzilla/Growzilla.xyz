import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growzilla Content Studio — We make your content. You get the views.',
  description:
    'A content studio for founder-led and product brands. One reel a day for two weeks. We script, you film fast, we edit, schedule, and post. The Content Sprint: 14 reels in 14 days, $250.',
  openGraph: {
    title: 'Growzilla Content Studio — We make your content. You get the views.',
    description:
      'The Content Sprint: 14 reels in 14 days. We script, you film, we edit, schedule, and post. $250. Built in Sweden, working with brands worldwide.',
    url: 'https://growzilla.xyz/content',
    type: 'website',
    images: [
      {
        url: '/og/og-agency.png',
        width: 1200,
        height: 630,
        alt: 'Growzilla Content Studio — 14 reels in 14 days.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growzilla Content Studio — We know how to get views.',
    description:
      'The Content Sprint: 14 reels in 14 days, scripted, edited, scheduled, and posted. $250.',
    images: ['/og/twitter-agency.png'],
  },
  alternates: { canonical: 'https://growzilla.xyz/content' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Growzilla Content Studio — The Content Sprint',
  serviceType: 'Short-form video content production',
  description:
    'Done-for-you short-form content. 14 scripted, edited, scheduled, and posted reels over 14 days for founder-led and product brands.',
  provider: {
    '@type': 'Organization',
    name: 'Growzilla',
    url: 'https://growzilla.xyz',
    parentOrganization: {
      '@type': 'Organization',
      name: 'RolloutFactory Inc.',
      address: { '@type': 'PostalAddress', addressRegion: 'Delaware', addressCountry: 'US' },
    },
  },
  areaServed: 'Worldwide',
  offers: {
    '@type': 'Offer',
    name: 'The Content Sprint',
    price: '250',
    priceCurrency: 'USD',
    description: '14 reels in 14 days — scripted, edited, scheduled, and posted.',
  },
}

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {children}
    </>
  )
}
