import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'deck-submissions.json');

export interface DeckSubmission {
  id: string;
  store: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  ipHash: string;
  userAgent: string;
}

function readSubmissions(): DeckSubmission[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

function writeSubmissions(subs: DeckSubmission[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(subs, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { store, name, email, message } = req.body || {};

    if (!store || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
    const { createHash } = require('crypto');

    const submission: DeckSubmission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      store: store.replace('.myshopify.com', '').trim(),
      name: name.trim(),
      email: email.trim(),
      message: (message || '').trim(),
      timestamp: new Date().toISOString(),
      ipHash: createHash('sha256').update(ip + 'growzilla-deck-salt').digest('hex').slice(0, 12),
      userAgent: (req.headers['user-agent'] || '').slice(0, 200),
    };

    const subs = readSubmissions();
    subs.push(submission);
    writeSubmissions(subs);

    return res.status(200).json({ ok: true });
  }

  if (req.method === 'GET') {
    const subs = readSubmissions();
    return res.status(200).json({ submissions: subs });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
