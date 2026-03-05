'use client';

import React from 'react';
import type { AttributionChannel } from '@/types/whop';

type ChannelFilter = 'all' | AttributionChannel;

interface ChannelTabsProps {
  value: ChannelFilter;
  onChange: (channel: ChannelFilter) => void;
}

const TABS: { id: ChannelFilter; label: string }[] = [
  { id: 'all', label: 'All Channels' },
  { id: 'meta', label: 'Meta' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'google', label: 'Google' },
  { id: 'organic', label: 'Organic' },
  { id: 'email', label: 'Email' },
  { id: 'referral', label: 'Referral' },
];

const CHANNEL_COLORS: Record<ChannelFilter, string> = {
  all: 'text-zilla-neon border-zilla-neon bg-zilla-neon/10',
  meta: 'text-blue-400 border-blue-400 bg-blue-400/10',
  tiktok: 'text-cyan-400 border-cyan-400 bg-cyan-400/10',
  google: 'text-blue-500 border-blue-500 bg-blue-500/10',
  organic: 'text-emerald-400 border-emerald-400 bg-emerald-400/10',
  email: 'text-amber-400 border-amber-400 bg-amber-400/10',
  referral: 'text-pink-400 border-pink-400 bg-pink-400/10',
};

const ChannelTabs: React.FC<ChannelTabsProps> = ({ value, onChange }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-1">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${
          value === tab.id
            ? CHANNEL_COLORS[tab.id]
            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default ChannelTabs;
