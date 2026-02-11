import type {
  DashboardStats,
  RevenueChartData,
  TopProduct,
  Insight,
  InsightStats,
} from '@/types/admin';

// Mock store for the user dashboard skeleton
export const MOCK_STORE = {
  domain: 'demo-store.myshopify.com',
  label: 'Demo Store',
  addedAt: '2025-12-01T00:00:00Z',
  status: 'active' as const,
  shop_id: 'demo-001',
  name: 'Demo Store',
  currency: 'USD',
  plan: 'Shopify Plus',
  last_synced: new Date().toISOString(),
};

export const MOCK_STATS: DashboardStats = {
  total_revenue: 142380,
  total_orders: 1847,
  average_order_value: 77.05,
  total_customers: 1203,
  revenue_change: 12.4,
  orders_change: 8.2,
  aov_change: 3.8,
  customers_change: 15.1,
};

export const MOCK_REVENUE_CHART: RevenueChartData = {
  period: '30d',
  total_revenue: 142380,
  total_orders: 1847,
  data: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const base = 3500 + Math.sin(i * 0.5) * 1500;
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.round(base + Math.random() * 1000),
      orders: Math.round(40 + Math.random() * 30),
    };
  }),
};

export const MOCK_TOP_PRODUCTS: TopProduct[] = [
  { rank: 1, product_id: 'p1', title: 'Premium Hydrating Serum', revenue: 28400, orders: 412, average_price: 68.93 },
  { rank: 2, product_id: 'p2', title: 'Daily Glow Moisturizer', revenue: 21200, orders: 318, average_price: 66.67 },
  { rank: 3, product_id: 'p3', title: 'Vitamin C Brightening Kit', revenue: 18900, orders: 210, average_price: 90.0 },
  { rank: 4, product_id: 'p4', title: 'Gentle Cleanser Duo', revenue: 14300, orders: 286, average_price: 50.0 },
  { rank: 5, product_id: 'p5', title: 'Night Recovery Cream', revenue: 11800, orders: 164, average_price: 71.95 },
];

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: 'ins-1',
    shop_id: 'demo-001',
    title: 'Cart Abandonment Spike on Mobile',
    description: 'Mobile cart-to-checkout drop-off increased 23% this week. Estimated revenue impact: $4,200/mo.',
    severity: 'critical',
    status: 'active',
    category: 'conversion',
    action_summary: 'Review mobile checkout UX, consider one-tap checkout.',
    expected_uplift: '+$4,200/mo',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'ins-2',
    shop_id: 'demo-001',
    title: 'Top Product Running Low on Stock',
    description: 'Premium Hydrating Serum has ~12 days of inventory at current sell rate.',
    severity: 'high',
    status: 'active',
    category: 'inventory',
    action_summary: 'Reorder from supplier or adjust ad spend down.',
    expected_uplift: 'Prevent $8,500 stockout loss',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'ins-3',
    shop_id: 'demo-001',
    title: 'Email Flow Underperforming',
    description: 'Post-purchase flow has 8% open rate vs 22% benchmark. Revenue per email is $0.12 vs $0.45 target.',
    severity: 'medium',
    status: 'active',
    category: 'marketing',
    action_summary: 'A/B test subject lines, review send timing.',
    expected_uplift: '+$1,800/mo',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'ins-4',
    shop_id: 'demo-001',
    title: 'Returning Customer Rate Above Average',
    description: 'Your 34% returning customer rate exceeds the 25% industry benchmark. Strong brand loyalty signal.',
    severity: 'low',
    status: 'active',
    category: 'retention',
    created_at: new Date(Date.now() - 345600000).toISOString(),
  },
];

export const MOCK_INSIGHT_STATS: InsightStats = {
  total: 4,
  active: 4,
  dismissed: 0,
  actioned: 0,
  by_severity: { critical: 1, high: 1, medium: 1, low: 1 },
};
