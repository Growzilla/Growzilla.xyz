// /smdashboard types — Social Media Creator Revenue Attribution Dashboard

export type Platform = 'instagram' | 'tiktok' | 'youtube';
export type PostType = 'reel' | 'post' | 'story' | 'video' | 'short';
export type InsightSeverity = 'critical' | 'high' | 'medium' | 'low';
export type DateRange = '7d' | '30d' | '90d';
export type ViewMode = 'org' | 'creator';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string; // path to /public/sm-thumbnails/
  platforms: Platform[];
  totalRevenue: number;
  totalCommission: number;
  commissionRate: number; // 0.15 = 15%
  conversionRate: number;
  totalPosts: number;
  postsThisPeriod: number;
  revenueChange: number; // % delta vs prev period
}

export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
}

export interface ConversionFunnel {
  views: number;
  clicks: number;
  addToCart: number;
  checkout: number;
  purchases: number;
}

export interface Post {
  id: string;
  creatorId: string;
  platform: Platform;
  postType: PostType;
  thumbnail: string; // path to /public/sm-thumbnails/
  caption: string;
  postedAt: string; // ISO date
  engagement: PostEngagement;
  revenue: number;
  orders: number;
  clicks: number;
  conversionRate: number;
  aov: number;
  ltv: number;
  funnel: ConversionFunnel;
  commission: number;
}

export interface PlatformMetrics {
  platform: Platform;
  revenue: number;
  revenueShare: number; // percentage of total
  orders: number;
  clicks: number;
  conversionRate: number;
  aov: number;
  ltv: number;
  trafficShare: number; // percentage of total traffic
  posts: number;
}

export interface RevenueDataPoint {
  date: string; // YYYY-MM-DD
  instagram: number;
  tiktok: number;
  youtube: number;
  total: number;
}

export interface InsightTemplate {
  hook: string;
  script: string[];
  hashtags: string[];
  recordingNotes: string[];
}

export interface SMInsight {
  id: string;
  severity: InsightSeverity;
  title: string;
  description: string;
  ctaLabel: string;
  ctaAction: 'template' | 'strategy' | 'playbook' | 'brief';
  template: InsightTemplate;
  relatedPostId?: string;
  relatedCreatorId?: string;
}

export interface OrgKPIs {
  totalRevenue: number;
  revenueChange: number;
  totalCommissions: number;
  topPlatform: Platform;
  topPlatformRevenue: number;
  avgConversionRate: number;
  conversionChange: number;
  totalPosts: number;
  postsThisWeek: number;
}

export interface CreatorKPIs {
  attributedRevenue: number;
  revenueChange: number;
  commission: number;
  commissionRate: number;
  bestPostRevenue: number;
  bestPostPlatform: Platform;
  conversionRate: number;
  conversionChange: number;
  totalPosts: number;
  postsThisMonth: number;
}

export interface SMDashboardData {
  org: OrgKPIs;
  creators: Creator[];
  posts: Post[];
  platformMetrics: PlatformMetrics[];
  revenueChart: RevenueDataPoint[];
  insights: SMInsight[];
}

// === UTM Link Types (connected to real backend) ===

export interface UTMLink {
  id: string;
  platform: Platform;
  content_type: PostType;
  product_url: string | null;
  full_url: string;
  content_post_url: string | null;
  status: 'pending' | 'active';
  created_at: string;
  creator_name: string;
  creator_username: string;
  total_revenue: number;
  total_orders: number;
}

export interface UTMConversion {
  order_id: string;
  order_name: string;
  revenue: number;
  currency: string;
  matched_at: string;
}

export interface LinkStats {
  link: UTMLink;
  conversions: UTMConversion[];
}

export type LoginRole = 'org_owner' | 'creator';

export interface PlatformOption {
  id: Platform;
  label: string;
  icon: string; // emoji
}

export interface ContentTypeOption {
  id: PostType;
  label: string;
}

export const PLATFORM_OPTIONS: PlatformOption[] = [
  { id: 'instagram', label: 'Instagram', icon: '\u{1F4F7}' },
  { id: 'tiktok', label: 'TikTok', icon: '\u{1F3AC}' },
  { id: 'youtube', label: 'YouTube', icon: '\u25B6\uFE0F' },
];

export const CONTENT_TYPES: Record<Platform, ContentTypeOption[]> = {
  instagram: [
    { id: 'post', label: 'Post' },
    { id: 'reel', label: 'Reel' },
    { id: 'story', label: 'Story' },
  ],
  tiktok: [
    { id: 'video', label: 'Video' },
    { id: 'short', label: 'Short' },
  ],
  youtube: [
    { id: 'video', label: 'Video' },
    { id: 'short', label: 'Short' },
  ],
};
