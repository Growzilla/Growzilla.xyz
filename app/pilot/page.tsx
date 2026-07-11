'use client'

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { WhopCheckoutEmbed } from '@whop/checkout/react'
import { PILOT_WHOP } from '@/lib/pilot/whop'

const PURCHASE_GUARD_KEY = 'growzilla_pilot_purchase_tracked'

const benefits = [
  'One reel per day, every day',
  'Instagram + Facebook batched · TikTok native',
  'Volume testing until hooks win',
  'Engine built before the CMO hire',
]

function trackPurchaseOnce(planId: string, receiptId?: string) {
  if (typeof window === 'undefined') return
  try {
    const key = `${PURCHASE_GUARD_KEY}:${receiptId || planId}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    // ignore
  }
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
  if (typeof fbq === 'function') {
    fbq('track', 'Purchase', {
      content_name: PILOT_WHOP.planName,
      content_ids: [planId],
    })
  }
}

function SuccessPanel() {
  return (
    <div className="rounded-2xl border border-zilla-neon/25 bg-zilla-dark/80 px-6 sm:px-8 py-12 text-center">
      <div className="mx-auto mb-6 w-14 h-14 rounded-full border border-zilla-neon/30 bg-zilla-neon/10 flex items-center justify-center">
        <svg className="w-7 h-7 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zilla-neon mb-3">Pilot confirmed</p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white/95 mb-3">
        You&apos;re in — pilot locked
      </h2>
      <p className="text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto mb-8">
        Check your email for confirmation. We&apos;ll reach out within 24 hours to schedule kickoff.
      </p>
      <a
        href="mailto:contact@growzilla.xyz?subject=Growth%20Pilot%20kickoff"
        className="btn-zilla inline-flex items-center justify-center px-8 py-4 rounded-xl text-base"
      >
        Email us about kickoff
      </a>
    </div>
  )
}

function CheckoutSkeleton() {
  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-8 h-8 rounded-full border-2 border-zilla-neon/30 border-t-zilla-neon animate-spin" />
      <p className="text-sm text-gray-500">Loading checkout…</p>
    </div>
  )
}

function PilotCheckout() {
  const searchParams = useSearchParams()
  const statusParam = searchParams?.get('status')
  const isSuccess =
    statusParam === 'success' || searchParams?.get('success') === 'true'
  const isErrorReturn = statusParam === 'error'

  const [completedLocally, setCompletedLocally] = useState(false)
  const [payError, setPayError] = useState<string | null>(
    isErrorReturn ? 'Payment was cancelled or failed. Try again below.' : null
  )
  const [embedKey, setEmbedKey] = useState(0)

  const email = searchParams?.get('email') || undefined
  const promo = searchParams?.get('promo') || undefined
  const affiliate = searchParams?.get('aff') || undefined
  const stateId = searchParams?.get('state_id') || undefined

  const utm = useMemo(() => {
    if (!searchParams) return undefined
    const entries: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') && value) entries[key] = value
    })
    return Object.keys(entries).length ? entries : undefined
  }, [searchParams])

  const showSuccess = isSuccess || completedLocally

  useEffect(() => {
    if (isSuccess) trackPurchaseOnce(PILOT_WHOP.planId)
  }, [isSuccess])

  const handleComplete = useCallback((planId: string, receiptId?: string) => {
    trackPurchaseOnce(planId, receiptId)
    setCompletedLocally(true)
  }, [])

  return (
    <div className="min-h-screen bg-zilla-black text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/growzilla-kaiju.png"
              alt="Growzilla"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              priority
            />
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-zilla-neon">
              GROWZILLA
            </span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Offer copy — no prices; Whop embed owns pricing */}
            <div className="lg:pt-2 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zilla-neon/[0.07] border border-zilla-neon/20 text-sm text-zilla-neon font-medium mb-6">
                3-Month Growth Pilot
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-white/95 mb-5">
                Daily reels. Volume tests.{' '}
                <span className="text-zilla-neon text-glow">An engine before the CMO hire.</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Partner with Growzilla for three months of daily short-form. We ship the cadence,
                test the hooks, and leave you with a content engine that compounds.
              </p>
              <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                {benefits.map((text) => (
                  <li key={text} className="flex items-start gap-3 text-[15px] text-gray-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zilla-neon shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-gray-500">
                Secure checkout · Kickoff within 24h
              </p>
            </div>

            {/* Checkout card */}
            <div id="checkout" className="w-full scroll-mt-28">
              {showSuccess ? (
                <SuccessPanel />
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-zilla-dark/80 overflow-hidden shadow-[0_0_60px_rgba(0,255,148,0.06)]">
                  <div className="px-5 py-4 border-b border-white/[0.06]">
                    <p className="text-sm font-medium text-white/95">Complete your pilot</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Price &amp; currency via Whop · adaptive pricing on
                    </p>
                  </div>

                  {payError && (
                    <div className="px-5 py-3 border-b border-red-500/20 bg-red-500/5 flex items-center justify-between gap-3">
                      <p className="text-sm text-red-300">{payError}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setPayError(null)
                          setEmbedKey((k) => k + 1)
                        }}
                        className="shrink-0 text-xs font-medium text-zilla-neon hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <div className="min-h-[420px]">
                    <WhopCheckoutEmbed
                      key={embedKey}
                      planId={PILOT_WHOP.planId}
                      theme="dark"
                      adaptivePricing
                      returnUrl={`${PILOT_WHOP.returnUrl}?status=success`}
                      stateId={stateId}
                      themeOptions={{
                        accentColor: '#00FF94',
                        backgroundColor: '#0A0A0B',
                        borderRadius: 8,
                      }}
                      prefill={email ? { email } : undefined}
                      promoCode={promo}
                      affiliateCode={affiliate}
                      utm={utm}
                      onComplete={handleComplete}
                      onPaymentError={(error) => {
                        setPayError(error.message || 'Payment failed')
                      }}
                      fallback={<CheckoutSkeleton />}
                    />
                  </div>

                  <div className="px-5 py-3 border-t border-white/[0.06] text-center">
                    <a
                      href={PILOT_WHOP.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-zilla-neon transition-colors"
                    >
                      Open on Whop →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative border-t border-white/[0.06] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            © 2026 Growzilla
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <a href="mailto:contact@growzilla.xyz" className="hover:text-gray-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function PilotPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zilla-black flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-zilla-neon/30 border-t-zilla-neon animate-spin" />
        </div>
      }
    >
      <PilotCheckout />
    </Suspense>
  )
}
