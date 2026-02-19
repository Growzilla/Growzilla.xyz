/**
 * Download stock photos from Unsplash for SM dashboard thumbnails.
 * Run once: node scripts/download-thumbnails.mjs
 *
 * Uses direct Unsplash photo URLs (no API key needed).
 * Photos are free to use under Unsplash license.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/sm-thumbnails');

// Curated Unsplash photo IDs — skincare, beauty, portraits
const THUMBNAILS = [
  // ─── Creator Avatars (200x200 face crops) ──────────────────────
  {
    filename: 'avatar-sarah.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    desc: 'Sarah Chen - female portrait',
  },
  {
    filename: 'avatar-marcus.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    desc: 'Marcus Rivera - male portrait',
  },
  {
    filename: 'avatar-aisha.jpg',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    desc: 'Aisha Williams - female portrait',
  },
  {
    filename: 'avatar-jake.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    desc: 'Jake Thompson - male portrait',
  },
  {
    filename: 'avatar-priya.jpg',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    desc: 'Priya Sharma - female portrait',
  },

  // ─── Sarah's Posts ─────────────────────────────────────────────
  {
    filename: 'post-sarah-tt-01.jpg',
    url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    desc: 'Skincare serum close-up (TikTok: POV glow up)',
  },
  {
    filename: 'post-sarah-tt-02.jpg',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
    desc: 'Woman applying skincare (TikTok: morning routine)',
  },
  {
    filename: 'post-sarah-ig-01.jpg',
    url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    desc: 'GRWM beauty setup (IG: get ready with me)',
  },
  {
    filename: 'post-sarah-ig-02.jpg',
    url: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
    desc: 'Skincare product on marble (IG: holy grail product)',
  },
  {
    filename: 'post-sarah-tt-03.jpg',
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
    desc: 'Multiple serums lined up (TikTok: serum ranking)',
  },

  // ─── Marcus's Posts ────────────────────────────────────────────
  {
    filename: 'post-marcus-yt-01.jpg',
    url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&h=400&fit=crop',
    desc: 'Man skincare routine (YT: 30 day test)',
  },
  {
    filename: 'post-marcus-yt-02.jpg',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e68a0?w=400&h=400&fit=crop',
    desc: 'Skincare products flat lay (YT: derm review)',
  },
  {
    filename: 'post-marcus-ig-01.jpg',
    url: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop',
    desc: 'Product in hand (IG: quick review)',
  },

  // ─── Aisha's Posts ─────────────────────────────────────────────
  {
    filename: 'post-aisha-ig-01.jpg',
    url: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&h=400&fit=crop',
    desc: 'Night skincare routine (IG: night routine)',
  },
  {
    filename: 'post-aisha-tt-01.jpg',
    url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    desc: 'Skincare haul unboxing (TikTok: made me buy)',
  },
  {
    filename: 'post-aisha-ig-02.jpg',
    url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
    desc: 'Product flat lay on white (IG: flat lay routine)',
  },

  // ─── Jake's Posts ──────────────────────────────────────────────
  {
    filename: 'post-jake-tt-01.jpg',
    url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop',
    desc: 'Guy trying skincare (TikTok: GF made me try)',
  },
  {
    filename: 'post-jake-tt-02.jpg',
    url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=400&fit=crop',
    desc: 'Affordable skincare products (TikTok: affordable)',
  },

  // ─── Priya's Posts ─────────────────────────────────────────────
  {
    filename: 'post-priya-ig-01.jpg',
    url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
    desc: 'Moisturizer texture (IG: gentle skincare)',
  },
  {
    filename: 'post-priya-yt-01.jpg',
    url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop',
    desc: 'Full skincare routine display (YT: full routine)',
  },
  {
    filename: 'post-priya-ig-02.jpg',
    url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    desc: 'Top products ranked (IG: top 3)',
  },
];

async function downloadImage(url, filepath) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Growzilla-Dashboard/1.0' },
      redirect: 'follow',
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log(`Downloading ${THUMBNAILS.length} images to ${OUT_DIR}...\n`);

  let success = 0;
  let failed = 0;

  for (const thumb of THUMBNAILS) {
    const filepath = path.join(OUT_DIR, thumb.filename);
    process.stdout.write(`  ↓ ${thumb.filename} (${thumb.desc})... `);

    const ok = await downloadImage(thumb.url, filepath);
    if (ok) {
      const size = fs.statSync(filepath).size;
      console.log(`✓ ${(size / 1024).toFixed(0)}KB`);
      success++;
    } else {
      failed++;
    }

    // Small delay to be respectful to Unsplash
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nDone! ${success} downloaded, ${failed} failed.`);
}

main().catch(console.error);
