import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'deck-views.json');

export interface DeckView {
  id: string;
  viewer: string | null;
  slide: string;
  timestamp: string;
  ipHash: string;
  userAgent: string;
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

function readViews(): DeckView[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

function writeViews(views: DeckView[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(views, null, 2));
}

function hashIP(ip: string): string {
  return createHash('sha256').update(ip + 'growzilla-deck-salt').digest('hex').slice(0, 12);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slide, viewer } = req.body || {};
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';

    const view: DeckView = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      viewer: viewer || null,
      slide: slide || 'unknown',
      timestamp: new Date().toISOString(),
      ipHash: hashIP(ip),
      userAgent: (req.headers['user-agent'] || '').slice(0, 200),
      referrer: (req.headers['referer'] || '').slice(0, 500),
      utmSource: (req.query.utm_source as string) || null,
      utmMedium: (req.query.utm_medium as string) || null,
      utmCampaign: (req.query.utm_campaign as string) || null,
    };

    const views = readViews();
    views.push(view);
    writeViews(views);

    return res.status(200).json({ ok: true });
  }

  if (req.method === 'GET') {
    // Protected: only admin can read views
    const views = readViews();

    // Group by session (same ipHash within 30 min)
    const sessions: Record<string, { viewer: string | null; ipHash: string; firstSeen: string; lastSeen: string; slides: string[]; userAgent: string; referrer: string }> = {};

    for (const v of views) {
      const sessionKey = v.ipHash;
      if (!sessions[sessionKey]) {
        sessions[sessionKey] = {
          viewer: v.viewer,
          ipHash: v.ipHash,
          firstSeen: v.timestamp,
          lastSeen: v.timestamp,
          slides: [],
          userAgent: v.userAgent,
          referrer: v.referrer,
        };
      }
      const s = sessions[sessionKey];
      if (v.viewer && !s.viewer) s.viewer = v.viewer;
      if (v.timestamp > s.lastSeen) s.lastSeen = v.timestamp;
      if (!s.slides.includes(v.slide)) s.slides.push(v.slide);
    }

    return res.status(200).json({
      totalViews: views.length,
      uniqueVisitors: Object.keys(sessions).length,
      sessions: Object.values(sessions).sort((a, b) => b.lastSeen.localeCompare(a.lastSeen)),
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
