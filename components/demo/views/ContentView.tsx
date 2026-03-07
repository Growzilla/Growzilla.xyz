import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Post, Creator } from '@/types/smdashboard';
import { platformColor, formatCurrency } from '@/lib/design-tokens';
import PostTile from '../widgets/PostTile';

interface ContentViewProps {
  posts: Post[];
  creators: Creator[];
  onPostClick: (post: Post) => void;
}

const PLATFORM_TABS: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
];

const CONTENT_TYPE_TABS: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'reel', label: 'Reels' },
  { id: 'post', label: 'Posts' },
  { id: 'story', label: 'Stories' },
  { id: 'video', label: 'Videos' },
];

const ContentView: React.FC<ContentViewProps> = ({ posts, creators, onPostClick }) => {
  const [activePlatform, setActivePlatform] = useState('all');
  const [activeContentType, setActiveContentType] = useState('all');
  const [activeCreator, setActiveCreator] = useState('all');

  const filtered = useMemo(() => {
    let result = posts;
    if (activePlatform !== 'all') result = result.filter((p) => p.platform === activePlatform);
    if (activeContentType !== 'all') result = result.filter((p) => p.postType === activeContentType);
    if (activeCreator !== 'all') result = result.filter((p) => p.creatorId === activeCreator);
    return [...result].sort((a, b) => b.revenue - a.revenue);
  }, [posts, activePlatform, activeContentType, activeCreator]);

  // Cross-platform comparison: group posts by creator that have posts on multiple platforms
  const crossPlatformGroups = useMemo(() => {
    const groups: Record<string, Post[]> = {};
    posts.forEach((p) => {
      if (!groups[p.creatorId]) groups[p.creatorId] = [];
      groups[p.creatorId].push(p);
    });
    // Only keep creators with posts on 2+ platforms
    const result: Record<string, Set<string>> = {};
    Object.entries(groups).forEach(([creatorId, creatorPosts]) => {
      const platforms = new Set(creatorPosts.map((p) => p.platform));
      if (platforms.size > 1) result[creatorId] = platforms;
    });
    return result;
  }, [posts]);

  const getCreatorName = (creatorId: string) => {
    return creators.find((c) => c.id === creatorId)?.name.split(' ')[0] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col p-4 overflow-hidden"
    >
      {/* Filter rows */}
      <div className="flex flex-col gap-2 mb-3 flex-shrink-0">
        {/* Row 1: Platform tabs + Creator dropdown */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {PLATFORM_TABS.map((tab) => {
              const isActive = activePlatform === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePlatform(tab.id)}
                  className={`relative px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="content-platform-bg"
                      className="absolute inset-0 rounded-md"
                      style={{
                        backgroundColor: tab.id === 'all' ? 'rgba(255,255,255,0.08)' : `${platformColor(tab.id)}15`,
                        border: tab.id === 'all' ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${platformColor(tab.id)}30`,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Creator dropdown */}
          <div className="ml-3 flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-600">Creator:</span>
            <select
              value={activeCreator}
              onChange={(e) => setActiveCreator(e.target.value)}
              className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] text-white focus:outline-none focus:border-[#00FF94]/30 appearance-none cursor-pointer"
            >
              <option value="all">All Creators</option>
              {creators.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <span className="text-[10px] text-zinc-600 ml-auto font-mono">{filtered.length} posts</span>
        </div>

        {/* Row 2: Content type pills */}
        <div className="flex items-center gap-1">
          {CONTENT_TYPE_TABS.map((tab) => {
            const isActive = activeContentType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveContentType(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors border ${
                  isActive
                    ? 'text-white bg-white/[0.08] border-white/[0.12]'
                    : 'text-zinc-500 hover:text-zinc-300 border-transparent hover:bg-white/[0.03]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Post grid */}
      <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-4 lg:grid-cols-5 gap-3 auto-rows-min content-start">
        {filtered.map((post, i) => {
          // Check if this post's creator has cross-platform content
          const hasCrossPlatform = crossPlatformGroups[post.creatorId] !== undefined;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="relative"
            >
              <PostTile post={post} onClick={() => onPostClick(post)} />
              {/* Cross-platform indicator */}
              {hasCrossPlatform && (
                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/[0.08]">
                  {Array.from(crossPlatformGroups[post.creatorId]).map((p) => (
                    <span
                      key={p}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: platformColor(p) }}
                    />
                  ))}
                  <span className="text-[8px] text-zinc-400 ml-0.5">{getCreatorName(post.creatorId)}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ContentView;
