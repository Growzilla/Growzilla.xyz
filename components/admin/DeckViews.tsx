import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, ClockIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface DeckSession {
  viewer: string | null;
  ipHash: string;
  firstSeen: string;
  lastSeen: string;
  slides: string[];
  userAgent: string;
  referrer: string;
}

interface DeckStats {
  totalViews: number;
  uniqueVisitors: number;
  sessions: DeckSession[];
}

interface DeckSubmission {
  id: string;
  store: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function getDevice(ua: string): string {
  if (/mobile|android|iphone/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

export default function DeckViews() {
  const [stats, setStats] = useState<DeckStats | null>(null);
  const [submissions, setSubmissions] = useState<DeckSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/deck/track').then((r) => r.json()).catch(() => null),
      fetch('/api/deck/submit').then((r) => r.json()).catch(() => ({ submissions: [] })),
    ]).then(([trackData, submitData]) => {
      if (trackData) setStats(trackData);
      if (submitData?.submissions) setSubmissions(submitData.submissions);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-zilla-surface rounded w-48" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-zilla-surface rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const hasViews = stats && stats.totalViews > 0;
  const hasSubmissions = submissions.length > 0;

  if (!hasViews && !hasSubmissions) {
    return (
      <div className="text-center py-12">
        <EyeIcon className="w-10 h-10 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400 text-sm">No deck activity yet</p>
        <p className="text-gray-600 text-xs mt-1 font-mono">Share growzilla.xyz/deck?viewer=name to start tracking</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
        <EyeIcon className="w-5 h-5 text-zilla-shopify" />
        Deck Activity
      </h3>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-zilla p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Page Views</p>
          <p className="text-2xl font-bold text-white font-mono mt-1">{stats?.totalViews || 0}</p>
        </div>
        <div className="card-zilla p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Unique Visitors</p>
          <p className="text-2xl font-bold text-white font-mono mt-1">{stats?.uniqueVisitors || 0}</p>
        </div>
        <div className="card-zilla p-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Form Submissions</p>
          <p className="text-2xl font-bold text-white font-mono mt-1">{submissions.length}</p>
        </div>
      </div>

      {/* Submissions */}
      {hasSubmissions && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Submissions</p>
          {submissions.slice().reverse().map((sub) => (
            <div key={sub.id} className="card-zilla p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-zilla-shopify" />
                  <span className="text-sm font-medium text-white">{sub.name}</span>
                  <span className="text-xs text-gray-500">{sub.email}</span>
                </div>
                <span className="text-xs text-gray-500">{timeAgo(sub.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-300 font-mono">{sub.store}.myshopify.com</p>
              {sub.message && (
                <p className="text-sm text-gray-400 italic">{sub.message}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Visitor sessions */}
      {hasViews && stats && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Visitors</p>
          {stats.sessions.slice(0, 15).map((session, i) => (
            <motion.div
              key={session.ipHash + session.firstSeen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="card-zilla p-4 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {session.viewer ? (
                    <span className="text-sm font-medium text-white">{session.viewer}</span>
                  ) : (
                    <span className="text-sm text-gray-500">Anonymous</span>
                  )}
                  <span className="text-[10px] font-mono text-gray-600">{session.ipHash}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <ClockIcon className="w-3 h-3" />
                  {timeAgo(session.lastSeen)}
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <DevicePhoneMobileIcon className="w-3 h-3" />
                  {getDevice(session.userAgent)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
