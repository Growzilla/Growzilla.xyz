import { createHmac, scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

const COOKIE_NAME = 'growzilla_user';
const MAX_AGE = 86400; // 24 hours

// scrypt params: N=16384, r=8, p=1, keyLen=64
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LEN = 64;

function getSecret(): string {
  const secret = process.env.USER_SECRET;
  if (!secret) throw new Error('USER_SECRET env var is required');
  return secret;
}

// === Password Hashing ===

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  }).toString('hex');
  return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt}$${hash}`;
}

export function verifyPasswordHash(password: string, stored: string): boolean {
  const parts = stored.split('$');
  // format: scrypt$N$r$p$salt$hash
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

  const [, n, r, p, salt, hash] = parts;
  const derived = scryptSync(password, salt, KEY_LEN, {
    N: parseInt(n, 10),
    r: parseInt(r, 10),
    p: parseInt(p, 10),
  }).toString('hex');

  try {
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derived, 'hex'));
  } catch {
    return false;
  }
}

// === Session Tokens ===

export function createUserSessionToken(email: string): string {
  const timestamp = Date.now().toString();
  const payload = `${email}:${timestamp}`;
  const hmac = createHmac('sha256', getSecret()).update(payload).digest('hex');
  return `${email}:${timestamp}:${hmac}`;
}

export function verifyUserSessionToken(token: string): { valid: true; email: string } | { valid: false } {
  const parts = token.split(':');
  if (parts.length !== 3) return { valid: false };

  const [email, timestamp, providedHmac] = parts;
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age < 0 || age > MAX_AGE * 1000) return { valid: false };

  const payload = `${email}:${timestamp}`;
  const expectedHmac = createHmac('sha256', getSecret()).update(payload).digest('hex');

  try {
    const valid = timingSafeEqual(
      Buffer.from(providedHmac, 'hex'),
      Buffer.from(expectedHmac, 'hex')
    );
    return valid ? { valid: true, email } : { valid: false };
  } catch {
    return { valid: false };
  }
}

// === Cookie Management ===

export function setUserSessionCookie(res: NextApiResponse, token: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; ${isProduction ? 'Secure; ' : ''}SameSite=Strict; Path=/; Max-Age=${MAX_AGE}`
  );
}

export function clearUserSessionCookie(res: NextApiResponse): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`
  );
}

export function getUserSessionCookie(req: NextApiRequest): string | null {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const match = cookies.split(';').find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;

  return match.split('=').slice(1).join('=')?.trim() || null;
}

// === Auth Middleware ===

export function requireUserAuth(req: NextApiRequest, res: NextApiResponse): string | null {
  const token = getUserSessionCookie(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  const result = verifyUserSessionToken(token);
  if (!result.valid) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  return result.email;
}
