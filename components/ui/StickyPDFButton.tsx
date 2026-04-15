'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

/**
 * StickyPDFButton — top-right floating CTA button.
 * Renders via portal to <body> so it can't be clipped by overflow ancestors.
 *
 * - variant="primary"   → solid brand green (#00FF94), black text, pulsing glow
 * - variant="secondary" → zinc-900 fill, green border, green text, no pulse
 * - `href` takes precedence over `onClick` — renders as <a>
 * - `visible=false` returns null (for conditional mount via prop instead of parent unmount)
 */

export type StickyPDFButtonVariant = 'primary' | 'secondary'

export interface StickyPDFButtonProps {
  label?: string
  onClick?: () => void
  href?: string
  variant?: StickyPDFButtonVariant
  visible?: boolean
  loading?: boolean
  icon?: ReactNode
  className?: string
}

export function StickyPDFButton({
  label = 'Download PDF',
  onClick,
  href,
  variant = 'primary',
  visible = true,
  loading = false,
  icon,
  className = '',
}: StickyPDFButtonProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !visible) return null

  const isPrimary = variant === 'primary'
  const leadIcon = loading ? <SpinnerIcon /> : icon ?? <DownloadIcon />
  const textNode = loading ? 'Generating…' : label

  const sharedClass =
    'inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-semibold disabled:cursor-wait disabled:opacity-70'
  const primaryClass = `${sharedClass} text-black`
  const secondaryClass = `${sharedClass} text-[#00FF94]`

  const primaryStyle = { background: '#00FF94' }
  const secondaryStyle = {
    background: 'rgba(17,17,17,0.92)',
    boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.45)',
  }

  const pulseAnim = loading
    ? { scale: 1, boxShadow: '0 0 0 1px rgba(0,255,148,0.3), 0 8px 24px rgba(0,0,0,0.4)' }
    : {
        scale: [1, 1.04, 1],
        boxShadow: [
          '0 0 0 1px rgba(0,255,148,0.3), 0 0 24px rgba(0,255,148,0.18), 0 8px 24px rgba(0,0,0,0.4)',
          '0 0 0 1px rgba(0,255,148,0.6), 0 0 36px rgba(0,255,148,0.32), 0 8px 24px rgba(0,0,0,0.4)',
          '0 0 0 1px rgba(0,255,148,0.3), 0 0 24px rgba(0,255,148,0.18), 0 8px 24px rgba(0,0,0,0.4)',
        ],
      }

  const inner = href ? (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      animate={isPrimary ? pulseAnim : undefined}
      transition={isPrimary ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      whileHover={{ scale: loading ? 1 : 1.06 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      className={isPrimary ? primaryClass : secondaryClass}
      style={isPrimary ? primaryStyle : secondaryStyle}
    >
      {leadIcon}
      <span>{textNode}</span>
    </motion.a>
  ) : (
    <motion.button
      type="button"
      onClick={() => !loading && onClick?.()}
      disabled={loading}
      animate={isPrimary ? pulseAnim : undefined}
      transition={isPrimary ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      whileHover={{ scale: loading ? 1 : 1.06 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      className={isPrimary ? primaryClass : secondaryClass}
      style={isPrimary ? primaryStyle : secondaryStyle}
    >
      {leadIcon}
      <span>{textNode}</span>
    </motion.button>
  )

  const node = <div className={`fixed top-4 right-4 z-50 ${className}`}>{inner}</div>

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
