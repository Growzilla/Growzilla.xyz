'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { AdCampaign } from '@/types/whop';
import { formatCurrency, formatNumber } from '@/lib/whop/transforms';

interface CampaignModalProps {
  campaign: AdCampaign | null;
  onClose: () => void;
}

const CampaignModal: React.FC<CampaignModalProps> = ({ campaign, onClose }) => {
  if (!campaign) return null;

  const roasColor = campaign.roas >= 3 ? 'text-zilla-neon' : campaign.roas >= 1 ? 'text-amber-400' : 'text-red-400';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zilla-dark/95 backdrop-blur-xl shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-white">{campaign.name}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-zilla-neon/10 text-zilla-neon'
                    : 'bg-amber-400/10 text-amber-400'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-mono uppercase">{campaign.platform}</p>
            </div>

            {/* Main KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'ROAS', value: `${campaign.roas.toFixed(1)}x`, highlight: true, color: roasColor },
                { label: 'Revenue', value: formatCurrency(campaign.revenue) },
                { label: 'Spend', value: formatCurrency(campaign.spend) },
                { label: 'CPA', value: formatCurrency(campaign.cpa) },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className={`rounded-xl p-3 border ${
                    kpi.highlight
                      ? 'border-zilla-neon/20 bg-zilla-neon/5'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{kpi.label}</p>
                  <p className={`text-lg font-mono font-bold mt-0.5 ${'color' in kpi && kpi.color ? kpi.color : 'text-white'}`}>
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="mb-6">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                Performance Metrics
              </h4>
              <div className="space-y-2 bg-white/[0.02] rounded-xl border border-white/5 p-4">
                {[
                  { label: 'Impressions', value: formatNumber(campaign.impressions) },
                  { label: 'Clicks', value: formatNumber(campaign.clicks) },
                  { label: 'CTR', value: `${(campaign.ctr * 100).toFixed(2)}%` },
                  { label: 'Conversions', value: formatNumber(campaign.conversions) },
                  { label: 'Conversion Rate', value: campaign.clicks > 0 ? `${((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%` : '0%' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-1">
                    <span className="text-xs text-gray-400">{row.label}</span>
                    <span className="text-sm font-mono font-medium text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Sets */}
            {campaign.adSets && campaign.adSets.length > 0 && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                  Ad Sets ({campaign.adSets.length})
                </h4>
                <div className="space-y-2">
                  {campaign.adSets.map((adSet) => (
                    <div
                      key={adSet.id}
                      className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/5 bg-white/[0.02]"
                    >
                      <span className="text-sm text-white truncate flex-1">{adSet.name}</span>
                      <div className="flex items-center gap-4 text-xs font-mono flex-shrink-0 ml-3">
                        <span className="text-gray-400">{formatCurrency(adSet.spend)} spend</span>
                        <span className="text-zilla-neon">{formatCurrency(adSet.revenue)} rev</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Start: {campaign.startDate}</span>
              {campaign.endDate && <span>End: {campaign.endDate}</span>}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CampaignModal;
