import React from 'react';
import { motion } from 'framer-motion';
import type { UTMLink } from '@/types/smdashboard';
import { formatCurrency, platformColor, tw } from '@/lib/design-tokens';

interface LinksViewProps {
  links: UTMLink[];
  onCreateLink: () => void;
  onViewSavedLinks: () => void;
}

const LinksView: React.FC<LinksViewProps> = ({ links, onCreateLink, onViewSavedLinks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col p-4 overflow-hidden"
    >
      {/* Header with actions */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-500 font-mono">{links.length} links</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onViewSavedLinks}
            className="px-3 py-1.5 rounded-md text-[11px] font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
          >
            Saved Links
          </button>
          <button
            onClick={onCreateLink}
            className="px-3 py-1.5 rounded-md text-[11px] font-semibold text-[#09090B] bg-[#00FF94] hover:bg-[#00E676] transition-colors"
          >
            + Create Link
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`${tw.card} flex-1 min-h-0 overflow-hidden`}>
        {/* Table header */}
        <div className="grid grid-cols-[1fr_100px_100px_80px_80px_80px] gap-3 px-4 py-2.5 border-b border-white/[0.06]">
          {['Creator', 'Platform', 'Type', 'Revenue', 'Orders', 'Status'].map((h) => (
            <span key={h} className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">
              {h}
            </span>
          ))}
        </div>

        {/* Table rows */}
        <div className="overflow-hidden">
          {links.map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="grid grid-cols-[1fr_100px_100px_80px_80px_80px] gap-3 px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
            >
              {/* Creator */}
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{link.creator_name}</p>
                <p className="text-[10px] text-zinc-600 truncate">@{link.creator_username}</p>
              </div>

              {/* Platform */}
              <div className="flex items-center">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                  style={{
                    backgroundColor: `${platformColor(link.platform)}20`,
                    color: platformColor(link.platform),
                  }}
                >
                  {link.platform}
                </span>
              </div>

              {/* Type */}
              <span className="text-[11px] text-zinc-400 flex items-center">{link.content_type}</span>

              {/* Revenue */}
              <span className="text-[12px] font-mono font-semibold text-white flex items-center">
                {formatCurrency(link.total_revenue)}
              </span>

              {/* Orders */}
              <span className="text-[12px] font-mono text-zinc-300 flex items-center">
                {link.total_orders}
              </span>

              {/* Status */}
              <div className="flex items-center">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    link.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {link.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LinksView;
