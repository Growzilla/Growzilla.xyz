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

export const SOCIAL_TOOLS = [
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Instagram', domain: 'instagram.com' },
  { name: 'TikTok', domain: 'tiktok.com' },
  { name: 'CapCut', domain: 'capcut.com' },
] as const

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

export async function fetchSocialToolLogos(apiKey: string): Promise<BrandLogo[]> {
  return fetchLogosForBrands(SOCIAL_TOOLS, apiKey)
}