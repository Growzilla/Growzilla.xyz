import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { RevenueDataPoint } from '@/types/smdashboard';
import { getPlatformColor, getPlatformLabel } from '@/data/mockSMData';

interface RevenueByPlatformChartProps {
  data: RevenueDataPoint[];
  activePlatform: string;
}

function formatK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`;
}

const PLATFORMS = ['tiktok', 'instagram', 'youtube'] as const;

// ─── Donut Chart (shown when "All Platforms" is active) ──────────────────────

function DonutChart({ data }: { data: RevenueDataPoint[] }) {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  // Calculate totals
  const totals = PLATFORMS.map((p) => ({
    platform: p,
    total: data.reduce((sum, d) => sum + (d[p as keyof RevenueDataPoint] as number), 0),
  }));
  const grandTotal = totals.reduce((sum, t) => sum + t.total, 0);

  // SVG donut parameters
  const CX = 120;
  const CY = 120;
  const R = 90;
  const STROKE = 32;
  const circumference = 2 * Math.PI * R;

  // Build arc segments
  let cumulativeOffset = 0;
  const segments = totals.map((t) => {
    const pct = t.total / grandTotal;
    const dashLength = pct * circumference;
    const gapLength = circumference - dashLength;
    const offset = -cumulativeOffset;
    cumulativeOffset += dashLength;

    return {
      ...t,
      pct,
      dashArray: `${dashLength} ${gapLength}`,
      dashOffset: offset,
    };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
      {/* Donut SVG */}
      <div className="relative flex-shrink-0">
        <svg viewBox="0 0 240 240" className="w-48 h-48 sm:w-[240px] sm:h-[240px] transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#ffffff08"
            strokeWidth={STROKE}
          />

          {/* Platform segments */}
          {segments.map((seg) => (
            <motion.circle
              key={seg.platform}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={getPlatformColor(seg.platform)}
              strokeWidth={
                hoveredPlatform === seg.platform ? STROKE + 6 : STROKE
              }
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: seg.dashArray }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              opacity={
                hoveredPlatform && hoveredPlatform !== seg.platform ? 0.3 : 1
              }
              onMouseEnter={() => setHoveredPlatform(seg.platform)}
              onMouseLeave={() => setHoveredPlatform(null)}
              className="cursor-pointer transition-all duration-200"
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">
            Total
          </p>
          <p className="text-xl font-mono font-bold text-white">
            {formatK(grandTotal)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-4 min-w-0">
        {segments.map((seg) => (
          <motion.div
            key={seg.platform}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onMouseEnter={() => setHoveredPlatform(seg.platform)}
            onMouseLeave={() => setHoveredPlatform(null)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              hoveredPlatform === seg.platform
                ? 'border-white/20 bg-white/5'
                : 'border-transparent'
            }`}
          >
            {/* Color dot */}
            <div
              className="w-3.5 h-3.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: getPlatformColor(seg.platform) }}
            />

            {/* Platform name + percentage */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  {getPlatformLabel(seg.platform)}
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {formatK(seg.total)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-gray-500">
                  {(seg.pct * 100).toFixed(1)}% of revenue
                </span>
                <span className="text-[10px] text-gray-600 font-mono">
                  {totals.find((t) => t.platform === seg.platform)
                    ? `${data.length}d period`
                    : ''}
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="mt-1.5 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${seg.pct * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getPlatformColor(seg.platform) }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Line Chart (shown when a specific platform is selected) ─────────────────

const LINE_W = 700;
const LINE_H = 280;
const PAD_L = 52;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 40;

function LineChart({
  data,
  platform,
}: {
  data: RevenueDataPoint[];
  platform: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartW = LINE_W - PAD_L - PAD_R;
  const chartH = LINE_H - PAD_T - PAD_B;

  const values = data.map((d) => d[platform as keyof RevenueDataPoint] as number);
  const maxVal = Math.max(...values, 1);

  function getX(i: number): number {
    return PAD_L + (i / (data.length - 1)) * chartW;
  }

  function getY(val: number): number {
    return PAD_T + chartH - (val / maxVal) * chartH;
  }

  const linePath = data
    .map((d, i) => {
      const val = d[platform as keyof RevenueDataPoint] as number;
      return `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(1)},${getY(val).toFixed(1)}`;
    })
    .join(' ');

  const lastX = getX(data.length - 1);
  const firstX = getX(0);
  const baseY = PAD_T + chartH;
  const areaPath = `${linePath} L${lastX.toFixed(1)},${baseY} L${firstX.toFixed(1)},${baseY} Z`;

  const color = getPlatformColor(platform);
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <>
      <svg
        viewBox={`0 0 ${LINE_W} ${LINE_H}`}
        className="w-full h-auto"
        onMouseLeave={() => setHoveredIdx(null)}
      >
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

        {/* Area fill */}
        <path d={areaPath} fill={color} opacity={0.08} />

        {/* Line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />

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
          <>
            <line
              x1={getX(hoveredIdx)}
              y1={PAD_T}
              x2={getX(hoveredIdx)}
              y2={PAD_T + chartH}
              stroke="#ffffff20"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <circle
              cx={getX(hoveredIdx)}
              cy={getY(values[hoveredIdx])}
              r={4}
              fill={color}
              stroke="#0A0A0B"
              strokeWidth={2}
            />
          </>
        )}

        {/* X-axis labels */}
        {data.map((d, i) =>
          i % 5 === 0 ? (
            <text key={`x-${i}`} x={getX(i)} y={LINE_H - 8} textAnchor="middle" fill="#6B7280" fontSize={9} fontFamily="monospace">
              {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ) : null
        )}
      </svg>

      {/* Hover tooltip */}
      {hoveredIdx !== null && (
        <div className="flex items-center justify-center gap-4 mt-2 text-xs">
          <span className="text-gray-500 font-mono">
            {new Date(data[hoveredIdx].date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <span className="font-mono" style={{ color }}>
            {getPlatformLabel(platform)}: {formatK(values[hoveredIdx])}
          </span>
        </div>
      )}

      {/* Total badge */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs text-gray-400">{getPlatformLabel(platform)}</span>
          <span className="text-xs font-mono text-white font-medium">{formatK(total)}</span>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const RevenueByPlatformChart: React.FC<RevenueByPlatformChartProps> = ({
  data,
  activePlatform,
}) => {
  const isAllPlatforms = activePlatform === 'all';

  return (
    <div className="card-zilla p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white">
          {isAllPlatforms ? 'Revenue Distribution' : `${getPlatformLabel(activePlatform)} Revenue Trend`}
        </h3>
        {!isAllPlatforms && (
          <span className="text-[10px] text-gray-500 font-mono">Last {data.length} days</span>
        )}
      </div>

      {isAllPlatforms ? (
        <DonutChart data={data} />
      ) : (
        <LineChart data={data} platform={activePlatform} />
      )}
    </div>
  );
};

export default RevenueByPlatformChart;
