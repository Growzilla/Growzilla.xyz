import type { NextApiRequest, NextApiResponse } from 'next';
import { requireUserAuth } from '@/lib/user/auth';
import { getUserStoreDomain } from '@/lib/user/users';
import {
  getShop,
  getDashboardStats,
  getRevenueChart,
  getTopProducts,
  getInsights,
} from '@/lib/admin/ecomdash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = requireUserAuth(req, res);
  if (!email) return; // 401 already sent

  const domain = getUserStoreDomain(email);
  if (!domain) {
    return res.status(404).json({ error: 'No store linked to this account' });
  }

  const period = (req.query.period as string) || '30d';

  try {
    // Resolve domain → shop UUID
    const shop = await getShop(domain) as { shop_id?: string; name?: string; last_synced?: string };
    if (!shop?.shop_id) {
      return res.status(404).json({ error: 'Store not found in backend' });
    }

    const shopId = shop.shop_id;

    // Fetch all dashboard data in parallel
    const [stats, chart, products, insights] = await Promise.all([
      getDashboardStats(shopId).catch(() => null),
      getRevenueChart(shopId, period).catch(() => null),
      getTopProducts(shopId).catch(() => null),
      getInsights(shopId).catch(() => null),
    ]);

    return res.json({
      shop: {
        domain,
        name: shop.name || domain,
        shop_id: shopId,
        last_synced: shop.last_synced || null,
      },
      stats,
      chart,
      products,
      insights,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(502).json({ error: 'Failed to fetch dashboard data', detail: message });
  }
}
