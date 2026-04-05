import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Store {
  id: string;
  name: string;
  domain: string;
  /** Optional status indicator */
  status?: 'active' | 'syncing' | 'error';
}

export interface StoreSelectorDropdownProps {
  /** List of stores to display */
  stores: Store[];
  /** Currently selected store ID */
  value: string | null;
  /** Callback when a store is selected */
  onChange: (storeId: string) => void;
  /** Placeholder text when no store is selected */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional className for the root container */
  className?: string;
}

// ─── Status Dot ─────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  active: 'bg-[#00FF94]',
  syncing: 'bg-amber-400 animate-pulse',
  error: 'bg-red-400',
};

function StatusDot({ status }: { status?: Store['status'] }) {
  if (!status) return null;
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColors[status] || ''}`}
      aria-label={status}
    />
  );
}

// ─── Chevron Icon ───────────────────────────────────────────────────────────

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-white/48 flex-shrink-0 transition-transform duration-150 ease-out ${
        open ? 'rotate-180' : ''
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Store Icon (Shopify bag) ───────────────────────────────────────────────

function StoreIcon() {
  return (
    <div className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
      <svg className="w-3.5 h-3.5 text-white/48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-3.75a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75z" />
      </svg>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * StoreSelectorDropdown
 *
 * Dashboard-mode dropdown for selecting a Shopify store.
 * Displays store name + .myshopify.com domain. Linear/Apple clean design.
 *
 * @example
 * ```tsx
 * <StoreSelectorDropdown
 *   stores={[
 *     { id: '1', name: 'Nordic Poster', domain: 'nordicposter.myshopify.com', status: 'active' },
 *     { id: '2', name: 'Glow Nordic', domain: 'glownordic.myshopify.com', status: 'syncing' },
 *   ]}
 *   value={selectedStoreId}
 *   onChange={setSelectedStoreId}
 * />
 * ```
 */
export function StoreSelectorDropdown({
  stores,
  value,
  onChange,
  placeholder = 'Select store',
  disabled = false,
  className = '',
}: StoreSelectorDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [open]);

  const selected = stores.find((s) => s.id === value);

  const handleSelect = (storeId: string) => {
    onChange(storeId);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center gap-2.5 px-3 py-2 rounded-lg
          bg-white/[0.03] border border-white/[0.08]
          text-[13px] text-left
          transition-all duration-150 ease-out
          focus:outline-none focus:border-white/[0.16]
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/[0.14] hover:bg-white/[0.04] cursor-pointer'}
          ${open ? 'border-white/[0.16] bg-white/[0.04]' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <StoreIcon />

        <div className="flex-1 min-w-0">
          {selected ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-white/95 font-medium truncate">{selected.name}</span>
                <StatusDot status={selected.status} />
              </div>
              <div className="text-[11px] text-white/40 truncate mt-0.5">{selected.domain}</div>
            </>
          ) : (
            <span className="text-white/32">{placeholder}</span>
          )}
        </div>

        <ChevronDown open={open} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="
              absolute z-50 left-0 right-0 mt-1
              bg-[#161719] border border-white/[0.08] rounded-lg
              shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)]
              overflow-hidden
            "
            role="listbox"
          >
            {stores.length === 0 ? (
              <div className="px-3 py-4 text-center text-[12px] text-white/32">
                No stores available
              </div>
            ) : (
              <div className="py-1 max-h-[240px] overflow-y-auto scrollbar-none">
                {stores.map((store) => {
                  const isSelected = store.id === value;
                  return (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => handleSelect(store.id)}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2
                        text-left transition-colors duration-100 ease-out
                        ${isSelected
                          ? 'bg-white/[0.06]'
                          : 'hover:bg-white/[0.04]'
                        }
                      `}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <StoreIcon />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13px] font-medium truncate ${isSelected ? 'text-white' : 'text-white/72'}`}>
                            {store.name}
                          </span>
                          <StatusDot status={store.status} />
                        </div>
                        <div className="text-[11px] text-white/32 truncate mt-0.5">
                          {store.domain}
                        </div>
                      </div>

                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-[#00FF94] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
