import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Slutför betalning – Morsdag Launch (Bankgiro) · Growzilla',
  description:
    'Säker betalning av €1 850 setup för Morsdag Launch via bankgiro / SEPA. Live inom 72 timmar. Deadline söndag 31 maj 2026.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Slutför betalning – Morsdag Launch (Bankgiro)',
    description:
      '€1 850 setup · + 10% performance fee · Live inom 72h · Deadline 31 maj 2026.',
    type: 'website',
    url: 'https://growzilla.xyz/checkout-bank',
    locale: 'sv_SE',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
