'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { AdCampaign, ROASDataPoint, SpendVsRevenuePoint } from '@/types/whop';
import KPIRow from '../cards/KPIRow';
import CampaignCard from '../cards/CampaignCard';
import ROASChart from '../charts/ROASChart';
import CampaignModal from '../modals/CampaignModal';
import { formatCurrency, formatNumber } from '@/lib/whop/transforms';

interface AdsViewProps {
  campaigns: AdCampaign[];
  roasChart: ROASDataPoint[];
  spendVsRevenue: SpendVsRevenuePoint[];
}

const AdsView: React.FC<AdsViewProps> = ({ campaigns, roasChart, spendVsRevenue }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign | null>(null);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const overallROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const avgCPA = totalConversions > 0 ? totalSpend / totalConversions : 0;

  const kpiCards = [
    { label: 'Total Ad Spend', value: formatCurrency(totalSpend) },
    { label: 'Ad Revenue', value: formatCurrency(totalRevenue) },
    { label: 'Overall ROAS', value: `${overallROAS.toFixed(1)}x`, up: overallROAS >= 1 },
    { label: 'Avg CPA', value: formatCurrency(avgCPA) },
    { label: 'Conversions', value: formatNumber(totalConversions) },
  ];

  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const pausedCampaigns = campaigns.filter((c) => c.status !== 'active');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* KPIs */}
      <KPIRow cards={kpiCards} />

      {/* ROAS Chart */}
      {roasChart.length > 0 && <ROASChart data={roasChart} />}

      {/* Spend vs Revenue */}
      {spendVsRevenue.length > 0 && (
        <div className="card-zilla p-6">
          <h3 className="text-sm font-medium text-white mb-4">Spend vs Revenue</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] text-gray-500 uppercase mb-1">Total Spend</p>
              <p className="text-2xl font-mono font-bold text-white">{formatCurrency(totalSpend)}</p>
            </div>
            <div className="text-center p-4 rounded-xl border border-zilla-neon/20 bg-zilla-neon/5">
              <p className="text-[10px] text-gray-500 uppercase mb-1">Total Revenue</p>
              <p className="text-2xl font-mono font-bold text-zilla-neon">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalRevenue / (totalSpend + totalRevenue)) * 100, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-zilla-neon"
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-gray-500 font-mono">
            <span>Spend</span>
            <span>Profit: {formatCurrency(totalRevenue - totalSpend)}</span>
            <span>Revenue</span>
          </div>
        </div>
      )}

      {/* Active Campaigns */}
      {activeCampaigns.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-white mb-3">
            Active Campaigns ({activeCampaigns.length})
          </h3>
          <div className="space-y-3">
            {activeCampaigns.map((campaign, i) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                index={i}
                onClick={() => setSelectedCampaign(campaign)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Paused/Completed Campaigns */}
      {pausedCampaigns.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            Paused/Completed ({pausedCampaigns.length})
          </h3>
          <div className="space-y-3 opacity-70">
            {pausedCampaigns.map((campaign, i) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                index={i}
                onClick={() => setSelectedCampaign(campaign)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {campaigns.length === 0 && (
        <div className="card-zilla p-12 text-center">
          <p className="text-gray-400 mb-2">No campaign data available</p>
          <p className="text-sm text-gray-600">
            Connect your Meta Ads account to see campaign attribution data.
          </p>
        </div>
      )}

      <CampaignModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
    </motion.div>
  );
};

export default AdsView;
