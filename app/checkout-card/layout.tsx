import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Slutför betalning – Morsdag Launch · Growzilla',
  description:
    'Säker betalning av 20 000 kr setup för Morsdag Launch. Live inom 72 timmar. Deadline söndag 31 maj 2026.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Slutför betalning – Morsdag Launch',
    description:
      '20 000 kr setup · + 10% performance fee · Live inom 72h · Deadline 31 maj 2026.',
    type: 'website',
    url: 'https://growzilla.xyz/checkout-card',
    locale: 'sv_SE',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
