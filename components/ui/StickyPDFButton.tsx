'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

/**
 * StickyPDFButton — top-right floating "Download PDF" button with green glow.
 * Pulses every 4s. Renders via portal to <body> so it can't be clipped.
 */

export interface StickyPDFButtonProps {
  jobId: string
  onClick: (jobId: string) => void
  loading?: boolean
  label?: string
  className?: string
}

export function StickyPDFButton({
  jobId,
  onClick,
  loading = false,
  label = 'Download PDF',
  className = '',
}: StickyPDFButtonProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const node = (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <motion.button
        type="button"
        onClick={() => !loading && onClick(jobId)}
        disabled={loading}
        animate={{
          scale: loading ? 1 : [1, 1.04, 1],
          boxShadow: loading
            ? '0 0 0 1px rgba(0,255,148,0.3), 0 8px 24px rgba(0,0,0,0.4)'
            : [
                '0 0 0 1px rgba(0,255,148,0.3), 0 0 24px rgba(0,255,148,0.18), 0 8px 24px rgba(0,0,0,0.4)',
                '0 0 0 1px rgba(0,255,148,0.6), 0 0 36px rgba(0,255,148,0.32), 0 8px 24px rgba(0,0,0,0.4)',
                '0 0 0 1px rgba(0,255,148,0.3), 0 0 24px rgba(0,255,148,0.18), 0 8px 24px rgba(0,0,0,0.4)',
              ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: loading ? 1 : 1.06 }}
        whileTap={{ scale: loading ? 1 : 0.97 }}
        className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-semibold text-black disabled:cursor-wait disabled:opacity-70"
        style={{ background: '#00FF94' }}
      >
        {loading ? <SpinnerIcon /> : <DownloadIcon />}
        <span>{loading ? 'Generating…' : label}</span>
      </motion.button>
    </div>
  )

  return createPortal(node, document.body)
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <motion.circle
        cx="12" cy="12" r="9" strokeDasharray="42 14"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
}
