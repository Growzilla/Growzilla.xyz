import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Creator, Post } from '@/types/smdashboard';
import { formatCurrency, formatDelta, platformColor, tw } from '@/lib/design-tokens';
import KPICard from '../widgets/KPICard';
import MiniSparkline from '../widgets/MiniSparkline';
import PostTile from '../widgets/PostTile';

interface CreatorProfileViewProps {
  creator: Creator;
  posts: Post[];
  sparkData: number[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
}

const CreatorProfileView: React.FC<CreatorProfileViewProps> = ({
  creator,
  posts,
  sparkData,
  onBack,
  onPostClick,
}) => {
  const [activePlatform, setActivePlatform] = useState('all');

  const filteredPosts = activePlatform === 'all'
    ? posts
    : posts.filter((p) => p.platform === activePlatform);
  const sortedPosts = [...filteredPosts].sort((a, b) => b.revenue - a.revenue);

  // Platform breakdown
  const platformRevenue: Record<string, number> = {};
  const platformOrders: Record<string, number> = {};
  posts.forEach((p) => {
    platformRevenue[p.platform] = (platformRevenue[p.platform] || 0) + p.revenue;
    platformOrders[p.platform] = (platformOrders[p.platform] || 0) + p.orders;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col p-4 overflow-hidden"
    >
      {/* Back button + Creator header */}
      <div className="flex items-center gap-4 mb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all creators
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{creator.name}</h2>
            <p className="text-[11px] text-zinc-500">{creator.handle}</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            {creator.platforms.map((p) => (
              <span
                key={p}
                className="px-2 py-0.5 rounded text-[10px] font-mono"
                style={{
                  backgroundColor: `${platformColor(p)}15`,
                  color: platformColor(p),
                  border: `1px solid ${platformColor(p)}30`,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-3 flex-shrink-0 mb-3">
        <KPICard
          label="Revenue"
          value={formatCurrency(creator.totalRevenue)}
          delta={formatDelta(creator.revenueChange)}
          up={creator.revenueChange >= 0}
          index={0}
        />
        <KPICard
          label="Commission"
          value={formatCurrency(creator.totalCommission)}
          subValue={`${(creator.commissionRate * 100).toFixed(0)}% rate`}
          index={1}
        />
        <KPICard
          label="Conv Rate"
          value={`${creator.conversionRate}%`}
          index={2}
        />
        <KPICard
          label="Total Posts"
          value={creator.totalPosts.toString()}
          subValue={`${creator.postsThisPeriod} this period`}
          index={3}
        />
        <div className={`${tw.card} p-3`}>
          <p className={tw.label}>Revenue Trend</p>
          <div className="mt-2">
            <MiniSparkline data={sparkData} color="#00FF94" width={120} height={32} />
          </div>
        </div>
      </div>

      {/* Middle: Platform breakdown */}
      <div className="grid grid-cols-[1fr_2fr] gap-3 flex-1 min-h-0">
        {/* Platform breakdown card */}
        <div className={`${tw.card} p-3 flex flex-col overflow-hidden`}>
          <h3 className="text-xs font-medium text-white mb-3 flex-shrink-0">Platform Breakdown</h3>
          <div className="space-y-2 flex-1 min-h-0 overflow-hidden">
            {creator.platforms.map((platform) => {
              const rev = platformRevenue[platform] || 0;
              const ord = platformOrders[platform] || 0;
              const totalRev = Object.values(platformRevenue).reduce((s, v) => s + v, 0) || 1;
              const pct = (rev / totalRev) * 100;
              return (
                <div key={platform} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: platformColor(platform) }} />
                    <span className="text-xs font-medium text-white capitalize">{platform}</span>
                    <span className="text-[10px] text-zinc-600 ml-auto">{pct.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-white">{formatCurrency(rev)}</span>
                    <span className="text-[10px] text-zinc-600 font-mono">{ord} orders</span>
                  </div>
                  <div className="mt-1.5 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: platformColor(platform) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Posts grid */}
        <div className={`${tw.card} p-3 flex flex-col overflow-hidden`}>
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="text-xs font-medium text-white">Posts</h3>
            <div className="flex items-center gap-1">
              {[{ id: 'all', label: 'All' }, ...creator.platforms.map((p) => ({ id: p, label: p }))].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatform(tab.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    activePlatform === tab.id
                      ? 'text-white bg-white/[0.08]'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <span className="text-[10px] text-zinc-600 ml-2 font-mono">{sortedPosts.length}</span>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-min content-start">
            {sortedPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
              >
                <PostTile post={post} onClick={() => onPostClick(post)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorProfileView;
