import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import { listApplications } from '@/lib/careers/applications';
import type { ApplicantsResponse } from '@/types/careers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApplicantsResponse | { error: string }>,
) {
  if (!requireAuth(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await listApplications();
    data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return res.status(200).json({ data, total: data.length });
  } catch (err) {
    console.error('[admin/applicants]', err);
    return res.status(500).json({ error: 'Failed to load applicants' });
  }
}