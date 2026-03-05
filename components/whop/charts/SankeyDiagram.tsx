'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { FemFitSankeyNode, FemFitSankeyLink } from '@/types/whop';

interface SankeyDiagramProps {
  nodes: FemFitSankeyNode[];
  links: FemFitSankeyLink[];
  whaleOnly?: boolean;
}

const NODE_W = 14;
const NODE_PAD = 20;
const COL_POSITIONS = [0, 0.28, 0.52, 0.76, 1.0];

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

interface LayoutNode {
  id: string;
  label: string;
  value: number;
  color: string;
  x: number;
  y: number;
  h: number;
}

interface LayoutLink {
  source: string;
  target: string;
  value: number;
  color: string;
  sy: number;
  ty: number;
  thickness: number;
  path: string;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ nodes, links, whaleOnly }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const W = 680;
  const H = 420;
  const PAD_T = 30;
  const PAD_B = 20;
  const PAD_L = 10;
  const PAD_R = 10;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const layout = useMemo(() => {
    // Group nodes by column
    const columns: Map<number, FemFitSankeyNode[]> = new Map();
    for (const node of nodes) {
      const col = node.column;
      if (!columns.has(col)) columns.set(col, []);
      columns.get(col)!.push(node);
    }

    // Compute max value per column for scaling
    const colMaxes: Map<number, number> = new Map();
    Array.from(columns.entries()).forEach(([col, colNodes]) => {
      colMaxes.set(col, colNodes.reduce((s: number, n: FemFitSankeyNode) => s + n.value, 0));
    });
    const globalMax = Math.max(...Array.from(colMaxes.values()), 1);

    // Layout each node
    const layoutNodes: Map<string, LayoutNode> = new Map();

    Array.from(columns.entries()).forEach(([col, colNodes]) => {
      const x = PAD_L + COL_POSITIONS[col] * (innerW - NODE_W);
      const totalValue = colNodes.reduce((s: number, n: FemFitSankeyNode) => s + n.value, 0);
      const scale = (innerH - NODE_PAD * (colNodes.length - 1)) / Math.max(globalMax, 1);

      let currentY = PAD_T;
      // Center the column vertically
      const totalHeight = totalValue * scale + NODE_PAD * (colNodes.length - 1);
      currentY = PAD_T + (innerH - totalHeight) / 2;

      for (const node of colNodes) {
        const h = Math.max(node.value * scale, 8);
        layoutNodes.set(node.id, {
          id: node.id,
          label: node.label,
          value: node.value,
          color: node.color,
          x,
          y: currentY,
          h,
        });
        currentY += h + NODE_PAD;
      }
    });

    // Layout links - track source/target port offsets
    const sourceOffsets: Map<string, number> = new Map();
    const targetOffsets: Map<string, number> = new Map();

    const layoutLinks: LayoutLink[] = links.map((link) => {
      const sNode = layoutNodes.get(link.source);
      const tNode = layoutNodes.get(link.target);
      if (!sNode || !tNode) {
        return { source: link.source, target: link.target, value: 0, color: link.color, sy: 0, ty: 0, thickness: 0, path: '' };
      }

      const sTotal = nodes.find((n) => n.id === link.source)?.value || 1;
      const tTotal = nodes.find((n) => n.id === link.target)?.value || 1;

      const thickness = Math.max((link.value / sTotal) * sNode.h, 2);

      const sOff = sourceOffsets.get(link.source) || 0;
      const tOff = targetOffsets.get(link.target) || 0;

      const sy = sNode.y + sOff + thickness / 2;
      const ty = tNode.y + tOff + thickness / 2;

      sourceOffsets.set(link.source, sOff + thickness);
      targetOffsets.set(link.target, tOff + (link.value / tTotal) * tNode.h);

      const sx = sNode.x + NODE_W;
      const tx = tNode.x;
      const cx1 = sx + (tx - sx) * 0.4;
      const cx2 = tx - (tx - sx) * 0.4;

      const path = `M ${sx} ${sy} C ${cx1} ${sy}, ${cx2} ${ty}, ${tx} ${ty}`;

      return { source: link.source, target: link.target, value: link.value, color: link.color, sy, ty, thickness, path };
    });

    return { nodes: layoutNodes, links: layoutLinks };
  }, [nodes, links]);

  const isLinkHighlighted = (link: LayoutLink) => {
    if (hoveredNode) return link.source === hoveredNode || link.target === hoveredNode;
    return false;
  };

  const isNodeHighlighted = (nodeId: string) => {
    if (hoveredNode === nodeId) return true;
    if (hoveredLink !== null) {
      const link = layout.links[hoveredLink];
      return link && (link.source === nodeId || link.target === nodeId);
    }
    return false;
  };

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <filter id="sankey-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Column headers */}
        {['Sources', 'Typeform', 'Calls', 'Closed', 'Revenue'].map((label, i) => (
          <text
            key={label}
            x={PAD_L + COL_POSITIONS[i] * (innerW - NODE_W) + NODE_W / 2}
            y={14}
            textAnchor="middle"
            className="fill-[#A1A1AA] text-[9px] uppercase"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.08em' }}
          >
            {label}
          </text>
        ))}

        {/* Links */}
        {layout.links.map((link, i) => {
          if (!link.path) return null;
          const highlighted = isLinkHighlighted(link) || hoveredLink === i;
          const dimmed = (hoveredNode || hoveredLink !== null) && !highlighted;

          return (
            <motion.path
              key={`${link.source}-${link.target}-${i}`}
              d={link.path}
              fill="none"
              stroke={link.color}
              strokeWidth={link.thickness}
              strokeOpacity={dimmed ? 0.08 : highlighted ? 0.55 : 0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
              style={{ cursor: 'pointer' }}
              filter={highlighted ? 'url(#sankey-glow)' : undefined}
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
            />
          );
        })}

        {/* Nodes */}
        {Array.from(layout.nodes.values()).map((node) => {
          const highlighted = isNodeHighlighted(node.id);
          const dimmed = (hoveredNode || hoveredLink !== null) && !highlighted && hoveredNode !== null;

          return (
            <g key={node.id}>
              {/* Node glow */}
              {highlighted && (
                <rect
                  x={node.x - 2}
                  y={node.y - 2}
                  width={NODE_W + 4}
                  height={node.h + 4}
                  rx={5}
                  fill={node.color}
                  opacity={0.15}
                  filter="url(#sankey-glow)"
                />
              )}

              {/* Node bar */}
              <motion.rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={node.h}
                rx={3}
                fill={node.color}
                fillOpacity={dimmed ? 0.3 : 0.85}
                stroke={highlighted ? node.color : 'rgba(255,255,255,0.08)'}
                strokeWidth={highlighted ? 1.5 : 0.5}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: node.x / W * 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: `${node.x}px ${node.y + node.h}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />

              {/* Node label */}
              <text
                x={node.x + NODE_W + 6}
                y={node.y + node.h / 2 + 1}
                dominantBaseline="middle"
                className="text-[9px] pointer-events-none"
                fill={dimmed ? '#555' : '#FFFFFF'}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {node.label}
              </text>

              {/* Value below label */}
              <text
                x={node.x + NODE_W + 6}
                y={node.y + node.h / 2 + 13}
                dominantBaseline="middle"
                className="text-[8px] pointer-events-none"
                fill={dimmed ? '#444' : '#A1A1AA'}
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {formatK(node.value)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip for links */}
      {hoveredLink !== null && layout.links[hoveredLink] && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl border border-[#27272A] bg-[#1C1A1A]/95 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layout.links[hoveredLink].color }} />
            <span className="text-[10px] text-[#A1A1AA]">
              {layout.nodes.get(layout.links[hoveredLink].source)?.label}
            </span>
            <svg className="w-3 h-3 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-[10px] text-[#A1A1AA]">
              {layout.nodes.get(layout.links[hoveredLink].target)?.label}
            </span>
            <span className="text-xs font-mono font-bold text-white ml-1">
              {formatK(layout.links[hoveredLink].value)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SankeyDiagram;
