import type {
  Creator,
  Post,
  PlatformMetrics,
  RevenueDataPoint,
  SMInsight,
  OrgKPIs,
  SMDashboardData,
  UTMLink,
} from '@/types/smdashboard';

// ─── Creators ────────────────────────────────────────────────────────────────

const CREATORS: Creator[] = [
  {
    id: 'cr-sarah',
    name: 'Sarah Chen',
    handle: '@sarahglow',
    avatar: '/sm-thumbnails/avatar-sarah.jpg',
    platforms: ['tiktok', 'instagram'],
    totalRevenue: 87400,
    totalCommission: 13110,
    commissionRate: 0.15,
    conversionRate: 4.1,
    totalPosts: 34,
    postsThisPeriod: 12,
    revenueChange: 24.1,
  },
  {
    id: 'cr-marcus',
    name: 'Marcus Rivera',
    handle: '@marcusreviews',
    avatar: '/sm-thumbnails/avatar-marcus.jpg',
    platforms: ['youtube', 'instagram'],
    totalRevenue: 62100,
    totalCommission: 9315,
    commissionRate: 0.15,
    conversionRate: 3.4,
    totalPosts: 28,
    postsThisPeriod: 8,
    revenueChange: 15.8,
  },
  {
    id: 'cr-aisha',
    name: 'Aisha Williams',
    handle: '@aishaskin',
    avatar: '/sm-thumbnails/avatar-aisha.jpg',
    platforms: ['instagram', 'tiktok'],
    totalRevenue: 51800,
    totalCommission: 7770,
    commissionRate: 0.15,
    conversionRate: 2.9,
    totalPosts: 31,
    postsThisPeriod: 10,
    revenueChange: 8.3,
  },
  {
    id: 'cr-jake',
    name: 'Jake Thompson',
    handle: '@jakethompson',
    avatar: '/sm-thumbnails/avatar-jake.jpg',
    platforms: ['tiktok'],
    totalRevenue: 48300,
    totalCommission: 7245,
    commissionRate: 0.15,
    conversionRate: 2.6,
    totalPosts: 22,
    postsThisPeriod: 9,
    revenueChange: 31.2,
  },
  {
    id: 'cr-priya',
    name: 'Priya Sharma',
    handle: '@priyabeauty',
    avatar: '/sm-thumbnails/avatar-priya.jpg',
    platforms: ['instagram', 'youtube'],
    totalRevenue: 35100,
    totalCommission: 5265,
    commissionRate: 0.15,
    conversionRate: 2.2,
    totalPosts: 32,
    postsThisPeriod: 11,
    revenueChange: -2.4,
  },
];

// ─── Posts ────────────────────────────────────────────────────────────────────

const POSTS: Post[] = [
  // Sarah Chen — TikTok + Instagram
  {
    id: 'p-sarah-01',
    creatorId: 'cr-sarah',
    platform: 'tiktok',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-sarah-tt-01.jpg',
    caption: 'POV: Your skin after just 7 days of Glow Serum Pro \u2728\ud83e\uddf4 The before/after is INSANE. Link in bio for 20% off #skincareroutine #glowup',
    postedAt: '2026-02-14T19:00:00Z',
    engagement: { likes: 24300, comments: 847, shares: 2100, saves: 1800, views: 312000 },
    revenue: 4230,
    orders: 47,
    clicks: 1284,
    conversionRate: 3.66,
    aov: 89.99,
    ltv: 142.30,
    funnel: { views: 312000, clicks: 1284, addToCart: 312, checkout: 89, purchases: 47 },
    commission: 634.50,
  },
  {
    id: 'p-sarah-02',
    creatorId: 'cr-sarah',
    platform: 'tiktok',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-sarah-tt-02.jpg',
    caption: 'Replying to @beautylover92 yes this is the EXACT routine I use every single morning \ud83d\ude2d\u2764\ufe0f Full breakdown here #morningroutine #skincare2026',
    postedAt: '2026-02-10T18:30:00Z',
    engagement: { likes: 18700, comments: 623, shares: 1400, saves: 1200, views: 245000 },
    revenue: 3847,
    orders: 42,
    clicks: 1076,
    conversionRate: 3.90,
    aov: 91.60,
    ltv: 138.50,
    funnel: { views: 245000, clicks: 1076, addToCart: 278, checkout: 76, purchases: 42 },
    commission: 577.05,
  },
  {
    id: 'p-sarah-03',
    creatorId: 'cr-sarah',
    platform: 'instagram',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-sarah-ig-01.jpg',
    caption: 'Get ready with me using only @GlowSerum products \u2728 I literally cannot go a day without the HydraVeil Moisturizer. Swipe for the routine \u2192',
    postedAt: '2026-02-12T17:00:00Z',
    engagement: { likes: 8200, comments: 342, shares: 890, saves: 1450, views: 67000 },
    revenue: 2156,
    orders: 31,
    clicks: 742,
    conversionRate: 4.18,
    aov: 69.55,
    ltv: 112.40,
    funnel: { views: 67000, clicks: 742, addToCart: 198, checkout: 52, purchases: 31 },
    commission: 323.40,
  },
  {
    id: 'p-sarah-04',
    creatorId: 'cr-sarah',
    platform: 'instagram',
    postType: 'post',
    thumbnail: '/sm-thumbnails/post-sarah-ig-02.jpg',
    caption: 'The one product I\u2019d save in a fire \ud83d\udd25 NightRepair Complex changed my skin texture completely. 4 weeks in and my pores are literally invisible',
    postedAt: '2026-02-08T16:00:00Z',
    engagement: { likes: 5400, comments: 218, shares: 340, saves: 980, views: 42000 },
    revenue: 1943,
    orders: 22,
    clicks: 518,
    conversionRate: 4.25,
    aov: 88.32,
    ltv: 156.20,
    funnel: { views: 42000, clicks: 518, addToCart: 134, checkout: 38, purchases: 22 },
    commission: 291.45,
  },
  {
    id: 'p-sarah-05',
    creatorId: 'cr-sarah',
    platform: 'tiktok',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-sarah-tt-03.jpg',
    caption: 'Honest review: I tried every serum on TikTok so you don\u2019t have to. Here\u2019s the winner \ud83c\udfc6 #serumreview #skincaretok #honest',
    postedAt: '2026-02-05T20:00:00Z',
    engagement: { likes: 31200, comments: 1120, shares: 3400, saves: 2800, views: 487000 },
    revenue: 5280,
    orders: 58,
    clicks: 2340,
    conversionRate: 2.48,
    aov: 91.03,
    ltv: 134.80,
    funnel: { views: 487000, clicks: 2340, addToCart: 412, checkout: 98, purchases: 58 },
    commission: 792.00,
  },

  // Marcus Rivera — YouTube + Instagram
  {
    id: 'p-marcus-01',
    creatorId: 'cr-marcus',
    platform: 'youtube',
    postType: 'video',
    thumbnail: '/sm-thumbnails/post-marcus-yt-01.jpg',
    caption: 'I Tested the #1 Skincare Brand on TikTok for 30 Days. Here\u2019s What Actually Happened.',
    postedAt: '2026-02-11T14:00:00Z',
    engagement: { likes: 4200, comments: 387, shares: 890, saves: 620, views: 89000 },
    revenue: 6340,
    orders: 67,
    clicks: 1890,
    conversionRate: 3.54,
    aov: 94.63,
    ltv: 168.40,
    funnel: { views: 89000, clicks: 1890, addToCart: 445, checkout: 112, purchases: 67 },
    commission: 951.00,
  },
  {
    id: 'p-marcus-02',
    creatorId: 'cr-marcus',
    platform: 'youtube',
    postType: 'video',
    thumbnail: '/sm-thumbnails/post-marcus-yt-02.jpg',
    caption: 'Dermatologist Reacts to My Skincare Routine ft. Glow Serum Pro | Honest Review 2026',
    postedAt: '2026-02-04T15:00:00Z',
    engagement: { likes: 3800, comments: 294, shares: 720, saves: 510, views: 72000 },
    revenue: 5120,
    orders: 54,
    clicks: 1640,
    conversionRate: 3.29,
    aov: 94.81,
    ltv: 152.30,
    funnel: { views: 72000, clicks: 1640, addToCart: 380, checkout: 92, purchases: 54 },
    commission: 768.00,
  },
  {
    id: 'p-marcus-03',
    creatorId: 'cr-marcus',
    platform: 'instagram',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-marcus-ig-01.jpg',
    caption: 'Quick version of my full review \u2014 if you only buy ONE product from this brand, make it this one \ud83d\udc47 Full video on YouTube (link in bio)',
    postedAt: '2026-02-12T18:00:00Z',
    engagement: { likes: 6100, comments: 198, shares: 540, saves: 890, views: 51000 },
    revenue: 2340,
    orders: 28,
    clicks: 620,
    conversionRate: 4.52,
    aov: 83.57,
    ltv: 124.60,
    funnel: { views: 51000, clicks: 620, addToCart: 168, checkout: 48, purchases: 28 },
    commission: 351.00,
  },

  // Aisha Williams — Instagram + TikTok
  {
    id: 'p-aisha-01',
    creatorId: 'cr-aisha',
    platform: 'instagram',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-aisha-ig-01.jpg',
    caption: 'My nighttime skincare routine for textured skin \ud83c\udf19 This ClearTone Cleanser is actually magic. Before/after in stories \u2192',
    postedAt: '2026-02-13T20:00:00Z',
    engagement: { likes: 7300, comments: 289, shares: 680, saves: 1100, views: 58000 },
    revenue: 2890,
    orders: 38,
    clicks: 840,
    conversionRate: 4.52,
    aov: 76.05,
    ltv: 118.90,
    funnel: { views: 58000, clicks: 840, addToCart: 224, checkout: 62, purchases: 38 },
    commission: 433.50,
  },
  {
    id: 'p-aisha-02',
    creatorId: 'cr-aisha',
    platform: 'tiktok',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-aisha-tt-01.jpg',
    caption: 'Things TikTok made me buy that ACTUALLY work: Glow Serum edition \ud83d\ude0d Full honest review #tiktokmademebuyit #skincare',
    postedAt: '2026-02-09T19:30:00Z',
    engagement: { likes: 14800, comments: 520, shares: 1200, saves: 980, views: 198000 },
    revenue: 3420,
    orders: 41,
    clicks: 1540,
    conversionRate: 2.66,
    aov: 83.41,
    ltv: 108.70,
    funnel: { views: 198000, clicks: 1540, addToCart: 312, checkout: 72, purchases: 41 },
    commission: 513.00,
  },
  {
    id: 'p-aisha-03',
    creatorId: 'cr-aisha',
    platform: 'instagram',
    postType: 'post',
    thumbnail: '/sm-thumbnails/post-aisha-ig-02.jpg',
    caption: 'Flat lay of my entire routine \u2728 Every product is linked. DM me "ROUTINE" for my exact order of application',
    postedAt: '2026-02-06T16:00:00Z',
    engagement: { likes: 4100, comments: 342, shares: 280, saves: 1420, views: 34000 },
    revenue: 1680,
    orders: 24,
    clicks: 480,
    conversionRate: 5.00,
    aov: 70.00,
    ltv: 102.40,
    funnel: { views: 34000, clicks: 480, addToCart: 142, checkout: 42, purchases: 24 },
    commission: 252.00,
  },

  // Jake Thompson — TikTok
  {
    id: 'p-jake-01',
    creatorId: 'cr-jake',
    platform: 'tiktok',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-jake-tt-01.jpg',
    caption: 'My girlfriend made me try her skincare routine for a week and now I\u2019m obsessed \ud83d\ude33 Guys, the Glow Serum is NOT just for girls #skincare #men',
    postedAt: '2026-02-15T19:00:00Z',
    engagement: { likes: 42000, comments: 1840, shares: 5200, saves: 3100, views: 624000 },
    revenue: 7230,
    orders: 84,
    clicks: 3420,
    conversionRate: 2.46,
    aov: 86.07,
    ltv: 112.80,
    funnel: { views: 624000, clicks: 3420, addToCart: 580, checkout: 142, purchases: 84 },
    commission: 1084.50,
  },
  {
    id: 'p-jake-02',
    creatorId: 'cr-jake',
    platform: 'tiktok',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-jake-tt-02.jpg',
    caption: 'POV: You finally found a skincare brand that actually works and isn\u2019t $200 per bottle \ud83d\ude4f #affordable #skincare #clearskin',
    postedAt: '2026-02-08T20:00:00Z',
    engagement: { likes: 28400, comments: 1230, shares: 3800, saves: 2400, views: 412000 },
    revenue: 5640,
    orders: 68,
    clicks: 2840,
    conversionRate: 2.39,
    aov: 82.94,
    ltv: 98.40,
    funnel: { views: 412000, clicks: 2840, addToCart: 468, checkout: 118, purchases: 68 },
    commission: 846.00,
  },

  // Priya Sharma — Instagram + YouTube
  {
    id: 'p-priya-01',
    creatorId: 'cr-priya',
    platform: 'instagram',
    postType: 'reel',
    thumbnail: '/sm-thumbnails/post-priya-ig-01.jpg',
    caption: 'Gentle skincare for sensitive Indian skin \ud83c\uddf2\ud83c\udde6 I\u2019ve been using the HydraVeil Moisturizer for 3 months and here\u2019s my honest take #indianskincare',
    postedAt: '2026-02-14T17:00:00Z',
    engagement: { likes: 5600, comments: 234, shares: 420, saves: 890, views: 45000 },
    revenue: 1890,
    orders: 26,
    clicks: 580,
    conversionRate: 4.48,
    aov: 72.69,
    ltv: 108.50,
    funnel: { views: 45000, clicks: 580, addToCart: 156, checkout: 44, purchases: 26 },
    commission: 283.50,
  },
  {
    id: 'p-priya-02',
    creatorId: 'cr-priya',
    platform: 'youtube',
    postType: 'video',
    thumbnail: '/sm-thumbnails/post-priya-yt-01.jpg',
    caption: 'FULL Skincare Routine for Brown Skin | Products That Actually Show Results | Glow Serum Review',
    postedAt: '2026-02-07T14:00:00Z',
    engagement: { likes: 2800, comments: 178, shares: 340, saves: 420, views: 38000 },
    revenue: 2640,
    orders: 32,
    clicks: 920,
    conversionRate: 3.48,
    aov: 82.50,
    ltv: 134.20,
    funnel: { views: 38000, clicks: 920, addToCart: 212, checkout: 56, purchases: 32 },
    commission: 396.00,
  },
  {
    id: 'p-priya-03',
    creatorId: 'cr-priya',
    platform: 'instagram',
    postType: 'post',
    thumbnail: '/sm-thumbnails/post-priya-ig-02.jpg',
    caption: 'My top 3 products from @GlowSerum ranked \ud83c\udfc6 The Radiance Eye Cream at #1 is non-negotiable. Trust me on this one.',
    postedAt: '2026-02-02T15:00:00Z',
    engagement: { likes: 3200, comments: 156, shares: 190, saves: 720, views: 28000 },
    revenue: 1340,
    orders: 18,
    clicks: 380,
    conversionRate: 4.74,
    aov: 74.44,
    ltv: 98.60,
    funnel: { views: 28000, clicks: 380, addToCart: 98, checkout: 32, purchases: 18 },
    commission: 201.00,
  },
];

// ─── Platform Metrics ────────────────────────────────────────────────────────

const PLATFORM_METRICS: PlatformMetrics[] = [
  {
    platform: 'tiktok',
    revenue: 156200,
    revenueShare: 54.9,
    orders: 1842,
    clicks: 38400,
    conversionRate: 2.68,
    aov: 84.80,
    ltv: 112.40,
    trafficShare: 62.3,
    posts: 64,
  },
  {
    platform: 'instagram',
    revenue: 98200,
    revenueShare: 34.5,
    orders: 1124,
    clicks: 14200,
    conversionRate: 4.18,
    aov: 78.40,
    ltv: 118.60,
    trafficShare: 24.8,
    posts: 58,
  },
  {
    platform: 'youtube',
    revenue: 30300,
    revenueShare: 10.6,
    orders: 384,
    clicks: 8640,
    conversionRate: 3.42,
    aov: 92.40,
    ltv: 152.80,
    trafficShare: 12.9,
    posts: 25,
  },
];

// ─── Revenue Chart (30 days) ─────────────────────────────────────────────────

function generateRevenueChart(): RevenueDataPoint[] {
  const points: RevenueDataPoint[] = [];
  const base = new Date('2026-01-21');

  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    // Realistic daily revenue with trends and variance
    const dayOfWeek = d.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.15 : 1.0;
    const trendMultiplier = 1 + (i / 30) * 0.18; // 18% uptrend over period
    const noise = 0.8 + Math.random() * 0.4; // +/- 20% daily variance

    const baseTT = 3200 * trendMultiplier * weekendMultiplier * noise;
    const baseIG = 2100 * trendMultiplier * weekendMultiplier * (0.85 + Math.random() * 0.3);
    const baseYT = 680 * trendMultiplier * (0.7 + Math.random() * 0.6);

    points.push({
      date: dateStr,
      tiktok: Math.round(baseTT),
      instagram: Math.round(baseIG),
      youtube: Math.round(baseYT),
      total: Math.round(baseTT + baseIG + baseYT),
    });
  }
  return points;
}

const REVENUE_CHART = generateRevenueChart();

// ─── AI Insights ─────────────────────────────────────────────────────────────

const INSIGHTS: SMInsight[] = [
  {
    id: 'ins-01',
    severity: 'critical',
    title: "Sarah's TikTok Reel #47 converted 4.2x above average",
    description:
      'Key factors: Strong hook ("POV: your skin after 7 days"), product shown within first 3 seconds, authentic before/after comparison. This format consistently outperforms standard product reviews by 3-4x. The emotional hook + visual proof formula is your highest-converting content pattern.',
    ctaLabel: 'Create Template',
    ctaAction: 'template',
    relatedPostId: 'p-sarah-01',
    relatedCreatorId: 'cr-sarah',
    template: {
      hook: 'POV: Your [skin/hair/body] after just [X] days of [Product Name]',
      script: [
        'Open with a "before" shot — no makeup, natural lighting, be raw and real',
        'Show the product close-up with a satisfying application moment (ASMR-style)',
        'Time-lapse or hard cut to the "after" — same angle, same lighting for credibility',
        'Hold the product up to camera, mention the link in bio naturally',
        'End with a genuine reaction or smile — authenticity converts',
      ],
      hashtags: [
        '#skincareroutine', '#glowup', '#beforeandafter', '#skincare2026',
        '#holygrailproducts', '#skintok', '#dermatologist', '#glowingskin',
        '#skincaretips', '#morningroutine',
      ],
      recordingNotes: [
        'Duration: 15-30 seconds (TikTok sweet spot for completion rate)',
        'Lighting: Natural window light, preferably morning golden hour',
        'Audio: Use trending sound OR original voiceover (both work for this format)',
        'Best posting time: Tuesday or Thursday, 7:00 PM EST',
        'Film vertically, 9:16 aspect ratio',
        'Add text overlay for the hook in the first frame',
      ],
    },
  },
  {
    id: 'ins-02',
    severity: 'high',
    title: 'TikTok drives 62% of traffic but only 55% of revenue',
    description:
      'Instagram visitors have 1.56x higher AOV ($78.40 vs $84.80) and 2.3x higher conversion rate (4.18% vs 2.68%). Consider shifting high-ticket product promotion (NightRepair Complex at $95, Radiance Eye Cream at $85) to Instagram while using TikTok for awareness and entry-level products (ClearTone Cleanser at $38).',
    ctaLabel: 'Create Strategy Brief',
    ctaAction: 'strategy',
    template: {
      hook: 'Platform-specific product strategy to maximize revenue per visitor',
      script: [
        'TikTok Strategy: Lead with ClearTone Cleanser ($38) — lowest barrier to entry',
        'TikTok Content: Focus on viral formats, trend-jacking, and volume plays',
        'Instagram Strategy: Push NightRepair Complex ($95) and Radiance Eye Cream ($85)',
        'Instagram Content: Aesthetic flat-lays, detailed routines, before/after carousels',
        'YouTube Strategy: Full product line reviews — drives highest LTV customers ($152)',
      ],
      hashtags: [
        '#marketingstrategy', '#ecommerce', '#platformstrategy',
        '#socialmediamarketing', '#dtcbrands', '#shopifytips',
      ],
      recordingNotes: [
        'Create separate content calendars for each platform',
        'Track AOV by platform weekly to measure strategy impact',
        'A/B test high-ticket vs low-ticket product focus on TikTok for 2 weeks',
        'Brief each creator on platform-specific product assignments',
      ],
    },
  },
  {
    id: 'ins-03',
    severity: 'medium',
    title: 'Creator Sarah is outperforming the team by 47%',
    description:
      "Sarah's content converts at 4.1% vs the team average of 2.8%. Her hook style (POV format + specific timeframe claims) and posting schedule (Tue/Thu 7pm EST) should be documented and replicated across other creators. Marcus has the potential to match — his YouTube reviews already convert at 3.5%.",
    ctaLabel: 'Create Playbook',
    ctaAction: 'playbook',
    relatedCreatorId: 'cr-sarah',
    template: {
      hook: "Replicate Sarah's winning formula across your creator team",
      script: [
        'Hook Formula: "POV: [Result] after [Timeframe] of [Product]" — use specific numbers',
        'First 3 Seconds: Product must be visible. No long intros.',
        'Authenticity Markers: Natural lighting, no heavy filters, real skin texture visible',
        'Call to Action: "Link in bio" mentioned casually, not pushed. Feels organic.',
        'Posting Cadence: 3x per week, Tue/Thu/Sat. Never post Mon or Wed (lower engagement).',
      ],
      hashtags: [
        '#creatortips', '#ugcstrategy', '#contentcreator', '#influencermarketing',
        '#brandambassador', '#contentplaybook',
      ],
      recordingNotes: [
        'Share this playbook with all creators via shared doc or Notion',
        'Schedule weekly 15-min calls to review content before posting',
        'Set up A/B testing: new creators try Sarah\'s format for 2 weeks',
        'Track conversion rate by creator weekly — target is 3.5%+ within 30 days',
      ],
    },
  },
  {
    id: 'ins-04',
    severity: 'low',
    title: 'YouTube LTV is 2.1x higher than other platforms',
    description:
      "YouTube-sourced customers have $152.80 LTV vs $112-118 from other platforms. Longer content builds deeper trust and drives repeat purchases. Marcus's YouTube reviews are your highest-LTV content — invest in 3-5 minute review videos. Consider increasing Marcus's content budget by 40%.",
    ctaLabel: 'Create Brief',
    ctaAction: 'brief',
    relatedCreatorId: 'cr-marcus',
    template: {
      hook: 'Invest in long-form YouTube content to maximize customer lifetime value',
      script: [
        'Commission 2 additional YouTube review videos per month from Marcus',
        'Format: 3-5 minute honest review with 30-day usage results',
        'Include dermatologist or expert reaction for credibility boost',
        'Add chapter timestamps for SEO and viewer retention',
        'Cross-promote YouTube content via IG Reels and TikTok teasers (30-sec cuts)',
      ],
      hashtags: [
        '#youtubestrategy', '#contentmarketing', '#ltv', '#customerretention',
        '#longtermgrowth', '#videomarketing',
      ],
      recordingNotes: [
        'Budget increase: Allocate additional $2,000/month for Marcus YouTube content',
        'Expected ROI: 2.1x LTV means each YouTube customer is worth $152 vs $72 CAC',
        'Timeline: Start with 2 videos in March, measure LTV impact by April',
        'Track: YouTube referral LTV vs other platforms monthly',
      ],
    },
  },
];

// ─── Org KPIs ────────────────────────────────────────────────────────────────

const ORG_KPIS: OrgKPIs = {
  totalRevenue: 284700,
  revenueChange: 18.3,
  totalCommissions: 42705,
  topPlatform: 'tiktok',
  topPlatformRevenue: 156200,
  avgConversionRate: 3.2,
  conversionChange: 0.8,
  totalPosts: 147,
  postsThisWeek: 23,
};

// ─── Export ──────────────────────────────────────────────────────────────────

export const MOCK_SM_DATA: SMDashboardData = {
  org: ORG_KPIS,
  creators: CREATORS,
  posts: POSTS,
  platformMetrics: PLATFORM_METRICS,
  revenueChart: REVENUE_CHART,
  insights: INSIGHTS,
};

// ─── Mock UTM Links ─────────────────────────────────────────────────────────

export const MOCK_UTM_LINKS: UTMLink[] = [
  {
    id: 'mock-link-01',
    platform: 'tiktok',
    content_type: 'reel',
    product_url: 'https://glowserum.com/products/glow-serum-pro',
    full_url: 'https://glowserum.com/products/glow-serum-pro?utm_source=tiktok&utm_medium=social&utm_campaign=glowserum_sarahglow&utm_content=reel_20260214_a1b2c3',
    content_post_url: 'https://tiktok.com/@sarahglow/video/7341234567890',
    status: 'active',
    created_at: '2026-02-14T19:00:00Z',
    creator_name: 'Sarah Chen',
    creator_username: 'sarahglow',
    total_revenue: 4230,
    total_orders: 47,
  },
  {
    id: 'mock-link-02',
    platform: 'instagram',
    content_type: 'reel',
    product_url: 'https://glowserum.com/products/hydraveil-moisturizer',
    full_url: 'https://glowserum.com/products/hydraveil-moisturizer?utm_source=instagram&utm_medium=social&utm_campaign=glowserum_sarahglow&utm_content=reel_20260212_d4e5f6',
    content_post_url: 'https://instagram.com/p/C4xyz123abc',
    status: 'active',
    created_at: '2026-02-12T17:00:00Z',
    creator_name: 'Sarah Chen',
    creator_username: 'sarahglow',
    total_revenue: 2156,
    total_orders: 31,
  },
  {
    id: 'mock-link-03',
    platform: 'tiktok',
    content_type: 'reel',
    product_url: null,
    full_url: 'https://glowserum.com?utm_source=tiktok&utm_medium=social&utm_campaign=glowserum_jakethompson&utm_content=reel_20260215_g7h8i9',
    content_post_url: 'https://tiktok.com/@jakethompson/video/7342345678901',
    status: 'active',
    created_at: '2026-02-15T19:00:00Z',
    creator_name: 'Jake Thompson',
    creator_username: 'jakethompson',
    total_revenue: 7230,
    total_orders: 84,
  },
  {
    id: 'mock-link-04',
    platform: 'youtube',
    content_type: 'video',
    product_url: 'https://glowserum.com/products/nightrepair-complex',
    full_url: 'https://glowserum.com/products/nightrepair-complex?utm_source=youtube&utm_medium=social&utm_campaign=glowserum_marcusreviews&utm_content=video_20260211_j0k1l2',
    content_post_url: 'https://youtube.com/watch?v=abc123xyz',
    status: 'active',
    created_at: '2026-02-11T14:00:00Z',
    creator_name: 'Marcus Rivera',
    creator_username: 'marcusreviews',
    total_revenue: 6340,
    total_orders: 67,
  },
  {
    id: 'mock-link-05',
    platform: 'instagram',
    content_type: 'post',
    product_url: 'https://glowserum.com/products/cleartone-cleanser',
    full_url: 'https://glowserum.com/products/cleartone-cleanser?utm_source=instagram&utm_medium=social&utm_campaign=glowserum_aishaskin&utm_content=post_20260213_m3n4o5',
    content_post_url: null,
    status: 'pending',
    created_at: '2026-02-13T20:00:00Z',
    creator_name: 'Aisha Williams',
    creator_username: 'aishaskin',
    total_revenue: 0,
    total_orders: 0,
  },
];

// Helper: get posts for a specific creator
export function getCreatorPosts(creatorId: string): Post[] {
  return POSTS.filter((p) => p.creatorId === creatorId).sort((a, b) => b.revenue - a.revenue);
}

// Helper: get creator KPIs
export function getCreatorKPIs(creatorId: string) {
  const creator = CREATORS.find((c) => c.id === creatorId);
  const posts = getCreatorPosts(creatorId);
  const bestPost = posts[0];

  return {
    attributedRevenue: creator?.totalRevenue ?? 0,
    revenueChange: creator?.revenueChange ?? 0,
    commission: creator?.totalCommission ?? 0,
    commissionRate: creator?.commissionRate ?? 0.15,
    bestPostRevenue: bestPost?.revenue ?? 0,
    bestPostPlatform: bestPost?.platform ?? ('tiktok' as const),
    conversionRate: creator?.conversionRate ?? 0,
    conversionChange: (creator?.conversionRate ?? 0) > 3 ? 1.2 : -0.4,
    totalPosts: creator?.totalPosts ?? 0,
    postsThisMonth: creator?.postsThisPeriod ?? 0,
  };
}

// Helper: filter posts by platform
export function getPostsByPlatform(platform: string, creatorId?: string): Post[] {
  let filtered = platform === 'all' ? POSTS : POSTS.filter((p) => p.platform === platform);
  if (creatorId) filtered = filtered.filter((p) => p.creatorId === creatorId);
  return filtered.sort((a, b) => b.revenue - a.revenue);
}

// Helper: get platform label
export function getPlatformLabel(platform: string): string {
  const labels: Record<string, string> = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    all: 'All Platforms',
  };
  return labels[platform] || platform;
}

// Helper: get platform color
export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    instagram: '#E1306C',
    tiktok: '#00F2EA',
    youtube: '#FF0000',
    all: '#00FF94',
  };
  return colors[platform] || '#00FF94';
}
