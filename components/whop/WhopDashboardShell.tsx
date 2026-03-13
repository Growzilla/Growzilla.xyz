'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type {
  WhopView,
  DateRange,
  AttributionChannel,
  WhopDashboardData,
  WhopKPIs,
  RevenueDataPoint,
  ChannelMetrics,
  FunnelData,
  ChannelFunnel,
  AdCampaign,
  WhopCustomer,
  WhopProduct,
  CohortRow,
  ROASDataPoint,
  SpendVsRevenuePoint,
  FemFitFunnelData,
} from '@/types/whop';
import WhopLayout from './WhopLayout';
import DateRangeToggle from './filters/DateRangeToggle';
import ChannelTabs from './filters/ChannelTabs';
import OverviewView from './views/OverviewView';
import FunnelView from './views/FunnelView';
import AdsView from './views/AdsView';
import CustomersView from './views/CustomersView';
import ProductView from './views/ProductView';
import LinksView from '@/components/demo/views/LinksView';
import CreateLinkView from '@/components/demo/views/CreateLinkView';
import type { UTMLink } from '@/types/smdashboard';
import { getScaledData } from '@/data/mockSMData';
import { ProductTour, GROWZILLA_TOUR_STEPS } from '@/components/onboarding/ProductTour';
import { SetupChecklist, DEFAULT_CHECKLIST_ITEMS, type ChecklistItem } from '@/components/onboarding/SetupChecklist';
import { useOnboardingTracker } from '@/hooks/useEventTracker';

// ─── Placeholder Data (until Airtable env vars are connected) ─────────────────

function generatePlaceholderData(): WhopDashboardData {
  const channels: AttributionChannel[] = ['meta', 'tiktok', 'google', 'organic', 'email', 'referral'];

  // Revenue chart
  const revenueChart: RevenueDataPoint[] = [];
  const base = new Date();
  base.setDate(base.getDate() - 30);
  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    revenueChart.push({
      date: d.toISOString().split('T')[0],
      meta: Math.round(1200 + Math.random() * 800),
      tiktok: Math.round(600 + Math.random() * 500),
      google: Math.round(400 + Math.random() * 300),
      organic: Math.round(800 + Math.random() * 600),
      email: Math.round(300 + Math.random() * 200),
      referral: Math.round(200 + Math.random() * 150),
      total: 0,
    });
    revenueChart[i].total =
      revenueChart[i].meta +
      revenueChart[i].tiktok +
      revenueChart[i].google +
      revenueChart[i].organic +
      revenueChart[i].email +
      revenueChart[i].referral;
  }

  // Channel metrics
  const channelMetrics: ChannelMetrics[] = channels.map((channel) => {
    const revenue = revenueChart.reduce((sum, d) => sum + (d[channel as keyof RevenueDataPoint] as number), 0);
    const totalRevenue = revenueChart.reduce((sum, d) => sum + d.total, 0);
    return {
      channel,
      revenue,
      revenueShare: Math.round((revenue / totalRevenue) * 1000) / 10,
      customers: Math.round(20 + Math.random() * 80),
      conversions: Math.round(10 + Math.random() * 50),
      conversionRate: Math.round(Math.random() * 8 * 10) / 10,
    };
  });

  // Funnel data
  const funnelData: FunnelData[] = [
    { step: 'impression', count: 145000, dropOffRate: 0, conversionRate: 100 },
    { step: 'click', count: 12800, dropOffRate: 91.2, conversionRate: 8.8 },
    { step: 'landing', count: 8400, dropOffRate: 34.4, conversionRate: 5.8 },
    { step: 'purchase', count: 1240, dropOffRate: 85.2, conversionRate: 0.9 },
    { step: 'retention', count: 890, dropOffRate: 28.2, conversionRate: 0.6 },
  ];

  // Channel funnels
  const channelFunnels: ChannelFunnel[] = channels.map((channel) => ({
    channel,
    steps: funnelData.map((step) => ({
      ...step,
      count: Math.round(step.count * (0.1 + Math.random() * 0.3)),
    })),
  }));

  // Campaigns
  const campaigns: AdCampaign[] = [
    {
      id: 'camp-1',
      name: 'Coaching Launch - Broad Targeting',
      platform: 'meta',
      status: 'active',
      spend: 4520,
      revenue: 18200,
      roas: 4.03,
      cpa: 28.25,
      impressions: 245000,
      clicks: 8900,
      conversions: 160,
      ctr: 0.0363,
      startDate: '2026-01-15',
    },
    {
      id: 'camp-2',
      name: 'Membership Retargeting',
      platform: 'meta',
      status: 'active',
      spend: 1800,
      revenue: 9400,
      roas: 5.22,
      cpa: 18.0,
      impressions: 89000,
      clicks: 4200,
      conversions: 100,
      ctr: 0.0472,
      startDate: '2026-02-01',
    },
    {
      id: 'camp-3',
      name: 'TikTok Awareness',
      platform: 'tiktok',
      status: 'active',
      spend: 2100,
      revenue: 5800,
      roas: 2.76,
      cpa: 35.0,
      impressions: 520000,
      clicks: 12000,
      conversions: 60,
      ctr: 0.0231,
      startDate: '2026-02-10',
    },
    {
      id: 'camp-4',
      name: 'Google Search - Brand',
      platform: 'google',
      status: 'paused',
      spend: 890,
      revenue: 3200,
      roas: 3.6,
      cpa: 22.13,
      impressions: 34000,
      clicks: 2800,
      conversions: 40,
      ctr: 0.0824,
      startDate: '2026-01-01',
      endDate: '2026-02-15',
    },
  ];

  // Customers
  const customerNames = [
    'Alex Rivera', 'Jordan Chen', 'Sam Patel', 'Taylor Kim', 'Morgan Lee',
    'Casey Brooks', 'Drew Santos', 'Riley Park', 'Quinn Murphy', 'Avery Thomas',
    'Blake Wilson', 'Cameron Davis', 'Dana Miller', 'Eli Johnson', 'Frankie Brown',
  ];

  const customers: WhopCustomer[] = customerNames.map((name, i) => {
    const channel = channels[i % channels.length];
    const purchaseCount = Math.round(1 + Math.random() * 8);
    const totalSpend = Math.round(50 + Math.random() * 2000);
    const daysAgo = Math.round(Math.random() * 120);
    const status = daysAgo > 90 ? 'churned' : daysAgo > 45 ? 'at_risk' : 'active';
    const churnRisk = daysAgo > 60 ? 'high' : daysAgo > 30 ? 'medium' : 'low';

    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - Math.round(30 + Math.random() * 180));

    return {
      id: `cust-${i}`,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      name,
      firstPurchaseDate: firstDate.toISOString(),
      lastActivityDate: new Date(Date.now() - daysAgo * 86400000).toISOString(),
      totalSpend,
      purchaseCount,
      ltv: totalSpend,
      churnRisk,
      status,
      firstTouchChannel: channel,
      utmSource: channel === 'meta' ? 'facebook' : channel === 'email' ? 'newsletter' : undefined,
      utmCampaign: i % 3 === 0 ? 'launch-2026' : undefined,
      touchpoints: Array.from({ length: Math.round(1 + Math.random() * 5) }, (_, j) => ({
        timestamp: new Date(firstDate.getTime() + j * 86400000 * 3).toISOString(),
        channel: channels[(i + j) % channels.length],
        source: channels[(i + j) % channels.length],
      })),
      cohortMonth: firstDate.toISOString().slice(0, 7),
    } as WhopCustomer;
  });

  // Products
  const products: WhopProduct[] = [
    { id: 'prod-1', name: '1-on-1 Coaching', type: 'coaching', price: 297, billingPeriod: 'monthly', activeSubscribers: 48, totalRevenue: 42700, churnRate: 5.2, mrr: 14256 },
    { id: 'prod-2', name: 'Premium Membership', type: 'membership', price: 97, billingPeriod: 'monthly', activeSubscribers: 215, totalRevenue: 86400, churnRate: 8.1, mrr: 20855 },
    { id: 'prod-3', name: 'Masterclass Bundle', type: 'course', price: 497, billingPeriod: 'one_time', activeSubscribers: 0, totalRevenue: 28300, churnRate: 0, mrr: 0 },
    { id: 'prod-4', name: 'Community Access', type: 'membership', price: 29, billingPeriod: 'monthly', activeSubscribers: 520, totalRevenue: 45200, churnRate: 12.3, mrr: 15080 },
  ];

  // Cohorts
  const cohorts: CohortRow[] = [];
  for (let m = 5; m >= 0; m--) {
    const d = new Date();
    d.setMonth(d.getMonth() - m);
    const month = d.toISOString().slice(0, 7);
    const total = Math.round(30 + Math.random() * 70);
    const retention: number[] = [];
    for (let i = 0; i <= Math.min(m, 5); i++) {
      retention.push(Math.round(100 - i * (8 + Math.random() * 7)));
    }
    cohorts.push({ cohortMonth: month, totalCustomers: total, retention });
  }

  // ROAS chart
  const roasChart: ROASDataPoint[] = revenueChart.map((d) => ({
    date: d.date,
    meta: 2.5 + Math.random() * 3,
    tiktok: 1.5 + Math.random() * 2.5,
    google: 2 + Math.random() * 2,
    overall: 2.5 + Math.random() * 2,
  }));

  // Spend vs Revenue
  const spendVsRevenue: SpendVsRevenuePoint[] = revenueChart.map((d) => ({
    date: d.date,
    spend: Math.round(200 + Math.random() * 300),
    revenue: d.total,
  }));

  // KPIs
  const totalRevenue = revenueChart.reduce((sum, d) => sum + d.total, 0);
  const kpis: WhopKPIs = {
    totalRevenue,
    revenueChange: 12.4,
    mrr: products.reduce((sum, p) => sum + p.mrr, 0),
    mrrChange: 8.2,
    newCustomers: customers.filter((c) => c.status === 'active').length,
    newCustomersChange: 15.3,
    overallROAS: 3.8,
    roasChange: 5.1,
    churnRate: 7.2,
    churnChange: -2.1,
    avgLTV: Math.round(customers.reduce((sum, c) => sum + c.ltv, 0) / customers.length),
    ltvChange: 6.8,
    totalAdSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
    adSpendChange: 4.5,
  };

  return {
    kpis,
    revenueChart,
    channelMetrics,
    funnelData,
    channelFunnels,
    campaigns,
    customers,
    products,
    cohorts,
    roasChart,
    spendVsRevenue,
  };
}

// ─── FemFitOS Funnel Data ─────────────────────────────────────────────────────

function generateFemFitFunnelData(): FemFitFunnelData {
  // Traffic sources — realistic FemFitOS data
  const sources: FemFitFunnelData['sources'] = [
    {
      id: 'src-fb-broad',
      name: 'FB Broad Targeting',
      platform: 'facebook',
      visitors: 4200,
      typeformStarts: 1180,
      typeformCompletes: 720,
      callsBooked: 245,
      closedWon: 98,
      revenue: 89200,
      spend: 6800,
      roas: 13.1,
      color: '#1877F2',
    },
    {
      id: 'src-ig-reels',
      name: 'IG Reels — Transformations',
      platform: 'instagram',
      visitors: 3800,
      typeformStarts: 1050,
      typeformCompletes: 610,
      callsBooked: 198,
      closedWon: 82,
      revenue: 67400,
      spend: 4200,
      roas: 16.0,
      color: '#E4405F',
    },
    {
      id: 'src-fb-retarget',
      name: 'FB Retargeting — Lookalike',
      platform: 'facebook',
      visitors: 1600,
      typeformStarts: 580,
      typeformCompletes: 390,
      callsBooked: 156,
      closedWon: 72,
      revenue: 58800,
      spend: 3100,
      roas: 19.0,
      color: '#4267B2',
    },
    {
      id: 'src-ig-stories',
      name: 'IG Stories — Testimonials',
      platform: 'instagram',
      visitors: 2100,
      typeformStarts: 620,
      typeformCompletes: 340,
      callsBooked: 112,
      closedWon: 45,
      revenue: 34200,
      spend: 2800,
      roas: 12.2,
      color: '#C13584',
    },
    {
      id: 'src-organic',
      name: 'Organic Content / SEO',
      platform: 'organic',
      visitors: 2400,
      typeformStarts: 480,
      typeformCompletes: 290,
      callsBooked: 88,
      closedWon: 38,
      revenue: 28600,
      spend: 0,
      roas: 0,
      color: '#22C55E',
    },
    {
      id: 'src-tiktok',
      name: 'TikTok — Fitness Tips',
      platform: 'tiktok',
      visitors: 1800,
      typeformStarts: 340,
      typeformCompletes: 180,
      callsBooked: 52,
      closedWon: 18,
      revenue: 12400,
      spend: 1900,
      roas: 6.5,
      color: '#00F2EA',
    },
    {
      id: 'src-referral',
      name: 'Client Referrals',
      platform: 'referral',
      visitors: 800,
      typeformStarts: 320,
      typeformCompletes: 260,
      callsBooked: 104,
      closedWon: 52,
      revenue: 42800,
      spend: 0,
      roas: 0,
      color: '#FF3366',
    },
  ];

  // Aggregate funnel steps
  const totalTraffic = sources.reduce((s, src) => s + src.visitors, 0);
  const totalTFStarts = sources.reduce((s, src) => s + src.typeformStarts, 0);
  const totalTFCompletes = sources.reduce((s, src) => s + src.typeformCompletes, 0);
  const totalCalls = sources.reduce((s, src) => s + src.callsBooked, 0);
  const totalClosed = sources.reduce((s, src) => s + src.closedWon, 0);
  const totalRevenue = sources.reduce((s, src) => s + src.revenue, 0);

  const steps: FemFitFunnelData['steps'] = [
    {
      stage: 'traffic',
      label: 'Traffic Sources',
      count: totalTraffic,
      revenue: 0,
      dropOffRate: 0,
      conversionRate: 100,
    },
    {
      stage: 'typeform_start',
      label: 'Typeform Starts',
      count: totalTFStarts,
      revenue: 0,
      dropOffRate: Math.round((1 - totalTFStarts / totalTraffic) * 1000) / 10,
      conversionRate: Math.round((totalTFStarts / totalTraffic) * 1000) / 10,
    },
    {
      stage: 'typeform_complete',
      label: 'Typeform Completes',
      count: totalTFCompletes,
      revenue: 0,
      dropOffRate: Math.round((1 - totalTFCompletes / totalTFStarts) * 1000) / 10,
      conversionRate: Math.round((totalTFCompletes / totalTraffic) * 1000) / 10,
    },
    {
      stage: 'call_booked',
      label: 'Calls Completed',
      count: totalCalls,
      revenue: 0,
      dropOffRate: Math.round((1 - totalCalls / totalTFCompletes) * 1000) / 10,
      conversionRate: Math.round((totalCalls / totalTraffic) * 1000) / 10,
    },
    {
      stage: 'closed_won',
      label: 'Membership Closed',
      count: totalClosed,
      revenue: totalRevenue,
      dropOffRate: Math.round((1 - totalClosed / totalCalls) * 1000) / 10,
      conversionRate: Math.round((totalClosed / totalTraffic) * 1000) / 10,
    },
  ];

  // Sankey nodes — 5 columns: Sources | Typeform | Calls | Closed | Revenue tiers
  const sankeyNodes: FemFitFunnelData['sankeyNodes'] = [
    // Column 0: Traffic sources
    { id: 'n-fb', label: 'Facebook Ads', value: 5800, column: 0, color: '#1877F2' },
    { id: 'n-ig', label: 'Instagram', value: 5900, column: 0, color: '#E4405F' },
    { id: 'n-organic', label: 'Organic', value: 2400, column: 0, color: '#22C55E' },
    { id: 'n-tiktok', label: 'TikTok', value: 1800, column: 0, color: '#00F2EA' },
    { id: 'n-referral', label: 'Referrals', value: 800, column: 0, color: '#FF3366' },
    // Column 1: Typeform
    { id: 'n-tf-start', label: 'TF Started', value: totalTFStarts, column: 1, color: '#FF6B3D' },
    { id: 'n-tf-complete', label: 'TF Completed', value: totalTFCompletes, column: 2, color: '#FF8A5C' },
    // Column 2: Calls
    { id: 'n-calls', label: 'Calls Done', value: totalCalls, column: 3, color: '#FFA77B' },
    // Column 3: Closed
    { id: 'n-closed', label: 'Trainee', value: totalClosed, column: 4, color: '#22C55E' },
  ];

  const sankeyLinks: FemFitFunnelData['sankeyLinks'] = [
    // Sources → Typeform Starts
    { source: 'n-fb', target: 'n-tf-start', value: 1760, color: '#1877F2' },
    { source: 'n-ig', target: 'n-tf-start', value: 1670, color: '#E4405F' },
    { source: 'n-organic', target: 'n-tf-start', value: 480, color: '#22C55E' },
    { source: 'n-tiktok', target: 'n-tf-start', value: 340, color: '#00F2EA' },
    { source: 'n-referral', target: 'n-tf-start', value: 320, color: '#FF3366' },
    // TF Start → TF Complete
    { source: 'n-tf-start', target: 'n-tf-complete', value: totalTFCompletes, color: '#FF6B3D' },
    // TF Complete → Calls
    { source: 'n-tf-complete', target: 'n-calls', value: totalCalls, color: '#FF8A5C' },
    // Calls → Closed
    { source: 'n-calls', target: 'n-closed', value: totalClosed, color: '#FFA77B' },
  ];

  // Whale insights
  const whaleInsights: FemFitFunnelData['whaleInsights'] = [
    {
      title: 'Whale Concentration',
      value: '65%',
      description: 'Top 20% of trainees generate 65% of total revenue. Focus retention here.',
      trend: 'up',
      trendValue: '+4.2%',
    },
    {
      title: 'Top Source for Whales',
      value: 'IG Reels',
      description: 'Instagram Reels drive the highest-value trainees with $1,240 avg spend.',
      trend: 'up',
      trendValue: '+12%',
    },
    {
      title: 'Avg Whale LTV',
      value: '$1,840',
      description: 'Whales average 6.2 months retention vs 3.1 months for standard trainees.',
      trend: 'up',
      trendValue: '+8.5%',
    },
    {
      title: 'Best Closer Rate',
      value: '48%',
      description: 'Referral leads close at 48% vs 28% avg. Incentivize referral programs.',
      trend: 'neutral',
      trendValue: '\u2014',
    },
  ];

  return {
    steps,
    sources,
    sankeyNodes,
    sankeyLinks,
    whaleInsights,
    totalRevenue,
    totalTraffic,
    overallConversion: Math.round((totalClosed / totalTraffic) * 1000) / 10,
    whaleRevenuePercent: 65,
  };
}

// ─── Main Shell Component ─────────────────────────────────────────────────────

const WhopDashboardShell: React.FC = () => {
  const [activeView, setActiveView] = useState<WhopView>('overview');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [activeChannel, setActiveChannel] = useState<'all' | AttributionChannel>('all');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WhopDashboardData | null>(null);
  const [femfitData, setFemfitData] = useState<FemFitFunnelData | null>(null);

  // --- Onboarding: tour + checklist + personalization ---
  const [showTour, setShowTour] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [shopIdForTracking, setShopIdForTracking] = useState('');
  const [showMetaPrompt, setShowMetaPrompt] = useState(false);
  const [showCreatorCTA, setShowCreatorCTA] = useState(false);
  const tracker = useOnboardingTracker(shopIdForTracking || 'dashboard');

  // --- Links view state ---
  const [sessionLinks, setSessionLinks] = useState<UTMLink[]>([]);
  const mockLinks = getScaledData('30d').utmLinks;
  const allLinks = [...sessionLinks, ...mockLinks];

  const handleLinkCreated = useCallback((link: UTMLink) => {
    setSessionLinks((prev) => [link, ...prev]);
    setActiveView('links');
  }, []);

  const handleCreateLink = useCallback(() => {
    setActiveView('createLink');
  }, []);

  const handleViewSavedLinks = useCallback(() => {
    // No-op for now — all links shown in main view
  }, []);

  // Detect if user just finished onboarding
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Find the onboarding key by scanning localStorage
    const keys = Object.keys(localStorage);
    const completedKey = keys.find(
      (k) => k.startsWith('gz_onboarding_') && k.endsWith('_completed')
    );
    if (!completedKey) return;

    const storeDomain = completedKey
      .replace('gz_onboarding_', '')
      .replace('_completed', '');
    const prefix = `gz_onboarding_${storeDomain}`;

    const completed = localStorage.getItem(`${prefix}_completed`);
    if (completed !== 'true') return;

    const tourChoice = localStorage.getItem(`${prefix}_tour`);
    const tourShown = localStorage.getItem(`${prefix}_tour_shown`);
    const shopId = localStorage.getItem(`${prefix}_shopId`) || '';

    setShopIdForTracking(shopId);

    // Show tour if user opted in and hasn't seen it yet
    if (tourChoice === 'tour' && tourShown !== 'true') {
      // Delay tour start until dashboard is loaded
      setShowTour(true);
      tracker.tourStarted();
    }

    // Show checklist — build items from onboarding answers
    const answersStr = localStorage.getItem(`${prefix}_answers`);
    const answers = answersStr ? JSON.parse(answersStr) : {};

    const items: ChecklistItem[] = DEFAULT_CHECKLIST_ITEMS.map((item) => {
      if (item.id === 'connect_store') return { ...item, completed: true };
      if (item.id === 'add_creator' && answers.firstCreator?.handle)
        return { ...item, completed: true };
      if (item.id === 'create_link' && answers.trackingLink)
        return { ...item, completed: true };
      if (item.id === 'view_dashboard') return { ...item, completed: true };
      return { ...item };
    });

    setChecklistItems(items);
    setShowChecklist(true);

    // --- Dashboard personalization from onboarding answers ---
    const goal = answers.mainGoal as string | undefined;
    const creatorCount = answers.creatorCount as string | undefined;
    const paidAds = (answers.paidAds || []) as string[];

    // Default tab based on main goal
    if (goal === 'creator_sales') {
      setActiveView('overview'); // Overview has creator metrics
    } else if (goal === 'reduce_cac') {
      setActiveView('funnel'); // Funnel = attribution view
    } else if (goal === 'meta_data') {
      setActiveView('ads'); // Ads view for Meta data
    }

    // Show "Add your first creator" CTA if they have 0 creators
    if (creatorCount === '0') {
      setShowCreatorCTA(true);
    }

    // Show Meta connection prompt if they use Meta ads or want Meta data
    if (paidAds.includes('meta') || goal === 'meta_data') {
      setShowMetaPrompt(true);
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleTourComplete = useCallback(() => {
    setShowTour(false);
    tracker.tourCompleted();
    // Find the prefix to mark tour as shown
    const keys = Object.keys(localStorage);
    const completedKey = keys.find(
      (k) => k.startsWith('gz_onboarding_') && k.endsWith('_completed')
    );
    if (completedKey) {
      const prefix = completedKey.replace('_completed', '');
      localStorage.setItem(`${prefix}_tour_shown`, 'true');
    }
  }, [tracker]);

  const handleTourSkip = useCallback(
    (skippedAt: number) => {
      setShowTour(false);
      tracker.tourSkipped(skippedAt);
      const keys = Object.keys(localStorage);
      const completedKey = keys.find(
        (k) => k.startsWith('gz_onboarding_') && k.endsWith('_completed')
      );
      if (completedKey) {
        const prefix = completedKey.replace('_completed', '');
        localStorage.setItem(`${prefix}_tour_shown`, 'true');
      }
    },
    [tracker]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Try fetching from API routes first
      const [customersRes, purchasesRes, revenueRes] = await Promise.allSettled([
        fetch('/whop/api/airtable/customers'),
        fetch('/whop/api/airtable/purchases'),
        fetch('/whop/api/airtable/revenue'),
      ]);

      const hasRealData =
        customersRes.status === 'fulfilled' &&
        customersRes.value.ok;

      if (hasRealData) {
        const customersJson = await (customersRes as PromiseFulfilledResult<Response>).value.json();

        // If we got real data from Airtable, use it
        if (customersJson.data && customersJson.data.length > 0) {
          // TODO: Wire real data transforms here once env vars are connected
          // For now, fall through to placeholder data
        }
      }

      // Use placeholder data until env vars are configured
      setData(generatePlaceholderData());
      setFemfitData(generateFemFitFunnelData());
    } catch (err) {
      console.error('[WhopDashboardShell] Error fetching data:', err);
      setData(generatePlaceholderData());
      setFemfitData(generateFemFitFunnelData());
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderView = () => {
    if (!data) return null;

    switch (activeView) {
      case 'overview':
        return <OverviewView data={data} activeChannel={activeChannel} />;
      case 'funnel':
        return <FunnelView funnelData={data.funnelData} channelFunnels={data.channelFunnels} femfitData={femfitData ?? undefined} />;
      case 'ads':
        return <AdsView campaigns={data.campaigns} roasChart={data.roasChart} spendVsRevenue={data.spendVsRevenue} />;
      case 'customers':
        return <CustomersView customers={data.customers} cohorts={data.cohorts} />;
      case 'products':
        return <ProductView products={data.products} />;
      case 'links':
        return <LinksView links={allLinks} onCreateLink={handleCreateLink} onViewSavedLinks={handleViewSavedLinks} />;
      case 'createLink':
        return <CreateLinkView onBack={() => setActiveView('links')} onLinkCreated={handleLinkCreated} />;
      default:
        return null;
    }
  };

  return (
    <WhopLayout activeView={activeView} onViewChange={setActiveView}>
      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {activeView === 'overview' && 'Dashboard Overview'}
            {activeView === 'funnel' && 'Funnel Attribution'}
            {activeView === 'ads' && 'Ad Campaigns'}
            {activeView === 'customers' && 'Customer Intelligence'}
            {activeView === 'products' && 'Product Performance'}
            {activeView === 'links' && 'Tracking Links'}
            {activeView === 'createLink' && 'Create Tracked Link'}
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <DateRangeToggle value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      {/* Channel filter (shown on overview and funnel) */}
      {(activeView === 'overview' || activeView === 'funnel') && (
        <div className="mb-6">
          <ChannelTabs value={activeChannel} onChange={setActiveChannel} />
        </div>
      )}

      {/* Personalized prompts from onboarding */}
      {showMetaPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mb-6 flex items-center justify-between px-4 py-3 rounded-lg"
          style={{
            backgroundColor: '#111113',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v14M1 8h14" stroke="#00FF94" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                Connect your Meta Ads account
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                See ad spend alongside creator revenue for true blended CAC
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMetaPrompt(false)}
              className="text-xs px-2 py-1 rounded transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Later
            </button>
            <button
              onClick={() => setActiveView('ads')}
              className="text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-150"
              style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
            >
              Connect Meta
            </button>
          </div>
        </motion.div>
      )}

      {showCreatorCTA && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
          className="mb-6 flex items-center justify-between px-4 py-3 rounded-lg"
          style={{
            backgroundColor: '#111113',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="#00FF94" strokeWidth="1.5" />
                <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00FF94" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                Add your first creator
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Start tracking which creators drive your sales
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreatorCTA(false)}
            className="text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-150"
            style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
          >
            Add creator
          </button>
        </motion.div>
      )}

      {/* Loading state */}
      <div data-tour="revenue-overview">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          renderView()
        )}
      </div>

      {/* Product tour overlay */}
      {showTour && !loading && (
        <ProductTour
          steps={GROWZILLA_TOUR_STEPS}
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
          onStepChange={(step, stepName, interacted) => {
            tracker.tourStep(step, stepName, interacted);
          }}
        />
      )}

      {/* Setup checklist widget */}
      {showChecklist && checklistItems.length > 0 && (
        <SetupChecklist
          items={checklistItems}
          onItemClick={(itemId) => {
            if (itemId === 'add_creator') setActiveView('overview' as WhopView);
            if (itemId === 'create_link') setActiveView('createLink');
          }}
        />
      )}
    </WhopLayout>
  );
};

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI row skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card-zilla p-4">
            <div className="h-3 w-20 bg-white/5 rounded mb-2" />
            <div className="h-7 w-24 bg-white/5 rounded" />
          </div>
        ))}
      </div>
      {/* Chart skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-zilla p-6 h-80">
          <div className="h-3 w-32 bg-white/5 rounded mb-4" />
          <div className="h-full bg-white/[0.02] rounded-lg" />
        </div>
        <div className="card-zilla p-6 h-80">
          <div className="h-3 w-32 bg-white/5 rounded mb-4" />
          <div className="h-full bg-white/[0.02] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default WhopDashboardShell;
