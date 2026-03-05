'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { WhopDashboardData } from '@/types/whop';
import KPIRow from '../cards/KPIRow';
import RevenueChart from '../charts/RevenueChart';
import ChannelDonut from '../charts/ChannelDonut';
import FunnelChart from '../charts/FunnelChart';
import ProductCard from '../cards/ProductCard';
import { formatCurrency, formatPercent } from '@/lib/whop/transforms';

interface OverviewViewProps {
  data: WhopDashboardData;
  activeChannel: string;
}

const OverviewView: React.FC<OverviewViewProps> = ({ data, activeChannel }) => {
  const { kpis, revenueChart, channelMetrics, funnelData, products } = data;

  const kpiCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(kpis.totalRevenue),
      delta: formatPercent(kpis.revenueChange),
      up: kpis.revenueChange >= 0,
      tooltip: 'Total revenue across all channels',
    },
    {
      label: 'MRR',
      value: formatCurrency(kpis.mrr),
      delta: formatPercent(kpis.mrrChange),
      up: kpis.mrrChange >= 0,
      tooltip: 'Monthly Recurring Revenue',
    },
    {
      label: 'New Customers',
      value: kpis.newCustomers.toLocaleString(),
      delta: formatPercent(kpis.newCustomersChange),
      up: kpis.newCustomersChange >= 0,
    },
    {
      label: 'ROAS',
      value: kpis.overallROAS > 0 ? `${kpis.overallROAS.toFixed(1)}x` : 'N/A',
      delta: kpis.roasChange !== 0 ? formatPercent(kpis.roasChange) : undefined,
      up: kpis.roasChange >= 0,
      tooltip: 'Return on Ad Spend',
    },
    {
      label: 'Churn Rate',
      value: `${kpis.churnRate}%`,
      delta: kpis.churnChange !== 0 ? formatPercent(kpis.churnChange) : undefined,
      up: kpis.churnChange <= 0, // lower churn is good
      tooltip: 'Monthly churn rate',
    },
  ];

  const topProducts = [...products]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* KPI Row */}
      <KPIRow cards={kpiCards} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueChart} activeChannel={activeChannel} />
        <ChannelDonut channels={channelMetrics} />
      </div>

      {/* Quick Funnel */}
      <div className="card-zilla p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Quick Funnel</h3>
          <span className="text-[10px] text-gray-500 font-mono">full journey</span>
        </div>
        <FunnelChart data={funnelData} />
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Top Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OverviewView;
