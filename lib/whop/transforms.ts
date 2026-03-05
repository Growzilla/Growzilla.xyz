// Data transforms — Airtable records → dashboard types
import type {
  WhopCustomer,
  WhopPurchase,
  WhopRevenue,
  WhopProduct,
  AttributionChannel,
  Touchpoint,
  WhopKPIs,
  ChannelMetrics,
  RevenueDataPoint,
  CohortRow,
} from '@/types/whop';
import { detectChannel } from './attribution';

// ─── Airtable Record → Domain Types ──────────────────────────────────────────

type AirtableFields = Record<string, unknown>;

export function transformCustomer(fields: AirtableFields, id: string): WhopCustomer {
  const touchpoints: Touchpoint[] = [];

  // Parse touchpoints if stored as JSON string
  if (typeof fields['Touchpoints'] === 'string') {
    try {
      const raw = JSON.parse(fields['Touchpoints'] as string);
      if (Array.isArray(raw)) {
        for (const tp of raw) {
          touchpoints.push({
            timestamp: tp.timestamp || '',
            channel: tp.channel || detectChannel(tp),
            source: tp.source || tp.utmSource || '',
            medium: tp.medium || tp.utmMedium,
            campaignId: tp.campaignId,
            adSetId: tp.adSetId,
            adId: tp.adId,
            pageUrl: tp.pageUrl,
          });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  const firstTouchChannel = detectChannel({
    utmSource: fields['UTM Source'] as string,
    utmMedium: fields['UTM Medium'] as string,
    referrerUrl: fields['Referrer URL'] as string,
  });

  const totalSpend = Number(fields['Total Spend']) || 0;
  const purchaseCount = Number(fields['Purchase Count']) || 0;
  const lastActivity = (fields['Last Activity Date'] as string) || '';
  const daysSinceActivity = lastActivity
    ? Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  let churnRisk: 'low' | 'medium' | 'high' = 'low';
  if (daysSinceActivity > 60) churnRisk = 'high';
  else if (daysSinceActivity > 30) churnRisk = 'medium';

  let status: 'active' | 'churned' | 'at_risk' = 'active';
  if (daysSinceActivity > 90) status = 'churned';
  else if (daysSinceActivity > 45) status = 'at_risk';

  const firstPurchaseDate = (fields['First Purchase Date'] as string) || '';
  const cohortMonth = firstPurchaseDate ? firstPurchaseDate.slice(0, 7) : '';

  return {
    id,
    email: (fields['Email'] as string) || '',
    name: (fields['Name'] as string) || (fields['Email'] as string) || 'Unknown',
    firstPurchaseDate,
    lastActivityDate: lastActivity,
    totalSpend,
    purchaseCount,
    ltv: totalSpend,
    churnRisk,
    status,
    firstTouchChannel,
    utmSource: fields['UTM Source'] as string,
    utmMedium: fields['UTM Medium'] as string,
    utmCampaign: fields['UTM Campaign'] as string,
    referrerUrl: fields['Referrer URL'] as string,
    referralCode: fields['Referral Code'] as string,
    touchpoints,
    cohortMonth,
  };
}

export function transformPurchase(fields: AirtableFields, id: string): WhopPurchase {
  const channel = detectChannel({
    utmSource: fields['UTM Source'] as string,
    utmMedium: fields['UTM Medium'] as string,
    referrerUrl: fields['Referrer URL'] as string,
    campaignId: fields['Campaign ID'] as string,
  });

  return {
    id,
    customerId: (fields['Customer ID'] as string) || '',
    productId: (fields['Product ID'] as string) || '',
    productName: (fields['Product Name'] as string) || '',
    amount: Number(fields['Amount']) || 0,
    currency: (fields['Currency'] as string) || 'USD',
    purchaseDate: (fields['Purchase Date'] as string) || '',
    isRecurring: Boolean(fields['Is Recurring']),
    renewalNumber: Number(fields['Renewal Number']) || undefined,
    channel,
    campaignId: fields['Campaign ID'] as string,
    utmSource: fields['UTM Source'] as string,
    utmMedium: fields['UTM Medium'] as string,
    utmCampaign: fields['UTM Campaign'] as string,
  };
}

export function transformRevenue(fields: AirtableFields): WhopRevenue {
  const byChannel: Record<AttributionChannel, number> = {
    meta: Number(fields['Meta Revenue']) || 0,
    tiktok: Number(fields['TikTok Revenue']) || 0,
    google: Number(fields['Google Revenue']) || 0,
    organic: Number(fields['Organic Revenue']) || 0,
    email: Number(fields['Email Revenue']) || 0,
    referral: Number(fields['Referral Revenue']) || 0,
  };

  const byProduct: Record<string, number> = {};
  // Parse product revenue if stored as JSON
  if (typeof fields['Product Revenue'] === 'string') {
    try {
      Object.assign(byProduct, JSON.parse(fields['Product Revenue'] as string));
    } catch {
      // Ignore parse errors
    }
  }

  return {
    date: (fields['Date'] as string) || '',
    totalRevenue: Number(fields['Total Revenue']) || 0,
    newRevenue: Number(fields['New Revenue']) || 0,
    recurringRevenue: Number(fields['Recurring Revenue']) || 0,
    byChannel,
    byProduct,
  };
}

export function transformProduct(fields: AirtableFields, id: string): WhopProduct {
  return {
    id,
    name: (fields['Name'] as string) || '',
    type: (fields['Type'] as WhopProduct['type']) || 'membership',
    price: Number(fields['Price']) || 0,
    billingPeriod: fields['Billing Period'] as WhopProduct['billingPeriod'],
    activeSubscribers: Number(fields['Active Subscribers']) || 0,
    totalRevenue: Number(fields['Total Revenue']) || 0,
    churnRate: Number(fields['Churn Rate']) || 0,
    mrr: Number(fields['MRR']) || 0,
  };
}

// ─── Aggregate Calculations ───────────────────────────────────────────────────

export function calculateKPIs(
  purchases: WhopPurchase[],
  customers: WhopCustomer[],
  products: WhopProduct[],
  prevPeriodPurchases?: WhopPurchase[]
): WhopKPIs {
  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);
  const mrr = products.reduce((sum, p) => sum + p.mrr, 0);
  const newCustomers = customers.filter((c) => c.status === 'active').length;
  const churnedCustomers = customers.filter((c) => c.status === 'churned').length;
  const churnRate = customers.length > 0 ? (churnedCustomers / customers.length) * 100 : 0;
  const avgLTV = customers.length > 0 ? customers.reduce((sum, c) => sum + c.ltv, 0) / customers.length : 0;

  // Calculate previous period values for deltas
  const prevRevenue = prevPeriodPurchases?.reduce((sum, p) => sum + p.amount, 0) || totalRevenue;
  const revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;

  return {
    totalRevenue,
    revenueChange: Math.round(revenueChange * 10) / 10,
    mrr,
    mrrChange: 0,
    newCustomers,
    newCustomersChange: 0,
    overallROAS: 0,
    roasChange: 0,
    churnRate: Math.round(churnRate * 10) / 10,
    churnChange: 0,
    avgLTV: Math.round(avgLTV),
    ltvChange: 0,
    totalAdSpend: 0,
    adSpendChange: 0,
  };
}

export function calculateChannelMetrics(
  purchases: WhopPurchase[],
  customers: WhopCustomer[]
): ChannelMetrics[] {
  const channels: AttributionChannel[] = ['meta', 'tiktok', 'google', 'organic', 'email', 'referral'];
  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);

  return channels.map((channel) => {
    const channelPurchases = purchases.filter((p) => p.channel === channel);
    const revenue = channelPurchases.reduce((sum, p) => sum + p.amount, 0);
    const channelCustomers = customers.filter((c) => c.firstTouchChannel === channel);

    return {
      channel,
      revenue,
      revenueShare: totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 1000) / 10 : 0,
      customers: channelCustomers.length,
      conversions: channelPurchases.length,
      conversionRate: 0,
    };
  }).filter((m) => m.revenue > 0 || m.customers > 0);
}

export function buildRevenueChart(revenueData: WhopRevenue[]): RevenueDataPoint[] {
  return revenueData.map((r) => ({
    date: r.date,
    meta: r.byChannel.meta,
    tiktok: r.byChannel.tiktok,
    google: r.byChannel.google,
    organic: r.byChannel.organic,
    email: r.byChannel.email,
    referral: r.byChannel.referral,
    total: r.totalRevenue,
  }));
}

export function buildCohorts(customers: WhopCustomer[]): CohortRow[] {
  const cohortMap = new Map<string, WhopCustomer[]>();

  for (const customer of customers) {
    if (!customer.cohortMonth) continue;
    const existing = cohortMap.get(customer.cohortMonth) || [];
    existing.push(customer);
    cohortMap.set(customer.cohortMonth, existing);
  }

  const cohorts: CohortRow[] = [];
  for (const [month, cohortCustomers] of Array.from(cohortMap)) {
    const totalCustomers = cohortCustomers.length;
    const activeCustomers = cohortCustomers.filter((c) => c.status === 'active').length;

    // Calculate monthly retention (simplified — real implementation would track monthly)
    const monthsSinceStart = Math.max(
      1,
      Math.floor((Date.now() - new Date(month + '-01').getTime()) / (1000 * 60 * 60 * 24 * 30))
    );
    const retention: number[] = [];
    for (let i = 0; i <= Math.min(monthsSinceStart, 11); i++) {
      // Simplified: linear decay from 100% to current retention
      const currentRetention = activeCustomers / totalCustomers;
      const decayRate = (1 - currentRetention) / monthsSinceStart;
      retention.push(Math.round((1 - decayRate * i) * 100));
    }

    cohorts.push({ cohortMonth: month, totalCustomers, retention });
  }

  return cohorts.sort((a, b) => a.cohortMonth.localeCompare(b.cohortMonth));
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────

export function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function formatPercent(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

export function formatDelta(n: number): { text: string; up: boolean } {
  return {
    text: formatPercent(n),
    up: n >= 0,
  };
}
