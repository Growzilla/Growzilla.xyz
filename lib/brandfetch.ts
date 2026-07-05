export type BrandLogo = {
  name: string
  domain: string
  src: string | null
}

export const TRUST_BRANDS = [
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'OpenAI', domain: 'openai.com' },
] as const

export const PLATFORM_PARTNERS = [
  { name: 'Instagram', domain: 'instagram.com' },
  { name: 'Facebook', domain: 'facebook.com' },
  { name: 'TikTok', domain: 'tiktok.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'CapCut', domain: 'capcut.com' },
] as const

/** @deprecated Use PLATFORM_PARTNERS */
export const SOCIAL_TOOLS = PLATFORM_PARTNERS

const DEFAULT_CLIENT_ID = '1idEnrhL1OP0Mw2qbvS'

export type HeroWheelLogo = BrandLogo & {
  symbolSrc: string
  iconSrc: string
}

export function resolveBrandfetchClientId(apiKey: string): string {
  return apiKey || DEFAULT_CLIENT_ID
}

/** CDN URL — dark theme, transparent fallback, no white logo rects */
export function brandfetchCdnUrl(
  domain: string,
  clientId: string,
  opts?: { type?: 'symbol' | 'icon'; size?: number },
): string {
  const id = clientId || DEFAULT_CLIENT_ID
  const type = opts?.type ?? 'symbol'
  const size = opts?.size ?? 128
  return `https://cdn.brandfetch.io/domain/${domain}/w/${size}/h/${size}/theme/dark/fallback/transparent/type/${type}?c=${id}`
}

/** Hero wheel: CDN dark symbols only (skip API v2 — often returns light PNGs) */
export async function fetchHeroWheelLogos(apiKey: string): Promise<HeroWheelLogo[]> {
  const clientId = resolveBrandfetchClientId(apiKey)
  return PLATFORM_PARTNERS.map((brand) => {
    const symbolSrc = brandfetchCdnUrl(brand.domain, clientId, { type: 'symbol', size: 128 })
    const iconSrc = brandfetchCdnUrl(brand.domain, clientId, { type: 'icon', size: 128 })
    return {
      ...brand,
      src: symbolSrc,
      symbolSrc,
      iconSrc,
    }
  })
}

async function fetchBrandLogo(domain: string, apiKey: string): Promise<string | null> {
  const clientId = apiKey || '1idEnrhL1OP0Mw2qbvS'
  try {
    const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { Authorization: `Bearer ${clientId}` },
    })
    if (!res.ok) {
      return `https://cdn.brandfetch.io/${domain}/theme/dark/icon.png?c=${clientId}`
    }
    const data = await res.json()
    if (!data.logos || !Array.isArray(data.logos)) {
      return `https://cdn.brandfetch.io/${domain}/theme/dark/icon.png?c=${clientId}`
    }

    const priorityTypes = ['icon', 'symbol', 'logo']
    for (const type of priorityTypes) {
      const match = data.logos.find((l: { type: string }) => l.type === type)
      if (match?.formats?.length) {
        const png = match.formats.find((f: { format: string }) => f.format === 'png')
        if (png?.src) return png.src
        const svg = match.formats.find((f: { format: string }) => f.format === 'svg')
        if (svg?.src) return svg.src
      }
    }
    for (const logo of data.logos) {
      if (logo.formats?.length) {
        const fmt = logo.formats.find((f: { src?: string }) => f.src)
        if (fmt?.src) return fmt.src
      }
    }
    return `https://cdn.brandfetch.io/${domain}/theme/dark/icon.png?c=${clientId}`
  } catch {
    return `https://cdn.brandfetch.io/${domain}/theme/dark/icon.png?c=${clientId}`
  }
}

async function fetchLogosForBrands(
  brands: readonly { name: string; domain: string }[],
  apiKey: string,
): Promise<BrandLogo[]> {
  const clientId = apiKey || '1idEnrhL1OP0Mw2qbvS'
  const results = await Promise.allSettled(
    brands.map(async (brand) => ({
      ...brand,
      src: await fetchBrandLogo(brand.domain, clientId),
    })),
  )
  return results.map((r, i) =>
    r.status === 'fulfilled'
      ? r.value
      : {
          ...brands[i],
          src: `https://cdn.brandfetch.io/${brands[i].domain}/theme/dark/icon.png?c=${clientId}`,
        },
  )
}

export async function fetchTrustLogos(apiKey: string): Promise<BrandLogo[]> {
  return fetchLogosForBrands(TRUST_BRANDS, apiKey)
}

export async function fetchPlatformPartnerLogos(apiKey: string): Promise<BrandLogo[]> {
  return fetchLogosForBrands(PLATFORM_PARTNERS, apiKey)
}

export async function fetchSocialToolLogos(apiKey: string): Promise<BrandLogo[]> {
  return fetchPlatformPartnerLogos(apiKey)
}

export async function fetchGrowzillaSocialLogos(
  brands: readonly { name: string; domain: string; href: string }[],
  apiKey: string,
): Promise<(BrandLogo & { href: string })[]> {
  const logos = await fetchLogosForBrands(brands, apiKey)
  return logos.map((logo, i) => ({
    ...logo,
    href: brands[i].href,
  }))
}