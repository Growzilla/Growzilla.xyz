import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import { updateApplication } from '@/lib/careers/applications';
import type { ApplicantStatus, JobApplication } from '@/types/careers';

const VALID_STATUSES: ApplicantStatus[] = [
  'new',
  'reviewed',
  'trial',
  'shortlisted',
  'rejected',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobApplication | { error: string }>,
) {
  if (!requireAuth(req, res)) return;

  const id = typeof req.query.id === 'string' ? req.query.id : '';
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const patch: Partial<Pick<JobApplication, 'status' | 'notes'>> = {};

  if (typeof body.status === 'string') {
    if (!VALID_STATUSES.includes(body.status as ApplicantStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    patch.status = body.status as ApplicantStatus;
  }

  if (typeof body.notes === 'string') {
    patch.notes = body.notes.trim();
  }

  if (Object.keys(patch).length === 0) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  try {
    const updated = await updateApplication(id, patch);
    if (!updated) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json(updated);
  } catch (err) {
    console.error('[admin/applicants/patch]', err);
    return res.status(500).json({ error: 'Update failed' });
  }
}