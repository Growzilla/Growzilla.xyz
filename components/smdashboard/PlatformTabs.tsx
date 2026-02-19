import React from 'react';

interface PlatformTabsProps {
  value: string; // 'all' | 'instagram' | 'tiktok' | 'youtube'
  onChange: (platform: string) => void;
}

const TABS = [
  { id: 'all', label: 'All Platforms', icon: null },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.81a8.23 8.23 0 004.76 1.5V6.88a4.84 4.84 0 01-1-.19z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  all: 'text-zilla-neon border-zilla-neon bg-zilla-neon/10',
  instagram: 'text-pink-400 border-pink-400 bg-pink-400/10',
  tiktok: 'text-cyan-400 border-cyan-400 bg-cyan-400/10',
  youtube: 'text-red-400 border-red-400 bg-red-400/10',
};

const PlatformTabs: React.FC<PlatformTabsProps> = ({ value, onChange }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-1">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${
          value === tab.id
            ? PLATFORM_COLORS[tab.id]
            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
        }`}
      >
        {tab.icon}
        {tab.label}
      </button>
    ))}
  </div>
);

export default PlatformTabs;
