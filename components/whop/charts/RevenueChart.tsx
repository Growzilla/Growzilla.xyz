'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { RevenueDataPoint, AttributionChannel } from '@/types/whop';
import { getChannelColor, getChannelLabel } from '@/lib/whop/attribution';

interface RevenueChartProps {
  data: RevenueDataPoint[];
  activeChannel: string; // 'all' or a specific channel
}

function formatK(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`;
}

const LINE_W = 700;
const LINE_H = 280;
const PAD_L = 52;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 40;

const CHANNELS: AttributionChannel[] = ['meta', 'tiktok', 'google', 'organic', 'email', 'referral'];

function StackedAreaChart({ data }: { data: RevenueDataPoint[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const chartW = LINE_W - PAD_L - PAD_R;
  const chartH = LINE_H - PAD_T - PAD_B;

  const maxVal = Math.max(...data.map((d) => d.total), 1);

  function getX(i: number): number {
    return PAD_L + (i / Math.max(data.length - 1, 1)) * chartW;
  }

  // Build stacked areas
  const stackedPaths: { channel: AttributionChannel; path: string }[] = [];
  const cumulativeValues: number[][] = data.map(() => []);

  CHANNELS.forEach((channel, ci) => {
    const points: { x: number; y0: number; y1: number }[] = data.map((d, i) => {
      const prevCumulative = ci > 0 ? cumulativeValues[i][ci - 1] : 0;
      const val = d[channel as keyof RevenueDataPoint] as number;
      const cumulative = prevCumulative + val;
      cumulativeValues[i][ci] = cumulative;

      const y1 = PAD_T + chartH - (cumulative / maxVal) * chartH;
      const y0 = PAD_T + chartH - (prevCumulative / maxVal) * chartH;
      return { x: getX(i), y0, y1 };
    });

    const topLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y1.toFixed(1)}`).join(' ');
    const bottomLine = [...points].reverse().map((p, i) => `${i === 0 ? 'L' : 'L'}${p.x.toFixed(1)},${p.y0.toFixed(1)}`).join(' ');
    stackedPaths.push({ channel, path: `${topLine} ${bottomLine} Z` });
  });

  return (
    <>
      <svg viewBox={`0 0 ${LINE_W} ${LINE_H}`} className="w-full h-auto" onMouseLeave={() => setHoveredIdx(null)}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = PAD_T + chartH - pct * chartH;
          return (
            <g key={pct}>
              <line x1={PAD_L} y1={y} x2={LINE_W - PAD_R} y2={y} stroke="#374151" strokeWidth={0.5} />
              <text x={PAD_L - 8} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={9} fontFamily="monospace">
                {formatK(maxVal * pct)}
              </text>
            </g>
          );
        })}

        {/* Stacked areas */}
        {stackedPaths.map((sp) => (
          <path key={sp.channel} d={sp.path} fill={getChannelColor(sp.channel)} opacity={0.3} />
        ))}

        {/* Hover columns */}
        {data.map((_, i) => (
          <rect
            key={`hover-${i}`}
            x={getX(i) - chartW / data.length / 2}
            y={PAD_T}
            width={chartW / data.length}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => setHoveredIdx(i)}
          />
        ))}

        {/* Hover indicator */}
        {hoveredIdx !== null && (
          <line
            x1={getX(hoveredIdx)}
            y1={PAD_T}
            x2={getX(hoveredIdx)}
            y2={PAD_T + chartH}
            stroke="#ffffff20"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        )}

        {/* X-axis labels */}
        {data.map((d, i) =>
          i % Math.max(Math.floor(data.length / 6), 1) === 0 ? (
            <text key={`x-${i}`} x={getX(i)} y={LINE_H - 8} textAnchor="middle" fill="#6B7280" fontSize={9} fontFamily="monospace">
              {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ) : null
        )}
      </svg>

      {/* Hover tooltip */}
      {hoveredIdx !== null && (
        <div className="flex items-center justify-center gap-4 mt-2 text-xs flex-wrap">
          <span className="text-gray-500 font-mono">
            {new Date(data[hoveredIdx].date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="font-mono text-white font-medium">
            Total: {formatK(data[hoveredIdx].total)}
          </span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5 flex-wrap">
        {CHANNELS.map((ch) => {
          const total = data.reduce((sum, d) => sum + (d[ch as keyof RevenueDataPoint] as number), 0);
          if (total === 0) return null;
          return (
            <div key={ch} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getChannelColor(ch) }} />
              <span className="text-xs text-gray-400">{getChannelLabel(ch)}</span>
              <span className="text-xs font-mono text-white font-medium">{formatK(total)}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function SingleChannelLine({ data, channel }: { data: RevenueDataPoint[]; channel: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const chartW = LINE_W - PAD_L - PAD_R;
  const chartH = LINE_H - PAD_T - PAD_B;

  const values = data.map((d) => (d[channel as keyof RevenueDataPoint] as number) || 0);
  const maxVal = Math.max(...values, 1);

  function getX(i: number): number {
    return PAD_L + (i / Math.max(data.length - 1, 1)) * chartW;
  }
  function getY(val: number): number {
    return PAD_T + chartH - (val / maxVal) * chartH;
  }

  const linePath = data
    .map((_, i) => `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(1)},${getY(values[i]).toFixed(1)}`)
    .join(' ');

  const lastX = getX(data.length - 1);
  const firstX = getX(0);
  const baseY = PAD_T + chartH;
  const areaPath = `${linePath} L${lastX.toFixed(1)},${baseY} L${firstX.toFixed(1)},${baseY} Z`;
  const color = getChannelColor(channel);
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <>
      <svg viewBox={`0 0 ${LINE_W} ${LINE_H}`} className="w-full h-auto" onMouseLeave={() => setHoveredIdx(null)}>
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = PAD_T + chartH - pct * chartH;
          return (
            <g key={pct}>
              <line x1={PAD_L} y1={y} x2={LINE_W - PAD_R} y2={y} stroke="#374151" strokeWidth={0.5} />
              <text x={PAD_L - 8} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={9} fontFamily="monospace">
                {formatK(maxVal * pct)}
              </text>
            </g>
          );
        })}
        <path d={areaPath} fill={color} opacity={0.08} />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        {data.map((_, i) => (
          <rect
            key={`hover-${i}`}
            x={getX(i) - chartW / data.length / 2}
            y={PAD_T}
            width={chartW / data.length}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => setHoveredIdx(i)}
          />
        ))}
        {hoveredIdx !== null && (
          <>
            <line x1={getX(hoveredIdx)} y1={PAD_T} x2={getX(hoveredIdx)} y2={PAD_T + chartH} stroke="#ffffff20" strokeWidth={1} strokeDasharray="4,4" />
            <circle cx={getX(hoveredIdx)} cy={getY(values[hoveredIdx])} r={4} fill={color} stroke="#0A0A0B" strokeWidth={2} />
          </>
        )}
        {data.map((d, i) =>
          i % Math.max(Math.floor(data.length / 6), 1) === 0 ? (
            <text key={`x-${i}`} x={getX(i)} y={LINE_H - 8} textAnchor="middle" fill="#6B7280" fontSize={9} fontFamily="monospace">
              {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ) : null
        )}
      </svg>
      {hoveredIdx !== null && (
        <div className="flex items-center justify-center gap-4 mt-2 text-xs">
          <span className="text-gray-500 font-mono">
            {new Date(data[hoveredIdx].date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="font-mono" style={{ color }}>
            {getChannelLabel(channel)}: {formatK(values[hoveredIdx])}
          </span>
        </div>
      )}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs text-gray-400">{getChannelLabel(channel)}</span>
          <span className="text-xs font-mono text-white font-medium">{formatK(total)}</span>
        </div>
      </div>
    </>
  );
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, activeChannel }) => {
  const isAll = activeChannel === 'all';

  return (
    <div className="card-zilla p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white">
          {isAll ? 'Revenue by Channel' : `${getChannelLabel(activeChannel)} Revenue Trend`}
        </h3>
        <span className="text-[10px] text-gray-500 font-mono">Last {data.length} days</span>
      </div>
      {isAll ? <StackedAreaChart data={data} /> : <SingleChannelLine data={data} channel={activeChannel} />}
    </div>
  );
};

export default RevenueChart;
