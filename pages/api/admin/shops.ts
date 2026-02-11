import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import { getEnrichedShops, addShop, removeShop } from '@/lib/admin/shops';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAuth(req, res)) return;

  if (req.method === 'GET') {
    try {
      const shops = await getEnrichedShops();
      return res.json({ data: shops });
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  if (req.method === 'POST') {
    const { domain, label } = req.body || {};
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ error: 'domain is required' });
    }

    try {
      const entry = addShop(domain.trim(), (label || domain).trim());
      return res.status(201).json({ data: entry });
    } catch (err) {
      return res.status(409).json({ error: (err as Error).message });
    }
  }

  if (req.method === 'DELETE') {
    const { domain } = req.body || {};
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ error: 'domain is required' });
    }

    try {
      removeShop(domain.trim());
      return res.json({ success: true });
    } catch (err) {
      return res.status(404).json({ error: (err as Error).message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
