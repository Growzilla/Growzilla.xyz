import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Step {
  id: string;
  label: string;
  /** Optional description shown below label */
  description?: string;
}

export interface ProgressStepperProps {
  /** Ordered list of steps */
  steps: Step[];
  /** Index of the currently active step (0-based) */
  activeStep: number;
  /** Called when a completed step is clicked (for navigation) */
  onStepClick?: (stepIndex: number) => void;
  /** Optional className for the root container */
  className?: string;
}

// ─── Check Icon ─────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * ProgressStepper
 *
 * Horizontal numbered stepper for onboarding/setup flows.
 * Shows completed (green check), active (green ring), and upcoming (muted) states.
 * Dashboard Mode 2 — Linear clean design.
 *
 * @example
 * ```tsx
 * <ProgressStepper
 *   steps={[
 *     { id: 'connect', label: 'Connect Store' },
 *     { id: 'creators', label: 'Add Creators' },
 *     { id: 'links', label: 'Create Links' },
 *     { id: 'verify', label: 'Verify Setup' },
 *   ]}
 *   activeStep={1}
 *   onStepClick={(i) => setStep(i)}
 * />
 * ```
 */
export function ProgressStepper({
  steps,
  activeStep,
  onStepClick,
  className = '',
}: ProgressStepperProps) {
  return (
    <div className={`flex items-start ${className}`} role="navigation" aria-label="Progress">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isUpcoming = index > activeStep;
        const isClickable = isCompleted && !!onStepClick;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-start flex-1 min-w-0">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center
                  text-[12px] font-semibold
                  transition-all duration-200 ease-out
                  flex-shrink-0
                  ${isCompleted
                    ? 'bg-[#00FF94] cursor-pointer hover:bg-[#00E676]'
                    : ''
                  }
                  ${isActive
                    ? 'bg-transparent border-2 border-[#00FF94] text-[#00FF94]'
                    : ''
                  }
                  ${isUpcoming
                    ? 'bg-white/[0.06] border border-white/[0.08] text-white/32 cursor-default'
                    : ''
                  }
                  ${!isClickable ? 'cursor-default' : ''}
                `}
                aria-current={isActive ? 'step' : undefined}
                tabIndex={isClickable ? 0 : -1}
              >
                {isCompleted ? (
                  <CheckIcon />
                ) : (
                  <span className="tabular-nums">{index + 1}</span>
                )}
              </button>

              {/* Label */}
              <div className="mt-2 text-center max-w-[100px]">
                <div
                  className={`text-[12px] font-medium leading-tight ${
                    isCompleted
                      ? 'text-white/72'
                      : isActive
                        ? 'text-white/95'
                        : 'text-white/32'
                  }`}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-[11px] text-white/32 mt-0.5 leading-tight">
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 flex items-center pt-3.5 px-2 min-w-[24px]">
                <div
                  className={`h-[1px] w-full transition-colors duration-200 ${
                    index < activeStep
                      ? 'bg-[#00FF94]/40'
                      : 'bg-white/[0.08]'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
