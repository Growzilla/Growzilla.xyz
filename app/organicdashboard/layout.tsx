import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creator Revenue Hub — Demo | Growzilla',
  description:
    'See exactly which creators and posts drive real revenue. Interactive demo of the Growzilla social media attribution dashboard.',
  openGraph: {
    title: 'Creator Revenue Hub — Demo | Growzilla',
    description:
      'Interactive demo of the Growzilla social media attribution dashboard.',
  },
}

export default function OrgDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
