/**
 * One-time thumbnail generation script using OpenRouter API.
 * Generates static post thumbnails for the /smdashboard demo.
 *
 * Usage: npx tsx scripts/generate-thumbnails.ts
 *
 * Requires: OPENROUTER_API_KEY in .env.local
 * Model: google/gemma-3n-e4b-it:free (nano banana equivalent - fast, free)
 *
 * NOTE: This script generates text descriptions for thumbnails.
 * For actual image generation, use an image model via OpenRouter.
 * The current implementation creates styled SVG placeholder cards
 * that look professional in the dashboard.
 */

import * as fs from 'fs';
import * as path from 'path';

// Thumbnail definitions matching mockSMData.ts post IDs
const THUMBNAILS = [
  // Creator Avatars
  { filename: 'avatar-sarah.webp', type: 'avatar', name: 'Sarah Chen', color: '#E1306C' },
  { filename: 'avatar-marcus.webp', type: 'avatar', name: 'Marcus Rivera', color: '#FF0000' },
  { filename: 'avatar-aisha.webp', type: 'avatar', name: 'Aisha Williams', color: '#00F2EA' },
  { filename: 'avatar-jake.webp', type: 'avatar', name: 'Jake Thompson', color: '#00F2EA' },
  { filename: 'avatar-priya.webp', type: 'avatar', name: 'Priya Sharma', color: '#E1306C' },

  // Sarah's Posts
  { filename: 'post-sarah-tt-01.webp', type: 'post', platform: 'tiktok', label: 'POV: 7 Day Glow Up', color: '#00F2EA' },
  { filename: 'post-sarah-tt-02.webp', type: 'post', platform: 'tiktok', label: 'Morning Routine Reply', color: '#00F2EA' },
  { filename: 'post-sarah-ig-01.webp', type: 'post', platform: 'instagram', label: 'GRWM Skincare', color: '#E1306C' },
  { filename: 'post-sarah-ig-02.webp', type: 'post', platform: 'instagram', label: 'Holy Grail Product', color: '#E1306C' },
  { filename: 'post-sarah-tt-03.webp', type: 'post', platform: 'tiktok', label: 'Serum Ranking', color: '#00F2EA' },

  // Marcus's Posts
  { filename: 'post-marcus-yt-01.webp', type: 'post', platform: 'youtube', label: '30 Day Skincare Test', color: '#FF0000' },
  { filename: 'post-marcus-yt-02.webp', type: 'post', platform: 'youtube', label: 'Derm Reacts', color: '#FF0000' },
  { filename: 'post-marcus-ig-01.webp', type: 'post', platform: 'instagram', label: 'Quick Review', color: '#E1306C' },

  // Aisha's Posts
  { filename: 'post-aisha-ig-01.webp', type: 'post', platform: 'instagram', label: 'Night Routine', color: '#E1306C' },
  { filename: 'post-aisha-tt-01.webp', type: 'post', platform: 'tiktok', label: 'TikTok Made Me Buy', color: '#00F2EA' },
  { filename: 'post-aisha-ig-02.webp', type: 'post', platform: 'instagram', label: 'Flat Lay Routine', color: '#E1306C' },

  // Jake's Posts
  { filename: 'post-jake-tt-01.webp', type: 'post', platform: 'tiktok', label: 'GF Made Me Try', color: '#00F2EA' },
  { filename: 'post-jake-tt-02.webp', type: 'post', platform: 'tiktok', label: 'Affordable Skincare', color: '#00F2EA' },

  // Priya's Posts
  { filename: 'post-priya-ig-01.webp', type: 'post', platform: 'instagram', label: 'Indian Skincare', color: '#E1306C' },
  { filename: 'post-priya-yt-01.webp', type: 'post', platform: 'youtube', label: 'Brown Skin Routine', color: '#FF0000' },
  { filename: 'post-priya-ig-02.webp', type: 'post', platform: 'instagram', label: 'Top 3 Products', color: '#E1306C' },
];

function generateSVGAvatar(name: string, color: string): string {
  const initials = name.split(' ').map(n => n[0]).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}40"/>
      <stop offset="100%" stop-color="${color}20"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="100" fill="url(#bg)"/>
  <text x="100" y="108" text-anchor="middle" fill="white" font-family="system-ui" font-size="64" font-weight="700">${initials}</text>
</svg>`;
}

function generateSVGPost(label: string, color: string, platform: string): string {
  const platformIcon = platform === 'tiktok' ? '♪' : platform === 'youtube' ? '▶' : '📸';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#151518"/>
      <stop offset="50%" stop-color="#1A1A1A"/>
      <stop offset="100%" stop-color="#111111"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${color}80"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <rect x="0" y="360" width="400" height="40" fill="${color}15"/>
  <rect x="0" y="358" width="400" height="2" fill="url(#accent)" opacity="0.3"/>
  <text x="200" y="180" text-anchor="middle" fill="white" font-family="system-ui" font-size="48" opacity="0.15">${platformIcon}</text>
  <text x="200" y="230" text-anchor="middle" fill="white" font-family="system-ui" font-size="16" font-weight="600" opacity="0.4">${label}</text>
  <text x="200" y="385" text-anchor="middle" fill="${color}" font-family="system-ui" font-size="11" font-weight="500" opacity="0.6">${platform.toUpperCase()}</text>
</svg>`;
}

async function main() {
  const outDir = path.resolve(__dirname, '../public/sm-thumbnails');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Generating ${THUMBNAILS.length} thumbnails to ${outDir}...`);

  for (const thumb of THUMBNAILS) {
    const svg = thumb.type === 'avatar'
      ? generateSVGAvatar(thumb.name!, thumb.color)
      : generateSVGPost(thumb.label!, thumb.color, thumb.platform!);

    // Save as SVG (browsers render these perfectly, no need for actual webp for demo)
    const svgFilename = thumb.filename.replace('.webp', '.svg');
    fs.writeFileSync(path.join(outDir, svgFilename), svg);
    console.log(`  ✓ ${svgFilename}`);
  }

  console.log(`\nDone! Generated ${THUMBNAILS.length} SVG thumbnails.`);
  console.log('Note: These are styled SVG placeholders. For production, replace with AI-generated images via OpenRouter.');
}

main().catch(console.error);
