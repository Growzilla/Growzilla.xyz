'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { FunnelData, FunnelStep, ChannelFunnel } from '@/types/whop';
import { FUNNEL_STEP_LABELS, FUNNEL_STEP_COLORS } from '@/lib/whop/funnel';
import { getChannelColor, getChannelLabel } from '@/lib/whop/attribution';
import { formatNumber } from '@/lib/whop/transforms';

interface FunnelStepModalProps {
  step: FunnelStep | null;
  funnelData: FunnelData[];
  channelFunnels: ChannelFunnel[];
  onClose: () => void;
}

const FunnelStepModal: React.FC<FunnelStepModalProps> = ({ step, funnelData, channelFunnels, onClose }) => {
  if (!step) return null;

  const stepData = funnelData.find((d) => d.step === step);
  if (!stepData) return null;

  const stepIndex = funnelData.findIndex((d) => d.step === step);
  const prevStep = stepIndex > 0 ? funnelData[stepIndex - 1] : null;
  const nextStep = stepIndex < funnelData.length - 1 ? funnelData[stepIndex + 1] : null;

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
          className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zilla-dark/95 backdrop-blur-xl shadow-2xl"
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
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FUNNEL_STEP_COLORS[step] }} />
                <h3 className="text-lg font-medium text-white">{FUNNEL_STEP_LABELS[step]}</h3>
              </div>
              <p className="text-sm text-gray-500">Step {stepIndex + 1} of {funnelData.length}</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl p-3 border border-zilla-neon/20 bg-zilla-neon/5">
                <p className="text-[10px] text-gray-500 uppercase">Count</p>
                <p className="text-lg font-mono font-bold text-zilla-neon mt-0.5">
                  {formatNumber(stepData.count)}
                </p>
              </div>
              <div className="rounded-xl p-3 border border-white/5 bg-white/[0.02]">
                <p className="text-[10px] text-gray-500 uppercase">Drop-off</p>
                <p className={`text-lg font-mono font-bold mt-0.5 ${
                  stepData.dropOffRate > 70 ? 'text-red-400' : stepData.dropOffRate > 40 ? 'text-amber-400' : 'text-white'
                }`}>
                  {stepData.dropOffRate}%
                </p>
              </div>
              <div className="rounded-xl p-3 border border-white/5 bg-white/[0.02]">
                <p className="text-[10px] text-gray-500 uppercase">Conv Rate</p>
                <p className="text-lg font-mono font-bold text-white mt-0.5">
                  {stepData.conversionRate}%
                </p>
              </div>
            </div>

            {/* Flow */}
            {(prevStep || nextStep) && (
              <div className="mb-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Flow</h4>
                <div className="space-y-2 bg-white/[0.02] rounded-xl border border-white/5 p-4">
                  {prevStep && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-gray-400">From {FUNNEL_STEP_LABELS[prevStep.step]}</span>
                      <span className="text-sm font-mono text-white">{formatNumber(prevStep.count)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-1 border-y border-white/5">
                    <span className="text-xs text-zilla-neon font-medium">{FUNNEL_STEP_LABELS[step]}</span>
                    <span className="text-sm font-mono font-bold text-zilla-neon">{formatNumber(stepData.count)}</span>
                  </div>
                  {nextStep && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-gray-400">To {FUNNEL_STEP_LABELS[nextStep.step]}</span>
                      <span className="text-sm font-mono text-white">{formatNumber(nextStep.count)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* By Channel */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                By Channel
              </h4>
              <div className="space-y-2">
                {channelFunnels.map((cf) => {
                  const channelStep = cf.steps.find((s) => s.step === step);
                  if (!channelStep || channelStep.count === 0) return null;
                  return (
                    <div
                      key={cf.channel}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getChannelColor(cf.channel) }} />
                        <span className="text-sm text-white">{getChannelLabel(cf.channel)}</span>
                      </div>
                      <span className="text-sm font-mono font-medium text-white">
                        {formatNumber(channelStep.count)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FunnelStepModal;
