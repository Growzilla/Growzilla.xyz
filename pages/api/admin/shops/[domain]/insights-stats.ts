import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import { getEnrichedShops, resolveShopId } from '@/lib/admin/shops';
import { getInsightStats } from '@/lib/admin/ecomdash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAuth(req, res)) return;

  const { domain } = req.query;
  if (typeof domain !== 'string') return res.status(400).json({ error: 'Invalid domain' });

  try {
    const shops = await getEnrichedShops();
    const shopId = resolveShopId(shops, domain);
    if (!shopId) return res.status(404).json({ error: 'Shop not found or not connected' });

    const stats = await getInsightStats(shopId);
    return res.json({ data: stats });
  } catch (err) {
    return res.status(502).json({ error: (err as Error).message });
  }
}
