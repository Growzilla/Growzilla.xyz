import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface StepIndicatorProps {
  /** Total number of steps */
  totalSteps: number;
  /** Current active step (1-based) */
  currentStep: number;
  /** Optional step labels displayed below dots */
  labels?: string[];
  /** Optional className for root container */
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * StepIndicator
 *
 * Minimal progress dots for multi-step flows (1 → 2 → 3 → 4).
 * Shows completed (filled green), active (ring + pulse), and upcoming (muted) states.
 * Dashboard Mode 2 — Linear clean.
 *
 * @example
 * ```tsx
 * <StepIndicator totalSteps={4} currentStep={2} />
 * <StepIndicator
 *   totalSteps={4}
 *   currentStep={2}
 *   labels={['Choose', 'Customize', 'Generate', 'Done']}
 * />
 * ```
 */
export function StepIndicator({
  totalSteps,
  currentStep,
  labels,
  className = '',
}: StepIndicatorProps) {
  return (
    <div className={`flex items-center justify-center gap-0 ${className}`} role="navigation" aria-label="Step progress">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const isUpcoming = stepNum > currentStep;
        const isLast = i === totalSteps - 1;

        return (
          <React.Fragment key={i}>
            {/* Dot + optional label */}
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                {/* Active ring pulse */}
                {isActive && (
                  <span
                    className="absolute w-5 h-5 rounded-full bg-[#00FF94]/20 animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}

                <span
                  className={`
                    relative w-2.5 h-2.5 rounded-full transition-all duration-200 ease-out
                    ${isCompleted ? 'bg-[#00FF94]' : ''}
                    ${isActive ? 'bg-[#00FF94] ring-2 ring-[#00FF94]/30 ring-offset-1 ring-offset-[#0A0A0B]' : ''}
                    ${isUpcoming ? 'bg-white/[0.12]' : ''}
                  `}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${stepNum}${labels?.[i] ? `: ${labels[i]}` : ''}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                />
              </div>

              {labels?.[i] && (
                <span
                  className={`
                    mt-2 text-[11px] font-medium whitespace-nowrap
                    ${isCompleted ? 'text-white/48' : ''}
                    ${isActive ? 'text-white/90' : ''}
                    ${isUpcoming ? 'text-white/24' : ''}
                  `}
                >
                  {labels[i]}
                </span>
              )}
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={`
                  w-8 h-[1px] mx-1.5
                  ${isCompleted ? 'bg-[#00FF94]/40' : 'bg-white/[0.08]'}
                  ${labels ? 'mb-auto mt-[5px]' : ''}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
