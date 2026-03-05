// Funnel calculation helpers
import type {
  FunnelData,
  FunnelStep,
  ChannelFunnel,
  AttributionChannel,
  WhopPurchase,
  WhopCustomer,
} from '@/types/whop';

const FUNNEL_STEPS: FunnelStep[] = [
  'impression',
  'click',
  'landing',
  'purchase',
  'retention',
];

export const FUNNEL_STEP_LABELS: Record<FunnelStep, string> = {
  impression: 'Impressions',
  click: 'Clicks',
  landing: 'Landing Page',
  purchase: 'Purchase',
  retention: 'Retention',
};

export const FUNNEL_STEP_COLORS: Record<FunnelStep, string> = {
  impression: '#6B7280',
  click: '#3B82F6',
  landing: '#F59E0B',
  purchase: '#00FF94',
  retention: '#00D9FF',
};

export function calculateFunnel(rawCounts: Record<FunnelStep, number>): FunnelData[] {
  const steps: FunnelData[] = [];
  const totalImpressions = rawCounts.impression || 1;

  FUNNEL_STEPS.forEach((step, i) => {
    const count = rawCounts[step] || 0;
    const prevCount = i > 0 ? (rawCounts[FUNNEL_STEPS[i - 1]] || 1) : count;
    const dropOffRate = i > 0 ? ((prevCount - count) / prevCount) * 100 : 0;
    const conversionRate = (count / totalImpressions) * 100;

    steps.push({
      step,
      count,
      dropOffRate: Math.round(dropOffRate * 10) / 10,
      conversionRate: Math.round(conversionRate * 10) / 10,
    });
  });

  return steps;
}

export function calculateChannelFunnels(
  customers: WhopCustomer[],
  purchases: WhopPurchase[],
  impressionsByChannel: Record<AttributionChannel, number>,
  clicksByChannel: Record<AttributionChannel, number>,
  landingsByChannel: Record<AttributionChannel, number>
): ChannelFunnel[] {
  const channels: AttributionChannel[] = ['meta', 'tiktok', 'google', 'organic', 'email', 'referral'];

  return channels.map((channel) => {
    // Count purchases by channel
    const channelPurchases = purchases.filter((p) => p.channel === channel);
    const purchaseCustomerIds = new Set(channelPurchases.map((p) => p.customerId));

    // Count retained customers (those with recurring purchases)
    const retainedCount = channelPurchases.filter((p) => p.isRecurring && (p.renewalNumber || 0) > 0).length;

    const rawCounts: Record<FunnelStep, number> = {
      impression: impressionsByChannel[channel] || 0,
      click: clicksByChannel[channel] || 0,
      landing: landingsByChannel[channel] || 0,
      purchase: purchaseCustomerIds.size,
      retention: retainedCount,
    };

    return {
      channel,
      steps: calculateFunnel(rawCounts),
    };
  });
}

export function findBottlenecks(funnelData: FunnelData[]): FunnelData[] {
  return [...funnelData]
    .filter((step) => step.dropOffRate > 0)
    .sort((a, b) => b.dropOffRate - a.dropOffRate);
}

export function calculateOverallConversionRate(funnelData: FunnelData[]): number {
  if (funnelData.length < 2) return 0;
  const first = funnelData[0].count;
  const last = funnelData[funnelData.length - 1].count;
  if (first === 0) return 0;
  return Math.round(((last / first) * 100) * 10) / 10;
}

export { FUNNEL_STEPS };
