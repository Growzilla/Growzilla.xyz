'use client';

import React, { useEffect, useState } from 'react';

interface FirstSaleToastProps {
  platform: string;
  contentType: string;
  revenue: string;
  productName: string;
  onDismiss: () => void;
}

const FirstSaleToast: React.FC<FirstSaleToastProps> = ({
  platform,
  contentType,
  revenue,
  productName,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in
    const showTimer = setTimeout(() => setVisible(true), 50);
    // Auto-dismiss after 8 seconds
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300); // Wait for slide-out animation
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      className="fixed top-6 right-6 z-[200] max-w-sm"
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 300ms ease-out, opacity 300ms ease-out',
      }}
    >
      <div
        className="rounded-xl p-4 shadow-2xl"
        style={{
          backgroundColor: '#151518',
          border: '1px solid rgba(0,255,148,0.3)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Celebration icon */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.4l-4.33 2.1.83-4.82L3 7.27l4.91-1.01L10 2z"
                fill="#00FF94"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">First Sale!</p>
            <p className="text-[11px] text-zinc-400">
              Your {platform} {contentType} generated its first sale!
            </p>
          </div>
        </div>

        {/* Revenue + product */}
        <div
          className="rounded-lg px-3 py-2.5 flex items-center justify-between"
          style={{ backgroundColor: 'rgba(0,255,148,0.05)', border: '1px solid rgba(0,255,148,0.15)' }}
        >
          <span className="text-[13px] text-zinc-300 truncate max-w-[180px]">{productName}</span>
          <span className="text-lg font-mono font-bold" style={{ color: '#00FF94' }}>
            {revenue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FirstSaleToast;
