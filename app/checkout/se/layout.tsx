import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growzilla – Se exakt intäkt per post & creator på Shopify',
  description:
    'Growzilla är en enkel Shopify-app som visar exakt hur mycket varje post och varje creator drar in i försäljning. 30 dagars pengarna-tillbaka-garanti.',
  openGraph: {
    title: 'Growzilla – Intäkt per post & creator på Shopify',
    description:
      'Se exakt hur mycket varje post och creator drar in. Uppsatt på 15 min. 997 kr/mån.',
    type: 'website',
    url: 'https://growzilla.xyz/checkout/se',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
