'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Types ---

export interface OnboardingAnswers {
  discovery?: string
  mainGoal?: string
  creatorWorkflow?: string
  creatorCount?: string
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
  type: 'single' | 'multi' | 'creator-form' | 'link-form' | 'completion'
  options?: { value: string; label: string }[]
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
      { value: 'friend', label: 'Friend or colleague' },
      { value: 'agency', label: 'Agency recommendation' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    key: 'mainGoal',
    title: "What's your main goal?",
    type: 'single',
    options: [
      { value: 'creator_sales', label: 'See which creators drive sales' },
      { value: 'reduce_cac', label: 'Reduce customer acquisition cost' },
      { value: 'meta_data', label: 'Better data for Meta ad decisions' },
      { value: 'all', label: 'All of the above' },
    ],
  },
  {
    key: 'creatorWorkflow',
    title: 'How do you work with creators?',
    type: 'single',
    options: [
      { value: 'not_yet', label: "I don't yet" },
      { value: 'manual', label: 'DMs and manual tracking' },
      { value: 'agency', label: 'Through an agency' },
      { value: 'platform', label: 'Through a platform' },
    ],
  },
  {
    key: 'creatorCount',
    title: 'How many creators?',
    type: 'single',
    options: [
      { value: '0', label: '0 (getting started)' },
      { value: '1-5', label: '1–5' },
      { value: '6-20', label: '6–20' },
      { value: '20+', label: '20+' },
    ],
  },
  {
    key: 'paidAds',
    title: 'Do you run paid ads?',
    subtitle: 'Select all that apply',
    type: 'multi',
    options: [
      { value: 'meta', label: 'Meta / Facebook Ads' },
      { value: 'tiktok', label: 'TikTok Ads' },
      { value: 'google', label: 'Google Ads' },
      { value: 'none', label: 'No paid ads yet' },
    ],
  },
  {
    key: 'firstCreator',
    title: 'Add your first creator',
    subtitle: 'You can always add more later',
    type: 'creator-form',
  },
  {
    key: 'trackingLink',
    title: 'Create your first tracking link',
    subtitle: 'Share this with your creator to start tracking',
    type: 'link-form',
  },
  {
    key: 'tourChoice',
    title: 'Your dashboard is ready',
    type: 'completion',
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
  const [creatorHandle, setCreatorHandle] = useState('')
  const [creatorPlatform, setCreatorPlatform] = useState('instagram')
  const [generatedLink, setGeneratedLink] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)
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
      } else if (currentStep.type === 'creator-form') {
        updated = {
          ...updated,
          firstCreator: creatorHandle
            ? { handle: creatorHandle, platform: creatorPlatform }
            : null,
        }
      } else if (currentStep.type === 'link-form') {
        updated = { ...updated, trackingLink: generatedLink || null }
      }

      setAnswers(updated)
      emitStepEvent(step + 1, key, updated)

      if (step < TOTAL_STEPS - 1) {
        setDirection('forward')
        setStep((s) => s + 1)
      }
    },
    [answers, currentStep, step, multiSelect, creatorHandle, creatorPlatform, generatedLink, emitStepEvent]
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

  const handleComplete = useCallback(
    (tourChoice: 'tour' | 'skip') => {
      const final = { ...answers, tourChoice }
      emitStepEvent(TOTAL_STEPS, 'tourChoice', final)
      onComplete(final)
    },
    [answers, emitStepEvent, onComplete]
  )

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

  const generateLink = useCallback(() => {
    const creator = creatorHandle || 'creator'
    const link = `https://${shopDomain}?utm_source=${creatorPlatform}&utm_medium=creator&utm_campaign=${encodeURIComponent(creator)}`
    setGeneratedLink(link)
  }, [shopDomain, creatorHandle, creatorPlatform])

  const copyLink = useCallback(() => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink).catch(() => {})
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }, [generatedLink])

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

              {/* Creator form */}
              {currentStep.type === 'creator-form' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Creator handle
                    </label>
                    <input
                      type="text"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      placeholder="@username"
                      className="w-full px-3 py-2.5 rounded-md text-sm outline-none transition-colors duration-150"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#FFFFFF',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Platform
                    </label>
                    <div className="flex gap-2">
                      {['instagram', 'tiktok', 'youtube'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setCreatorPlatform(p)}
                          className="flex-1 py-2 rounded-md text-xs font-medium capitalize transition-all duration-150"
                          style={{
                            backgroundColor: creatorPlatform === p ? 'rgba(0,255,148,0.08)' : '#111113',
                            border: `1px solid ${creatorPlatform === p ? 'rgba(0,255,148,0.4)' : 'rgba(255,255,255,0.08)'}`,
                            color: creatorPlatform === p ? '#00FF94' : 'rgba(255,255,255,0.7)',
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => advance()}
                    className="w-full py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                    style={{
                      backgroundColor: creatorHandle ? '#00FF94' : 'rgba(255,255,255,0.06)',
                      color: creatorHandle ? '#0A0A0B' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {creatorHandle ? 'Add creator' : 'Continue'}
                  </button>
                </div>
              )}

              {/* Link form */}
              {currentStep.type === 'link-form' && (
                <div className="space-y-4">
                  {!generatedLink ? (
                    <>
                      <div
                        className="px-4 py-3 rounded-lg text-sm"
                        style={{
                          backgroundColor: '#111113',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>Store: </span>
                        <span style={{ color: '#FFFFFF' }}>{shopDomain}</span>
                        {answers.firstCreator && (
                          <>
                            <br />
                            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Creator: </span>
                            <span style={{ color: '#FFFFFF' }}>@{answers.firstCreator.handle}</span>
                          </>
                        )}
                      </div>
                      <button
                        onClick={generateLink}
                        className="w-full py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                        style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                      >
                        Generate tracking link
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className="px-4 py-3 rounded-lg text-xs font-mono break-all"
                        style={{
                          backgroundColor: '#111113',
                          border: '1px solid rgba(0,255,148,0.2)',
                          color: '#00FF94',
                        }}
                      >
                        {generatedLink}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={copyLink}
                          className="flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                          style={{
                            backgroundColor: linkCopied ? 'rgba(0,255,148,0.1)' : '#00FF94',
                            color: linkCopied ? '#00FF94' : '#0A0A0B',
                            border: linkCopied ? '1px solid rgba(0,255,148,0.3)' : 'none',
                          }}
                        >
                          {linkCopied ? 'Copied' : 'Copy link'}
                        </button>
                        <button
                          onClick={() => advance()}
                          className="flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            color: '#FFFFFF',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Completion */}
              {currentStep.type === 'completion' && (
                <div className="text-center space-y-6">
                  {/* Checkmark */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path
                        d="M7 14l5 5 9-9"
                        stroke="#00FF94"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    Everything is set up. Your attribution data will build as creators share links.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleComplete('tour')}
                      className="w-full py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                      style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                    >
                      Take a quick tour (30 sec)
                    </button>
                    <button
                      onClick={() => handleComplete('skip')}
                      className="w-full py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      I'll explore on my own
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Skip link (not on completion step) */}
      {currentStep.type !== 'completion' && (
        <div className="pb-8 text-center">
          <button
            onClick={skip}
            className="text-xs transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  )
}
