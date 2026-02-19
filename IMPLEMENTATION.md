# Implementation Guide: Creator Revenue Hub → Production

## Overview
This document describes how to turn the `/smdashboard` mock demo into a fully functional production system with real data.

---

## 1. Authentication & User Binding

### Current State
- Public demo page, no auth required
- Mock data hardcoded in `data/mockSMData.ts`

### Production Implementation

#### A. User Authentication
Reuse existing `lib/user/auth.ts` (scrypt-based sessions):

```typescript
// pages/smdashboard.tsx — wrap with auth gate
import UserLoginGate from '@/components/user/UserLoginGate';

// In the component:
<UserLoginGate>
  <SMDashboardContent />
</UserLoginGate>
```

#### B. User → Organization Binding
Add to backend API (`ecomdash-api`):

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  shop_id UUID REFERENCES shops(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE organization_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  creator_name VARCHAR(255) NOT NULL,
  creator_handle VARCHAR(255),
  platforms TEXT[] DEFAULT '{}',
  commission_rate DECIMAL(5,4) DEFAULT 0.15,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 2. Social Media API Integration

### Meta (Instagram) API

**Required Endpoints:**
- `GET /v21.0/{ig-user-id}/media` — List user media
- `GET /v21.0/{media-id}/insights` — Media engagement metrics
- `GET /v21.0/{ig-user-id}/insights` — Account-level insights

**Setup:**
1. Create Meta App at developers.facebook.com
2. Request `instagram_basic`, `instagram_manage_insights` permissions
3. Get long-lived access token (60 days, auto-refresh)

**Data Flow:**
```
Webhook: Instagram posts → Backend receives → Store in DB → Attribute via UTM
```

### TikTok API

**Required Endpoints:**
- `GET /v2/video/list/` — User videos
- `GET /v2/video/query/` — Video details + metrics

**Setup:**
1. Apply at developers.tiktok.com
2. Request `video.list`, `video.insights` scopes
3. OAuth2 flow for creator authorization

### YouTube Data API v3

**Required Endpoints:**
- `GET /youtube/v3/channels` — Channel info
- `GET /youtube/v3/search` — Channel videos
- `GET /youtube/v3/videos` — Video statistics

**Setup:**
1. Enable YouTube Data API v3 in Google Cloud Console
2. Create OAuth2 credentials
3. 10,000 quota units/day (free tier)

---

## 3. Revenue Attribution (UTM Tracking)

### How Attribution Works

Each creator gets unique UTM links:

```
https://store.myshopify.com/products/glow-serum?
  utm_source=instagram&
  utm_medium=creator&
  utm_campaign=sarah_chen&
  utm_content=reel_47
```

### Shopify Webhook Integration

**Listen for `orders/create` webhook:**

```typescript
// Backend: POST /webhooks/shopify/orders
async function handleOrder(order: ShopifyOrder) {
  const landingPage = order.landing_site; // Contains UTM params
  const params = new URLSearchParams(landingPage.split('?')[1]);

  const attribution = {
    source: params.get('utm_source'),      // 'instagram'
    medium: params.get('utm_medium'),      // 'creator'
    campaign: params.get('utm_campaign'),  // 'sarah_chen'
    content: params.get('utm_content'),    // 'reel_47'
    order_id: order.id,
    revenue: parseFloat(order.total_price),
    created_at: order.created_at,
  };

  await db.insert('post_attributions', attribution);
}
```

### Database Schema

```sql
CREATE TABLE post_attributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  creator_id UUID REFERENCES organization_creators(id),
  post_id VARCHAR(255),  -- External platform post ID
  platform VARCHAR(20),
  order_id VARCHAR(255),
  revenue DECIMAL(10,2),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_content VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_attributions_creator ON post_attributions(creator_id);
CREATE INDEX idx_attributions_platform ON post_attributions(platform);
CREATE INDEX idx_attributions_created ON post_attributions(created_at);
```

---

## 4. AI Insights Engine

### Current State
- Static mock insights in `mockSMData.ts`
- "Create Template" shows static pre-written content

### Production Implementation

Use OpenRouter API with Claude or GPT-4o for real-time analysis:

```typescript
// Backend: POST /api/insights/generate
async function generateInsights(orgId: string) {
  const data = await getOrgAnalytics(orgId); // Aggregate DB data

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [{
        role: 'user',
        content: `You are a social media revenue analyst. Analyze this creator performance data and generate 4-5 actionable insights. Each insight should reference specific creators, posts, and metrics. Format as JSON array.

Data: ${JSON.stringify(data)}`
      }],
    }),
  });

  return response.json();
}
```

### Template Generation (Real-Time)

```typescript
// Backend: POST /api/templates/generate
async function generateTemplate(insightId: string, postData: object) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [{
        role: 'user',
        content: `Based on this high-performing post data, generate a replicable content template with: hook, script steps, hashtags, and recording notes. Format as JSON.

Post data: ${JSON.stringify(postData)}`
      }],
    }),
  });

  return response.json();
}
```

---

## 5. Real-Time Dashboard API

### New Backend Endpoints

```
GET  /api/sm/org/:orgId/kpis?period=30d
GET  /api/sm/org/:orgId/creators
GET  /api/sm/org/:orgId/platform-metrics?period=30d
GET  /api/sm/org/:orgId/revenue-chart?period=30d
GET  /api/sm/org/:orgId/top-posts?limit=5&platform=all
GET  /api/sm/creator/:creatorId/kpis?period=30d
GET  /api/sm/creator/:creatorId/posts?platform=all&sort=revenue
GET  /api/sm/post/:postId/details
POST /api/sm/insights/generate
POST /api/sm/templates/generate
```

### Frontend Hook

```typescript
// hooks/useSMDashboard.ts
export function useSMDashboard(orgId: string, period: DateRange) {
  const [data, setData] = useState<SMDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(`/api/sm/org/${orgId}/dashboard?period=${period}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, [orgId, period]);

  return { data, loading };
}
```

---

## 6. CORS Configuration

Add your Next.js domain to backend ALLOWED_ORIGINS:

```python
# Backend: config.py
ALLOWED_ORIGINS = [
    "https://growzilla.xyz",
    "https://www.growzilla.xyz",
    "http://localhost:3000",  # Development
]
```

---

## 7. Migration Checklist

- [ ] Add `organizations` and `organization_creators` tables to PostgreSQL
- [ ] Add `post_attributions` table with indexes
- [ ] Create new API endpoints in ecomdash-api
- [ ] Set up Meta/TikTok/YouTube API credentials
- [ ] Configure Shopify `orders/create` webhook
- [ ] Implement UTM link generator for creators
- [ ] Wire frontend hooks to real API
- [ ] Add OpenRouter API calls for insights + templates
- [ ] Update CORS configuration
- [ ] Add error handling and loading states for real data
