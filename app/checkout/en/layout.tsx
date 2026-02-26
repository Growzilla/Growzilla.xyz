import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growzilla – See exact revenue per post & creator on Shopify',
  description:
    'Growzilla is a simple Shopify app that shows you exactly how much every post and every creator brings in sales. 30-day money-back guarantee.',
  openGraph: {
    title: 'Growzilla – Revenue per post & creator on Shopify',
    description:
      'See exactly how much every post and every creator brings in. Set up in 15 minutes. $97/mo.',
    type: 'website',
    url: 'https://growzilla.xyz/checkout/en',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
