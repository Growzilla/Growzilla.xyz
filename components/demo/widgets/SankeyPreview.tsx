import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/design-tokens';

interface SankeyNode {
  id: string;
  label: string;
  value: string;
  x: number;
  y: number;
  h: number;
  color: string;
}

interface SankeyFlow {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  thickness: number;
  color: string;
  sourceId: string;
  targetId: string;
}

const COLS = ['Platform', 'Creator', 'Content Type', 'Product', 'Revenue'];
const COL_X = [40, 185, 340, 495, 640];

const NODES: SankeyNode[] = [
  // Platform column
  { id: 'tt', label: 'TikTok', value: '$156.2K', x: 30, y: 35, h: 55, color: colors.tiktok },
  { id: 'ig', label: 'Instagram', value: '$98.2K', x: 30, y: 100, h: 38, color: colors.instagram },
  { id: 'yt', label: 'YouTube', value: '$30.3K', x: 30, y: 148, h: 18, color: colors.youtube },
  // Creator column
  { id: 'sarah', label: 'Sarah', value: '$87.4K', x: 185, y: 32, h: 40, color: colors.brand },
  { id: 'marcus', label: 'Marcus', value: '$62.1K', x: 185, y: 82, h: 30, color: colors.brand },
  { id: 'aisha', label: 'Aisha', value: '$51.8K', x: 185, y: 122, h: 22, color: colors.brand },
  { id: 'jake', label: 'Jake', value: '$48.3K', x: 185, y: 154, h: 18, color: colors.brand },
  // Content column
  { id: 'reels', label: 'Reels', value: '68%', x: 340, y: 35, h: 35, color: '#A78BFA' },
  { id: 'videos', label: 'Videos', value: '22%', x: 340, y: 80, h: 24, color: '#A78BFA' },
  { id: 'posts', label: 'Posts', value: '10%', x: 340, y: 114, h: 16, color: '#A78BFA' },
  // Product column
  { id: 'serum', label: 'Glow Serum', value: '$142K', x: 495, y: 35, h: 30, color: '#FBBF24' },
  { id: 'night', label: 'NightRepair', value: '$82K', x: 495, y: 75, h: 22, color: '#FBBF24' },
  { id: 'hydra', label: 'HydraVeil', value: '$60.7K', x: 495, y: 107, h: 16, color: '#FBBF24' },
  // Revenue column
  { id: 'total', label: 'Total', value: '$284.7K', x: 640, y: 40, h: 65, color: colors.brand },
];

const NODE_W = 12;

function buildFlows(): SankeyFlow[] {
  return [
    // Platform -> Creator
    { sx: 42, sy: 55, tx: 185, ty: 50, thickness: 16, color: colors.tiktok, sourceId: 'tt', targetId: 'sarah' },
    { sx: 42, sy: 65, tx: 185, ty: 95, thickness: 8, color: colors.tiktok, sourceId: 'tt', targetId: 'marcus' },
    { sx: 42, sy: 115, tx: 185, ty: 55, thickness: 10, color: colors.instagram, sourceId: 'ig', targetId: 'sarah' },
    { sx: 42, sy: 120, tx: 185, ty: 130, thickness: 8, color: colors.instagram, sourceId: 'ig', targetId: 'aisha' },
    { sx: 42, sy: 155, tx: 185, ty: 100, thickness: 6, color: colors.youtube, sourceId: 'yt', targetId: 'marcus' },
    { sx: 42, sy: 160, tx: 185, ty: 160, thickness: 4, color: colors.youtube, sourceId: 'yt', targetId: 'jake' },
    // Creator -> Content
    { sx: 197, sy: 50, tx: 340, ty: 50, thickness: 14, color: colors.brand, sourceId: 'sarah', targetId: 'reels' },
    { sx: 197, sy: 95, tx: 340, ty: 88, thickness: 8, color: colors.brand, sourceId: 'marcus', targetId: 'videos' },
    { sx: 197, sy: 130, tx: 340, ty: 120, thickness: 6, color: colors.brand, sourceId: 'aisha', targetId: 'posts' },
    // Content -> Product
    { sx: 352, sy: 50, tx: 495, ty: 48, thickness: 12, color: '#A78BFA', sourceId: 'reels', targetId: 'serum' },
    { sx: 352, sy: 90, tx: 495, ty: 84, thickness: 8, color: '#A78BFA', sourceId: 'videos', targetId: 'night' },
    { sx: 352, sy: 120, tx: 495, ty: 113, thickness: 5, color: '#A78BFA', sourceId: 'posts', targetId: 'hydra' },
    // Product -> Revenue
    { sx: 507, sy: 48, tx: 640, ty: 55, thickness: 14, color: '#FBBF24', sourceId: 'serum', targetId: 'total' },
    { sx: 507, sy: 84, tx: 640, ty: 68, thickness: 10, color: '#FBBF24', sourceId: 'night', targetId: 'total' },
    { sx: 507, sy: 113, tx: 640, ty: 82, thickness: 6, color: '#FBBF24', sourceId: 'hydra', targetId: 'total' },
  ];
}

const SankeyPreview: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const flows = buildFlows();

  function isFlowHighlighted(flow: SankeyFlow): boolean {
    if (!hoveredNode) return false;
    return flow.sourceId === hoveredNode || flow.targetId === hoveredNode;
  }

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 680 200" className="w-full h-auto">
        <defs>
          <filter id="demo-sankey-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Column headers */}
        {COLS.map((label, i) => (
          <text
            key={label}
            x={COL_X[i]}
            y={16}
            textAnchor="middle"
            className="text-[9px] uppercase"
            fill="#71717A"
            style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' }}
          >
            {label}
          </text>
        ))}

        {/* Flow paths */}
        {flows.map((flow, i) => {
          const highlighted = isFlowHighlighted(flow);
          const dimmed = hoveredNode && !highlighted;
          const cx1 = flow.sx + (flow.tx - flow.sx) * 0.4;
          const cx2 = flow.tx - (flow.tx - flow.sx) * 0.4;
          const path = `M ${flow.sx} ${flow.sy} C ${cx1} ${flow.sy}, ${cx2} ${flow.ty}, ${flow.tx} ${flow.ty}`;

          return (
            <motion.path
              key={`flow-${i}`}
              d={path}
              fill="none"
              stroke={flow.color}
              strokeWidth={flow.thickness}
              strokeOpacity={dimmed ? 0.06 : highlighted ? 0.5 : 0.2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.04, ease: 'easeOut' }}
              filter={highlighted ? 'url(#demo-sankey-glow)' : undefined}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const highlighted = hoveredNode === node.id;
          const dimmed = hoveredNode && !highlighted && !flows.some(
            (f) => (f.sourceId === hoveredNode && f.targetId === node.id) || (f.targetId === hoveredNode && f.sourceId === node.id)
          );
          const fillOpacity = node.id === 'total' ? 0.85 : dimmed ? 0.25 : highlighted ? 0.95 : node.x < 100 ? 0.85 : node.x < 250 ? 0.7 : 0.6;

          return (
            <g key={node.id}>
              {highlighted && (
                <rect
                  x={node.x - 2}
                  y={node.y - 2}
                  width={NODE_W + 4}
                  height={node.h + 4}
                  rx={5}
                  fill={node.color}
                  opacity={0.15}
                  filter="url(#demo-sankey-glow)"
                />
              )}
              <motion.rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={node.h}
                rx={3}
                fill={node.color}
                fillOpacity={fillOpacity}
                stroke={highlighted ? node.color : 'rgba(255,255,255,0.06)'}
                strokeWidth={highlighted ? 1.5 : 0.5}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: (node.x / 680) * 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: `${node.x}px ${node.y + node.h}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              <text
                x={node.x + NODE_W + 6}
                y={node.y + node.h / 2 + 1}
                dominantBaseline="middle"
                className="text-[9px] pointer-events-none"
                fill={dimmed ? '#555' : '#FFFFFF'}
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {node.label}
              </text>
              <text
                x={node.x + NODE_W + 6}
                y={node.y + node.h / 2 + 13}
                dominantBaseline="middle"
                className="text-[8px] pointer-events-none"
                fill={dimmed ? '#444' : '#71717A'}
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SankeyPreview;
