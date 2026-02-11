import { createHmac, timingSafeEqual } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

const COOKIE_NAME = 'growzilla_admin';
const MAX_AGE = 86400; // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('ADMIN_SECRET env var is required');
  return secret;
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmac('sha256', getSecret()).update(timestamp).digest('hex');
  return `${timestamp}:${hmac}`;
}

export function verifySessionToken(token: string): boolean {
  const parts = token.split(':');
  if (parts.length !== 2) return false;

  const [timestamp, providedHmac] = parts;
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age < 0 || age > MAX_AGE * 1000) return false;

  const expectedHmac = createHmac('sha256', getSecret()).update(timestamp).digest('hex');

  try {
    return timingSafeEqual(
      Buffer.from(providedHmac, 'hex'),
      Buffer.from(expectedHmac, 'hex')
    );
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Constant-time comparison
  if (password.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function setSessionCookie(res: NextApiResponse, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; ${isProduction ? 'Secure; ' : ''}SameSite=Strict; Path=/; Max-Age=${MAX_AGE}`
  );
}

export function clearSessionCookie(res: NextApiResponse): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`
  );
}

export function getSessionCookie(req: NextApiRequest): string | null {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const match = cookies.split(';').find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;

  return match.split('=')[1]?.trim() || null;
}

export function requireAuth(req: NextApiRequest, res: NextApiResponse): boolean {
  const token = getSessionCookie(req);
  if (!token || !verifySessionToken(token)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}
