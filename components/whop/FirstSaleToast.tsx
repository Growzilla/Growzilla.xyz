import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FirstSaleToastProps {
  /** UTM link ID to poll for conversions */
  linkId: string | null;
  /** Called when toast is dismissed or auto-hidden */
  onDismiss?: () => void;
}

interface ConversionData {
  revenue: number;
  product_name: string;
  platform: string;
  content_type: string;
}

const API_BASE = process.env.NEXT_PUBLIC_ECOMDASH_API_URL || process.env.ECOMDASH_API_URL || '';

/**
 * FirstSaleToast — Polls for first conversion after link creation.
 * Shows a celebratory toast notification when a sale is attributed.
 * Auto-dismisses after 8 seconds. Stops polling after 30 minutes.
 */
const FirstSaleToast: React.FC<FirstSaleToastProps> = ({ linkId, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const [conversion, setConversion] = useState<ConversionData | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAtRef = useRef<string | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    stopPolling();
    onDismiss?.();
  }, [stopPolling, onDismiss]);

  // Start polling when linkId is provided
  useEffect(() => {
    if (!linkId) return;

    startedAtRef.current = new Date().toISOString();
    const maxPollMs = 30 * 60 * 1000; // 30 minutes
    const pollIntervalMs = 10 * 1000; // 10 seconds

    const checkConversions = async () => {
      try {
        const since = startedAtRef.current;
        const token = typeof window !== 'undefined' ? localStorage.getItem('gz_token') : null;
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(
          `${API_BASE}/api/utm/links/${linkId}/stats`,
          { headers }
        );

        if (!res.ok) return;

        const data = await res.json();

        // Check if there are any conversions since we started polling
        const conversions = data.conversions || [];
        const recentConversion = conversions.find(
          (c: { created_at?: string }) => !since || (c.created_at && c.created_at > since)
        );

        if (recentConversion || (data.total_orders && data.total_orders > 0)) {
          setConversion({
            revenue: recentConversion?.revenue || data.total_revenue || 0,
            product_name: recentConversion?.product_name || data.product_name || 'your product',
            platform: data.platform || 'Social',
            content_type: data.content_type || 'post',
          });
          setVisible(true);
          stopPolling();

          // Auto-dismiss after 8 seconds
          timeoutRef.current = setTimeout(() => {
            dismiss();
          }, 8000);
        }
      } catch {
        // Silently ignore polling errors
      }
    };

    // Start polling
    pollingRef.current = setInterval(checkConversions, pollIntervalMs);

    // Also check immediately
    checkConversions();

    // Stop after 30 minutes
    const maxTimeout = setTimeout(() => {
      stopPolling();
    }, maxPollMs);

    return () => {
      stopPolling();
      clearTimeout(maxTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [linkId, stopPolling, dismiss]);

  const platformLabel = conversion
    ? `${conversion.platform.charAt(0).toUpperCase() + conversion.platform.slice(1)} ${conversion.content_type}`
    : '';

  const revenueFormatted = conversion
    ? `$${(conversion.revenue / 100).toFixed(2)}`
    : '';

  return (
    <AnimatePresence>
      {visible && conversion && (
        <motion.div
          initial={{ opacity: 0, x: 80, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-6 right-6 z-[200] max-w-sm"
        >
          <div
            className="rounded-xl p-4 backdrop-blur-sm"
            style={{
              backgroundColor: '#151518',
              border: '1px solid rgba(0,255,148,0.3)',
              boxShadow: '0 0 30px rgba(0,255,148,0.08)',
            }}
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Celebration icon */}
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}
              >
                <span className="text-lg">🎉</span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-semibold text-white leading-snug">
                  Your {platformLabel} generated its first sale!
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="text-lg font-bold font-mono"
                    style={{ color: '#00FF94' }}
                  >
                    {revenueFormatted}
                  </span>
                  <span className="text-xs text-zinc-500 truncate">
                    {conversion.product_name}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar for auto-dismiss */}
            <motion.div
              className="mt-3 h-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(0,255,148,0.3)' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 8, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstSaleToast;
