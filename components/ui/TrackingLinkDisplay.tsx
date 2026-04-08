import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TrackingLinkDisplayProps {
  /** The full tracking URL to display */
  url: string;
  /** Optional label above the link */
  label?: string;
  /** Optional short alias shown before the full URL */
  shortLabel?: string;
  /** Duration in ms to show "Copied!" feedback (default: 2000) */
  feedbackDuration?: number;
  /** Optional className for root container */
  className?: string;
}

// ─── Icons ──────────────────────────────────────────────────────────────────

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-white/32 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * TrackingLinkDisplay
 *
 * Displays a generated tracking link with a copy-to-clipboard button.
 * Shows "Copied!" feedback with green check animation.
 * Dashboard Mode 2 — Linear clean.
 *
 * @example
 * ```tsx
 * <TrackingLinkDisplay
 *   url="https://mystore.com/products/hoodie?utm_source=tiktok&utm_medium=creator&utm_campaign=spring"
 *   label="Your tracking link"
 * />
 * ```
 */
export function TrackingLinkDisplay({
  url,
  label,
  shortLabel,
  feedbackDuration = 2000,
  className = '',
}: TrackingLinkDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), feedbackDuration);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), feedbackDuration);
    }
  }, [url, feedbackDuration]);

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-[11px] text-white/48 uppercase tracking-wider font-medium mb-1.5">
          {label}
        </label>
      )}

      {/* Link container */}
      <div className="flex items-stretch rounded-lg border border-white/[0.08] bg-white/[0.03] overflow-hidden">
        {/* URL display */}
        <div className="flex-1 flex items-center gap-2 px-3 py-2.5 min-w-0 overflow-hidden">
          <LinkIcon />

          <div className="flex-1 min-w-0">
            {shortLabel && (
              <div className="text-[11px] text-white/40 mb-0.5 truncate">{shortLabel}</div>
            )}
            <div
              className="text-[13px] text-white/72 font-mono truncate select-all"
              title={url}
            >
              {url}
            </div>
          </div>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`
            flex items-center gap-1.5 px-4
            border-l border-white/[0.08]
            text-[12px] font-medium
            transition-all duration-150 ease-out
            focus:outline-none
            ${copied
              ? 'bg-[#00FF94]/[0.08] text-[#00FF94]'
              : 'bg-white/[0.02] text-white/56 hover:bg-white/[0.06] hover:text-white/80'
            }
          `}
          aria-label={copied ? 'Copied to clipboard' : 'Copy link to clipboard'}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5"
              >
                <CheckIcon />
                <span>Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5"
              >
                <CopyIcon />
                <span>Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
