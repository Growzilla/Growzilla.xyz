import React from 'react';
import { motion } from 'framer-motion';
import type { Post } from '@/types/smdashboard';
import { getPlatformColor, getPlatformLabel } from '@/data/mockSMData';

interface PostCardProps {
  post: Post;
  index: number;
  onClick: () => void;
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

const PostCard: React.FC<PostCardProps> = ({ post, index, onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.04 }}
    onClick={onClick}
    className="card-zilla p-0 overflow-hidden group text-left w-full hover:border-zilla-neon/30 transition-all duration-300"
  >
    {/* Thumbnail area */}
    <div className="relative aspect-square bg-gradient-to-br from-zilla-surface to-zilla-charcoal overflow-hidden">
      {/* Platform badge */}
      <div
        className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium backdrop-blur-sm z-10"
        style={{
          backgroundColor: `${getPlatformColor(post.platform)}20`,
          color: getPlatformColor(post.platform),
          border: `1px solid ${getPlatformColor(post.platform)}30`,
        }}
      >
        <span>{PLATFORM_ICON[post.platform]}</span>
        <span>{post.postType === 'reel' || post.postType === 'short' ? 'Reel' : post.postType === 'video' ? 'Video' : 'Post'}</span>
      </div>

      {/* Revenue overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
        <p className="text-lg font-mono font-bold text-zilla-neon leading-tight">
          {formatK(post.revenue)}
        </p>
        <p className="text-[10px] text-gray-400 font-mono">
          {post.orders} orders
        </p>
      </div>

      {/* Actual thumbnail image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.thumbnail}
        alt={post.caption.slice(0, 60)}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-zilla-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

    {/* Content */}
    <div className="p-3">
      <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-2">
        {post.caption}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">
            \u2764\ufe0f {formatEngagement(post.engagement.likes)}
          </span>
          <span className="text-[10px] text-gray-500">
            \ud83d\udcac {formatEngagement(post.engagement.comments)}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zilla-neon/70 group-hover:text-zilla-neon transition-colors">
          View \u2192
        </span>
      </div>
    </div>
  </motion.button>
);

export default PostCard;
