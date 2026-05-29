'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { WhopCheckoutEmbed } from '@whop/checkout/react';
import { trackEmailInitiateCheckout } from '@/lib/email/pixel';

const PLAN_ID = process.env.NEXT_PUBLIC_EMAIL_WHOP_PRODUCT_ID || 'plan_pkXeAbAdDSRQk';
const RETURN_URL = 'https://growzilla.xyz/email/welcome?success=true';

export default function EmailBuyPage() {
  useEffect(() => {
    trackEmailInitiateCheckout();
  }, []);

  return (
    <div className="min-h-screen bg-zilla-black text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-zilla-neon flex items-center justify-center">
              <span className="text-zilla-black font-bold text-[10px]">G</span>
            </div>
            <span className="font-display font-semibold text-white text-sm tracking-wide group-hover:text-zilla-neon transition-colors">
              GROWZILLA
            </span>
          </Link>
          <Link
            href="/email"
            className="text-xs text-white/55 hover:text-white transition-colors"
          >
            ← Back to offer
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 items-start">
          {/* Left rail — trust + reminder */}
          <div>
            <div className="text-xs tracking-[0.25em] font-mono text-zilla-neon mb-6">
              ◆ EMAIL REACTIVATION · 30 DAYS
            </div>
            <h1 className="font-display text-3xl sm:text-5xl leading-[1.05] tracking-tight mb-5">
              Email Reactivation.
              <br />
              <span className="text-zilla-neon">30 days.</span>
            </h1>
            <p className="text-white/72 leading-relaxed mb-8 max-w-md">
              Your dormant Klaviyo list is the highest-leverage revenue channel in your store.
              We rebuild your reactivation flow, re-engage the people who already trusted
              you once, and ship inside 30 days.
            </p>

            {/* Why this works */}
            <div className="bg-zilla-surface border border-zilla-neon/20 rounded-lg p-5 mb-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-zilla-neon mb-3">
                ◆ WHY THIS WORKS
              </div>
              <ul className="text-sm text-white/80 leading-relaxed space-y-3">
                <li>
                  <span className="text-white font-medium">Email converts 1–3% in ecommerce.</span>{' '}
                  <span className="text-white/64">
                    Klaviyo's 2025 benchmark on win-back. On a list of 10,000 dormant
                    subscribers that's 100–300 buyers waiting to be asked properly.
                  </span>
                </li>
                <li>
                  <span className="text-white font-medium">You already paid for them.</span>{' '}
                  <span className="text-white/64">
                    Klaviyo bills you for every dormant profile every month. Reactivation turns
                    paid storage into paid customers — zero new acquisition spend.
                  </span>
                </li>
                <li>
                  <span className="text-white font-medium">Klaviyo segments compound.</span>{' '}
                  <span className="text-white/64">
                    Tier-asymmetric sends to VIP / CORE / LOW / LEADS outperform batch blasts
                    3–5×. The segments stay in your Klaviyo after Day 30 — you keep using them.
                  </span>
                </li>
                <li>
                  <span className="text-white font-medium">
                    Reactivated buyers re-enter your Shopify funnel.
                  </span>{' '}
                  <span className="text-white/64">
                    They flow back through abandoned cart, browse, and post-purchase sequences
                    and convert at 8–12% over the next 90 days. The sprint pays twice.
                  </span>
                </li>
              </ul>
            </div>

            {/* What lands */}
            <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-5 mb-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/48 mb-3">
                ◆ WHAT LANDS IN YOUR INBOX
              </div>
              <ul className="text-sm text-white/72 leading-relaxed space-y-2">
                <li>· Klaviyo audit + 4-tier segmentation (Day 1)</li>
                <li>· Tier-asymmetric sequence build, 5–13 emails (Day 2–7)</li>
                <li>· Deliverability hardening: SPF / DKIM / DMARC + sender warm-up</li>
                <li>· Live sends with Day-2 + Day-7 health gates (Day 8–21)</li>
                <li>· Day-30 Klaviyo attribution report + clean handover</li>
                <li>· All segments, flows, and deliverability fixes stay in your Klaviyo</li>
              </ul>
            </div>

            {/* Floor Guarantee — mechanism only, no $ */}
            <div className="border-l-2 border-zilla-neon pl-5 py-1 mb-8">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-zilla-neon mb-2">
                ◆ THE FLOOR GUARANTEE
              </div>
              <p className="text-sm text-white/72 leading-relaxed">
                We quote a floor anchored to Klaviyo's 2025 benchmark against your real list
                and AOV. If 30 days end and attributed revenue hasn't hit that floor, we keep
                building until it does. No new invoice.
              </p>
            </div>

            {/* Mini founder */}
            <div className="flex items-center gap-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/team/albert.png"
                alt="Albert Elmgart"
                className="w-10 h-10 rounded-md object-cover border border-white/[0.08]"
                loading="lazy"
              />
              <div>
                <div className="text-sm text-white">Albert Elmgart</div>
                <div className="text-xs text-white/48 font-mono">
                  Your kickoff call lands in 48 hours
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/48">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure Whop checkout
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30-day sprint window
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
                Floor Guarantee in writing
              </span>
            </div>
          </div>

          {/* Right — Whop embed */}
          <div className="w-full">
            <div className="rounded-xl border border-white/[0.08] bg-zilla-dark/80 overflow-hidden shadow-[0_0_60px_rgba(0,255,148,0.06)]">
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-sm font-medium text-white">Complete your purchase</span>
                <span className="text-xs text-zilla-neon font-mono bg-zilla-neon/10 px-2.5 py-1 rounded-full">
                  30-day sprint
                </span>
              </div>
              <div className="min-h-[520px] bg-white">
                <WhopCheckoutEmbed
                  planId={PLAN_ID}
                  theme="light"
                  fallback={
                    <div className="p-8 text-center text-zilla-black">
                      <p className="text-sm">Loading secure checkout…</p>
                    </div>
                  }
                />
              </div>
            </div>
            <p className="text-[11px] text-white/48 mt-3 font-mono leading-relaxed">
              Payment processed by Whop. After checkout you land on your welcome page with the
              kickoff call link and Klaviyo invite instructions. Refund window: 7 days.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/48">
          <div className="font-mono">© Growzilla · {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <Link href="/email" className="hover:text-white/72 transition">Offer</Link>
            <Link href="/privacy" className="hover:text-white/72 transition">Privacy</Link>
            <a href="mailto:hello@growzilla.xyz" className="hover:text-white/72 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
