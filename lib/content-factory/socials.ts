/** Growzilla Content Factory — swap hrefs when handles are confirmed. */
export const GROWZILLA_SOCIALS = [
  {
    name: 'Instagram',
    domain: 'instagram.com',
    href: 'https://instagram.com/growzilla',
  },
  {
    name: 'Facebook',
    domain: 'facebook.com',
    href: 'https://facebook.com/growzilla',
  },
  {
    name: 'TikTok',
    domain: 'tiktok.com',
    href: 'https://tiktok.com/@growzilla',
  },
] as const

export type GrowzillaSocial = (typeof GROWZILLA_SOCIALS)[number]