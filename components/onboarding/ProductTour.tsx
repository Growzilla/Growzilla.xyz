'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Types ---

export interface TourStep {
  /** CSS selector for the target element to spotlight */
  target: string
  /** Headline shown in tooltip */
  title: string
  /** Body copy (1-2 lines max) */
  copy: string
  /** Optional interactive prompt (e.g., "Try hovering a path →") */
  prompt?: string
  /** What counts as user interaction for this step */
  interactionEvent?: string
}

interface ProductTourProps {
  steps: TourStep[]
  onComplete: () => void
  onSkip: (skippedAtStep: number) => void
  /** Called per step with interaction data */
  onStepChange?: (step: number, stepName: string, interacted: boolean) => void
}

interface SpotlightRect {
  top: number
  left: number
  width: number
  height: number
  borderRadius: number
}

function getElementRect(selector: string): SpotlightRect | null {
  const el = document.querySelector(selector)
  if (!el) return null
  const rect = el.getBoundingClientRect()
  const style = window.getComputedStyle(el)
  const borderRadius = parseInt(style.borderRadius) || 8
  const padding = 8
  return {
    top: rect.top - padding,
    left: rect.left - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
    borderRadius: borderRadius + 4,
  }
}

function getTooltipPosition(rect: SpotlightRect): { top: number; left: number; placement: 'above' | 'below' } {
  const tooltipHeight = 140
  const tooltipWidth = 320
  const gap = 12
  const viewportH = window.innerHeight
  const viewportW = window.innerWidth

  // Prefer below, fall back to above
  const spaceBelow = viewportH - (rect.top + rect.height)
  const placement = spaceBelow > tooltipHeight + gap ? 'below' : 'above'

  const top =
    placement === 'below'
      ? rect.top + rect.height + gap
      : rect.top - tooltipHeight - gap

  // Center horizontally on the target, clamped to viewport
  let left = rect.left + rect.width / 2 - tooltipWidth / 2
  left = Math.max(16, Math.min(left, viewportW - tooltipWidth - 16))

  return { top, left, placement }
}

export function ProductTour({ steps, onComplete, onSkip, onStepChange }: ProductTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null)
  const [interacted, setInteracted] = useState(false)
  const interactedRef = useRef(false)

  const step = steps[currentStep]

  // Measure and position spotlight
  const measure = useCallback(() => {
    if (!step) return
    const rect = getElementRect(step.target)
    if (rect) {
      setSpotlight(rect)
      setTooltipPos(getTooltipPosition(rect))
    }
  }, [step])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [measure])

  // Track interaction events on target element
  useEffect(() => {
    const eventName = step?.interactionEvent
    if (!eventName) return
    const el = document.querySelector(step.target)
    if (!el) return

    const handler = () => {
      setInteracted(true)
      interactedRef.current = true
    }

    el.addEventListener(eventName, handler)
    return () => el.removeEventListener(eventName, handler)
  }, [step])

  const next = useCallback(() => {
    onStepChange?.(currentStep, step?.title ?? '', interactedRef.current)

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
      setInteracted(false)
      interactedRef.current = false
    } else {
      onComplete()
    }
  }, [currentStep, steps.length, step, onComplete, onStepChange])

  const handleSkip = useCallback(() => {
    onSkip(currentStep)
  }, [currentStep, onSkip])

  if (!spotlight || !tooltipPos) return null

  // Build clip-path to create spotlight cutout
  const clipPath = `polygon(
    0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
    ${spotlight.left}px ${spotlight.top}px,
    ${spotlight.left}px ${spotlight.top + spotlight.height}px,
    ${spotlight.left + spotlight.width}px ${spotlight.top + spotlight.height}px,
    ${spotlight.left + spotlight.width}px ${spotlight.top}px,
    ${spotlight.left}px ${spotlight.top}px
  )`

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop with cutout */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          clipPath,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Spotlight ring (border around cutout) */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          top: spotlight.top,
          left: spotlight.left,
          width: spotlight.width,
          height: spotlight.height,
        }}
        style={{
          borderRadius: spotlight.borderRadius,
          border: '1px solid rgba(0,255,148,0.3)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute w-80"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: '#111113',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Title */}
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: '#FFFFFF' }}
            >
              {step.title}
            </p>

            {/* Copy */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {step.copy}
            </p>

            {/* Interactive prompt */}
            {step.prompt && (
              <p
                className="text-xs font-medium mt-2"
                style={{ color: interacted ? '#00FF94' : 'rgba(0,255,148,0.6)' }}
              >
                {interacted ? '✓ Nice!' : step.prompt}
              </p>
            )}

            {/* Footer: counter + actions */}
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {currentStep + 1} of {steps.length}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSkip}
                  className="text-xs transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Skip tour
                </button>
                <button
                  onClick={next}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
                  style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                >
                  {currentStep < steps.length - 1 ? 'Next' : 'Done'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// --- Default Growzilla tour steps ---

export const GROWZILLA_TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="revenue-overview"]',
    title: 'This is your revenue overview',
    copy: 'All your creator-driven revenue in one place. Numbers update as orders come in.',
  },
  {
    target: '[data-tour="sankey-diagram"]',
    title: 'See where your money flows',
    copy: 'Hover any path to trace how content becomes revenue.',
    prompt: 'Try hovering a path →',
    interactionEvent: 'mouseover',
  },
  {
    target: '[data-tour="utm-generator"]',
    title: 'Create tracking links here',
    copy: 'Give each creator a unique link. Every sale traced back automatically.',
  },
]
