import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ScaledDashboardData, Post, Creator, PlatformMetrics } from '@/types/smdashboard';
import { formatCurrency, formatDelta, platformColor, tw } from '@/lib/design-tokens';
import KPICard from '../widgets/KPICard';
import CreatorRow from '../widgets/CreatorRow';
import PostTile from '../widgets/PostTile';

interface OverviewViewProps {
  data: ScaledDashboardData;
  onPostClick: (post: Post) => void;
  onCreatorClick: (creator: Creator) => void;
  onViewAllCreators: () => void;
  onViewAllPosts: () => void;
  creatorSparkData: Record<string, number[]>;
}

// ─── Platform Donut Chart ───────────────────────────────────────────────────

const CX = 100;
const CY = 100;
const R = 75;
const STROKE = 28;
const circumference = 2 * Math.PI * R;

function PlatformDonut({ metrics }: { metrics: PlatformMetrics[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const grandTotal = metrics.reduce((s, m) => s + m.revenue, 0);

  let cumulativeOffset = 0;
  const segments = metrics
    .filter((m) => m.revenue > 0)
    .map((m) => {
      const pct = m.revenue / (grandTotal || 1);
      const dashLength = pct * circumference;
      const gapLength = circumference - dashLength;
      const offset = -cumulativeOffset;
      cumulativeOffset += dashLength;
      return { ...m, pct, dashArray: `${dashLength} ${gapLength}`, dashOffset: offset };
    });

  const platformLabels: Record<string, string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube' };

  return (
    <div className="flex items-center gap-5 h-full">
      {/* Donut SVG */}
      <div className="relative flex-shrink-0">
        <svg viewBox="0 0 200 200" className="w-[180px] h-[180px] transform -rotate-90">
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={STROKE} />
          {segments.map((seg) => (
            <motion.circle
              key={seg.platform}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={platformColor(seg.platform)}
              strokeWidth={hovered === seg.platform ? STROKE + 5 : STROKE}
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: seg.dashArray }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              opacity={hovered && hovered !== seg.platform ? 0.3 : 1}
              onMouseEnter={() => setHovered(seg.platform)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all duration-200"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Total</p>
          <p className="text-lg font-mono font-bold text-white">{formatCurrency(grandTotal)}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-2 min-w-0">
        {segments.map((seg) => (
          <div
            key={seg.platform}
            onMouseEnter={() => setHovered(seg.platform)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              hovered === seg.platform ? 'border-white/20 bg-white/[0.04]' : 'border-transparent'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: platformColor(seg.platform) }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">{platformLabels[seg.platform] || seg.platform}</span>
                <span className="text-xs font-mono font-bold text-white">{formatCurrency(seg.revenue)}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[10px] text-zinc-600">{(seg.pct * 100).toFixed(1)}%</span>
                <span className="text-[10px] text-zinc-600 font-mono">{seg.orders} orders</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

const OverviewView: React.FC<OverviewViewProps> = ({
  data,
  onPostClick,
  onCreatorClick,
  onViewAllCreators,
  onViewAllPosts,
  creatorSparkData,
}) => {
  const { org } = data;
  const topCreators = [...data.creators].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 3);
  const topPosts = [...data.posts].sort((a, b) => b.revenue - a.revenue).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col gap-3 p-4 overflow-hidden"
    >
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3 flex-shrink-0">
        <KPICard
          label="Revenue"
          value={formatCurrency(org.totalRevenue)}
          delta={formatDelta(org.revenueChange)}
          up={org.revenueChange >= 0}
          index={0}
        />
        <KPICard
          label="Posts Tracked"
          value={org.totalPosts.toString()}
          subValue={`+${org.postsThisWeek} this wk`}
          index={1}
        />
        <KPICard
          label="Conv Rate"
          value={`${org.avgConversionRate}%`}
          delta={formatDelta(org.conversionChange)}
          up={org.conversionChange >= 0}
          index={2}
        />
        <KPICard
          label="Creators"
          value={data.creators.length.toString()}
          subValue={formatCurrency(org.totalCommissions) + ' paid'}
          index={3}
        />
      </div>

      {/* Revenue Distribution Donut — takes ~55% of remaining height */}
      <div className={`${tw.card} p-4 flex-[55] min-h-0 overflow-hidden`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-white">Revenue by Platform</h3>
          <span className="text-[10px] text-zinc-600 font-mono">distribution</span>
        </div>
        <div className="h-[calc(100%-28px)] flex items-center">
          <PlatformDonut metrics={data.platformMetrics} />
        </div>
      </div>

      {/* Bottom Row — ~35% of remaining height */}
      <div className="grid grid-cols-2 gap-3 flex-[35] min-h-0">
        {/* Top Creators */}
        <div className={`${tw.card} p-3 flex flex-col overflow-hidden`}>
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="text-xs font-medium text-white">Top Creators</h3>
            <button
              onClick={onViewAllCreators}
              className="text-[10px] text-[#00FF94] hover:text-[#00E676] transition-colors"
            >
              View all &rarr;
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            {topCreators.map((creator, i) => (
              <CreatorRow
                key={creator.id}
                creator={creator}
                rank={i + 1}
                sparkData={creatorSparkData[creator.id] || []}
                onClick={() => onCreatorClick(creator)}
              />
            ))}
          </div>
        </div>

        {/* Top Posts */}
        <div className={`${tw.card} p-3 flex flex-col overflow-hidden`}>
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="text-xs font-medium text-white">Top Posts</h3>
            <button
              onClick={onViewAllPosts}
              className="text-[10px] text-[#00FF94] hover:text-[#00E676] transition-colors"
            >
              View all &rarr;
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-2 gap-2">
            {topPosts.map((post) => (
              <PostTile key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewView;
