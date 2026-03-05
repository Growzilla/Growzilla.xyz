'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ChannelMetrics } from '@/types/whop';
import { getChannelColor, getChannelLabel } from '@/lib/whop/attribution';

interface ChannelDonutProps {
  channels: ChannelMetrics[];
}

function formatK(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`;
}

const CX = 120;
const CY = 120;
const R = 90;
const STROKE = 32;
const circumference = 2 * Math.PI * R;

const ChannelDonut: React.FC<ChannelDonutProps> = ({ channels }) => {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  const grandTotal = channels.reduce((sum, c) => sum + c.revenue, 0);

  let cumulativeOffset = 0;
  const segments = channels
    .filter((c) => c.revenue > 0)
    .map((c) => {
      const pct = c.revenue / (grandTotal || 1);
      const dashLength = pct * circumference;
      const gapLength = circumference - dashLength;
      const offset = -cumulativeOffset;
      cumulativeOffset += dashLength;

      return {
        ...c,
        pct,
        dashArray: `${dashLength} ${gapLength}`,
        dashOffset: offset,
      };
    });

  return (
    <div className="card-zilla p-6">
      <h3 className="text-sm font-medium text-white mb-5">Revenue Distribution</h3>

      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        {/* Donut SVG */}
        <div className="relative flex-shrink-0">
          <svg viewBox="0 0 240 240" className="w-48 h-48 sm:w-[240px] sm:h-[240px] transform -rotate-90">
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#ffffff08" strokeWidth={STROKE} />
            {segments.map((seg) => (
              <motion.circle
                key={seg.channel}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={getChannelColor(seg.channel)}
                strokeWidth={hoveredChannel === seg.channel ? STROKE + 6 : STROKE}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.dashOffset}
                strokeLinecap="butt"
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: seg.dashArray }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                opacity={hoveredChannel && hoveredChannel !== seg.channel ? 0.3 : 1}
                onMouseEnter={() => setHoveredChannel(seg.channel)}
                onMouseLeave={() => setHoveredChannel(null)}
                className="cursor-pointer transition-all duration-200"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total</p>
            <p className="text-xl font-mono font-bold text-white">{formatK(grandTotal)}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 min-w-0">
          {segments.map((seg) => (
            <motion.div
              key={seg.channel}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onMouseEnter={() => setHoveredChannel(seg.channel)}
              onMouseLeave={() => setHoveredChannel(null)}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                hoveredChannel === seg.channel ? 'border-white/20 bg-white/5' : 'border-transparent'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: getChannelColor(seg.channel) }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{getChannelLabel(seg.channel)}</span>
                  <span className="text-sm font-mono font-bold text-white">{formatK(seg.revenue)}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-gray-500">{(seg.pct * 100).toFixed(1)}% of revenue</span>
                  <span className="text-[10px] text-gray-600 font-mono">{seg.customers} customers</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${seg.pct * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: getChannelColor(seg.channel) }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelDonut;
