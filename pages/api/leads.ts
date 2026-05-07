import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    email,
    whatsapp,
    store_url,
    source,
    name,
    phone,
    monthly_ad_spend,
    tier_self_select,
  } = req.body || {};

  if (!email || !store_url) {
    return res.status(400).json({ error: 'Email and store URL are required' });
  }

  const cleanUrl = String(store_url).toLowerCase().trim();
  const cleanSource = typeof source === 'string' ? source : 'landing';

  // Agency funnel sources accept any domain (custom domains, Shopify or otherwise).
  // SaaS funnel still enforces .myshopify.com to keep install-flow assumptions intact.
  const isAgencySource = cleanSource.startsWith('agency_');
  if (!isAgencySource && !cleanUrl.includes('.myshopify.com')) {
    return res.status(400).json({ error: 'Invalid .myshopify.com URL' });
  }

  try {
    const backendUrl = process.env.ECOMDASH_API_URL;
    if (backendUrl) {
      await fetch(`${backendUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          whatsapp,
          store_url: cleanUrl,
          source: cleanSource,
          name,
          phone,
          monthly_ad_spend,
          tier_self_select,
        }),
      }).catch(() => {
        // Backend may not have these fields yet — don't fail the request
      });
    }

    // Visible in Vercel logs while backend schema catches up
    console.log('[LEAD]', {
      email,
      store_url: cleanUrl,
      source: cleanSource,
      name,
      phone,
      monthly_ad_spend,
      tier_self_select,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
