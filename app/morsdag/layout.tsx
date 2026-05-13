import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Morsdag Launch · 72h-kampanj för svenska Shopify-brands · Growzilla',
  description:
    'Vi bygger och lanserar er Morsdag-kampanj inom 72 timmar — creatives, erbjudande, Meta ads, email/SMS och Shopify-sida. Mors dag 31 maj 2026.',
  openGraph: {
    title: 'Morsdag Launch · 72h-kampanj för svenska Shopify-brands',
    description:
      'Vi bygger och lanserar er Morsdag-kampanj inom 72 timmar — creatives, erbjudande, Meta ads, email/SMS och Shopify-sida.',
    url: 'https://growzilla.xyz/morsdag',
    type: 'website',
    locale: 'sv_SE',
    images: ['/v3-hero.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morsdag Launch · 72h-kampanj',
    description:
      'Komplett Mors dag-kampanj live inom 72h. Creatives, Meta ads, email/SMS och Shopify-setup.',
    images: ['/v3-hero.jpg'],
  },
  alternates: { canonical: 'https://growzilla.xyz/morsdag' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Morsdag Launch',
  description:
    'Komplett Mors dag-kampanj för svenska Shopify-butiker. Vi paketerar erbjudande, bygger creatives, sätter upp Meta-ads, skriver email/SMS och driver retargeting fram till Mors dag.',
  provider: {
    '@type': 'Organization',
    name: 'Growzilla',
    url: 'https://growzilla.xyz',
  },
  areaServed: 'SE',
  serviceType: 'Ecommerce campaign launch',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'SEK',
    price: '20000',
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://growzilla.xyz/morsdag',
  },
}

export default function MorsdagLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
