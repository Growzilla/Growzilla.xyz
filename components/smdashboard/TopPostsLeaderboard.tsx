import React from 'react';
import { motion } from 'framer-motion';
import type { Post } from '@/types/smdashboard';
import { getPlatformColor, getPlatformLabel } from '@/data/mockSMData';

interface TopPostsLeaderboardProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  limit?: number;
}

function formatK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
}

function formatEngagement(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

const PLATFORM_ICON: Record<string, string> = {
  instagram: '\ud83d\udcf8',
  tiktok: '\ud83c\udfac',
  youtube: '\u25b6\ufe0f',
};

const TopPostsLeaderboard: React.FC<TopPostsLeaderboardProps> = ({
  posts,
  onPostClick,
  limit = 5,
}) => {
  const topPosts = [...posts].sort((a, b) => b.revenue - a.revenue).slice(0, limit);

  return (
    <div className="card-zilla p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white">Top Converting Posts</h3>
        <span className="text-[10px] text-gray-500 font-mono">by revenue</span>
      </div>

      <div className="space-y-1">
        {topPosts.map((post, i) => (
          <motion.button
            key={post.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onPostClick(post)}
            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            {/* Rank */}
            <span className="text-xs text-gray-600 font-mono w-4 flex-shrink-0">
              {i + 1}
            </span>

            {/* Platform icon */}
            <span className="text-sm flex-shrink-0">
              {PLATFORM_ICON[post.platform]}
            </span>

            {/* Caption */}
            <div className="text-left min-w-0 flex-1">
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                {post.caption.slice(0, 50)}...
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-[10px] font-mono"
                  style={{ color: getPlatformColor(post.platform) }}
                >
                  {getPlatformLabel(post.platform)}
                </span>
                <span className="text-[10px] text-gray-600">
                  {formatEngagement(post.engagement.likes)} likes
                </span>
              </div>
            </div>

            {/* Revenue + conversion */}
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-sm font-mono font-medium text-zilla-neon">
                {formatK(post.revenue)}
              </p>
              <p className="text-[10px] text-gray-500 font-mono">
                {post.conversionRate}% conv
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TopPostsLeaderboard;
