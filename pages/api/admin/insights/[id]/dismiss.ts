import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import { dismissInsight } from '@/lib/admin/ecomdash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAuth(req, res)) return;

  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid insight id' });

  try {
    const result = await dismissInsight(id);
    return res.json({ data: result });
  } catch (err) {
    return res.status(502).json({ error: (err as Error).message });
  }
}
