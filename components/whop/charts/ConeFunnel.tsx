'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { FemFitFunnelStep } from '@/types/whop';

interface ConeFunnelProps {
  steps: FemFitFunnelStep[];
  whaleOnly?: boolean;
}

const STAGE_COLORS: Record<string, { fill: string; glow: string }> = {
  traffic:           { fill: '#FA4616', glow: 'rgba(250,70,22,0.35)' },
  typeform_start:    { fill: '#FF6B3D', glow: 'rgba(255,107,61,0.30)' },
  typeform_complete: { fill: '#FF8A5C', glow: 'rgba(255,138,92,0.25)' },
  call_booked:       { fill: '#FFA77B', glow: 'rgba(255,167,123,0.20)' },
  closed_won:        { fill: '#22C55E', glow: 'rgba(34,197,94,0.35)' },
};

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

const ConeFunnel: React.FC<ConeFunnelProps> = ({ steps, whaleOnly }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (steps.length === 0) return null;

  const maxCount = steps[0].count || 1;

  // SVG dimensions
  const W = 380;
  const H = 480;
  const PAD_X = 20;
  const layerGap = 6;
  const layerCount = steps.length;
  const availableH = H - 40;
  const layerH = (availableH - layerGap * (layerCount - 1)) / layerCount;
  const centerX = W / 2;
  const minWidth = 60;
  const maxWidth = W - PAD_X * 2;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.3))' }}
      >
        <defs>
          {steps.map((step) => {
            const colors = STAGE_COLORS[step.stage] || STAGE_COLORS.traffic;
            return (
              <linearGradient
                key={`grad-${step.stage}`}
                id={`cone-grad-${step.stage}`}
                x1="0" y1="0" x2="1" y2="1"
              >
                <stop offset="0%" stopColor={colors.fill} stopOpacity="0.85" />
                <stop offset="100%" stopColor={colors.fill} stopOpacity="0.45" />
              </linearGradient>
            );
          })}
          <filter id="cone-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {steps.map((step, i) => {
          const y = 20 + i * (layerH + layerGap);
          const widthPct = Math.max(step.count / maxCount, 0.15);
          const topWidth = i === 0
            ? maxWidth
            : Math.max(minWidth, maxWidth * Math.max(steps[i - 1].count / maxCount, 0.15));
          const bottomWidth = Math.max(minWidth, maxWidth * widthPct);

          // Next layer width (for bottom of this trapezoid)
          const nextWidthPct = i < steps.length - 1
            ? Math.max(steps[i + 1].count / maxCount, 0.15)
            : widthPct * 0.7;
          const thisBottomWidth = i < steps.length - 1
            ? Math.max(minWidth, maxWidth * Math.max(steps[i].count / maxCount, 0.15))
            : bottomWidth;

          const topLeft = centerX - topWidth / 2;
          const topRight = centerX + topWidth / 2;
          const botLeft = centerX - thisBottomWidth / 2;
          const botRight = centerX + thisBottomWidth / 2;

          const colors = STAGE_COLORS[step.stage] || STAGE_COLORS.traffic;
          const isHovered = hoveredIndex === i;
          const isLast = i === steps.length - 1;

          // Trapezoid path with slight curve
          const path = `
            M ${topLeft + 4} ${y}
            Q ${topLeft} ${y}, ${topLeft} ${y + 4}
            L ${botLeft} ${y + layerH - 4}
            Q ${botLeft} ${y + layerH}, ${botLeft + 4} ${y + layerH}
            L ${botRight - 4} ${y + layerH}
            Q ${botRight} ${y + layerH}, ${botRight} ${y + layerH - 4}
            L ${topRight} ${y + 4}
            Q ${topRight} ${y}, ${topRight - 4} ${y}
            Z
          `;

          return (
            <g key={step.stage}>
              {/* Glow layer on hover */}
              {isHovered && (
                <motion.path
                  d={path}
                  fill={colors.glow}
                  filter="url(#cone-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Main trapezoid */}
              <motion.path
                d={path}
                fill={`url(#cone-grad-${step.stage})`}
                stroke={isHovered ? colors.fill : 'rgba(255,255,255,0.08)'}
                strokeWidth={isHovered ? 1.5 : 0.5}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                style={{ transformOrigin: `${centerX}px ${y}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Label */}
              <motion.text
                x={centerX}
                y={y + layerH / 2 - 8}
                textAnchor="middle"
                className="fill-white text-[11px] font-medium pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {step.label}
              </motion.text>

              {/* Count */}
              <motion.text
                x={centerX}
                y={y + layerH / 2 + 8}
                textAnchor="middle"
                className="fill-white text-[13px] font-bold pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.35 }}
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {formatK(step.count)}
              </motion.text>

              {/* Revenue label on right */}
              {step.revenue > 0 && (
                <motion.text
                  x={topRight + 8}
                  y={y + layerH / 2 + 4}
                  className="fill-[#A1A1AA] text-[9px] pointer-events-none"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: isHovered ? 1 : 0.6, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  style={{ fontFamily: 'ui-monospace, monospace' }}
                >
                  {formatCurrency(step.revenue)}
                </motion.text>
              )}

              {/* Drop-off indicator between layers */}
              {!isLast && step.dropOffRate > 0 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  {/* Arrow */}
                  <line
                    x1={topLeft - 12}
                    y1={y + layerH + 1}
                    x2={topLeft - 12}
                    y2={y + layerH + layerGap - 1}
                    stroke={step.dropOffRate > 60 ? '#EF4444' : step.dropOffRate > 35 ? '#F59E0B' : '#A1A1AA'}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <text
                    x={topLeft - 18}
                    y={y + layerH + layerGap / 2 + 3}
                    textAnchor="end"
                    className="text-[8px] pointer-events-none"
                    fill={step.dropOffRate > 60 ? '#EF4444' : step.dropOffRate > 35 ? '#F59E0B' : '#A1A1AA'}
                    style={{ fontFamily: 'ui-monospace, monospace' }}
                  >
                    -{step.dropOffRate}%
                  </text>
                </motion.g>
              )}

              {/* Conversion rate on left */}
              <motion.text
                x={topLeft - 6}
                y={y + layerH / 2 + 4}
                textAnchor="end"
                className="fill-[#A1A1AA] text-[9px] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.4 }}
                transition={{ delay: i * 0.1 + 0.4 }}
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {step.conversionRate}%
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 mx-auto max-w-[240px] px-4 py-3 rounded-xl border border-[#27272A] bg-[#1C1A1A]/95 backdrop-blur-xl text-center"
        >
          <p className="text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-1">
            {steps[hoveredIndex].label}
          </p>
          <p className="text-lg font-mono font-bold text-white">
            {formatK(steps[hoveredIndex].count)}
          </p>
          <div className="flex items-center justify-center gap-3 mt-1.5">
            <span className="text-[10px] font-mono text-[#A1A1AA]">
              Conv: {steps[hoveredIndex].conversionRate}%
            </span>
            {steps[hoveredIndex].revenue > 0 && (
              <span className="text-[10px] font-mono text-[#22C55E]">
                {formatCurrency(steps[hoveredIndex].revenue)}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ConeFunnel;
