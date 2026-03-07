import React from 'react';

interface MiniSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  color = '#00FF94',
  width = 64,
  height = 24,
}) => {
  if (data.length < 2) return null;

  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal || 1;
  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * innerW;
    const y = pad + innerH - ((v - minVal) / range) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p}`).join(' ');
  const areaPath = `${linePath} L${(pad + innerW).toFixed(1)},${(pad + innerH).toFixed(1)} L${pad},${(pad + innerH).toFixed(1)} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="flex-shrink-0">
      <path d={areaPath} fill={color} opacity={0.1} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MiniSparkline;
