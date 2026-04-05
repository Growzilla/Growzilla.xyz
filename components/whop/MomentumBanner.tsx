'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MomentumData {
  totalViews: number;
  totalVisits: number;
  attributedRevenue: number;
  bestHook: string | null;
  winningPlatform: string | null;
  videosThisWeek: number;
  weeklyGoal: number;
  streakDays: number;
  hasVideos: boolean;
  hasPostedVideos: boolean;
  hasUnpostedVideo: boolean;
}

interface MomentumBannerProps {
  data?: MomentumData | null;
}

// ---------------------------------------------------------------------------
// Mock data for development
// ---------------------------------------------------------------------------

export const MOCK_MOMENTUM_WITH_DATA: MomentumData = {
  totalViews: 2134,
  totalVisits: 37,
  attributedRevenue: 420,
  bestHook: '"You won\'t believe what this serum does"',
  winningPlatform: 'TikTok',
  videosThisWeek: 3,
  weeklyGoal: 5,
  streakDays: 3,
  hasVideos: true,
  hasPostedVideos: true,
  hasUnpostedVideo: false,
};

export const MOCK_MOMENTUM_FIRST_TIME: MomentumData = {
  totalViews: 0,
  totalVisits: 0,
  attributedRevenue: 0,
  bestHook: null,
  winningPlatform: null,
  videosThisWeek: 0,
  weeklyGoal: 5,
  streakDays: 0,
  hasVideos: false,
  hasPostedVideos: false,
  hasUnpostedVideo: false,
};

export const MOCK_MOMENTUM_UNPOSTED: MomentumData = {
  totalViews: 0,
  totalVisits: 0,
  attributedRevenue: 0,
  bestHook: null,
  winningPlatform: null,
  videosThisWeek: 1,
  weeklyGoal: 5,
  streakDays: 0,
  hasVideos: true,
  hasPostedVideos: false,
  hasUnpostedVideo: true,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`.replace('.0k', 'k');
  return n.toLocaleString();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const MomentumBanner: React.FC<MomentumBannerProps> = ({ data }) => {
  // Default to first-time state if no data
  const d = data ?? MOCK_MOMENTUM_FIRST_TIME;

  // --- STATE 1: Has data (videos + posts with attribution) ---
  if (d.hasVideos && d.hasPostedVideos && d.attributedRevenue > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-xl p-5 mb-6"
        style={{
          backgroundColor: '#111113',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-2">
          <span className="text-gray-300">
            <span className="font-medium text-white">+{formatNumber(d.totalViews)}</span> views
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>&middot;</span>
          <span className="text-gray-300">
            <span className="font-medium text-white">+{formatNumber(d.totalVisits)}</span> visits
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>&middot;</span>
          <span className="text-gray-300">
            <span className="font-medium" style={{ color: '#00FF94' }}>${formatNumber(d.attributedRevenue)}</span> attributed
          </span>
        </div>

        {/* Insights row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-3">
          {d.bestHook && (
            <span>
              Best hook: <span className="text-gray-300">{d.bestHook}</span>
            </span>
          )}
          {d.winningPlatform && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>&middot;</span>
              <span>
                <span className="text-gray-300">{d.winningPlatform}</span> is winning
              </span>
            </>
          )}
        </div>

        {/* Progress + streak + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {d.videosThisWeek}/{d.weeklyGoal} videos this week
            </span>
            {d.streakDays > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,171,0,0.1)', color: '#FFAB00' }}>
                {d.streakDays}-day streak
              </span>
            )}
          </div>
          <Link
            href="/create"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
          >
            Create your next video
          </Link>
        </div>
      </motion.div>
    );
  }

  // --- STATE 2: Has videos but none posted ---
  if (d.hasVideos && d.hasUnpostedVideo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-xl p-5 mb-6"
        style={{
          backgroundColor: '#111113',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p className="text-sm text-gray-300 mb-3">
          You have a video ready. Post it to start getting traffic.
        </p>
        <Link
          href="/create"
          className="inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
        >
          Post your video
        </Link>
      </motion.div>
    );
  }

  // --- STATE 3: First time (no videos at all) ---
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl p-5 mb-6"
      style={{
        backgroundColor: '#111113',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-sm text-gray-300 mb-3">
        Let&apos;s get your first video out there.
      </p>
      <Link
        href="/create"
        className="inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
        style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
      >
        Create your first video
      </Link>
    </motion.div>
  );
};

export default MomentumBanner;
