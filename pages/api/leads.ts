import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, whatsapp, store_url } = req.body;

  if (!email || !store_url) {
    return res.status(400).json({ error: 'Email and store URL are required' });
  }

  // Validate store URL format
  const cleanUrl = store_url.toLowerCase().trim();
  if (!cleanUrl.includes('.myshopify.com')) {
    return res.status(400).json({ error: 'Invalid .myshopify.com URL' });
  }

  try {
    // Store lead in backend
    const backendUrl = process.env.ECOMDASH_API_URL;
    if (backendUrl) {
      await fetch(`${backendUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, whatsapp, store_url: cleanUrl }),
      }).catch(() => {
        // Backend might not have this endpoint yet — don't fail the request
      });
    }

    // Log for now (visible in Vercel logs)
    console.log('[LEAD]', { email, whatsapp, store_url: cleanUrl, timestamp: new Date().toISOString() });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
