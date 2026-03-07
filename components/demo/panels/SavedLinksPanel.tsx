import React from 'react';
import type { UTMLink } from '@/types/smdashboard';
import { formatCurrency, platformColor } from '@/lib/design-tokens';

interface SavedLinksPanelProps {
  links: UTMLink[];
}

const SavedLinksPanel: React.FC<SavedLinksPanelProps> = ({ links }) => {
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <div
          key={link.id}
          className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
              style={{
                backgroundColor: `${platformColor(link.platform)}20`,
                color: platformColor(link.platform),
              }}
            >
              {link.platform.toUpperCase()}
            </span>
            <span className="text-[10px] text-zinc-500">{link.content_type}</span>
            <span
              className={`ml-auto px-1.5 py-0.5 rounded text-[9px] font-mono ${
                link.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              {link.status}
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 mb-1">{link.creator_name}</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-white">
              {formatCurrency(link.total_revenue)}
            </span>
            <span className="text-[10px] text-zinc-600">{link.total_orders} orders</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedLinksPanel;
