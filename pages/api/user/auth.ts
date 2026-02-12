import type { NextApiRequest, NextApiResponse } from 'next';
import {
  verifyPasswordHash,
  createUserSessionToken,
  setUserSessionCookie,
  clearUserSessionCookie,
  getUserSessionCookie,
  verifyUserSessionToken,
} from '@/lib/user/auth';
import { findUserByEmail, updateLastLogin } from '@/lib/user/users';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = getUserSessionCookie(req);
    if (!token) return res.json({ authenticated: false, email: null });

    const result = verifyUserSessionToken(token);
    if (!result.valid) return res.json({ authenticated: false, email: null });

    return res.json({ authenticated: true, email: result.email });
  }

  if (req.method === 'POST') {
    const { email, password } = req.body || {};
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = findUserByEmail(email);
    if (!user || !verifyPasswordHash(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = createUserSessionToken(email.toLowerCase());
    setUserSessionCookie(res, token);
    updateLastLogin(email);

    return res.json({ success: true, email: user.email, name: user.name });
  }

  if (req.method === 'DELETE') {
    clearUserSessionCookie(res);
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
