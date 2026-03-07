import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { RevenueDataPoint } from '@/types/smdashboard';
import { colors, platformColor, formatCurrency } from '@/lib/design-tokens';

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

const PLATFORMS = ['tiktok', 'instagram', 'youtube'] as const;

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data.length) return null;

  const W = 800;
  const H = 260;
  const PAD_L = 48;
  const PAD_R = 12;
  const PAD_T = 12;
  const PAD_B = 28;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const maxVal = Math.max(...data.map((d) => d.total), 1);

  function getX(i: number): number {
    return PAD_L + (i / Math.max(data.length - 1, 1)) * chartW;
  }

  function getY(val: number): number {
    return PAD_T + chartH - (val / maxVal) * chartH;
  }

  // Build stacked area paths (bottom to top: youtube, instagram, tiktok)
  const stackOrder = ['youtube', 'instagram', 'tiktok'] as const;

  function buildStackedPaths() {
    const cumulative = data.map(() => 0);
    const areas: { platform: string; path: string; color: string }[] = [];

    for (const platform of stackOrder) {
      const topPoints: string[] = [];
      const bottomPoints: string[] = [];

      for (let i = 0; i < data.length; i++) {
        const val = data[i][platform as keyof RevenueDataPoint] as number;
        const bottom = cumulative[i];
        const top = bottom + val;
        cumulative[i] = top;

        const x = getX(i);
        topPoints.push(`${x.toFixed(1)},${getY(top).toFixed(1)}`);
        bottomPoints.push(`${x.toFixed(1)},${getY(bottom).toFixed(1)}`);
      }

      const topLine = topPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p}`).join(' ');
      const bottomLine = bottomPoints.reverse().map((p, i) => `${i === 0 ? 'L' : 'L'}${p}`).join(' ');
      const areaPath = `${topLine} ${bottomLine} Z`;

      areas.push({
        platform,
        path: areaPath,
        color: platformColor(platform),
      });
    }

    return areas;
  }

  const stackedAreas = buildStackedPaths();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = PAD_T + chartH - pct * chartH;
          return (
            <g key={pct}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" fill="#3F3F46" fontSize={8} fontFamily="monospace">
                {formatCurrency(maxVal * pct)}
              </text>
            </g>
          );
        })}

        {/* Stacked areas */}
        {stackedAreas.map((area) => (
          <path
            key={area.platform}
            d={area.path}
            fill={area.color}
            opacity={0.15}
          />
        ))}

        {/* Top line (total) */}
        <path
          d={data.map((d, i) => `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(1)},${getY(d.total).toFixed(1)}`).join(' ')}
          fill="none"
          stroke={colors.brand}
          strokeWidth={1.5}
          strokeLinejoin="round"
          opacity={0.6}
        />

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
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
              strokeDasharray="3,3"
            />
            <circle
              cx={getX(hoveredIdx)}
              cy={getY(data[hoveredIdx].total)}
              r={3}
              fill={colors.brand}
              stroke="#09090B"
              strokeWidth={2}
            />
          </>
        )}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const showEvery = data.length <= 10 ? 1 : data.length <= 35 ? 5 : 10;
          return i % showEvery === 0 ? (
            <text key={`x-${i}`} x={getX(i)} y={H - 6} textAnchor="middle" fill="#3F3F46" fontSize={8} fontFamily="monospace">
              {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ) : null;
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredIdx !== null && (
        <div className="absolute top-2 right-2 px-3 py-2 rounded-lg bg-zinc-900/95 border border-white/[0.08] backdrop-blur-sm">
          <p className="text-[10px] text-zinc-500 font-mono mb-1">
            {new Date(data[hoveredIdx].date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          {PLATFORMS.map((p) => (
            <div key={p} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: platformColor(p) }} />
              <span className="text-[10px] text-zinc-400 capitalize">{p}</span>
              <span className="text-[10px] font-mono text-white ml-auto">
                {formatCurrency(data[hoveredIdx][p as keyof RevenueDataPoint] as number)}
              </span>
            </div>
          ))}
          <div className="mt-1 pt-1 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] text-zinc-400">Total</span>
            <span className="text-[10px] font-mono font-bold text-white">
              {formatCurrency(data[hoveredIdx].total)}
            </span>
          </div>
        </div>
      )}

      {/* Platform legend */}
      <div className="flex items-center gap-4 mt-2">
        {PLATFORMS.map((p) => (
          <div key={p} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: platformColor(p) }} />
            <span className="text-[10px] text-zinc-500 capitalize">{p}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RevenueChart;
