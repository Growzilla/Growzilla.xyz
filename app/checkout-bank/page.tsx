'use client'

import { Suspense, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { WhopCheckoutEmbed } from '@whop/checkout/react'

import MinimalNav from '@/components/checkout/MinimalNav'
import PriceBlock from '@/components/checkout/PriceBlock'
import IncludedRecap from '@/components/checkout/IncludedRecap'
import TrustRow from '@/components/checkout/TrustRow'
import { trackInitiateCheckout, trackPurchase } from '@/lib/morsdag/pixel'

const PLAN_ID = 'plan_2uSKpYYpcbsQ1'

const INCLUDED = [
  'Launch live inom 72 timmar',
  'Creatives, email & SMS, Shopify-setup',
  'Meta-kampanj + retargeting',
  'Final push fram till Mors dag 31 maj',
]

const TRUST = ['Säker betalning', 'Klarering 1–3 bankdagar', 'Faktura via e-post']

function SuccessPanel() {
  return (
    <div className="rounded-2xl border border-morsdag-rose/25 bg-morsdag-ink/40 p-8 sm:p-10 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
        Betalning initierad
      </span>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl text-morsdag-ivory leading-tight tracking-[-0.01em]">
        Tack — vi börjar förbereda nu.
      </h2>
      <p className="mt-4 text-[14px] sm:text-[15px] text-white/70 leading-relaxed max-w-md mx-auto">
        Bankbetalningar klareras vanligtvis inom 1–3 arbetsdagar. Du får ett
        mail med betalningsinstruktioner och nästa steg inom några minuter. Vi
        kontaktar dig idag för kickoff.
      </p>
      <Link
        href="/morsdag"
        className="mt-7 inline-flex items-center gap-2 text-[13px] text-morsdag-rose hover:text-morsdag-ivory transition-colors duration-150"
      >
        ← Tillbaka till Morsdag Launch
      </Link>
    </div>
  )
}

function CheckoutContent() {
  const params = useSearchParams()
  const isSuccess = params?.get('success') === 'true'

  useEffect(() => {
    if (isSuccess) {
      trackPurchase({ value: 1850, currency: 'EUR', variant: 'bank' })
    } else {
      trackInitiateCheckout({ value: 1850, currency: 'EUR', variant: 'bank' })
    }
  }, [isSuccess])

  return (
    <div className="relative min-h-screen bg-zilla-black text-white antialiased">
      <MinimalNav />

      <main className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — identity, price, included */}
            <div className="lg:col-span-5 lg:pt-2">
              <PriceBlock
                eyebrow="Morsdag Launch · Bankgiro"
                priceMain="€1 850"
                priceSub="Setup · Engångsavgift · EUR · SEPA / banköverföring"
                perfFee="+ 10% performance fee på genererad kampanjintäkt"
                adSpendNote="Ad spend tillkommer"
              />

              <div className="my-10 h-px bg-white/[0.08]" />

              <IncludedRecap label="Det här ingår" items={INCLUDED} />

              <div className="mt-10 hidden lg:block">
                <TrustRow items={TRUST} />
              </div>
            </div>

            {/* Right — Whop embed */}
            <div className="lg:col-span-7">
              {isSuccess ? (
                <SuccessPanel />
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-zilla-surface/60 overflow-hidden">
                  <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                      Slutför betalning
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-morsdag-rose">
                      Bankgiro · EUR
                    </span>
                  </div>
                  <div className="min-h-[520px]">
                    <WhopCheckoutEmbed
                      planId={PLAN_ID}
                      theme="dark"
                      returnUrl="https://growzilla.xyz/checkout-bank?success=true"
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 lg:hidden">
                <TrustRow items={TRUST} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/35 font-mono">
            © 2026 Growzilla
          </p>
          <a
            href="mailto:contact@growzilla.xyz"
            className="text-[12px] text-white/45 hover:text-white/80 transition-colors duration-150"
          >
            contact@growzilla.xyz
          </a>
        </div>
      </footer>
    </div>
  )
}

export default function CheckoutBankPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zilla-black" />}>
      <CheckoutContent />
    </Suspense>
  )
}
