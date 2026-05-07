import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Study · Growzilla',
  description:
    'Brands we operate alongside, deeply documented. Real numbers, real timelines.',
}

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
