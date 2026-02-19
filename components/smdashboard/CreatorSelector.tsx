import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import type { Creator } from '@/types/smdashboard';

interface CreatorSelectorProps {
  creators: Creator[];
  selectedCreatorId: string | null; // null = "All Creators" (org view)
  onChange: (creatorId: string | null) => void;
}

const CreatorSelector: React.FC<CreatorSelectorProps> = ({
  creators,
  selectedCreatorId,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = selectedCreatorId
    ? creators.find((c) => c.id === selectedCreatorId)
    : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border border-white/10 bg-zilla-surface hover:bg-white/5 transition-colors text-sm min-h-[44px]"
      >
        {selected ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.avatar} alt={selected.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-white font-medium">{selected.name}</span>
          </>
        ) : (
          <>
            <UserGroupIcon className="w-5 h-5 text-zilla-neon" />
            <span className="text-white font-medium">All Creators</span>
          </>
        )}
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-[calc(100vw-3rem)] sm:w-64 max-w-64 rounded-xl border border-white/10 bg-zilla-dark/95 backdrop-blur-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            {/* All Creators option */}
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                !selectedCreatorId ? 'bg-zilla-neon/10 text-zilla-neon' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <UserGroupIcon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">All Creators</div>
                <div className="text-xs text-gray-500">Org overview</div>
              </div>
            </button>

            <div className="h-px bg-white/5" />

            {/* Individual creators */}
            {creators.map((c) => (
              <button
                key={c.id}
                onClick={() => { onChange(c.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  selectedCreatorId === c.id ? 'bg-zilla-neon/10 text-zilla-neon' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                <div className="text-left min-w-0">
                  <div className="font-medium truncate">{c.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{c.handle}</div>
                </div>
                <span className="ml-auto text-xs font-mono text-gray-500">
                  ${(c.totalRevenue / 1000).toFixed(1)}K
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorSelector;
