# RapidAPI Integration Guide: Social Media Data

## Overview
For production `/smdashboard`, you need real social media post data. Here are the exact RapidAPI endpoints and alternatives for each platform.

---

## 1. Instagram

### Option A: RapidAPI — Instagram Scraper API
**Endpoint**: `instagram-scraper-api2.p.rapidapi.com`

```typescript
// Get user media
const response = await fetch(
  'https://instagram-scraper-api2.p.rapidapi.com/v1/user_medias?user_id=12345',
  {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com',
    },
  }
);

// Response includes:
// - id, caption, media_type (IMAGE, VIDEO, CAROUSEL)
// - like_count, comment_count
// - thumbnail_url, media_url
// - timestamp
```

**Pricing**: ~$10/month for 500 requests

### Option B: Official Meta Graph API (Recommended for Production)
**Endpoint**: `graph.facebook.com/v21.0`

```typescript
// Get user media with insights
const response = await fetch(
  `https://graph.facebook.com/v21.0/${igUserId}/media?fields=id,caption,media_type,thumbnail_url,timestamp,like_count,comments_count&access_token=${accessToken}`
);

// Get media insights (engagement)
const insights = await fetch(
  `https://graph.facebook.com/v21.0/${mediaId}/insights?metric=engagement,impressions,reach,saved&access_token=${accessToken}`
);
```

**Pricing**: Free (with approved Meta app)

---

## 2. TikTok

### Option A: RapidAPI — TikTok Scraper
**Endpoint**: `tiktok-scraper7.p.rapidapi.com`

```typescript
// Get user videos
const response = await fetch(
  'https://tiktok-scraper7.p.rapidapi.com/user/posts?user_id=12345&count=20',
  {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com',
    },
  }
);

// Response includes:
// - id, desc (caption), createTime
// - stats: playCount, diggCount (likes), commentCount, shareCount
// - video: cover (thumbnail), playAddr (video URL)
```

**Pricing**: ~$15/month for 1000 requests

### Option B: Official TikTok API for Business
**Endpoint**: `open.tiktokapis.com`

```typescript
// Requires OAuth2 creator authorization
const response = await fetch(
  'https://open.tiktokapis.com/v2/video/list/',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_count: 20,
      fields: ['id', 'title', 'video_description', 'create_time',
               'like_count', 'comment_count', 'share_count', 'view_count',
               'cover_image_url'],
    }),
  }
);
```

**Pricing**: Free (with approved TikTok developer app)

---

## 3. YouTube

### YouTube Data API v3 (Official — Recommended)
**Endpoint**: `googleapis.com/youtube/v3`

```typescript
// Get channel videos
const searchRes = await fetch(
  `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&key=${apiKey}`
);

// Get video statistics
const videoIds = searchRes.items.map(item => item.id.videoId).join(',');
const statsRes = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
);

// Response includes per video:
// - snippet: title, description, publishedAt, thumbnails
// - statistics: viewCount, likeCount, commentCount, favoriteCount
```

**Pricing**: Free, 10,000 quota units/day
- Search request: 100 units
- Video details: 1 unit per video
- ~95 searches + 500 video lookups per day

### RapidAPI Alternative — YouTube v3 (unofficial, higher limits)
**Endpoint**: `youtube-v31.p.rapidapi.com`

```typescript
const response = await fetch(
  `https://youtube-v31.p.rapidapi.com/search?channelId=${channelId}&part=snippet&order=date&maxResults=20`,
  {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
  }
);
```

---

## 4. Recommended Setup for MVP

### Phase 1: Demo (Current)
- All mock data, no API calls
- Static SVG thumbnails

### Phase 2: Real Data (One Store)
1. Use **Official Meta Graph API** for Instagram (free, reliable)
2. Use **RapidAPI TikTok Scraper** ($15/mo) until TikTok developer app approved
3. Use **YouTube Data API v3** (free, 10K quota/day)

### Phase 3: Scale
1. All official APIs (Meta, TikTok, YouTube)
2. Background sync jobs every 6 hours
3. Webhook-based order attribution (real-time)
4. Cache social media data in PostgreSQL

---

## 5. Environment Variables Needed

```bash
# .env.local
RAPIDAPI_KEY=your_rapidapi_key_here

# Meta / Instagram
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_long_lived_token

# TikTok
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

# YouTube
YOUTUBE_API_KEY=your_youtube_api_key

# OpenRouter (already have this)
OPENROUTER_API_KEY=sk-or-v1-...
```

---

## 6. Data Sync Architecture

```
┌─────────────────────────────────────────────────┐
│  Cron Job (every 6 hours)                        │
│                                                   │
│  For each creator:                                │
│    1. Fetch latest posts from platform API        │
│    2. Upsert into posts table                     │
│    3. Update engagement metrics                   │
│    4. Match with Shopify orders via UTM           │
│    5. Calculate attribution & commission          │
│                                                   │
│  After all creators synced:                       │
│    6. Generate AI insights                        │
│    7. Cache aggregated metrics                    │
└─────────────────────────────────────────────────┘
```
