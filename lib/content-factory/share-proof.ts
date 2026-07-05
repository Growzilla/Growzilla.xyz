export type ShareProofFrame = {
  id: string
  src: string
  alt: string
  views: string
  shares: string
}

/** Top 3 reels by views + shares — insights-04 dropped */
export const SHARE_PROOF_FRAMES: ShareProofFrame[] = [
  {
    id: 'insights-01',
    src: '/larpdms/processed/postshares/insights-01.webp',
    alt: 'Reel insights — 306,000 views, 44,000 shares',
    views: '306,000',
    shares: '44,000',
  },
  {
    id: 'insights-02',
    src: '/larpdms/processed/postshares/insights-02.webp',
    alt: 'Reel insights — 290,000 views, 21,000 shares',
    views: '290,000',
    shares: '21,000',
  },
  {
    id: 'insights-03',
    src: '/larpdms/processed/postshares/insights-03.webp',
    alt: 'Reel insights — 120,000 views, 19,000 shares',
    views: '120,000',
    shares: '19,000',
  },
]

export const SHARE_PROOF_AGGREGATE = {
  views: '890k+',
  shares: '97k+',
  suffix: 'across the reels we manage',
} as const

export const SHARE_MECHANISM_COPY = {
  eyebrow: 'Content mechanism',
  badge: '2–4× higher share-to-like ratio than typical startup content',
  title: 'Built to be shared — not just liked',
  sub: 'High share rates = cold reach + inbound. These reels prove it.',
} as const

export const VOLUME_STAT =
  'We regularly produce 200+ reels per week across our clients using our high-volume system'

export const COMBINED_PROOF_COPY = {
  proofHeadline: '200K views. 24 hours. One reel.',
  proofSub: 'Longsword Digital. A single Growzilla-produced reel.',
  shareBridge: 'Built to be shared — not just liked',
  shareSub: 'High share rates drive cold reach. These reels prove the system scales.',
} as const