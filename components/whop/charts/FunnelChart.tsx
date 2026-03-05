'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { FunnelData, FunnelStep } from '@/types/whop';
import { FUNNEL_STEP_LABELS, FUNNEL_STEP_COLORS } from '@/lib/whop/funnel';
import { formatNumber } from '@/lib/whop/transforms';

interface FunnelChartProps {
  data: FunnelData[];
  onStepClick?: (step: FunnelStep) => void;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ data, onStepClick }) => {
  if (data.length === 0) return null;

  const maxCount = data[0].count || 1;

  return (
    <div className="space-y-2">
      {data.map((step, i) => {
        const widthPct = Math.max((step.count / maxCount) * 100, 12);
        const color = FUNNEL_STEP_COLORS[step.step];
        const isLast = i === data.length - 1;
        const isPurchase = step.step === 'purchase';

        return (
          <div key={step.step}>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => onStepClick?.(step.step)}
              className="w-full group"
            >
              <div className="flex items-center gap-4">
                {/* Step label */}
                <div className="w-24 sm:w-32 text-right flex-shrink-0">
                  <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                    {FUNNEL_STEP_LABELS[step.step]}
                  </p>
                </div>

                {/* Bar */}
                <div className="flex-1 relative">
                  <div className="h-12 bg-white/[0.02] rounded-lg overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-lg flex items-center justify-between px-3 transition-all ${
                        isPurchase ? 'border border-zilla-neon/30' : ''
                      }`}
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <span className="text-sm font-mono font-bold text-white">
                        {formatNumber(step.count)}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {step.conversionRate}%
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Drop-off indicator */}
            {!isLast && step.dropOffRate > 0 && (
              <div className="flex items-center gap-4 mt-1 mb-1">
                <div className="w-24 sm:w-32" />
                <div className="flex items-center gap-2 pl-2">
                  <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className={`text-[10px] font-mono ${
                    step.dropOffRate > 70 ? 'text-red-400' : step.dropOffRate > 40 ? 'text-amber-400' : 'text-gray-500'
                  }`}>
                    -{step.dropOffRate}% drop-off
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FunnelChart;
