import React from 'react';
import type { Creator, Post, SMInsight, SMDashboardData } from '@/types/smdashboard';
import { getCreatorPosts, getCreatorKPIs, getPostsByPlatform } from '@/data/mockSMData';
import KPIRow from './KPIRow';
import RevenueByPlatformChart from './RevenueByPlatformChart';
import PostCard from './PostCard';
import InsightCard from './InsightCard';

interface CreatorViewProps {
  creator: Creator;
  data: SMDashboardData;
  activePlatform: string;
  onPostClick: (post: Post) => void;
  onCreateTemplate: (insight: SMInsight) => void;
  onViewPost: (postId: string) => void;
}

function formatCurrency(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
}

function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d.toFixed(1)}%`;
}

function getPlatformDisplayName(p: string): string {
  const names: Record<string, string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube' };
  return names[p] || p;
}

const CreatorView: React.FC<CreatorViewProps> = ({
  creator,
  data,
  activePlatform,
  onPostClick,
  onCreateTemplate,
  onViewPost,
}) => {
  const kpiData = getCreatorKPIs(creator.id);
  const posts = getPostsByPlatform(activePlatform, creator.id);
  const relatedInsights = data.insights.filter(
    (ins) => ins.relatedCreatorId === creator.id
  );

  const kpis = [
    {
      label: 'Attributed Revenue',
      value: formatCurrency(kpiData.attributedRevenue),
      delta: formatDelta(kpiData.revenueChange),
      up: kpiData.revenueChange >= 0,
      tooltip: 'Total revenue attributed to this creator',
    },
    {
      label: 'Commission',
      value: formatCurrency(kpiData.commission),
      subValue: `${(kpiData.commissionRate * 100).toFixed(0)}% of revenue`,
      tooltip: 'Earnings based on commission rate',
    },
    {
      label: 'Best Post',
      value: formatCurrency(kpiData.bestPostRevenue),
      subValue: getPlatformDisplayName(kpiData.bestPostPlatform),
      tooltip: 'Highest revenue from a single post',
    },
    {
      label: 'Conv Rate',
      value: `${kpiData.conversionRate}%`,
      delta: formatDelta(kpiData.conversionChange),
      up: kpiData.conversionChange >= 0,
      tooltip: 'Average conversion rate across all posts',
    },
    {
      label: 'Total Posts',
      value: kpiData.totalPosts.toString(),
      subValue: `${kpiData.postsThisMonth} this month`,
      tooltip: 'Total posts tracked for this creator',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Creator header */}
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full object-cover border border-zilla-neon/20" />
        <div>
          <h2 className="text-lg font-display font-bold text-white">{creator.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono">{creator.handle}</span>
            <span className="text-gray-600">\u2022</span>
            <div className="flex items-center gap-1">
              {creator.platforms.map((p) => (
                <span
                  key={p}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5"
                >
                  {getPlatformDisplayName(p)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KPIRow cards={kpis} />

      {/* Revenue Chart */}
      <RevenueByPlatformChart
        data={data.revenueChart}
        activePlatform={activePlatform}
      />

      {/* Post Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">
            Posts ({posts.length})
          </h3>
          <span className="text-[10px] text-gray-500 font-mono">
            sorted by revenue
          </span>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => onPostClick(post)}
              />
            ))}
          </div>
        ) : (
          <div className="card-zilla p-8 text-center">
            <p className="text-sm text-gray-500">
              No posts found for this platform filter.
            </p>
          </div>
        )}
      </div>

      {/* Related Insights */}
      {relatedInsights.length > 0 && (
        <div className="card-zilla p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-lg">\ud83e\udde0</span>
            <h3 className="text-sm font-medium text-white">
              Insights for {creator.name}
            </h3>
          </div>
          <div className="space-y-3">
            {relatedInsights.map((insight, i) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                index={i}
                onCreateTemplate={onCreateTemplate}
                onViewPost={onViewPost}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorView;
