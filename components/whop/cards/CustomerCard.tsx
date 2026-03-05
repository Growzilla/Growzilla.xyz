'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { WhopCustomer } from '@/types/whop';
import { formatCurrency } from '@/lib/whop/transforms';
import { getChannelLabel, getChannelColor } from '@/lib/whop/attribution';

interface CustomerCardProps {
  customer: WhopCustomer;
  index: number;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, index, onClick }) => {
  const riskColor = customer.churnRisk === 'low'
    ? 'text-zilla-neon bg-zilla-neon/10'
    : customer.churnRisk === 'medium'
    ? 'text-amber-400 bg-amber-400/10'
    : 'text-red-400 bg-red-400/10';

  const statusColor = customer.status === 'active'
    ? 'text-zilla-neon'
    : customer.status === 'at_risk'
    ? 'text-amber-400'
    : 'text-red-400';

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onClick}
      className="card-zilla p-4 text-left w-full hover:border-zilla-neon/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-white truncate">{customer.name}</h4>
          <p className="text-[11px] text-gray-500 truncate">{customer.email}</p>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${riskColor}`}>
          {customer.churnRisk} risk
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-[10px] text-gray-500 uppercase">LTV</p>
          <p className="text-sm font-mono font-bold text-zilla-neon">{formatCurrency(customer.ltv)}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase">Purchases</p>
          <p className="text-sm font-mono font-medium text-white">{customer.purchaseCount}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase">Status</p>
          <p className={`text-sm font-medium capitalize ${statusColor}`}>{customer.status}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getChannelColor(customer.firstTouchChannel) }} />
          <span className="text-[10px] text-gray-400">{getChannelLabel(customer.firstTouchChannel)}</span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">
          {customer.touchpoints.length} touchpoints
        </span>
      </div>
    </motion.button>
  );
};

export default CustomerCard;
