'use client';

import { ReactNode } from 'react';

interface StepLayoutProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  children: ReactNode;
  onBack?: () => void;
  primaryCta?: { label: string; onClick: () => void; disabled?: boolean; loading?: boolean };
}

export default function StepLayout({
  eyebrow,
  heading,
  subheading,
  children,
  onBack,
  primaryCta,
}: StepLayoutProps) {
  return (
    <div className="w-full">
      {eyebrow && (
        <div className="mb-4 text-[11px] font-mono uppercase tracking-[0.22em] text-zilla-neon">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-[28px] sm:text-[36px] leading-[1.08] text-white tracking-tight">
        {heading}
      </h1>
      {subheading && (
        <p className="mt-3 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-xl">
          {subheading}
        </p>
      )}
      <div className="mt-8 sm:mt-10">{children}</div>
      {(onBack || primaryCta) && (
        <div className="mt-10 flex items-center gap-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-white/55 hover:text-white transition-colors px-4 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zilla-neon/60"
            >
              Back
            </button>
          )}
          {primaryCta && (
            <button
              type="button"
              onClick={primaryCta.onClick}
              disabled={primaryCta.disabled || primaryCta.loading}
              className="ml-auto inline-flex items-center gap-2 bg-zilla-neon text-zilla-black font-medium text-sm rounded-md px-6 py-3 hover:bg-zilla-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-zilla-neon/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {primaryCta.loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending…
                </>
              ) : (
                primaryCta.label
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
