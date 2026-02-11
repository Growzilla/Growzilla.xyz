import type { NextApiRequest, NextApiResponse } from 'next';
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSessionCookie,
  verifySessionToken,
} from '@/lib/admin/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = getSessionCookie(req);
    const authenticated = !!token && verifySessionToken(token);
    return res.json({ authenticated });
  }

  if (req.method === 'POST') {
    const { password } = req.body || {};
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password required' });
    }

    if (!verifyPassword(password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = createSessionToken();
    setSessionCookie(res, token);
    return res.json({ success: true });
  }

  if (req.method === 'DELETE') {
    clearSessionCookie(res);
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
