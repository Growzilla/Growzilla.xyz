'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UTMLink } from '@/types/smdashboard';
import LinkCard from './LinkCard';

interface SavedLinksSidebarProps {
  open: boolean;
  onClose: () => void;
  onCreateNew: () => void;
  links: UTMLink[];
  loading: boolean;
}

const sidebarVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-4 w-14 rounded-full bg-white/10" />
      </div>
      <div className="h-3 w-40 rounded bg-white/5" />
      <div className="h-3 w-24 rounded bg-white/5" />
      <div className="h-4 w-44 rounded bg-white/10" />
    </div>
  );
}

const SavedLinksSidebar: React.FC<SavedLinksSidebarProps> = ({
  open,
  onClose,
  onCreateNew,
  links,
  loading,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sidebar-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.aside
            key="sidebar-panel"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full z-40 w-80 sm:w-96 bg-[#0A0A0B]/95 backdrop-blur-xl border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
              <h2 className="font-display font-bold text-lg text-white">
                Saved Links
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={onCreateNew}
                  className="rounded-lg bg-[#00FF94] text-[#0A0A0B] px-3 py-1.5 text-sm font-medium hover:brightness-110 transition-all"
                >
                  +
                </button>

                <button
                  onClick={onClose}
                  className="rounded-lg border border-white/10 p-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close sidebar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading && (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}

              {!loading && links.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <span className="text-3xl mb-3">{'\u{1F517}'}</span>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    No links yet. Create your first tracking link!
                  </p>
                </div>
              )}

              {!loading &&
                links.length > 0 &&
                links.map((link, i) => (
                  <LinkCard key={link.id} link={link} index={i} />
                ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SavedLinksSidebar;
