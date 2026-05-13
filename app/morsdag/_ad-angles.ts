/**
 * Reference only. Suggested Meta ad angles for /morsdag.
 * See AGENCY_REVAMP_PLAN.md for /agency pattern.
 *
 * Not imported by the page. This file exists so the page owner has the four
 * launch ad concepts colocated with the landing they route to. Pair each
 * angle's headline + CTA with creatives in `/dev/projects/Growzilla.xyz/public/`
 * or per-brand asset folder before launching in Meta Ads Manager.
 */

export type MorsdagAdAngle = {
  id: string
  name: string
  headline: string
  primaryText: string
  cta: string
}

export const MORSDAG_AD_ANGLES: MorsdagAdAngle[] = [
  {
    id: 'urgency',
    name: 'Urgency · ni hinner fortfarande',
    headline: 'Ni hinner fortfarande få ut en riktig Morsdag-kampanj.',
    primaryText:
      'Mors dag är 31 maj. Vi bygger och lanserar en komplett kampanj — erbjudande, creatives, Meta ads, email/SMS och Shopify-sida — live inom 72 timmar. För svenska Shopify-brands som redan säljer.',
    cta: 'Ansök om Morsdag Launch',
  },
  {
    id: 'selective',
    name: 'Selective · begränsat antal platser',
    headline:
      'Vi tar in ett begränsat antal brands för Morsdag Launch.',
    primaryText:
      'Varje launch kräver snabb execution — 72h från brief till live. Bra fit går vidare till bokning, osäkra case granskas manuellt. Ansök om plats innan deadline.',
    cta: 'Ansök om plats',
  },
  {
    id: 'no-launch-yet',
    name: 'No-launch-yet · ett inlägg räcker inte',
    headline:
      'Ett inlägg och en rabattkod räcker sällan när konkurrenterna trycker hårt.',
    primaryText:
      'Vi paketerar produkten, bygger kampanjen, skapar creatives, sätter upp Meta-annonsering och driver urgency fram till Mors dag. Live inom 72 timmar.',
    cta: 'Se vad som ingår',
  },
  {
    id: 'shopify-speed',
    name: 'Shopify-speed · live inom 72h',
    headline:
      'Komplett Morsdag-kampanj live på er Shopify inom 72 timmar.',
    primaryText:
      'Banner, kampanjsektion, rabattkod, landningssida, Meta-annonsering och email/SMS-utskick. Vi gör jobbet. Ni levererar ordrarna.',
    cta: 'Ansök om Morsdag Launch',
  },
]
