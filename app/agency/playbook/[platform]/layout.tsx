import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paid Ads Playbook · Growzilla',
  description:
    'How we run paid acquisition, post-Andromeda. Per-platform playbooks for the operators who actually ship.',
}

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
