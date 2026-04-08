import React from 'react';
import { motion } from 'framer-motion';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface VibeOption {
  id: string;
  /** Main title */
  label: string;
  /** Short description */
  description: string;
  /** Emoji or icon character displayed large */
  icon: string;
}

export interface VibeSelectorProps {
  /** Options to display as large clickable cards */
  options: VibeOption[];
  /** Currently selected option ID */
  value: string | null;
  /** Callback when an option is selected */
  onChange: (id: string) => void;
  /** Optional className for root container */
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * VibeSelector
 *
 * 3 large clickable cards for choosing a "vibe" / style / category.
 * Each card shows an icon/emoji, title, and description.
 * Selected card gets green border + subtle green tint.
 * Dashboard Mode 2 — Linear clean.
 *
 * @example
 * ```tsx
 * <VibeSelector
 *   options={[
 *     { id: 'minimal', label: 'Minimal', description: 'Clean and simple tracking link', icon: '✨' },
 *     { id: 'branded', label: 'Branded', description: 'Custom UTM with your brand name', icon: '🏷️' },
 *     { id: 'advanced', label: 'Advanced', description: 'Full attribution with hook/meat/CTA', icon: '🔬' },
 *   ]}
 *   value={selectedVibe}
 *   onChange={setSelectedVibe}
 * />
 * ```
 */
export function VibeSelector({
  options,
  value,
  onChange,
  className = '',
}: VibeSelectorProps) {
  return (
    <div
      className={`grid gap-3 ${
        options.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
        options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        'grid-cols-1'
      } ${className}`}
      role="radiogroup"
    >
      {options.map((option) => {
        const isSelected = option.id === value;

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className={`
              relative flex flex-col items-center text-center
              px-5 py-6 rounded-lg
              border transition-all duration-150 ease-out
              focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF94]/40
              ${isSelected
                ? 'bg-[#00FF94]/[0.06] border-[#00FF94]/40'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.04]'
              }
            `}
            role="radio"
            aria-checked={isSelected}
          >
            {/* Icon */}
            <span className="text-3xl mb-3 select-none" aria-hidden="true">
              {option.icon}
            </span>

            {/* Label */}
            <span
              className={`text-[14px] font-semibold mb-1 ${
                isSelected ? 'text-white' : 'text-white/80'
              }`}
            >
              {option.label}
            </span>

            {/* Description */}
            <span
              className={`text-[12px] leading-relaxed ${
                isSelected ? 'text-white/56' : 'text-white/36'
              }`}
            >
              {option.description}
            </span>

            {/* Selected check */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#00FF94] flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
