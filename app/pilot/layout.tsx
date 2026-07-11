import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3-Month Growth Pilot · Growzilla',
  description:
    'Daily reels, volume hook tests, and a content engine before the CMO hire. Start the 3-Month Growth Pilot.',
  openGraph: {
    title: '3-Month Growth Pilot · Growzilla',
    description:
      'One reel per day. Volume testing until hooks win. Engine built before the CMO hire.',
    type: 'website',
    url: 'https://growzilla.xyz/pilot',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
