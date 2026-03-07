import React from 'react';
import type { Creator, Post } from '@/types/smdashboard';
import { formatCurrency, formatDelta, platformColor } from '@/lib/design-tokens';
import { tw } from '@/lib/design-tokens';
import MiniSparkline from '../widgets/MiniSparkline';

interface CreatorDetailPanelProps {
  creator: Creator;
  posts: Post[];
  sparkData: number[];
}

const CreatorDetailPanel: React.FC<CreatorDetailPanelProps> = ({ creator, posts, sparkData }) => {
  const topPosts = [...posts].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Creator header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{creator.name}</p>
          <p className="text-[11px] text-zinc-500">{creator.handle}</p>
        </div>
      </div>

      {/* Platform badges */}
      <div className="flex items-center gap-1.5">
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

      {/* Revenue trend */}
      <div className={`${tw.card} p-3`}>
        <div className="flex items-center justify-between mb-2">
          <p className={tw.label}>Revenue Trend</p>
          <span className={`text-xs font-medium ${tw.delta(creator.revenueChange >= 0)}`}>
            {formatDelta(creator.revenueChange)}
          </span>
        </div>
        <MiniSparkline data={sparkData} color="#00FF94" width={240} height={40} />
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Revenue', value: formatCurrency(creator.totalRevenue) },
          { label: 'Commission', value: formatCurrency(creator.totalCommission) },
          { label: 'Conv Rate', value: `${creator.conversionRate}%` },
          { label: 'Posts', value: creator.totalPosts.toString() },
        ].map((m) => (
          <div key={m.label} className={`${tw.card} p-2.5`}>
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{m.label}</p>
            <p className="text-sm font-mono font-semibold text-white mt-0.5">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Top posts */}
      <div>
        <p className={`${tw.label} mb-2`}>Top Posts</p>
        <div className="space-y-1.5">
          {topPosts.map((post, i) => (
            <div
              key={post.id}
              className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
            >
              <span className="text-[10px] font-mono text-zinc-600 w-3">{i + 1}</span>
              <span
                className="px-1 py-0.5 rounded text-[8px] font-mono"
                style={{
                  backgroundColor: `${platformColor(post.platform)}20`,
                  color: platformColor(post.platform),
                }}
              >
                {post.platform.slice(0, 2).toUpperCase()}
              </span>
              <p className="text-[11px] text-zinc-400 truncate flex-1">{post.caption.slice(0, 40)}...</p>
              <span className="text-[11px] font-mono font-semibold text-white flex-shrink-0">
                {formatCurrency(post.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDetailPanel;
