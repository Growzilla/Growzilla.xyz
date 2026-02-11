import React, { useState, useRef } from 'react';
import type { RevenueDataPoint } from '@/types/admin';

interface RevenueChartProps {
  data: RevenueDataPoint[];
  height?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, height = 240 }) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; point: RevenueDataPoint } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-sm" style={{ height }}>
        No revenue data available
      </div>
    );
  }

  const padding = { top: 20, right: 20, bottom: 30, left: 60 };
  const width = 700;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const revenues = data.map((d) => d.revenue);
  const maxRevenue = Math.max(...revenues, 1);
  const minRevenue = Math.min(...revenues, 0);
  const range = maxRevenue - minRevenue || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / Math.max(data.length - 1, 1)) * chartW,
    y: padding.top + chartH - ((d.revenue - minRevenue) / range) * chartH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  // Y-axis labels (5 ticks)
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const value = minRevenue + (range * i) / 4;
    const y = padding.top + chartH - (i / 4) * chartH;
    return { value, y };
  });

  // X-axis labels (show ~5 evenly spaced)
  const xStep = Math.max(1, Math.floor(data.length / 5));
  const xTicks = data.filter((_, i) => i % xStep === 0 || i === data.length - 1).map((d, _, arr) => {
    const idx = data.indexOf(d);
    return {
      label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      x: padding.left + (idx / Math.max(data.length - 1, 1)) * chartW,
    };
  });

  const formatCurrency = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
    return `$${n.toFixed(0)}`;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * width;

    // Find closest point
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < points.length; i++) {
      const dist = Math.abs(points[i].x - mouseX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }

    setTooltip({ x: points[closest].x, y: points[closest].y, point: data[closest] });
  };

  return (
    <div className="w-full overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FF94" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FF94" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={tick.y}
            x2={width - padding.right}
            y2={tick.y}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Y axis labels */}
        {yTicks.map((tick, i) => (
          <text
            key={i}
            x={padding.left - 8}
            y={tick.y + 4}
            textAnchor="end"
            fill="#6B7280"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            {formatCurrency(tick.value)}
          </text>
        ))}

        {/* X axis labels */}
        {xTicks.map((tick, i) => (
          <text
            key={i}
            x={tick.x}
            y={height - 5}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            {tick.label}
          </text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#chartGradient)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="#00FF94" strokeWidth="2" strokeLinejoin="round" />

        {/* Tooltip */}
        {tooltip && (
          <>
            <line
              x1={tooltip.x}
              y1={padding.top}
              x2={tooltip.x}
              y2={padding.top + chartH}
              stroke="#00FF94"
              strokeOpacity="0.3"
              strokeDasharray="3 3"
            />
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#00FF94" stroke="#0A0A0B" strokeWidth="2" />
            <rect
              x={tooltip.x - 55}
              y={tooltip.y - 42}
              width="110"
              height="32"
              rx="6"
              fill="#1A1A1A"
              stroke="#00FF94"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 22}
              textAnchor="middle"
              fill="#00FF94"
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
            >
              {formatCurrency(tooltip.point.revenue)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default RevenueChart;
