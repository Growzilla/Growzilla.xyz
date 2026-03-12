'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SyncLoadingScreenProps {
  shopId: string
  onSyncComplete: () => void
}

interface SyncStatusResponse {
  synced: boolean
  sync_progress: number // 0-1
  error?: string
}

// Mock fallback: simulates sync completing in ~5 seconds
async function fetchSyncStatusMock(
  elapsed: number
): Promise<SyncStatusResponse> {
  const progress = Math.min(elapsed / 5000, 1)
  return {
    synced: progress >= 1,
    sync_progress: progress,
  }
}

async function fetchSyncStatus(
  shopId: string
): Promise<SyncStatusResponse> {
  const res = await fetch(`/api/shops/${encodeURIComponent(shopId)}/sync-status`)
  if (!res.ok) throw new Error(`Sync status check failed (${res.status})`)
  return res.json()
}

const STEPS = [
  { label: 'Connecting to Shopify', threshold: 0.15 },
  { label: 'Importing products', threshold: 0.4 },
  { label: 'Syncing orders', threshold: 0.7 },
  { label: 'Building analytics', threshold: 0.9 },
  { label: 'Finalizing', threshold: 1.0 },
]

function getActiveStep(progress: number): number {
  for (let i = 0; i < STEPS.length; i++) {
    if (progress < STEPS[i].threshold) return i
  }
  return STEPS.length - 1
}

export function SyncLoadingScreen({ shopId, onSyncComplete }: SyncLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [useMock, setUseMock] = useState(false)
  const [startTime] = useState(Date.now())

  const poll = useCallback(async () => {
    try {
      let data: SyncStatusResponse

      if (useMock) {
        data = await fetchSyncStatusMock(Date.now() - startTime)
      } else {
        try {
          data = await fetchSyncStatus(shopId)
        } catch {
          // Endpoint doesn't exist yet — fall back to mock
          setUseMock(true)
          data = await fetchSyncStatusMock(Date.now() - startTime)
        }
      }

      setProgress(data.sync_progress)
      setError(data.error ?? null)

      if (data.synced) {
        onSyncComplete()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed')
    }
  }, [shopId, onSyncComplete, useMock, startTime])

  useEffect(() => {
    poll()
    const interval = setInterval(poll, 3000)
    return () => clearInterval(interval)
  }, [poll])

  const handleRetry = () => {
    setError(null)
    setProgress(0)
    poll()
  }

  const activeStep = getActiveStep(progress)
  const pct = Math.round(progress * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#0A0A0B' }}
    >
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
            style={{ backgroundColor: 'rgba(0,255,148,0.1)', color: '#00FF94' }}
          >
            G
          </div>
          <span
            className="text-base font-semibold tracking-tight"
            style={{ color: '#FFFFFF' }}
          >
            Growzilla
          </span>
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-center"
            >
              {/* Error icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(255,51,102,0.1)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 6v4m0 4h.01M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                    stroke="#FF3366"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p
                className="text-sm font-medium mb-1"
                style={{ color: '#FFFFFF' }}
              >
                Sync failed
              </p>
              <p
                className="text-xs mb-6"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {error}
              </p>

              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                style={{
                  backgroundColor: 'rgba(0,255,148,0.1)',
                  color: '#00FF94',
                  border: '1px solid rgba(0,255,148,0.2)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1.75 7a5.25 5.25 0 019.02-3.646M12.25 7a5.25 5.25 0 01-9.02 3.646"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 1.75v1.75h1.75M3.5 12.25v-1.75H1.75"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Try again
              </button>

              <p
                className="text-xs mt-4"
                style={{ color: 'rgba(255,255,255,0.32)' }}
              >
                Need help?{' '}
                <a
                  href="mailto:albert.elmgart@gmail.com"
                  className="underline"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  Contact support
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Heading */}
              <h1
                className="text-base font-semibold text-center mb-1"
                style={{ color: '#FFFFFF' }}
              >
                Syncing your store data…
              </h1>
              <p
                className="text-xs text-center mb-8"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                This usually takes under a minute.
              </p>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'rgba(255,255,255,0.72)' }}
                  >
                    Progress
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {pct}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#00FF94' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {STEPS.map((step, i) => {
                  const isComplete = progress >= step.threshold
                  const isActive = i === activeStep && !isComplete

                  return (
                    <div key={step.label} className="flex items-center gap-3">
                      {/* Step indicator */}
                      <div className="flex-shrink-0">
                        {isComplete ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="8" fill="rgba(0,255,148,0.15)" />
                              <path
                                d="M5 8l2 2 4-4"
                                stroke="#00FF94"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.div>
                        ) : isActive ? (
                          <div
                            className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                            style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }}
                          />
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                          />
                        )}
                      </div>

                      {/* Step label */}
                      <span
                        className="text-sm"
                        style={{
                          color: isComplete
                            ? 'rgba(255,255,255,0.72)'
                            : isActive
                              ? '#FFFFFF'
                              : 'rgba(255,255,255,0.3)',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
