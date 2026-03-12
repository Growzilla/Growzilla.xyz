'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// --- Generic Event Tracker ---

interface EventTrackerOptions {
  shopId: string
  endpoint?: string // defaults to /api/events
}

interface TrackEventProperties {
  [key: string]: unknown
}

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void
    }
  }
}

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function useEventTracker({ shopId, endpoint = '/api/events' }: EventTrackerOptions) {
  const [sessionId] = useState(() => generateSessionId())
  const stepViewStart = useRef<number>(Date.now())

  const trackEvent = useCallback(
    (eventName: string, properties: TrackEventProperties = {}) => {
      const payload = {
        event: eventName,
        session_id: sessionId,
        shop_id: shopId,
        timestamp: new Date().toISOString(),
        ...properties,
      }

      // Fire-and-forget to backend
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Silent fail — analytics should never block UX
      })

      // PostHog integration
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture(eventName, payload)
      }
    },
    [sessionId, shopId, endpoint]
  )

  const markStepView = useCallback(() => {
    stepViewStart.current = Date.now()
  }, [])

  const getStepDuration = useCallback(() => {
    return Date.now() - stepViewStart.current
  }, [])

  return { trackEvent, sessionId, markStepView, getStepDuration }
}

// --- Onboarding-specific wrapper ---

export interface OnboardingEvent {
  eventName: string
  step?: number
  stepName?: string
  properties?: TrackEventProperties
}

export function useOnboardingTracker(shopId: string) {
  const { trackEvent, sessionId, markStepView, getStepDuration } =
    useEventTracker({ shopId })

  const hasRegisteredDropoff = useRef(false)

  // Register drop-off detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!hasRegisteredDropoff.current) {
        trackEvent('onboarding.dropped_off', {
          time_spent_ms: getStepDuration(),
        })
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [trackEvent, getStepDuration])

  const started = useCallback(() => {
    trackEvent('onboarding.started')
  }, [trackEvent])

  const stepViewed = useCallback(
    (step: number, stepName: string) => {
      markStepView()
      trackEvent('onboarding.step_viewed', { step, step_name: stepName })
    },
    [trackEvent, markStepView]
  )

  const stepCompleted = useCallback(
    (step: number, stepName: string, answers: TrackEventProperties = {}) => {
      trackEvent('onboarding.step_completed', {
        step,
        step_name: stepName,
        time_spent_ms: getStepDuration(),
        ...answers,
      })
    },
    [trackEvent, getStepDuration]
  )

  const stepSkipped = useCallback(
    (step: number, stepName: string) => {
      trackEvent('onboarding.step_skipped', {
        step,
        step_name: stepName,
        time_spent_ms: getStepDuration(),
      })
    },
    [trackEvent, getStepDuration]
  )

  const completed = useCallback(
    (answers: TrackEventProperties = {}) => {
      hasRegisteredDropoff.current = true
      trackEvent('onboarding.completed', answers)
    },
    [trackEvent]
  )

  const tourStarted = useCallback(() => {
    trackEvent('onboarding.tour_started')
  }, [trackEvent])

  const tourStep = useCallback(
    (step: number, stepName: string, interacted: boolean) => {
      trackEvent('onboarding.tour_step', {
        step,
        step_name: stepName,
        interacted,
      })
    },
    [trackEvent]
  )

  const tourCompleted = useCallback(() => {
    trackEvent('onboarding.tour_completed')
  }, [trackEvent])

  const tourSkipped = useCallback(
    (skippedAtStep: number) => {
      trackEvent('onboarding.tour_skipped', { skipped_at_step: skippedAtStep })
    },
    [trackEvent]
  )

  return {
    sessionId,
    trackEvent,
    started,
    stepViewed,
    stepCompleted,
    stepSkipped,
    completed,
    tourStarted,
    tourStep,
    tourCompleted,
    tourSkipped,
  }
}
