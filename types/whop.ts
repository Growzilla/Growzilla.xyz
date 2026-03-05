// /whop types — Whop Attribution & Funnel Dashboard

export type DateRange = '7d' | '30d' | '90d' | 'custom';

export type WhopView = 'overview' | 'funnel' | 'ads' | 'customers' | 'products';

export type AttributionChannel =
  | 'meta'
  | 'tiktok'
  | 'google'
  | 'organic'
  | 'email'
  | 'referral';

export type FunnelStep =
  | 'impression'
  | 'click'
  | 'landing'
  | 'purchase'
  | 'retention';

export type AttributionWindow = '1d' | '7d' | '28d';

// ─── Airtable Data Models ─────────────────────────────────────────────────────

export interface WhopCustomer {
  id: string;
  email: string;
  name: string;
  firstPurchaseDate: string; // ISO date
  lastActivityDate: string;
  totalSpend: number;
  purchaseCount: number;
  ltv: number;
  churnRisk: 'low' | 'medium' | 'high';
  status: 'active' | 'churned' | 'at_risk';
  firstTouchChannel: AttributionChannel;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerUrl?: string;
  referralCode?: string;
  touchpoints: Touchpoint[];
  cohortMonth: string; // YYYY-MM
}

export interface Touchpoint {
  timestamp: string;
  channel: AttributionChannel;
  source: string; // specific source (e.g., campaign name, UTM source)
  medium?: string;
  campaignId?: string;
  adSetId?: string;
  adId?: string;
  pageUrl?: string;
}

export interface WhopPurchase {
  id: string;
  customerId: string;
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  purchaseDate: string; // ISO date
  isRecurring: boolean;
  renewalNumber?: number;
  channel: AttributionChannel;
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface WhopRevenue {
  date: string; // YYYY-MM-DD
  totalRevenue: number;
  newRevenue: number;
  recurringRevenue: number;
  byChannel: Record<AttributionChannel, number>;
  byProduct: Record<string, number>;
}

// ─── Whop Product / Membership ────────────────────────────────────────────────

export interface WhopProduct {
  id: string;
  name: string;
  type: 'membership' | 'coaching' | 'course' | 'one_time';
  price: number;
  billingPeriod?: 'monthly' | 'yearly' | 'one_time';
  activeSubscribers: number;
  totalRevenue: number;
  churnRate: number;
  mrr: number;
}

// ─── Meta / Ads Data ──────────────────────────────────────────────────────────

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'meta' | 'tiktok' | 'google';
  status: 'active' | 'paused' | 'completed';
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  startDate: string;
  endDate?: string;
  adSets?: AdSet[];
}

export interface AdSet {
  id: string;
  campaignId: string;
  name: string;
  spend: number;
  revenue: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface AdCreative {
  id: string;
  campaignId: string;
  name: string;
  thumbnailUrl?: string;
  spend: number;
  revenue: number;
  roas: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

// ─── Funnel Data ──────────────────────────────────────────────────────────────

export interface FunnelData {
  step: FunnelStep;
  count: number;
  dropOffRate: number; // % drop from previous step
  conversionRate: number; // % of total impressions
  byChannel?: Record<AttributionChannel, number>;
}

export interface ChannelFunnel {
  channel: AttributionChannel;
  steps: FunnelData[];
}

// ─── Cohort Data ──────────────────────────────────────────────────────────────

export interface CohortRow {
  cohortMonth: string; // YYYY-MM
  totalCustomers: number;
  retention: number[]; // retention rates by month (index 0 = month 0, etc.)
}

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export interface WhopKPIs {
  totalRevenue: number;
  revenueChange: number;
  mrr: number;
  mrrChange: number;
  newCustomers: number;
  newCustomersChange: number;
  overallROAS: number;
  roasChange: number;
  churnRate: number;
  churnChange: number;
  avgLTV: number;
  ltvChange: number;
  totalAdSpend: number;
  adSpendChange: number;
}

// ─── Chart Data Points ────────────────────────────────────────────────────────

export interface RevenueDataPoint {
  date: string; // YYYY-MM-DD
  meta: number;
  tiktok: number;
  google: number;
  organic: number;
  email: number;
  referral: number;
  total: number;
}

export interface ROASDataPoint {
  date: string;
  meta: number;
  tiktok: number;
  google: number;
  overall: number;
}

export interface SpendVsRevenuePoint {
  date: string;
  spend: number;
  revenue: number;
}

// ─── Channel Metrics ──────────────────────────────────────────────────────────

export interface ChannelMetrics {
  channel: AttributionChannel;
  revenue: number;
  revenueShare: number; // percentage
  customers: number;
  spend?: number;
  roas?: number;
  conversions: number;
  conversionRate: number;
}

// ─── Aggregate Dashboard Data ─────────────────────────────────────────────────

export interface WhopDashboardData {
  kpis: WhopKPIs;
  revenueChart: RevenueDataPoint[];
  channelMetrics: ChannelMetrics[];
  funnelData: FunnelData[];
  channelFunnels: ChannelFunnel[];
  campaigns: AdCampaign[];
  customers: WhopCustomer[];
  products: WhopProduct[];
  cohorts: CohortRow[];
  roasChart: ROASDataPoint[];
  spendVsRevenue: SpendVsRevenuePoint[];
}

// ─── FemFitOS Funnel Types ───────────────────────────────────────────────────

export type FemFitStage =
  | 'traffic'
  | 'typeform_start'
  | 'typeform_complete'
  | 'call_booked'
  | 'closed_won';

export interface FemFitFunnelStep {
  stage: FemFitStage;
  label: string;
  count: number;
  revenue: number;
  dropOffRate: number;
  conversionRate: number;
  bySource?: Record<string, number>;
}

export interface FemFitTrafficSource {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram' | 'organic' | 'referral' | 'tiktok';
  visitors: number;
  typeformStarts: number;
  typeformCompletes: number;
  callsBooked: number;
  closedWon: number;
  revenue: number;
  spend: number;
  roas: number;
  color: string;
}

export interface FemFitSankeyNode {
  id: string;
  label: string;
  value: number;
  column: number;
  color: string;
}

export interface FemFitSankeyLink {
  source: string;
  target: string;
  value: number;
  color: string;
}

export interface FemFitWhaleInsight {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

export interface FemFitFunnelData {
  steps: FemFitFunnelStep[];
  sources: FemFitTrafficSource[];
  sankeyNodes: FemFitSankeyNode[];
  sankeyLinks: FemFitSankeyLink[];
  whaleInsights: FemFitWhaleInsight[];
  totalRevenue: number;
  totalTraffic: number;
  overallConversion: number;
  whaleRevenuePercent: number;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface WhopAPIResponse<T> {
  data: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
}
