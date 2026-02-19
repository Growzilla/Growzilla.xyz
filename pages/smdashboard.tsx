import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import UserLayout from '@/components/user/UserLayout';
import UserLoadingSkeleton from '@/components/user/UserLoadingSkeleton';
import { MOCK_SM_DATA } from '@/data/mockSMData';
import type { Post, SMInsight, DateRange } from '@/types/smdashboard';

import DateRangeToggle from '@/components/smdashboard/DateRangeToggle';
import PlatformTabs from '@/components/smdashboard/PlatformTabs';
import CreatorSelector from '@/components/smdashboard/CreatorSelector';
import OrgView from '@/components/smdashboard/OrgView';
import CreatorView from '@/components/smdashboard/CreatorView';
import PostModal from '@/components/smdashboard/PostModal';
import TemplateModal from '@/components/smdashboard/TemplateModal';

export default function SMDashboard() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [activePlatform, setActivePlatform] = useState('all');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [templateInsight, setTemplateInsight] = useState<SMInsight | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const data = MOCK_SM_DATA;
  const selectedCreator = selectedCreatorId
    ? data.creators.find((c) => c.id === selectedCreatorId) ?? null
    : null;

  const handlePostClick = useCallback((post: Post) => {
    setSelectedPost(post);
  }, []);

  const handleViewPost = useCallback(
    (postId: string) => {
      const post = data.posts.find((p) => p.id === postId);
      if (post) setSelectedPost(post);
    },
    [data.posts]
  );

  const handleSelectCreator = useCallback((creatorId: string) => {
    setSelectedCreatorId(creatorId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCreateTemplate = useCallback((insight: SMInsight) => {
    setTemplateInsight(insight);
  }, []);

  return (
    <>
      <Head>
        <title>Creator Revenue Hub | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <UserLayout storeName="Creator Hub">
        {loading ? (
          <UserLoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Demo banner */}
            <div className="rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 px-4 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="text-zilla-neon font-medium">Creator Revenue Hub</span>{' '}
                — Track exactly how much revenue each creator post generates.
              </p>
            </div>

            {/* Page Title + Controls */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Creator Revenue Hub
                </h1>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <CreatorSelector
                    creators={data.creators}
                    selectedCreatorId={selectedCreatorId}
                    onChange={setSelectedCreatorId}
                  />
                  <DateRangeToggle value={dateRange} onChange={setDateRange} />
                </div>
              </div>

              {/* Platform tabs */}
              <PlatformTabs value={activePlatform} onChange={setActivePlatform} />
            </div>

            {/* View content */}
            {selectedCreator ? (
              <CreatorView
                creator={selectedCreator}
                data={data}
                activePlatform={activePlatform}
                onPostClick={handlePostClick}
                onCreateTemplate={handleCreateTemplate}
                onViewPost={handleViewPost}
              />
            ) : (
              <OrgView
                data={data}
                activePlatform={activePlatform}
                onPostClick={handlePostClick}
                onSelectCreator={handleSelectCreator}
                onCreateTemplate={handleCreateTemplate}
                onViewPost={handleViewPost}
              />
            )}
          </motion.div>
        )}
      </UserLayout>

      {/* Modals */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
      {templateInsight && (
        <TemplateModal
          insight={templateInsight}
          onClose={() => setTemplateInsight(null)}
        />
      )}
    </>
  );
}
