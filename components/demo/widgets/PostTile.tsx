import React from 'react';
import type { Post } from '@/types/smdashboard';
import { formatCurrency, platformColor } from '@/lib/design-tokens';

interface PostTileProps {
  post: Post;
  onClick?: () => void;
}

function platformIcon(platform: string): string {
  const icons: Record<string, string> = { tiktok: 'TT', instagram: 'IG', youtube: 'YT' };
  return icons[platform] || platform;
}

const PostTile: React.FC<PostTileProps> = ({ post, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-lg overflow-hidden hover:border-white/[0.1] transition-all duration-200 text-left w-full"
    >
      {/* Thumbnail area */}
      <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900">
        <img
          src={post.thumbnail}
          alt={post.caption.slice(0, 40)}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${platformColor(post.platform)}15, transparent 60%)`,
          }}
        />
        {/* Platform badge */}
        <div
          className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold backdrop-blur-sm"
          style={{
            backgroundColor: `${platformColor(post.platform)}20`,
            color: platformColor(post.platform),
            border: `1px solid ${platformColor(post.platform)}30`,
          }}
        >
          {platformIcon(post.platform)}
        </div>

        {/* Revenue overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2 pt-6">
          <span className="text-sm font-mono font-bold text-white">
            {formatCurrency(post.revenue)}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="p-2.5">
        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
          {post.caption.slice(0, 60)}...
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-zinc-600 font-mono">{post.orders} orders</span>
          <span className="text-[10px] text-zinc-700">|</span>
          <span className="text-[10px] text-zinc-600 font-mono">{post.conversionRate}% conv</span>
        </div>
      </div>
    </button>
  );
};

export default PostTile;
