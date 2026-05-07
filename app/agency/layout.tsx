import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growzilla — We run your growth stack',
  description:
    'We run paid acquisition, ship the creative, and fix the funnel for Shopify DTC brands. One team. Weekly cadence. End-to-end ownership of the number.',
  openGraph: {
    title: 'Growzilla — We run your growth stack',
    description:
      'We run paid acquisition, ship the creative, and fix the funnel for Shopify DTC brands. One team. Weekly cadence.',
    url: 'https://growzilla.xyz/agency',
    type: 'website',
    images: [
      {
        url: '/og/og-agency.png',
        width: 1200,
        height: 630,
        alt: 'Growzilla — Ads, content, store. Measured in one screen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growzilla — We run your growth stack',
    description:
      'We run the ads. Ship the creative. Fix the funnel.',
    images: ['/og/twitter-agency.png'],
  },
  alternates: { canonical: 'https://growzilla.xyz/agency' },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Growzilla',
  url: 'https://growzilla.xyz',
  logo: 'https://growzilla.xyz/icon-512x512.png',
  founder: {
    '@type': 'Person',
    name: 'Albert Elmgart',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'RolloutFactory Inc.',
    address: { '@type': 'PostalAddress', addressRegion: 'Delaware', addressCountry: 'US' },
  },
  sameAs: ['https://www.linkedin.com/company/growzilla'],
}

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {children}
    </>
  )
}
