'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type {
  QuizResult,
  RevenueRange,
  SpendRange,
  CreatorCount,
  QuizPlatform,
  TrackingMethod,
  QuizAnswers,
  QuizLeadPayload,
} from '@/types/quiz'
import { calculateQuizResult } from '@/lib/quizCalculations'
import QuizProgressBar from './QuizProgressBar'
import QuizIntro from './QuizIntro'
import QuizStepStoreURL from './QuizStepStoreURL'
import QuizStepRevenue from './QuizStepRevenue'
import QuizStepCreatorSpend from './QuizStepCreatorSpend'
import QuizStepCreatorCount from './QuizStepCreatorCount'
import QuizStepPlatforms from './QuizStepPlatforms'
import QuizStepTracking from './QuizStepTracking'
import QuizResults from './QuizResults'
import QuizEmailGate from './QuizEmailGate'
import QuizResultsFull from './QuizResultsFull'
import Link from 'next/link'

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } }),
}

export default function QuizShell() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  // Answers
  const [storeUrl, setStoreUrl] = useState('')
  const [revenueRange, setRevenueRange] = useState<RevenueRange | null>(null)
  const [creatorSpend, setCreatorSpend] = useState<SpendRange | null>(null)
  const [creatorCount, setCreatorCount] = useState<CreatorCount | null>(null)
  const [platforms, setPlatforms] = useState<QuizPlatform[]>([])
  const [trackingMethod, setTrackingMethod] = useState<TrackingMethod | null>(null)

  // Lead capture
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Result
  const [result, setResult] = useState<QuizResult | null>(null)

  const goTo = useCallback((s: number, dir: 1 | -1 = 1) => {
    setDirection(dir)
    setStep(s)
  }, [])

  const handleTrackingNext = useCallback((value: TrackingMethod) => {
    setTrackingMethod(value)
    // Calculate result
    const answers: QuizAnswers = {
      storeUrl,
      revenueRange: revenueRange!,
      creatorSpend: creatorSpend!,
      creatorCount: creatorCount!,
      platforms,
      trackingMethod: value,
    }
    const r = calculateQuizResult(answers)
    setResult(r)
    goTo(7)
  }, [storeUrl, revenueRange, creatorSpend, creatorCount, platforms, goTo])

  const handleEmailSubmit = useCallback((e: string, p: string) => {
    setEmail(e)
    setPhone(p)
    // Save lead to localStorage
    const payload: QuizLeadPayload = {
      storeUrl,
      email: e,
      phone: p,
      score: result!.score,
      leakEstimate: result!.leakEstimate,
      revenueRange: revenueRange!,
      platforms,
      trackingMethod: trackingMethod!,
      submittedAt: new Date().toISOString(),
    }
    localStorage.setItem('growzilla_quiz_lead', JSON.stringify(payload))
    console.log('Quiz lead captured:', payload)
    goTo(9)
  }, [storeUrl, result, revenueRange, platforms, trackingMethod, goTo])

  function renderStep() {
    switch (step) {
      case 0:
        return <QuizIntro onStart={() => goTo(1)} />
      case 1:
        return (
          <QuizStepStoreURL
            value={storeUrl}
            onNext={(v) => { setStoreUrl(v); goTo(2) }}
            onBack={() => goTo(0, -1)}
          />
        )
      case 2:
        return (
          <QuizStepRevenue
            value={revenueRange}
            onNext={(v) => { setRevenueRange(v); goTo(3) }}
            onBack={() => goTo(1, -1)}
          />
        )
      case 3:
        return (
          <QuizStepCreatorSpend
            value={creatorSpend}
            onNext={(v) => { setCreatorSpend(v); goTo(4) }}
            onBack={() => goTo(2, -1)}
          />
        )
      case 4:
        return (
          <QuizStepCreatorCount
            value={creatorCount}
            onNext={(v) => { setCreatorCount(v); goTo(5) }}
            onBack={() => goTo(3, -1)}
          />
        )
      case 5:
        return (
          <QuizStepPlatforms
            value={platforms}
            onNext={(v) => { setPlatforms(v); goTo(6) }}
            onBack={() => goTo(4, -1)}
          />
        )
      case 6:
        return (
          <QuizStepTracking
            value={trackingMethod}
            onNext={handleTrackingNext}
            onBack={() => goTo(5, -1)}
          />
        )
      case 7:
        return result ? <QuizResults result={result} onUnlock={() => goTo(8)} /> : null
      case 8:
        return (
          <QuizEmailGate
            email={email}
            phone={phone}
            onSubmit={handleEmailSubmit}
            onBack={() => goTo(7, -1)}
          />
        )
      case 9:
        return result ? <QuizResultsFull result={result} storeUrl={storeUrl} /> : null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-zilla-black">
      {/* Background layers */}
      <div className="fixed inset-0 bg-grid-zilla opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-zilla-radial pointer-events-none" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-zilla-neon flex items-center justify-center">
              <span className="text-zilla-black font-bold text-xs">G</span>
            </div>
            <span className="font-display font-bold text-white text-sm tracking-wide group-hover:text-zilla-neon transition-colors">
              GROWZILLA
            </span>
          </Link>
          <Link
            href="/checkout/en"
            className="hidden sm:inline-flex btn-zilla text-xs px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Progress bar */}
      {step >= 1 && step <= 6 && (
        <div className="sticky top-[53px] z-40 bg-black/80 backdrop-blur-sm px-4 py-2">
          <div className="max-w-lg mx-auto">
            <QuizProgressBar step={step} />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="relative z-10 max-w-5xl mx-auto py-8 sm:py-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zilla-neon flex items-center justify-center">
              <span className="text-zilla-black font-bold text-[8px]">G</span>
            </div>
            <span className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Growzilla</span>
          </div>
          <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  )
}
