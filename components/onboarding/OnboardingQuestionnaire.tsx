'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Types ---

export interface OnboardingAnswers {
  discovery?: string
  revenueNow?: string
  revenueGoal?: string
  marketingChannels?: string[]
  creatorWorkflow?: string
  creatorCount?: string
  biggestStruggle?: string
  // Legacy fields (kept for backward compat)
  mainGoal?: string
  paidAds?: string[]
  firstCreator?: { handle: string; platform: string } | null
  trackingLink?: string | null
  tourChoice?: 'tour' | 'skip'
}

export interface OnboardingEvent {
  stepNumber: number
  stepName: string
  answers: Partial<OnboardingAnswers>
  timeSpentMs: number
}

interface OnboardingQuestionnaireProps {
  shopId: string
  shopDomain: string
  onComplete: (answers: OnboardingAnswers) => void
  onStepEvent?: (event: OnboardingEvent) => void
}

// --- Step definitions ---

interface StepConfig {
  key: keyof OnboardingAnswers
  title: string
  subtitle?: string
  type: 'single' | 'multi' | 'dual-select' | 'completion'
  options?: { value: string; label: string }[]
  /** For dual-select: second set of options */
  options2?: { value: string; label: string }[]
  options2Label?: string
}

const STEPS: StepConfig[] = [
  {
    key: 'discovery',
    title: 'How did you find Growzilla?',
    type: 'single',
    options: [
      { value: 'app_store', label: 'Shopify App Store' },
      { value: 'google', label: 'Google search' },
      { value: 'social', label: 'Social media' },
      { value: 'direct_link', label: 'Someone sent me a link' },
      { value: 'outreach', label: 'Direct outreach from Growzilla' },
      { value: 'agency', label: 'Agency recommended' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    key: 'revenueNow',
    title: 'Where are you now — and where do you want to go?',
    subtitle: 'This helps us set a goal for your dashboard',
    type: 'dual-select',
    options: [
      { value: '$0-5k', label: '$0 – $5k/mo' },
      { value: '$5k-25k', label: '$5k – $25k/mo' },
      { value: '$25k-100k', label: '$25k – $100k/mo' },
      { value: '$100k-500k', label: '$100k – $500k/mo' },
      { value: '$500k+', label: '$500k+/mo' },
    ],
    options2: [
      { value: '$5k-25k', label: '$5k – $25k/mo' },
      { value: '$25k-100k', label: '$25k – $100k/mo' },
      { value: '$100k-500k', label: '$100k – $500k/mo' },
      { value: '$500k+', label: '$500k+/mo' },
      { value: '$1M+', label: '$1M+/mo' },
    ],
    options2Label: 'Revenue goal',
  },
  {
    key: 'marketingChannels',
    title: 'Where do you market today?',
    subtitle: 'Select all that apply',
    type: 'multi',
    options: [
      { value: 'instagram', label: 'Instagram' },
      { value: 'tiktok', label: 'TikTok' },
      { value: 'youtube', label: 'YouTube' },
      { value: 'facebook_ads', label: 'Facebook / Meta Ads' },
      { value: 'google_ads', label: 'Google Ads' },
      { value: 'email', label: 'Email marketing' },
      { value: 'none', label: 'None yet' },
    ],
  },
  {
    key: 'creatorWorkflow',
    title: 'Do you work with content creators?',
    type: 'single',
    options: [
      { value: 'yes_active', label: 'Yes, actively posting content for us' },
      { value: 'starting', label: 'Starting to — reaching out now' },
      { value: 'no', label: 'No, we do content in-house' },
      { value: 'interested', label: 'No, but interested in starting' },
    ],
  },
  {
    key: 'biggestStruggle',
    title: "What's your biggest struggle right now?",
    subtitle: 'This shapes your AI insights',
    type: 'single',
    options: [
      { value: 'dont_know_what_works', label: "Don't know which content actually drives sales" },
      { value: 'cant_track_ads', label: "Can't track which ads lead to purchases" },
      { value: 'spending_too_much', label: 'Spending too much on ads with unclear ROI' },
      { value: 'need_creators', label: 'Need more content creators' },
      { value: 'growing_blind', label: "Growing but don't know why" },
    ],
  },
]

const TOTAL_STEPS = STEPS.length

// --- Slide animation variants ---

const slideVariants = {
  enterFromRight: { x: 40, opacity: 0 },
  enterFromLeft: { x: -40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -40, opacity: 0 },
  exitToRight: { x: 40, opacity: 0 },
}

// --- Main component ---

export function OnboardingQuestionnaire({
  shopId,
  shopDomain,
  onComplete,
  onStepEvent,
}: OnboardingQuestionnaireProps) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [answers, setAnswers] = useState<OnboardingAnswers>({})
  const [multiSelect, setMultiSelect] = useState<string[]>([])
  const [dualFirst, setDualFirst] = useState('')
  const [dualSecond, setDualSecond] = useState('')
  const stepStartTime = useRef(Date.now())

  const currentStep = STEPS[step]

  useEffect(() => {
    stepStartTime.current = Date.now()
  }, [step])

  const emitStepEvent = useCallback(
    (stepNumber: number, stepName: string, stepAnswers: Partial<OnboardingAnswers>) => {
      onStepEvent?.({
        stepNumber,
        stepName,
        answers: stepAnswers,
        timeSpentMs: Date.now() - stepStartTime.current,
      })
    },
    [onStepEvent]
  )

  const advance = useCallback(
    (value?: unknown) => {
      const key = currentStep.key
      let updated = { ...answers }

      if (currentStep.type === 'single' && typeof value === 'string') {
        updated = { ...updated, [key]: value }
      } else if (currentStep.type === 'multi') {
        updated = { ...updated, [key]: multiSelect }
      } else if (currentStep.type === 'dual-select') {
        updated = { ...updated, revenueNow: dualFirst, revenueGoal: dualSecond }
      }

      setAnswers(updated)
      emitStepEvent(step + 1, key, updated)

      if (step < TOTAL_STEPS - 1) {
        setDirection('forward')
        setStep((s) => s + 1)
      } else {
        // Last step — complete
        onComplete(updated)
      }
    },
    [answers, currentStep, step, multiSelect, dualFirst, dualSecond, emitStepEvent, onComplete]
  )

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection('back')
      setStep((s) => s - 1)
    }
  }, [step])

  const skip = useCallback(() => {
    emitStepEvent(step + 1, currentStep.key, answers)
    if (step < TOTAL_STEPS - 1) {
      setDirection('forward')
      setStep((s) => s + 1)
    }
  }, [step, currentStep, answers, emitStepEvent])

  const toggleMulti = useCallback(
    (value: string) => {
      if (value === 'none') {
        setMultiSelect(['none'])
        return
      }
      setMultiSelect((prev) => {
        const filtered = prev.filter((v) => v !== 'none')
        return filtered.includes(value)
          ? filtered.filter((v) => v !== value)
          : [...filtered, value]
      })
    },
    []
  )

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: '#0A0A0B' }}>
      {/* Progress bar */}
      <div className="w-full h-1" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: '#00FF94' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Step counter */}
      <div className="text-center pt-3 pb-1">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {step + 1} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Back button */}
      {step > 0 && (
        <button
          onClick={goBack}
          className="absolute top-6 left-6 flex items-center gap-1 text-xs transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M8.75 3.5L5.25 7l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      )}

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={direction === 'forward' ? 'enterFromRight' : 'enterFromLeft'}
              animate="center"
              exit={direction === 'forward' ? 'exitToLeft' : 'exitToRight'}
              variants={slideVariants}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Title */}
              <h1
                className="text-xl font-semibold text-center mb-1"
                style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}
              >
                {currentStep.title}
              </h1>
              {currentStep.subtitle && (
                <p
                  className="text-sm text-center mb-8"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {currentStep.subtitle}
                </p>
              )}
              {!currentStep.subtitle && <div className="mb-8" />}

              {/* Single select */}
              {currentStep.type === 'single' && currentStep.options && (
                <div className="space-y-2">
                  {currentStep.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => advance(opt.value)}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150"
                      style={{
                        backgroundColor: answers[currentStep.key] === opt.value ? 'rgba(0,255,148,0.08)' : '#111113',
                        border: `1px solid ${answers[currentStep.key] === opt.value ? 'rgba(0,255,148,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: '#FFFFFF',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Multi select */}
              {currentStep.type === 'multi' && currentStep.options && (
                <div className="space-y-2">
                  {currentStep.options.map((opt) => {
                    const selected = multiSelect.includes(opt.value)
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleMulti(opt.value)}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-3"
                        style={{
                          backgroundColor: selected ? 'rgba(0,255,148,0.08)' : '#111113',
                          border: `1px solid ${selected ? 'rgba(0,255,148,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          color: '#FFFFFF',
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                          style={{
                            backgroundColor: selected ? '#00FF94' : 'transparent',
                            border: selected ? 'none' : '1px solid rgba(255,255,255,0.2)',
                          }}
                        >
                          {selected && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        {opt.label}
                      </button>
                    )
                  })}
                  {/* Continue button for multi-select */}
                  <button
                    onClick={() => advance()}
                    disabled={multiSelect.length === 0}
                    className="w-full mt-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                    style={{
                      backgroundColor: multiSelect.length > 0 ? '#00FF94' : 'rgba(255,255,255,0.06)',
                      color: multiSelect.length > 0 ? '#0A0A0B' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Dual select (revenue now + goal) */}
              {currentStep.type === 'dual-select' && currentStep.options && currentStep.options2 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Current monthly revenue
                    </p>
                    <div className="space-y-1.5">
                      {currentStep.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setDualFirst(opt.value)}
                          className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                          style={{
                            backgroundColor: dualFirst === opt.value ? 'rgba(0,255,148,0.08)' : '#111113',
                            border: `1px solid ${dualFirst === opt.value ? 'rgba(0,255,148,0.4)' : 'rgba(255,255,255,0.08)'}`,
                            color: '#FFFFFF',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {dualFirst && (
                    <div>
                      <p className="text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {currentStep.options2Label || 'Goal'}
                      </p>
                      <div className="space-y-1.5">
                        {currentStep.options2.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setDualSecond(opt.value)}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                            style={{
                              backgroundColor: dualSecond === opt.value ? 'rgba(0,255,148,0.08)' : '#111113',
                              border: `1px solid ${dualSecond === opt.value ? 'rgba(0,255,148,0.4)' : 'rgba(255,255,255,0.08)'}`,
                              color: '#FFFFFF',
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {dualFirst && dualSecond && (
                    <button
                      onClick={() => advance()}
                      className="w-full py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                      style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Skip / Finish link */}
      <div className="pb-8 text-center">
        {step < TOTAL_STEPS - 1 ? (
          <button
            onClick={skip}
            className="text-xs transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Skip
          </button>
        ) : (
          <button
            onClick={() => advance()}
            className="text-xs transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Go to dashboard &rarr;
          </button>
        )}
      </div>
    </div>
  )
}
