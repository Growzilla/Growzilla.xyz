'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { AdCampaign } from '@/types/whop';
import { formatCurrency, formatNumber } from '@/lib/whop/transforms';

interface CampaignCardProps {
  campaign: AdCampaign;
  index: number;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, index, onClick }) => {
  const roasColor = campaign.roas >= 3 ? 'text-zilla-neon' : campaign.roas >= 1 ? 'text-amber-400' : 'text-red-400';

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onClick}
      className="card-zilla p-5 text-left w-full hover:border-zilla-neon/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-white truncate">{campaign.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              campaign.status === 'active'
                ? 'bg-zilla-neon/10 text-zilla-neon'
                : campaign.status === 'paused'
                ? 'bg-amber-400/10 text-amber-400'
                : 'bg-gray-500/10 text-gray-400'
            }`}>
              {campaign.status}
            </span>
            <span className="text-[10px] text-gray-500 font-mono uppercase">{campaign.platform}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-3">
          <p className={`text-lg font-mono font-bold ${roasColor}`}>
            {campaign.roas.toFixed(1)}x
          </p>
          <p className="text-[10px] text-gray-500">ROAS</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Spend', value: formatCurrency(campaign.spend) },
          { label: 'Revenue', value: formatCurrency(campaign.revenue) },
          { label: 'CPA', value: formatCurrency(campaign.cpa) },
          { label: 'Conv.', value: formatNumber(campaign.conversions) },
        ].map((metric) => (
          <div key={metric.label}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{metric.label}</p>
            <p className="text-sm font-mono font-medium text-white mt-0.5">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
          <span>{formatNumber(campaign.impressions)} impr</span>
          <span>{formatNumber(campaign.clicks)} clicks</span>
          <span>{(campaign.ctr * 100).toFixed(2)}% CTR</span>
        </div>
        <span className="text-[10px] font-mono text-zilla-neon/70 group-hover:text-zilla-neon">
          Details →
        </span>
      </div>
    </motion.button>
  );
};

export default CampaignCard;
