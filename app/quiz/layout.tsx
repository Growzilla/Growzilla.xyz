import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator Revenue Leak Calculator | Growzilla',
  description:
    'Discover how much revenue your creators are quietly leaking every month. Free 90-second calculator for Shopify brands.',
  openGraph: {
    title: 'Creator Revenue Leak Calculator | Growzilla',
    description:
      'Discover how much revenue your creators are quietly leaking every month.',
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
