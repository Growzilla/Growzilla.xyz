import React from 'react';
import type { SMDashboardData, Post, SMInsight } from '@/types/smdashboard';
import { getPostsByPlatform } from '@/data/mockSMData';
import KPIRow from './KPIRow';
import RevenueByPlatformChart from './RevenueByPlatformChart';
import TopPostsLeaderboard from './TopPostsLeaderboard';
import CreatorComparisonChart from './CreatorComparisonChart';
import InsightCard from './InsightCard';

interface OrgViewProps {
  data: SMDashboardData;
  activePlatform: string;
  onPostClick: (post: Post) => void;
  onSelectCreator: (creatorId: string) => void;
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

const OrgView: React.FC<OrgViewProps> = ({
  data,
  activePlatform,
  onPostClick,
  onSelectCreator,
  onCreateTemplate,
  onViewPost,
}) => {
  const { org } = data;
  const filteredPosts = getPostsByPlatform(activePlatform);

  const kpis = [
    {
      label: 'Total Revenue',
      value: formatCurrency(org.totalRevenue),
      delta: formatDelta(org.revenueChange),
      up: org.revenueChange >= 0,
      tooltip: 'Total revenue attributed to creator content',
    },
    {
      label: 'Creator Earnings',
      value: formatCurrency(org.totalCommissions),
      subValue: '15% commission',
      tooltip: 'Total commissions paid to creators',
    },
    {
      label: 'Top Platform',
      value: getPlatformDisplayName(org.topPlatform),
      subValue: formatCurrency(org.topPlatformRevenue) + ' rev',
      tooltip: 'Highest revenue-generating platform',
    },
    {
      label: 'Avg Conv Rate',
      value: `${org.avgConversionRate}%`,
      delta: formatDelta(org.conversionChange),
      up: org.conversionChange >= 0,
      tooltip: 'Average conversion rate across all creator posts',
    },
    {
      label: 'Total Posts',
      value: org.totalPosts.toString(),
      subValue: `+${org.postsThisWeek} this week`,
      tooltip: 'Total posts tracked across all creators',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPIRow cards={kpis} />

      {/* Charts Row: Revenue by Platform + Top Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueByPlatformChart
          data={data.revenueChart}
          activePlatform={activePlatform}
        />
        <TopPostsLeaderboard
          posts={filteredPosts}
          onPostClick={onPostClick}
        />
      </div>

      {/* Creator Comparison */}
      <CreatorComparisonChart
        creators={data.creators}
        onSelectCreator={onSelectCreator}
      />

      {/* AI Insights */}
      <div className="card-zilla p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">\ud83e\udde0</span>
            <h3 className="text-sm font-medium text-white">AI Insights</h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
            Powered by AI
          </span>
        </div>
        <div className="space-y-3">
          {data.insights.map((insight, i) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              index={i}
              onCreateTemplate={onCreateTemplate}
              onViewPost={onViewPost}
              onViewCreator={(id) => onSelectCreator(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgView;
