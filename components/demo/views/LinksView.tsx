import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UTMLink } from '@/types/smdashboard';
import { formatCurrency, platformColor, tw } from '@/lib/design-tokens';

// ─── Link Detail Panel (inline expand) ──────────────────────────────────────

interface LinkDetailProps {
  link: UTMLink;
  onClose: () => void;
  onUpdateContentUrl: (linkId: string, url: string) => void;
}

const LinkDetail: React.FC<LinkDetailProps> = ({ link, onClose, onUpdateContentUrl }) => {
  const [contentUrl, setContentUrl] = useState(link.content_post_url || '');
  const [saved, setSaved] = useState(false);

  function handleSaveUrl() {
    onUpdateContentUrl(link.id, contentUrl.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(link.full_url).catch(() => {});
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="px-4 py-4 bg-white/[0.01] border-t border-white/[0.04]">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider block mb-1">Revenue</span>
            <span className="text-lg font-mono font-bold text-white">{formatCurrency(link.total_revenue)}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider block mb-1">Orders</span>
            <span className="text-lg font-mono font-bold text-white">{link.total_orders}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider block mb-1">AOV</span>
            <span className="text-lg font-mono font-bold text-white">
              {link.total_orders > 0 ? formatCurrency(link.total_revenue / link.total_orders) : '$0'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider block mb-1">Created</span>
            <span className="text-[12px] font-mono text-zinc-300">
              {new Date(link.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Tracking URL (copyable) */}
        <div className="mb-4">
          <label className="text-[10px] text-zinc-600 uppercase tracking-wider block mb-1.5">Tracking URL</label>
          <div className="flex gap-2">
            <div className="flex-1 p-2 rounded-md bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              <p className="text-[10px] text-zinc-400 font-mono truncate select-all">{link.full_url}</p>
            </div>
            <button onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-md text-[10px] font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors flex-shrink-0">
              Copy
            </button>
          </div>
        </div>

        {/* Content Post URL — connect to actual published content */}
        <div className="mb-3">
          <label className="text-[10px] text-zinc-600 uppercase tracking-wider block mb-1.5">
            Content Post URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30 font-mono"
              placeholder="https://tiktok.com/@creator/video/..."
            />
            <button onClick={handleSaveUrl}
              className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-colors flex-shrink-0 ${
                saved
                  ? 'bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30'
                  : 'bg-[#00FF94] text-[#09090B] hover:bg-[#00E676]'
              }`}>
              {saved ? 'Saved!' : 'Save'}
            </button>
          </div>
          <p className="text-[9px] text-zinc-600 mt-1">Connect this tracking link to the published content for attribution</p>
        </div>

        {/* Current content link if exists */}
        {link.content_post_url && (
          <div className="flex items-center gap-2 p-2 rounded-md bg-white/[0.02] border border-white/[0.04]">
            <svg className="w-3 h-3 text-[#00FF94] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a href={link.content_post_url} target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-zinc-400 font-mono truncate hover:text-[#00FF94] transition-colors">
              {link.content_post_url}
            </a>
          </div>
        )}

        <button onClick={onClose}
          className="mt-3 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">
          Close details
        </button>
      </div>
    </motion.div>
  );
};

// ─── Main Links View ────────────────────────────────────────────────────────

interface LinksViewProps {
  links: UTMLink[];
  onCreateLink: () => void;
  onViewSavedLinks: () => void;
}

const LinksView: React.FC<LinksViewProps> = ({ links, onCreateLink, onViewSavedLinks }) => {
  const [expandedLinkId, setExpandedLinkId] = useState<string | null>(null);

  function handleUpdateContentUrl(linkId: string, url: string) {
    // In demo mode, this just updates UI state
    // In production, would call PATCH /api/utm/links/{id}
    const link = links.find((l) => l.id === linkId);
    if (link) link.content_post_url = url || null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col p-4 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-500 font-mono">{links.length} links</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onViewSavedLinks}
            className="px-3 py-1.5 rounded-md text-[11px] font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
            Saved Links
          </button>
          <button onClick={onCreateLink}
            className="px-3 py-1.5 rounded-md text-[11px] font-semibold text-[#09090B] bg-[#00FF94] hover:bg-[#00E676] transition-colors">
            + Create Link
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`${tw.card} flex-1 min-h-0 overflow-auto`}>
        {/* Table header */}
        <div className="grid grid-cols-[1fr_100px_100px_80px_80px_80px] gap-3 px-4 py-2.5 border-b border-white/[0.06] sticky top-0 bg-[#09090B]">
          {['Creator', 'Platform', 'Type', 'Revenue', 'Orders', 'Status'].map((h) => (
            <span key={h} className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">{h}</span>
          ))}
        </div>

        {/* Table rows */}
        <div>
          {links.map((link, i) => (
            <div key={link.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => setExpandedLinkId(expandedLinkId === link.id ? null : link.id)}
                className={`grid grid-cols-[1fr_100px_100px_80px_80px_80px] gap-3 px-4 py-3 border-b border-white/[0.03] cursor-pointer transition-colors ${
                  expandedLinkId === link.id ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{link.creator_name}</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[10px] text-zinc-600 truncate">@{link.creator_username}</p>
                    {link.content_post_url && (
                      <svg className="w-2.5 h-2.5 text-[#00FF94] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                    style={{ backgroundColor: `${platformColor(link.platform)}20`, color: platformColor(link.platform) }}>
                    {link.platform}
                  </span>
                </div>

                <span className="text-[11px] text-zinc-400 flex items-center">{link.content_type}</span>

                <span className="text-[12px] font-mono font-semibold text-white flex items-center">
                  {formatCurrency(link.total_revenue)}
                </span>

                <span className="text-[12px] font-mono text-zinc-300 flex items-center">{link.total_orders}</span>

                <div className="flex items-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    link.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {link.status}
                  </span>
                </div>
              </motion.div>

              {/* Expandable detail */}
              <AnimatePresence>
                {expandedLinkId === link.id && (
                  <LinkDetail
                    link={link}
                    onClose={() => setExpandedLinkId(null)}
                    onUpdateContentUrl={handleUpdateContentUrl}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LinksView;
