import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whop Attribution Dashboard | Growzilla',
  description:
    'Full-funnel attribution dashboard for Whop-based businesses. Track ad campaigns, membership revenue, customer LTV, and channel performance.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Whop Attribution Dashboard | Growzilla',
    description:
      'Full-funnel attribution for Whop coaching agencies and memberships.',
  },
}

export default function WhopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
