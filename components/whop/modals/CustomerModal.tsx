'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { WhopCustomer } from '@/types/whop';
import { formatCurrency } from '@/lib/whop/transforms';
import { getChannelColor, getChannelLabel } from '@/lib/whop/attribution';

interface CustomerModalProps {
  customer: WhopCustomer | null;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, onClose }) => {
  if (!customer) return null;

  const riskColor = customer.churnRisk === 'low'
    ? 'text-zilla-neon bg-zilla-neon/10 border-zilla-neon/20'
    : customer.churnRisk === 'medium'
    ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    : 'text-red-400 bg-red-400/10 border-red-400/20';

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
                <h3 className="text-lg font-medium text-white">{customer.name}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${riskColor}`}>
                  {customer.churnRisk} risk
                </span>
              </div>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Lifetime Value', value: formatCurrency(customer.ltv), highlight: true },
                { label: 'Purchases', value: customer.purchaseCount.toString() },
                { label: 'Total Spend', value: formatCurrency(customer.totalSpend) },
                { label: 'Status', value: customer.status, capitalize: true },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className={`rounded-xl p-3 border ${
                    'highlight' in kpi && kpi.highlight
                      ? 'border-zilla-neon/20 bg-zilla-neon/5'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{kpi.label}</p>
                  <p className={`text-lg font-mono font-bold mt-0.5 ${
                    'highlight' in kpi && kpi.highlight ? 'text-zilla-neon' : 'text-white'
                  } ${'capitalize' in kpi && kpi.capitalize ? 'capitalize' : ''}`}>
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>

            {/* First Touch Attribution */}
            <div className="mb-6">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                First Touch Attribution
              </h4>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getChannelColor(customer.firstTouchChannel) }} />
                <span className="text-sm font-medium text-white">{getChannelLabel(customer.firstTouchChannel)}</span>
                {customer.utmCampaign && (
                  <span className="text-xs text-gray-500 font-mono ml-auto">{customer.utmCampaign}</span>
                )}
              </div>
            </div>

            {/* Customer Journey */}
            <div className="mb-6">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                Customer Journey ({customer.touchpoints.length} touchpoints)
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {customer.touchpoints.length > 0 ? (
                  customer.touchpoints.map((tp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getChannelColor(tp.channel) }} />
                        <span className="text-xs font-medium text-white">{getChannelLabel(tp.channel)}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 truncate flex-1">{tp.source}</span>
                      <span className="text-[10px] text-gray-600 font-mono flex-shrink-0">
                        {new Date(tp.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">No touchpoint data available</p>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-2 bg-white/[0.02] rounded-xl border border-white/5 p-4">
              {[
                { label: 'First Purchase', value: customer.firstPurchaseDate },
                { label: 'Last Activity', value: customer.lastActivityDate },
                { label: 'Cohort', value: customer.cohortMonth },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-400">{row.label}</span>
                  <span className="text-sm font-mono text-white">
                    {row.value
                      ? new Date(row.value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                      : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomerModal;
