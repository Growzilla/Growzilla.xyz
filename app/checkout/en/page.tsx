'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WhopCheckoutEmbed } from '@whop/checkout/react'

const PLAN_ID = 'plan_XzyaI8gKxsA1D'

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    text: 'Live dashboard with revenue per post & per creator',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
      </svg>
    ),
    text: 'Branded UTM generator (10 seconds)',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    text: 'Creators see their commissions and optimize themselves',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    text: 'You get full control without micromanaging',
  },
]

const faqs = [
  {
    q: 'What happens if I don\'t see any revenue or improvement after 30 days?',
    a: 'You get all your money back. We set a baseline on day one. After 30 days we check exactly what each post and creator brought in. If no clear value we refund everything. No questions. Zero risk.',
  },
  {
    q: 'How does the revenue tracking actually work?',
    a: 'We use only your own UTM links (created in 10 seconds) + Shopify\'s order data. Every click and purchase links directly to the right post or creator. Much clearer than Google Analytics or Meta for creators.',
  },
  {
    q: 'How hard is it to install and get started?',
    a: '12\u201318 minutes. I set everything up for you on a 15-minute call. Just send your .myshopify.com link. No code, no tech. Most people are live the same day.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contract. Cancel instantly from your Whop account. No fees, never locked in.',
  },
  {
    q: 'Are my data and customer info safe?',
    a: '100% safe. Read-only access via Shopify\u2019s official system. We never see payments or passwords. Everything encrypted. Remove the app yourself anytime.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden transition-colors duration-300 hover:border-zilla-neon/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium text-white text-[15px] leading-snug">{q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
            open ? 'bg-zilla-neon/10 border-zilla-neon/30 rotate-45' : ''
          }`}
        >
          <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-400 text-[15px] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutEN() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zilla-black text-white">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/growzilla-kaiju.png"
                alt="Growzilla"
                width={56}
                height={56}
                className="h-12 w-12 object-contain"
                priority
              />
              <span className="font-display text-xl font-bold tracking-tight text-zilla-neon">
                GROWZILLA
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-6">
              <Link href="/checkout/se" className="text-sm text-gray-400 hover:text-white transition-colors">
                Svenska
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-zilla-neon transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          <div
            className={`sm:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-16 pb-4' : 'max-h-0'
            }`}
          >
            <Link href="/checkout/se" className="text-sm text-gray-400 hover:text-white transition-colors text-center block py-2">
              Svenska
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ── Hero + Checkout Embed ── */}
        <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Copy */}
              <div className="text-center lg:text-left lg:pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/[0.07] border border-zilla-neon/20 mb-8">
                  <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
                  <span className="text-sm text-zilla-neon font-medium">For Shopify stores with creators</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                  See exact revenue per post{' '}
                  <span className="text-zilla-neon text-glow">&amp; creator</span>{' '}
                  on Shopify
                </h1>

                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-3">
                  Growzilla is a simple Shopify app that shows you exactly how much every post and every creator brings in sales.
                </p>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                  I set it all up for you in 15 minutes. Pay nothing until you see it working.{' '}
                  <span className="text-white font-medium">30-day guarantee.</span>
                </p>

                {/* Benefits list */}
                <div className="space-y-4 mb-8">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center text-zilla-neon mt-0.5">
                        {b.icon}
                      </div>
                      <span className="text-[15px] text-gray-300 leading-snug pt-1">{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    Secure checkout
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Cancel anytime
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                    30-day refund
                  </span>
                </div>
              </div>

              {/* Right: Whop Checkout Embed */}
              <div className="w-full">
                <div className="rounded-2xl border border-white/[0.08] bg-zilla-dark/80 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(0,255,148,0.06)]">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Complete your purchase</span>
                    <span className="text-xs text-zilla-neon font-mono bg-zilla-neon/10 px-2.5 py-1 rounded-full">$97/mo</span>
                  </div>
                  <div className="min-h-[480px]">
                    <WhopCheckoutEmbed
                      planId={PLAN_ID}
                      theme="dark"
                      returnUrl="https://growzilla.xyz/checkout/en?success=true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social proof strip ── */}
        <section className="py-12 border-y border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div>
              <p className="text-2xl font-bold text-white font-mono">15 min</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Setup call</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-zilla-neon font-mono">$0</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Until you see results</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white font-mono">30 days</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 sm:py-28 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-14">
              Common questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 sm:py-28 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8 sm:p-12 rounded-2xl border border-zilla-neon/10 bg-gradient-to-b from-zilla-neon/[0.04] to-transparent">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                Ready to see what your creators actually bring in?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Start today. I set it up for you. Pay nothing until it works.
              </p>
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="btn-zilla text-lg px-10 py-5 rounded-xl"
              >
                Join now &mdash; $97 first month
              </a>
              <p className="mt-5 text-sm text-gray-500">30-day money-back guarantee. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative py-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image src="/images/growzilla-kaiju.png" alt="Growzilla" width={48} height={48} className="h-12 w-12 object-contain" />
                <span className="font-display text-xl font-bold tracking-tight text-zilla-neon">GROWZILLA</span>
              </Link>
              <p className="mt-5 text-gray-500 text-sm leading-relaxed max-w-sm">
                Revenue tracking for Shopify stores that work with creators. See exactly what every post brings in.
              </p>
              <div className="mt-6">
                <a href="mailto:contact@growzilla.xyz" className="text-sm text-zilla-neon hover:text-zilla-acid transition-colors">contact@growzilla.xyz</a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-5">Navigate</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">Home</Link></li>
                <li><Link href="/smdashboard" className="text-gray-500 hover:text-white transition-colors text-sm">Dashboard</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-5">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-5">Contact</h3>
              <ul className="space-y-3">
                <li><a href="mailto:contact@growzilla.xyz" className="text-gray-500 hover:text-white transition-colors text-sm">contact@growzilla.xyz</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">&copy; 2026 Growzilla. All rights reserved.</p>
            <span className="text-xs text-gray-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zilla-neon animate-pulse" />
              Built for Shopify merchants
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
