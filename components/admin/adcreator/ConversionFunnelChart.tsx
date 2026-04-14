import React from 'react';
import type { AdcreatorFunnelStats } from '@/types/adcreator';

interface Stage {
  key: keyof AdcreatorFunnelStats;
  label: string;
}

const STAGES: Stage[] = [
  { key: 'reports', label: 'Reports' },
  { key: 'pdf_downloads', label: 'PDF downloads' },
  { key: 'calendly_clicks', label: 'Calendly clicks' },
  { key: 'bookings', label: 'Bookings' },
];

interface Props {
  stats: AdcreatorFunnelStats;
  height?: number;
}

/**
 * Linear-style horizontal funnel: 4 trapezoids, each width-proportional to
 * the previous stage. Conversion-rate caption between stages. No deps —
 * pure SVG, matches RevenueChart aesthetic.
 */
const ConversionFunnelChart: React.FC<Props> = ({ stats, height = 200 }) => {
  const width = 920;
  const padX = 32;
  const topPad = 28;
  const baseTop = topPad;
  const baseBottom = height - 36; // leave room for axis labels
  const usableW = width - padX * 2;
  const cellW = usableW / STAGES.length;

  // Width of each trapezoid scaled to top stage (max), so the funnel actually narrows.
  const top = stats.reports || 1;
  const widths = STAGES.map((s) => {
    const v = stats[s.key];
    // Floor at 6% of cell so empty stages stay visible (still labeled).
    return Math.max(cellW * 0.06, (Math.max(0, v) / top) * cellW);
  });

  // Centerline x for each cell.
  const centers = STAGES.map((_, i) => padX + cellW * (i + 0.5));

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img"
           aria-label="Adcreator conversion funnel">
        <defs>
          <linearGradient id="acFunnel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00FF94" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#00FF94" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Trapezoids */}
        {STAGES.map((stage, i) => {
          const cx = centers[i];
          const w = widths[i];
          const left = cx - w / 2;
          const right = cx + w / 2;
          const value = stats[stage.key];

          // Connector polygon (from prev right-edge to this left-edge).
          let connector: React.ReactNode = null;
          if (i > 0) {
            const prevCx = centers[i - 1];
            const prevW = widths[i - 1];
            const prevRight = prevCx + prevW / 2;
            const leftEdge = left;
            connector = (
              <polygon
                points={`${prevRight},${baseTop} ${leftEdge},${baseTop} ${leftEdge},${baseBottom} ${prevRight},${baseBottom}`}
                fill="rgba(0,255,148,0.06)"
                stroke="rgba(0,255,148,0.12)"
                strokeWidth="1"
              />
            );
          }

          // Conversion percent vs previous stage.
          let pct: string | null = null;
          if (i > 0) {
            const prevValue = stats[STAGES[i - 1].key];
            if (prevValue > 0) {
              pct = `${Math.round((value / prevValue) * 100)}%`;
            }
          }

          return (
            <g key={stage.key}>
              {connector}
              <rect
                x={left}
                y={baseTop}
                width={Math.max(2, w)}
                height={baseBottom - baseTop}
                fill="url(#acFunnel)"
                stroke="rgba(0,255,148,0.45)"
                strokeWidth="1"
                rx="3"
              />
              {/* Value */}
              <text
                x={cx}
                y={(baseTop + baseBottom) / 2 - 2}
                textAnchor="middle"
                fill="#0A0A0B"
                fontSize="18"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
              >
                {value.toLocaleString()}
              </text>
              {/* Percent vs prev (small) */}
              {pct && (
                <text
                  x={cx}
                  y={(baseTop + baseBottom) / 2 + 16}
                  textAnchor="middle"
                  fill="#0A0A0B"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  opacity="0.72"
                >
                  {pct}
                </text>
              )}
              {/* Stage label */}
              <text
                x={cx}
                y={height - 14}
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="12"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {stage.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ConversionFunnelChart;
