/**
 * POST /api/setup
 * ================
 * Creates a Growzilla account for a merchant coming from the Shopify app.
 *
 * 1. Validates inputs
 * 2. Resolves shop domain → shop UUID via backend
 * 3. Calls bootstrapOrg to create org + owner
 * 4. Auto-logs in and returns JWT token
 * 5. Returns redirect URL to dashboard
 */

import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';
const ADMIN_KEY = process.env.ADMIN_API_KEY || '';

interface SetupBody {
  store: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { store, name, email, password, phone } = req.body as SetupBody;

  // ── Validation ──────────────────────────────────────────────
  if (!store || !store.includes('.myshopify.com')) {
    return res.status(400).json({ error: 'Invalid store domain.' });
  }
  if (!name || name.trim().length < 1) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  // ── Resolve shop UUID ───────────────────────────────────────
  let shopId: string;
  try {
    const shopRes = await fetch(`${API_BASE}/api/shops/${encodeURIComponent(store)}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': ADMIN_KEY,
      },
    });

    if (!shopRes.ok) {
      return res.status(400).json({
        error: 'Store not found. Please install the Growzilla app first.',
      });
    }

    const shopData = await shopRes.json();
    shopId = shopData.id;
  } catch {
    return res.status(500).json({ error: 'Unable to connect to backend. Try again.' });
  }

  // ── Bootstrap org + owner ───────────────────────────────────
  // Generate a clean slug from the store domain
  const slug = store
    .replace('.myshopify.com', '')
    .replace(/[^a-z0-9-]/gi, '-')
    .toLowerCase();

  try {
    const bootstrapRes = await fetch(`${API_BASE}/api/shops/${shopId}/bootstrap-org`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': ADMIN_KEY,
      },
      body: JSON.stringify({
        org_name: name.trim(),
        org_slug: slug,
        owner_name: name.trim(),
        owner_email: email.trim(),
        owner_password: password,
        admin_key: ADMIN_KEY,
        ...(phone ? { owner_phone: phone.trim() } : {}),
      }),
    });

    if (!bootstrapRes.ok) {
      const errData = await bootstrapRes.json().catch(() => null);
      const message = errData?.detail || errData?.error || 'Account creation failed.';

      // Handle "already exists" gracefully
      if (bootstrapRes.status === 409 || message.toLowerCase().includes('already')) {
        return res.status(409).json({
          error: 'An account already exists for this store. Try signing in instead.',
        });
      }

      return res.status(400).json({ error: message });
    }
  } catch {
    return res.status(500).json({ error: 'Account creation failed. Try again.' });
  }

  // ── Auto-login ──────────────────────────────────────────────
  let token: string | null = null;
  try {
    const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'org_owner',
        identifier: store,
        password,
      }),
    });

    if (loginRes.ok) {
      const loginData = await loginRes.json();
      token = loginData.token || null;
    }
  } catch {
    // Login failed but account was created — they can sign in manually
  }

  return res.status(200).json({
    success: true,
    token,
    shopId,
    redirectUrl: token ? `/admin/store/${encodeURIComponent(store)}` : '/login',
  });
}
