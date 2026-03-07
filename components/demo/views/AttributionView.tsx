import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Post, Creator } from '@/types/smdashboard';
import { ATTRIBUTION_FUNNEL } from '@/data/mockSMData';
import { colors, platformColor, formatCurrency, tw } from '@/lib/design-tokens';

interface AttributionViewProps {
  posts: Post[];
  creators: Creator[];
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

const PLATFORM_LABELS: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  reel: 'Reels',
  video: 'Videos',
  post: 'Posts',
  story: 'Stories',
  short: 'Shorts',
};

const CONTENT_TYPE_COLORS: Record<string, string> = {
  reel: '#A78BFA',
  video: '#818CF8',
  post: '#C084FC',
  story: '#E879F9',
  short: '#67E8F9',
};

const PRODUCT_COLORS: Record<string, string> = {
  'prod-serum': '#FBBF24',
  'prod-night': '#F59E0B',
  'prod-hydra': '#D97706',
  'prod-clear': '#B45309',
  'prod-eye': '#92400E',
};

// ─── Forward-only BFS: Trace downstream path through Sankey ─────────────────

function getDownstreamPaths(
  nodeId: string,
  links: { source: string; target: string }[]
): Set<string> {
  const visited = new Set<string>([nodeId]);
  const queue = [nodeId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const link of links) {
      if (link.source === current && !visited.has(link.target)) {
        visited.add(link.target);
        queue.push(link.target);
      }
    }
  }
  return visited;
}

function getConnectedLinkIndices(
  connectedNodes: Set<string>,
  links: { source: string; target: string }[]
): Set<number> {
  const indices = new Set<number>();
  links.forEach((link, i) => {
    if (connectedNodes.has(link.source) && connectedNodes.has(link.target)) {
      indices.add(i);
    }
  });
  return indices;
}

// ─── Cone Funnel ────────────────────────────────────────────────────────────

interface FunnelStage {
  label: string;
  value: number;
  dropOffRate: number;
  conversionRate: number;
}

const FUNNEL_COLORS = ['#00FF94', '#00D4A1', '#3B9B8F', '#FBBF24', '#00FF94'];

function ConeFunnel({ stages }: { stages: FunnelStage[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  if (stages.length === 0) return null;

  const maxCount = stages[0].value || 1;
  const W = 320;
  const H = 400;
  const PAD_X = 24;
  const GAP = 5;
  const N = stages.length;
  const availableH = H - 30;
  const layerH = (availableH - GAP * (N - 1)) / N;
  const centerX = W / 2;
  const maxWidth = W - PAD_X * 2;
  const minWidth = maxWidth * 0.18;

  const boundaries: number[] = [maxWidth];
  for (let i = 1; i < N; i++) {
    const ratio = stages[i].value / maxCount;
    const w = maxWidth * Math.pow(Math.max(ratio, 0.0001), 0.22);
    boundaries.push(Math.max(minWidth, w));
  }
  boundaries.push(Math.max(maxWidth * 0.15, boundaries[N - 1] * 0.75));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '100%' }}>
        <defs>
          {stages.map((_, i) => (
            <linearGradient key={`cg-${i}`} id={`cone-g-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={FUNNEL_COLORS[i]} stopOpacity="0.7" />
              <stop offset="100%" stopColor={FUNNEL_COLORS[i]} stopOpacity="0.35" />
            </linearGradient>
          ))}
          <filter id="cone-glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {stages.map((stage, i) => {
          const y = 15 + i * (layerH + GAP);
          const topW = boundaries[i];
          const botW = boundaries[i + 1];
          const tl = centerX - topW / 2;
          const tr = centerX + topW / 2;
          const bl = centerX - botW / 2;
          const br = centerX + botW / 2;
          const isHovered = hoveredIndex === i;
          const isLast = i === N - 1;

          const path = `M ${tl} ${y} L ${tr} ${y} L ${br} ${y + layerH} L ${bl} ${y + layerH} Z`;

          return (
            <g key={i}>
              {isHovered && (
                <motion.path
                  d={path}
                  fill={`${FUNNEL_COLORS[i]}25`}
                  filter="url(#cone-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              )}
              <motion.path
                d={path}
                fill={`url(#cone-g-${i})`}
                stroke={isHovered ? FUNNEL_COLORS[i] : 'rgba(255,255,255,0.05)'}
                strokeWidth={isHovered ? 1.5 : 0.5}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                style={{ transformOrigin: `${centerX}px ${y}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              <text
                x={centerX}
                y={y + layerH / 2 - 6}
                textAnchor="middle"
                className="fill-white text-[10px] font-medium pointer-events-none"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {stage.label}
              </text>

              <text
                x={centerX}
                y={y + layerH / 2 + 9}
                textAnchor="middle"
                className="fill-white text-[13px] font-bold pointer-events-none"
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {formatK(stage.value)}
              </text>

              {i > 0 && (
                <text
                  x={Math.min(tl, bl) - 6}
                  y={y + layerH / 2 + 3}
                  textAnchor="end"
                  className="fill-[#52525B] text-[8px] pointer-events-none"
                  style={{ fontFamily: 'ui-monospace, monospace' }}
                >
                  {stage.conversionRate}%
                </text>
              )}

              {!isLast && (
                <text
                  x={Math.max(tr, br) + 6}
                  y={y + layerH + GAP / 2 + 3}
                  className="text-[7px] pointer-events-none"
                  fill={stage.dropOffRate > 70 ? '#EF4444' : stage.dropOffRate > 40 ? '#F59E0B' : '#52525B'}
                  style={{ fontFamily: 'ui-monospace, monospace' }}
                >
                  -{Math.round((1 - (stages[i + 1]?.value || 0) / Math.max(stage.value, 1)) * 100)}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Sankey Diagram ─────────────────────────────────────────────────────────
// Flow-conserving layout: node heights derived from link flow, not raw values.
// Outgoing flow determines node height → diagram naturally narrows left→right.
// pow(0.55) compression keeps all columns visible while maintaining funnel shape.
// Variable-width gradient links taper between source and target proportions.

interface SankeyNodeData {
  id: string;
  label: string;
  subLabel?: string;
  value: number;
  color: string;
  column: number;
}

interface SankeyLinkData {
  source: string;
  target: string;
  value: number;
  color: string;
}

function SankeyDiagram({
  nodes,
  links,
  purchaseMap,
  conversionRates,
}: {
  nodes: SankeyNodeData[];
  links: SankeyLinkData[];
  purchaseMap: Record<string, number>;
  conversionRates: Record<string, string>;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const W = 960;
  const H = 420;
  const PAD_T = 20;
  const PAD_B = 20;
  const PAD_L = 12;
  const PAD_R = 70;
  const NODE_W = 10;
  const NODE_PAD = 10;
  const MIN_H = 8;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const COL_POSITIONS = [0, 0.28, 0.58, 0.92];

  const layout = useMemo(() => {
    // Step 1: Compute outgoing and incoming flow per node from links
    const outFlow = new Map<string, number>();
    const inFlow = new Map<string, number>();
    for (const link of links) {
      outFlow.set(link.source, (outFlow.get(link.source) || 0) + link.value);
      inFlow.set(link.target, (inFlow.get(link.target) || 0) + link.value);
    }

    // Step 2: Group nodes by column
    const columns = new Map<number, SankeyNodeData[]>();
    for (const node of nodes) {
      if (!columns.has(node.column)) columns.set(node.column, []);
      columns.get(node.column)!.push(node);
    }
    const numCols = columns.size;

    // Step 3: Node flow = outgoing for all except last column (incoming).
    // This creates the funnel: channels (clicks) > content (addToCart) > products (purchases) > purchased
    const nodeFlow = new Map<string, number>();
    for (const node of nodes) {
      const isLastCol = node.column === numCols - 1;
      const flow = isLastCol
        ? (inFlow.get(node.id) || 0)
        : (outFlow.get(node.id) || 0);
      nodeFlow.set(node.id, Math.max(flow, 1));
    }

    // Step 4: Column totals → pow(0.55) compression → global scale from col 0
    const colTotals = new Map<number, number>();
    columns.forEach((colNodes, col) => {
      colTotals.set(col, colNodes.reduce((s, n) => s + (nodeFlow.get(n.id) || 1), 0));
    });

    const compress = (v: number) => Math.pow(Math.max(v, 1), 0.55);
    const col0Compressed = compress(colTotals.get(0) || 1);
    const targetH = innerH * 0.92;
    const globalScale = targetH / col0Compressed;

    // Step 5: Position nodes — heights proportional within compressed column
    type LayoutNode = { id: string; label: string; subLabel?: string; value: number; color: string; x: number; y: number; h: number };
    const layoutNodes = new Map<string, LayoutNode>();

    columns.forEach((colNodes, col) => {
      const x = PAD_L + COL_POSITIONS[col] * (innerW - NODE_W);
      const colTotal = colTotals.get(col) || 1;
      const compressedColH = compress(colTotal) * globalScale;
      const gaps = NODE_PAD * Math.max(colNodes.length - 1, 0);
      const availH = Math.max(compressedColH - gaps, colNodes.length * MIN_H);

      // Proportional distribution within column
      const heights = colNodes.map(n => {
        const flow = nodeFlow.get(n.id) || 1;
        return Math.max((flow / colTotal) * availH, MIN_H);
      });
      const totalH = heights.reduce((s, h) => s + h, 0) + gaps;
      let currentY = PAD_T + (innerH - totalH) / 2;

      colNodes.forEach((node, i) => {
        layoutNodes.set(node.id, {
          id: node.id, label: node.label, subLabel: node.subLabel,
          value: node.value, color: node.color, x, y: currentY, h: heights[i],
        });
        currentY += heights[i] + NODE_PAD;
      });
    });

    // Step 6: Layout links — thickness proportional to node height at each end
    const sourceOffsets = new Map<string, number>();
    const targetOffsets = new Map<string, number>();

    const layoutLinks = links.map((link) => {
      const sNode = layoutNodes.get(link.source);
      const tNode = layoutNodes.get(link.target);
      if (!sNode || !tNode) return { ...link, path: '' };

      const sOut = outFlow.get(link.source) || 1;
      const tIn = inFlow.get(link.target) || 1;
      const sThickness = Math.max((link.value / sOut) * sNode.h, 1);
      const tThickness = Math.max((link.value / tIn) * tNode.h, 1);

      const sOff = sourceOffsets.get(link.source) || 0;
      const tOff = targetOffsets.get(link.target) || 0;

      const syMid = sNode.y + sOff + sThickness / 2;
      const tyMid = tNode.y + tOff + tThickness / 2;
      sourceOffsets.set(link.source, sOff + sThickness);
      targetOffsets.set(link.target, tOff + tThickness);

      const sx = sNode.x + NODE_W;
      const tx = tNode.x;
      const gap = tx - sx;
      const cx1 = sx + gap * 0.5;
      const cx2 = tx - gap * 0.5;

      // Variable-width filled path (top edge → bottom edge)
      const syTop = syMid - sThickness / 2;
      const syBot = syMid + sThickness / 2;
      const tyTop = tyMid - tThickness / 2;
      const tyBot = tyMid + tThickness / 2;
      const path = [
        `M ${sx} ${syTop}`,
        `C ${cx1} ${syTop}, ${cx2} ${tyTop}, ${tx} ${tyTop}`,
        `L ${tx} ${tyBot}`,
        `C ${cx2} ${tyBot}, ${cx1} ${syBot}, ${sx} ${syBot}`,
        'Z',
      ].join(' ');

      return { ...link, path };
    });

    return { nodes: layoutNodes, links: layoutLinks };
  }, [nodes, links]);

  // Forward-only highlighting: hover a node → see everything downstream
  const { highlightedNodes, highlightedLinks } = useMemo(() => {
    if (!hoveredNode) return { highlightedNodes: new Set<string>(), highlightedLinks: new Set<number>() };
    const downstream = getDownstreamPaths(hoveredNode, links);
    return { highlightedNodes: downstream, highlightedLinks: getConnectedLinkIndices(downstream, links) };
  }, [hoveredNode, links]);

  const anyHovered = hoveredNode !== null || hoveredLink !== null;
  const isLinkActive = (i: number) => hoveredNode ? highlightedLinks.has(i) : hoveredLink === i;
  const isNodeActive = (id: string) => {
    if (hoveredNode) return highlightedNodes.has(id);
    if (hoveredLink !== null) {
      const l = layout.links[hoveredLink];
      return l && (l.source === id || l.target === id);
    }
    return false;
  };

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sk-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {layout.links.map((link, i) => {
            if (!link.path) return null;
            const sNode = layout.nodes.get(link.source);
            const tNode = layout.nodes.get(link.target);
            if (!sNode || !tNode) return null;
            return (
              <linearGradient key={`lg-${i}`} id={`sk-lg-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={sNode.color} />
                <stop offset="100%" stopColor={tNode.color} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Links */}
        {layout.links.map((link, i) => {
          if (!link.path) return null;
          const active = isLinkActive(i);
          const dimmed = anyHovered && !active;
          return (
            <motion.path
              key={`${link.source}-${link.target}-${i}`}
              d={link.path}
              fill={`url(#sk-lg-${i})`}
              fillOpacity={dimmed ? 0.02 : active ? 0.45 : 0.10}
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.012, ease: 'easeOut' }}
              style={{ cursor: 'pointer' }}
              filter={active ? 'url(#sk-glow)' : undefined}
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
            />
          );
        })}

        {/* Nodes */}
        {Array.from(layout.nodes.values()).map((node) => {
          const active = isNodeActive(node.id);
          const dimmed = anyHovered && !active;
          const cvr = conversionRates[node.id];

          return (
            <g key={node.id}>
              {active && (
                <rect
                  x={node.x - 3} y={node.y - 3}
                  width={NODE_W + 6} height={node.h + 6}
                  rx={5} fill={node.color} opacity={0.10}
                  filter="url(#sk-glow)"
                />
              )}
              <motion.rect
                x={node.x} y={node.y}
                width={NODE_W} height={node.h}
                rx={3}
                fill={node.color}
                fillOpacity={dimmed ? 0.12 : 0.80}
                stroke={active ? node.color : 'rgba(255,255,255,0.03)'}
                strokeWidth={active ? 1.5 : 0.5}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.35, delay: (node.x / W) * 0.3, ease: 'easeOut' }}
                style={{ transformOrigin: `${node.x}px ${node.y + node.h}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />
              {/* Label */}
              <text
                x={node.x + NODE_W + 6} y={node.y + Math.min(node.h / 2, 14)}
                dominantBaseline="middle"
                className="text-[9px] pointer-events-none"
                fill={dimmed ? '#27272A' : '#D4D4D8'}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 500 }}
              >
                {node.label}
              </text>
              {/* Value */}
              <text
                x={node.x + NODE_W + 6} y={node.y + Math.min(node.h / 2, 14) + 13}
                dominantBaseline="middle"
                className="text-[8px] pointer-events-none"
                fill={dimmed ? '#18181B' : '#52525B'}
                style={{ fontFamily: 'ui-monospace, monospace' }}
              >
                {formatK(node.value)}
              </text>
              {cvr && node.h > 24 && (
                <text
                  x={node.x + NODE_W + 6} y={node.y + Math.min(node.h / 2, 14) + 25}
                  dominantBaseline="middle"
                  className="text-[7px] pointer-events-none"
                  fill={dimmed ? '#18181B' : '#00FF94'}
                  style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}
                >
                  {cvr} CVR
                </text>
              )}
              {node.subLabel && node.h > (cvr ? 42 : 32) && (
                <text
                  x={node.x + NODE_W + 6} y={node.y + Math.min(node.h / 2, 14) + (cvr ? 36 : 25)}
                  dominantBaseline="middle"
                  className="text-[6.5px] pointer-events-none"
                  fill={dimmed ? '#18181B' : '#3F3F46'}
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontStyle: 'italic' }}
                >
                  {node.subLabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredNode && layout.nodes.get(hoveredNode) && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-[#0A0A0B]/95 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layout.nodes.get(hoveredNode)!.color }} />
            <span className="text-[11px] font-medium text-white">{layout.nodes.get(hoveredNode)!.label}</span>
            <span className="text-[10px] font-mono text-[#52525B]">{formatK(layout.nodes.get(hoveredNode)!.value)}</span>
            {conversionRates[hoveredNode] && (
              <>
                <span className="text-[10px] text-[#27272A]">|</span>
                <span className="text-[10px] font-mono text-[#00FF94]">{conversionRates[hoveredNode]} CVR</span>
              </>
            )}
            {purchaseMap[hoveredNode] !== undefined && purchaseMap[hoveredNode] > 0 && (
              <>
                <span className="text-[10px] text-[#27272A]">|</span>
                <span className="text-[10px] font-mono font-medium text-[#00FF94]">
                  {formatK(purchaseMap[hoveredNode])} purchases
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}

      {hoveredLink !== null && layout.links[hoveredLink] && layout.links[hoveredLink].path && !hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-[#0A0A0B]/95 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layout.links[hoveredLink].color }} />
            <span className="text-[10px] text-[#A1A1AA]">{layout.nodes.get(layout.links[hoveredLink].source)?.label}</span>
            <span className="text-[10px] text-[#3F3F46]">&rarr;</span>
            <span className="text-[10px] text-[#A1A1AA]">{layout.nodes.get(layout.links[hoveredLink].target)?.label}</span>
            <span className="text-[11px] font-mono font-semibold text-white">{formatK(layout.links[hoveredLink].value)}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Filter Select ──────────────────────────────────────────────────────────

function FilterSelect({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#3F3F46] uppercase tracking-wider font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-[#00FF94]/30 text-xs text-white
                   focus:outline-none focus:border-[#00FF94]/60 hover:border-[#00FF94]/50
                   appearance-none cursor-pointer transition-colors duration-150"
        style={{ minWidth: '80px' }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Main Attribution View ──────────────────────────────────────────────────

const AttributionView: React.FC<AttributionViewProps> = ({ posts, creators }) => {
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterContentType, setFilterContentType] = useState('all');
  const [filterCreator, setFilterCreator] = useState('all');
  const [filterProduct, setFilterProduct] = useState('all');

  const funnel = ATTRIBUTION_FUNNEL;

  // Compute available content types based on selected channel
  const availableContentTypes = useMemo(() => {
    const types = new Set<string>();
    const relevantPosts = filterChannel === 'all' ? posts : posts.filter(p => p.platform === filterChannel);
    relevantPosts.forEach(p => types.add(p.postType));
    return Array.from(types);
  }, [posts, filterChannel]);

  const filteredData = useMemo(() => {
    let filteredPosts = posts;
    if (filterChannel !== 'all') filteredPosts = filteredPosts.filter((p) => p.platform === filterChannel);
    if (filterContentType !== 'all') filteredPosts = filteredPosts.filter((p) => p.postType === filterContentType);
    if (filterCreator !== 'all') filteredPosts = filteredPosts.filter((p) => p.creatorId === filterCreator);

    const totalViews = filteredPosts.reduce((s, p) => s + p.engagement.views, 0);
    const totalClicks = filteredPosts.reduce((s, p) => s + p.clicks, 0);
    const pageVisits = Math.round(totalClicks * 0.65);
    const addToCart = filteredPosts.reduce((s, p) => s + p.funnel.addToCart, 0);
    const purchased = filteredPosts.reduce((s, p) => s + p.funnel.purchases, 0);

    const stages: FunnelStage[] = [
      { label: 'Views', value: totalViews, dropOffRate: 0, conversionRate: 100 },
      { label: 'Clicks', value: totalClicks, dropOffRate: totalViews > 0 ? Math.round((1 - totalClicks / totalViews) * 100) : 0, conversionRate: totalViews > 0 ? Number(((totalClicks / totalViews) * 100).toFixed(2)) : 0 },
      { label: 'Page Visits', value: pageVisits, dropOffRate: totalClicks > 0 ? Math.round((1 - pageVisits / totalClicks) * 100) : 0, conversionRate: totalViews > 0 ? Number(((pageVisits / totalViews) * 100).toFixed(2)) : 0 },
      { label: 'Add to Cart', value: addToCart, dropOffRate: pageVisits > 0 ? Math.round((1 - addToCart / pageVisits) * 100) : 0, conversionRate: totalViews > 0 ? Number(((addToCart / totalViews) * 100).toFixed(2)) : 0 },
      { label: 'Purchased', value: purchased, dropOffRate: addToCart > 0 ? Math.round((1 - purchased / addToCart) * 100) : 0, conversionRate: totalViews > 0 ? Number(((purchased / totalViews) * 100).toFixed(2)) : 0 },
    ];

    // ── Build Sankey: Channel → Content Type → Product → Purchased ──
    // Traffic node removed — channels are the entry points (cleaner, less noise)

    const sankeyNodes: SankeyNodeData[] = [];
    const sankeyLinks: SankeyLinkData[] = [];

    // Col 0: Channels (value = views per platform)
    const platformViews: Record<string, number> = {};
    filteredPosts.forEach((p) => {
      platformViews[p.platform] = (platformViews[p.platform] || 0) + p.engagement.views;
    });
    ['tiktok', 'instagram', 'youtube'].forEach((ch) => {
      if (platformViews[ch]) {
        sankeyNodes.push({ id: `ch-${ch}`, label: PLATFORM_LABELS[ch] || ch, value: platformViews[ch], color: platformColor(ch), column: 0 });
      }
    });

    // Col 1: Content Types (value = clicks for display, addToCart for flow)
    const contentClicks: Record<string, number> = {};
    const contentAddToCart: Record<string, number> = {};
    const channelContentClicks: Record<string, Record<string, number>> = {};
    const creatorsPerType: Record<string, Set<string>> = {};
    const contentPurchases: Record<string, number> = {};
    filteredPosts.forEach((p) => {
      contentClicks[p.postType] = (contentClicks[p.postType] || 0) + p.clicks;
      contentAddToCart[p.postType] = (contentAddToCart[p.postType] || 0) + p.funnel.addToCart;
      contentPurchases[p.postType] = (contentPurchases[p.postType] || 0) + p.funnel.purchases;
      if (!channelContentClicks[p.platform]) channelContentClicks[p.platform] = {};
      channelContentClicks[p.platform][p.postType] = (channelContentClicks[p.platform][p.postType] || 0) + p.clicks;
      if (!creatorsPerType[p.postType]) creatorsPerType[p.postType] = new Set();
      const cr = creators.find((c) => c.id === p.creatorId);
      if (cr) creatorsPerType[p.postType].add(cr.name.split(' ')[0]);
    });

    // Conversion rates per content type (purchases / clicks)
    const conversionRates: Record<string, string> = {};

    Object.entries(contentClicks)
      .sort(([, a], [, b]) => b - a)
      .forEach(([ct, val]) => {
        const creatorNames = Array.from(creatorsPerType[ct] || []).slice(0, 3).join(', ');
        const purchases = contentPurchases[ct] || 0;
        const cvr = val > 0 ? ((purchases / val) * 100).toFixed(1) + '%' : '0%';
        conversionRates[`ct-${ct}`] = cvr;

        sankeyNodes.push({
          id: `ct-${ct}`,
          label: CONTENT_TYPE_LABELS[ct] || ct,
          subLabel: creatorNames || undefined,
          value: val,
          color: CONTENT_TYPE_COLORS[ct] || '#A78BFA',
          column: 1,
        });
      });

    // Links: Channel → Content Type (by clicks)
    Object.entries(channelContentClicks).forEach(([ch, ctMap]) => {
      Object.entries(ctMap).forEach(([ct, clicks]) => {
        if (clicks > 0) {
          sankeyLinks.push({ source: `ch-${ch}`, target: `ct-${ct}`, value: clicks, color: platformColor(ch) });
        }
      });
    });

    // Col 2: Products (value = addToCart scaled to filtered data)
    const filteredProducts = funnel.products.filter((p) => filterProduct === 'all' || p.id === filterProduct);
    const productScale = addToCart / (funnel.addToCart || 1);

    filteredProducts.forEach((prod) => {
      const scaledAtc = Math.round(prod.addToCart * productScale);
      if (scaledAtc > 0) {
        sankeyNodes.push({
          id: prod.id,
          label: prod.name.split(' ').slice(0, 2).join(' '),
          value: scaledAtc,
          color: PRODUCT_COLORS[prod.id] || '#FBBF24',
          column: 2,
        });
      }
    });

    // Links: Content Type → Products (using addToCart for proper flow narrowing)
    Object.entries(contentAddToCart).forEach(([ct, atc]) => {
      filteredProducts.forEach((prod) => {
        const prodShare = prod.addToCart / (funnel.addToCart || 1);
        const linkValue = Math.round(atc * prodShare);
        if (linkValue > 0) {
          sankeyLinks.push({ source: `ct-${ct}`, target: prod.id, value: linkValue, color: CONTENT_TYPE_COLORS[ct] || '#A78BFA' });
        }
      });
    });

    // Col 3: Purchased (single node — uses purchase count as value)
    const totalRevenue = filteredPosts.reduce((s, p) => s + p.revenue, 0);
    sankeyNodes.push({
      id: 'purchased',
      label: 'Purchased',
      subLabel: formatCurrency(totalRevenue),
      value: purchased || 1,
      color: colors.brand,
      column: 3,
    });

    // Links: Products → Purchased (every product connects to the purchased node)
    filteredProducts.forEach((prod) => {
      const scaledPurchases = Math.round(prod.orders * productScale);
      if (scaledPurchases > 0) {
        sankeyLinks.push({ source: prod.id, target: 'purchased', value: scaledPurchases, color: PRODUCT_COLORS[prod.id] || '#FBBF24' });
      }
    });

    // Purchase attribution map
    const purchaseMap: Record<string, number> = {};
    const purchasesByChannel: Record<string, number> = {};
    const purchasesByContentType: Record<string, number> = {};
    filteredPosts.forEach((p) => {
      purchasesByChannel[p.platform] = (purchasesByChannel[p.platform] || 0) + p.funnel.purchases;
      purchasesByContentType[p.postType] = (purchasesByContentType[p.postType] || 0) + p.funnel.purchases;
    });
    Object.entries(purchasesByChannel).forEach(([k, v]) => { purchaseMap[`ch-${k}`] = v; });
    Object.entries(purchasesByContentType).forEach(([k, v]) => { purchaseMap[`ct-${k}`] = v; });
    filteredProducts.forEach((prod) => { purchaseMap[prod.id] = Math.round(prod.orders * productScale); });
    purchaseMap['purchased'] = purchased;

    return { stages, sankeyNodes, sankeyLinks, totalRevenue, purchaseMap, conversionRates };
  }, [posts, creators, funnel, filterChannel, filterContentType, filterCreator, filterProduct]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col p-4 overflow-hidden"
    >
      {/* Filter row — above both panels */}
      <div className="flex items-center gap-3 mb-3 flex-shrink-0 flex-wrap">
        <FilterSelect
          label="Channel"
          value={filterChannel}
          onChange={(v) => {
            setFilterChannel(v);
            // Reset content type if it's no longer available for this channel
            if (filterContentType !== 'all') {
              const relevant = v === 'all' ? posts : posts.filter(p => p.platform === v);
              const types = new Set<string>(relevant.map(p => p.postType));
              if (!types.has(filterContentType)) setFilterContentType('all');
            }
          }}
          options={[
            { value: 'all', label: 'All' },
            { value: 'tiktok', label: 'TikTok' },
            { value: 'instagram', label: 'Instagram' },
            { value: 'youtube', label: 'YouTube' },
          ]}
        />
        <FilterSelect
          label="Type"
          value={filterContentType}
          onChange={setFilterContentType}
          options={[
            { value: 'all', label: 'All' },
            ...availableContentTypes.map((t) => ({ value: t, label: CONTENT_TYPE_LABELS[t] || t })),
          ]}
        />
        <FilterSelect
          label="Creator"
          value={filterCreator}
          onChange={setFilterCreator}
          options={[
            { value: 'all', label: 'All' },
            ...creators.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
        <FilterSelect
          label="Product"
          value={filterProduct}
          onChange={setFilterProduct}
          options={[
            { value: 'all', label: 'All' },
            ...funnel.products.map((p) => ({ value: p.id, label: p.name })),
          ]}
        />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] text-[#3F3F46] uppercase tracking-wider font-medium">Total</span>
          <span className="text-sm font-mono font-bold text-[#00FF94]">{formatCurrency(filteredData.totalRevenue)}</span>
        </div>
      </div>

      {/* Main: compact cone + wide sankey — Apple/Linear spacious layout */}
      <div className="flex-1 min-h-0 grid grid-cols-[220px_1fr] gap-4">
        {/* LEFT: Cone Funnel — compact sidebar */}
        <div className={`${tw.card} p-3 flex flex-col overflow-hidden`}>
          <div className="flex items-center justify-between mb-1.5 flex-shrink-0">
            <h3 className="text-[10px] font-medium text-[#A1A1AA] uppercase tracking-wider">Funnel</h3>
            <span className="text-[8px] text-[#27272A] font-mono uppercase tracking-wider">ecommerce</span>
          </div>
          <div className="flex-1 min-h-0">
            <ConeFunnel stages={filteredData.stages} />
          </div>
        </div>

        {/* RIGHT: Sankey — full bleed, no constraining box */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-1 pb-1 flex-shrink-0">
            <h3 className="text-[10px] font-medium text-[#A1A1AA] uppercase tracking-wider">Attribution Flow</h3>
            <span className="text-[8px] text-[#27272A] font-mono uppercase tracking-wider">hover to trace</span>
          </div>
          <div className="flex-1 min-h-0">
            <SankeyDiagram
              nodes={filteredData.sankeyNodes}
              links={filteredData.sankeyLinks}
              purchaseMap={filteredData.purchaseMap}
              conversionRates={filteredData.conversionRates}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttributionView;
