'use client';

import React, { useState } from 'react';
import type { ROASDataPoint } from '@/types/whop';
import { getChannelColor, getChannelLabel } from '@/lib/whop/attribution';

interface ROASChartProps {
  data: ROASDataPoint[];
}

const LINE_W = 700;
const LINE_H = 240;
const PAD_L = 42;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 40;

const PLATFORMS = ['meta', 'tiktok', 'google'] as const;

const ROASChart: React.FC<ROASChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartW = LINE_W - PAD_L - PAD_R;
  const chartH = LINE_H - PAD_T - PAD_B;

  const maxVal = Math.max(
    ...data.flatMap((d) => PLATFORMS.map((p) => d[p] || 0)),
    2
  );

  function getX(i: number): number {
    return PAD_L + (i / Math.max(data.length - 1, 1)) * chartW;
  }
  function getY(val: number): number {
    return PAD_T + chartH - (val / maxVal) * chartH;
  }

  // Build line paths
  const lines = PLATFORMS.map((platform) => {
    const values = data.map((d) => d[platform] || 0);
    const hasData = values.some((v) => v > 0);
    if (!hasData) return null;

    const path = data
      .map((_, i) => `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(1)},${getY(values[i]).toFixed(1)}`)
      .join(' ');

    return { platform, path, values, color: getChannelColor(platform) };
  }).filter(Boolean) as Array<{ platform: string; path: string; values: number[]; color: string }>;

  // Break-even line (ROAS = 1)
  const breakEvenY = getY(1);

  return (
    <div className="card-zilla p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white">ROAS by Platform</h3>
        <span className="text-[10px] text-gray-500 font-mono">Last {data.length} days</span>
      </div>

      <svg viewBox={`0 0 ${LINE_W} ${LINE_H}`} className="w-full h-auto" onMouseLeave={() => setHoveredIdx(null)}>
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = PAD_T + chartH - pct * chartH;
          return (
            <g key={pct}>
              <line x1={PAD_L} y1={y} x2={LINE_W - PAD_R} y2={y} stroke="#374151" strokeWidth={0.5} />
              <text x={PAD_L - 8} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={9} fontFamily="monospace">
                {(maxVal * pct).toFixed(1)}x
              </text>
            </g>
          );
        })}

        {/* Break-even line */}
        {breakEvenY >= PAD_T && breakEvenY <= PAD_T + chartH && (
          <>
            <line x1={PAD_L} y1={breakEvenY} x2={LINE_W - PAD_R} y2={breakEvenY} stroke="#FF3366" strokeWidth={1} strokeDasharray="6,4" opacity={0.5} />
            <text x={LINE_W - PAD_R + 4} y={breakEvenY + 4} fill="#FF3366" fontSize={8} fontFamily="monospace" opacity={0.7}>
              1x
            </text>
          </>
        )}

        {/* Lines */}
        {lines.map((line) => (
          <path key={line.platform} d={line.path} fill="none" stroke={line.color} strokeWidth={2} strokeLinejoin="round" />
        ))}

        {/* Hover */}
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
            {lines.map((line) => (
              <circle
                key={`dot-${line.platform}`}
                cx={getX(hoveredIdx)}
                cy={getY(line.values[hoveredIdx])}
                r={4}
                fill={line.color}
                stroke="#0A0A0B"
                strokeWidth={2}
              />
            ))}
          </>
        )}

        {/* X-axis */}
        {data.map((d, i) =>
          i % Math.max(Math.floor(data.length / 6), 1) === 0 ? (
            <text key={`x-${i}`} x={getX(i)} y={LINE_H - 8} textAnchor="middle" fill="#6B7280" fontSize={9} fontFamily="monospace">
              {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ) : null
        )}
      </svg>

      {/* Tooltip */}
      {hoveredIdx !== null && (
        <div className="flex items-center justify-center gap-4 mt-2 text-xs flex-wrap">
          <span className="text-gray-500 font-mono">
            {new Date(data[hoveredIdx].date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          {lines.map((line) => (
            <span key={line.platform} className="font-mono" style={{ color: line.color }}>
              {getChannelLabel(line.platform)}: {line.values[hoveredIdx].toFixed(1)}x
            </span>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5 flex-wrap">
        {lines.map((line) => {
          const avg = line.values.reduce((a, b) => a + b, 0) / line.values.length;
          return (
            <div key={line.platform} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
              <span className="text-xs text-gray-400">{getChannelLabel(line.platform)}</span>
              <span className="text-xs font-mono text-white font-medium">{avg.toFixed(1)}x avg</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ROASChart;
