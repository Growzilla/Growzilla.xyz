'use client'

import { motion, AnimatePresence } from 'framer-motion'

/**
 * PhaseChecklist — right-side vertical checklist for an async pipeline.
 * Each item has 3 states (pending / running / complete). Top of card shows
 * elapsed and estimated remaining time.
 */

export type PhaseStatus = 'pending' | 'running' | 'complete' | 'error'

export interface PhaseItem {
  id: string
  label: string
  status: PhaseStatus
  detail?: string
}

export interface PhaseChecklistProps {
  items: PhaseItem[]
  elapsedMs: number
  estimatedRemainingMs: number
  title?: string
  className?: string
}

export function PhaseChecklist({
  items,
  elapsedMs,
  estimatedRemainingMs,
  title = 'Building your report',
  className = '',
}: PhaseChecklistProps) {
  const completed = items.filter((i) => i.status === 'complete').length
  return (
    <div
      className={`rounded-lg p-5 w-full ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-[13px] font-semibold tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.95)', letterSpacing: '0.06em' }}>
          {title}
        </h3>
        <span className="text-[11px] tabular-nums" style={{ color: 'rgba(255,255,255,0.48)' }}>
          {completed}/{items.length}
        </span>
      </div>
      <div className="flex items-baseline gap-3 mb-4 text-[12px] tabular-nums" style={{ color: 'rgba(255,255,255,0.48)' }}>
        <span>Elapsed {fmtDuration(elapsedMs)}</span>
        <span>·</span>
        <span>~{fmtDuration(estimatedRemainingMs)} left</span>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <StatusDot status={item.status} />
            <div className="flex-1 min-w-0">
              <div
                className="text-[13px] leading-snug"
                style={{
                  color:
                    item.status === 'complete'
                      ? 'rgba(255,255,255,0.55)'
                      : item.status === 'running'
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(255,255,255,0.50)',
                  textDecoration: item.status === 'complete' ? 'line-through' : 'none',
                }}
              >
                {item.label}
              </div>
              <AnimatePresence initial={false}>
                {item.detail && item.status === 'running' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-[11px] mt-0.5 truncate"
                    style={{ color: 'rgba(255,255,255,0.40)' }}
                  >
                    {item.detail}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatusDot({ status }: { status: PhaseStatus }) {
  if (status === 'complete') {
    return (
      <motion.span
        initial={{ scale: 0.5, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full"
        style={{ background: '#00FF94', color: '#0A0A0B' }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.span>
    )
  }
  if (status === 'running') {
    return (
      <motion.span
        className="mt-0.5 inline-flex w-4 h-4 rounded-full items-center justify-center"
        style={{ boxShadow: 'inset 0 0 0 1.5px #00FF94' }}
      >
        <motion.span
          className="block w-1.5 h-1.5 rounded-full"
          style={{ background: '#00FF94' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.span>
    )
  }
  if (status === 'error') {
    return (
      <span
        className="mt-0.5 inline-flex w-4 h-4 rounded-full items-center justify-center text-[10px] font-bold"
        style={{ background: 'rgba(244,114,114,0.15)', color: '#F87171' }}
      >!</span>
    )
  }
  return (
    <span
      className="mt-0.5 inline-block w-4 h-4 rounded-full"
      style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)' }}
    />
  )
}

function fmtDuration(ms: number): string {
  if (ms < 1000) return '0s'
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return rem === 0 ? `${m}m` : `${m}m ${rem}s`
}
