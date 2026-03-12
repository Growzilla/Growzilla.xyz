'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Types ---

export interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

interface SetupChecklistProps {
  items: ChecklistItem[]
  onItemClick?: (itemId: string) => void
}

// --- Default items ---

export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'connect_store', label: 'Connect store', completed: true },
  { id: 'add_creator', label: 'Add creator', completed: false },
  { id: 'create_link', label: 'Create link', completed: false },
  { id: 'view_dashboard', label: 'View dashboard', completed: false },
]

export function SetupChecklist({ items, onItemClick }: SetupChecklistProps) {
  const [expanded, setExpanded] = useState(true)
  const [allDone, setAllDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  const completedCount = items.filter((i) => i.completed).length
  const totalCount = items.length
  const progressPct = (completedCount / totalCount) * 100

  // Auto-hide after all complete
  useEffect(() => {
    if (completedCount === totalCount) {
      setAllDone(true)
      const timer = setTimeout(() => setHidden(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [completedCount, totalCount])

  if (hidden) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence mode="wait">
        {!expanded ? (
          // Collapsed pill
          <motion.button
            key="collapsed"
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150"
            style={{
              backgroundColor: '#111113',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#FFFFFF',
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Mini progress ring */}
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <circle
                cx="8" cy="8" r="6" fill="none"
                stroke="#00FF94"
                strokeWidth="2"
                strokeDasharray={`${(completedCount / totalCount) * 37.7} 37.7`}
                strokeLinecap="round"
                transform="rotate(-90 8 8)"
              />
            </svg>
            {completedCount}/{totalCount} complete
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 7.5L6 4.5l3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        ) : (
          // Expanded card
          <motion.div
            key="expanded"
            className="w-64 rounded-lg overflow-hidden"
            style={{
              backgroundColor: '#111113',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="text-xs font-semibold" style={{ color: '#FFFFFF' }}>
                {allDone ? 'All done!' : 'Get started'}
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 5.25L7 8.75l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {completedCount} of {totalCount}
                </span>
                <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {Math.round(progressPct)}%
                </span>
              </div>
              <div className="h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: '#00FF94' }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Checklist items */}
            <div
              className="px-2 pb-2 space-y-0.5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => !item.completed && onItemClick?.(item.id)}
                  className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-left transition-colors duration-150"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  disabled={item.completed}
                >
                  {/* Check circle */}
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                      backgroundColor: item.completed ? 'rgba(0,255,148,0.15)' : 'transparent',
                      border: item.completed ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {item.completed && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="#00FF94" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-xs"
                    style={{
                      color: item.completed ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
                      textDecoration: item.completed ? 'line-through' : 'none',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
