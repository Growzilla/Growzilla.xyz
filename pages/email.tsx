/**
 * /email — Klaviyo Reactivation Sprint offer landing.
 * $500 setup + 10% of Klaviyo-attributed revenue, 30-day window.
 * Single self-contained file: hero + offer + calculator + how-it-works + FAQ + CTA.
 *
 * Whop checkout CTA = href="#whop" placeholder. Operator wires real Whop link.
 */
import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import FounderBlock from '@/components/email/FounderBlock';
import FloorGuarantee from '@/components/email/FloorGuarantee';
import SlotCounter from '@/components/email/SlotCounter';
import WhoIsGrowzilla from '@/components/email/WhoIsGrowzilla';
// Re-enable ProofScreenshot once an anonymized Klaviyo Day-30 screenshot is approved:
// import ProofScreenshot from '@/components/email/ProofScreenshot';

const SLOTS_REMAINING = Math.max(
  0,
  parseInt(process.env.NEXT_PUBLIC_EMAIL_SLOTS_REMAINING || '5', 10) || 0,
);

// ─────────────────────────────────────────────────────────────────────────────
// Reactivation rate model
//
// Synthesized from: Klaviyo 2025 Benchmark Report (H&B flow placed-order rate
// 1.96%), Omnisend 2024 broad-ecom lapsed-purchase (0.52%), Elite Brands case
// study, Flowium win-back guidance (29% open, ~4% CTR), and operator-survey
// data on Shopify reactivation flows. Per-tier reactivation = cumulative %
// of dormant entrants who place an order in the 30-day campaign window.
//
// Source notes saved at growzillaAssets/offers/ideal-offer-2026-05-26.md §7.
// ─────────────────────────────────────────────────────────────────────────────
type Temp = 'warm' | 'cool' | 'cold';

// We quote the LOW number as the floor. Mid + high shown to operators as
// "realistic outcome / upside" but the FLOOR is what the guarantee is anchored
// to. This matches the Whop FAQ wording: "we quote the lower end of market
// average ... what we quote is the floor and the result is generally higher."
const RATES: Record<Temp, { low: number; mid: number; high: number; label: string; sub: string }> = {
  warm: {
    low: 0.06,
    mid: 0.10,
    high: 0.15,
    label: 'Warm (30–90 days)',
    sub: 'Bought recently or opened email in the last 60 days.',
  },
  cool: {
    low: 0.03,
    mid: 0.05,
    high: 0.08,
    label: 'Cool (90–180 days)',
    sub: 'Quiet for a few months. Brand still recognizable.',
  },
  cold: {
    low: 0.01,
    mid: 0.02,
    high: 0.04,
    label: 'Cold (180+ days)',
    sub: 'Long dormant. Identity recall is fading.',
  },
};

const formatUSD = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-US');

const SETUP_FEE = 500;
const ANCHOR_PRICE = 625;
const COMMISSION = 0.10;
const LIST_MIN = 10000;

const EmailOfferPage: React.FC = () => {
  // ───────── Calculator state ─────────
  const [listSize, setListSize] = useState<number>(5000);
  const [aov, setAov] = useState<number>(80);
  const [temp, setTemp] = useState<Temp>('cool');

  const { revLow, revMid, revHigh, yourShare, theyKeep, netOfBaseline } = useMemo(() => {
    const r = RATES[temp];
    const lo = listSize * r.low * aov;
    const mi = listSize * r.mid * aov;
    const hi = listSize * r.high * aov;
    // Net-of-baseline: subtract what Klaviyo would attribute to existing flows even
    // without our work. Conservative haircut — 20% of mid-case. The 10% fee bills
    // against this number, not the gross.
    const baselineHaircut = mi * 0.20;
    return {
      revLow: lo,
      revMid: mi,
      revHigh: hi,
      yourShare: (mi - baselineHaircut) * 0.10,
      theyKeep: (mi - baselineHaircut) * 0.90,
      netOfBaseline: mi - baselineHaircut,
    };
  }, [listSize, aov, temp]);

  return (
    <>
      <Head>
        <title>Reactivate your dormant Klaviyo list — Growzilla</title>
        <meta
          name="description"
          content="We rebuild your Klaviyo reactivation flow and re-engage your old subscribers in 30 days. $500 setup + 10% of recovered revenue. For Shopify brands."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0A0A0B" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz/email" />
        <meta property="og:title" content="Reactivate your dormant Klaviyo list — Growzilla" />
        <meta
          property="og:description"
          content="30-day Klaviyo reactivation sprint for Shopify brands. $500 setup + 10% of recovered revenue. Done-for-you."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-zilla-black text-white font-sans">
        {/* ─────── HERO ─────── */}
        <section className="relative overflow-hidden">
          {/* radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,148,0.12) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
            <div className="text-zilla-neon text-xs tracking-[0.25em] font-mono mb-6">
              ◆ KLAVIYO REACTIVATION SPRINT · 30 DAYS
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
              Your dormant list is{' '}
              <span className="text-zilla-neon">sitting on revenue.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/72 max-w-2xl leading-relaxed mb-10">
              We rebuild your Klaviyo reactivation flow and re-engage your old subscribers
              in 30 days. <span className="text-white">$500 setup. 10% of what we
              recover for you.</span> That's it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href="/email/quiz"
                className="inline-flex items-center gap-3 bg-zilla-neon text-zilla-black font-semibold px-7 py-4 rounded-md hover:bg-zilla-glow transition-all duration-200 shadow-zilla-glow"
              >
                Get my dormant revenue audit
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/email/buy"
                className="text-white/72 hover:text-white text-sm underline underline-offset-4 decoration-white/20 hover:decoration-zilla-neon transition"
              >
                I'm ready — skip the quiz ($500) →
              </Link>
            </div>
            <div className="mt-6">
              <SlotCounter
                slotsRemaining={SLOTS_REMAINING}
                anchorPrice={ANCHOR_PRICE}
                foundingPrice={SETUP_FEE}
              />
            </div>
          </div>
        </section>

        {/* ─────── FOUNDER BLOCK (trust) ─────── */}
        <FounderBlock />

        {/* When approved, uncomment:
            <ProofScreenshot /> */}

        {/* ─────── THE OFFER (3 cards) ─────── */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-8">
              ◆ THE OFFER
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                eyebrow="01"
                title="$500 flat setup"
                body="Audit, segmentation, deliverability check, full sequence build, Klaviyo flow wiring, live send orchestration. One-time."
              />
              <Card
                eyebrow="02"
                title="10% of recovered revenue"
                body="Klaviyo attributes campaign revenue automatically. We bill 10% of what the sprint sequences generate over the 30-day window — net of your prior 30-day baseline. Zero if we don't hit the floor."
              />
              <Card
                eyebrow="03"
                title="30 days. Then we're out."
                body="Sprint window is 30 days from access. Day 30 report with attribution screenshots, list health delta, and a clean handover. No retainer trap."
              />
            </div>
          </div>
        </section>

        {/* ─────── CALCULATOR ─────── */}
        <section id="calculator" className="border-t border-white/[0.06] bg-zilla-dark">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-xs tracking-[0.2em] text-zilla-neon font-mono mb-4">
              ◆ DORMANT REVENUE CALCULATOR
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-3">
              What's hiding in your old list?
            </h2>
            <p className="text-white/64 max-w-2xl mb-12">
              Plug in your numbers. We use real benchmarks from Klaviyo's 2025 report,
              not vibes. Results depend on your brand — see caveats below.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Inputs (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                {/* List size */}
                <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-5">
                  <label className="block text-xs tracking-wider uppercase text-white/48 font-mono mb-2">
                    Dormant subscribers
                  </label>
                  <input
                    type="number"
                    min={500}
                    max={500000}
                    step={500}
                    value={listSize}
                    onChange={(e) => setListSize(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent text-3xl font-display text-white outline-none border-b border-white/[0.08] focus:border-zilla-neon transition pb-2"
                  />
                  <input
                    type="range"
                    min={500}
                    max={50000}
                    step={500}
                    value={Math.min(listSize, 50000)}
                    onChange={(e) => setListSize(parseInt(e.target.value))}
                    className="w-full mt-3 accent-zilla-neon"
                  />
                  <p className="text-xs text-white/48 mt-2">
                    Subscribers who haven't bought in 60+ days.
                  </p>
                </div>

                {/* AOV */}
                <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-5">
                  <label className="block text-xs tracking-wider uppercase text-white/48 font-mono mb-2">
                    Average order value (USD)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={5000}
                    step={5}
                    value={aov}
                    onChange={(e) => setAov(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent text-3xl font-display text-white outline-none border-b border-white/[0.08] focus:border-zilla-neon transition pb-2"
                  />
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={5}
                    value={Math.min(aov, 500)}
                    onChange={(e) => setAov(parseInt(e.target.value))}
                    className="w-full mt-3 accent-zilla-neon"
                  />
                  <p className="text-xs text-white/48 mt-2">
                    Your typical Shopify order size.
                  </p>
                </div>

                {/* Temperature */}
                <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-5">
                  <label className="block text-xs tracking-wider uppercase text-white/48 font-mono mb-3">
                    How cold is the list?
                  </label>
                  <div className="space-y-2">
                    {(Object.keys(RATES) as Temp[]).map((k) => (
                      <button
                        key={k}
                        onClick={() => setTemp(k)}
                        className={`w-full text-left px-4 py-3 rounded-md border transition ${
                          temp === k
                            ? 'border-zilla-neon bg-zilla-neon/[0.06]'
                            : 'border-white/[0.06] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {RATES[k].label}
                          </span>
                          {temp === k && (
                            <span className="text-zilla-neon text-xs">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-white/48 mt-1">{RATES[k].sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output (3 cols) */}
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-zilla-surface to-zilla-charcoal border border-zilla-neon/30 rounded-lg p-8 shadow-zilla-glow">
                  <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-2">
                    PROJECTED 30-DAY REVENUE
                  </div>
                  <div className="font-display text-4xl md:text-5xl text-zilla-neon mb-1">
                    {formatUSD(revLow)} – {formatUSD(revHigh)}
                  </div>
                  <div className="text-white/64 text-sm mb-2">
                    Realistic mid-case: <span className="text-white font-medium">{formatUSD(revMid)}</span>
                  </div>
                  <div className="text-white/48 text-xs font-mono mb-6">
                    Net of your prior 30-day Klaviyo baseline: <span className="text-zilla-neon">{formatUSD(netOfBaseline)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <Stat label="You keep (90% of net)" value={formatUSD(theyKeep)} />
                    <Stat label="Growzilla fee (10% of net)" value={formatUSD(yourShare)} accent />
                  </div>

                  <div className="text-xs text-white/64 leading-relaxed">
                    <p className="font-mono text-white/48 mb-2">
                      ◆ DEPENDS ON YOUR BRAND
                    </p>
                    <ul className="space-y-1.5 text-white/64">
                      <li>· Time since last engagement, not just last purchase</li>
                      <li>· Strength of the offer (discount, bundle, restock)</li>
                      <li>· Deliverability health — SPF, DKIM, DMARC alignment</li>
                      <li>· Product repeat-purchase logic (consumable vs durable)</li>
                      <li>· List hygiene — bounce rate, complaint history</li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-white/48 mt-4 font-mono">
                  Math: list × reactivation rate × AOV. Reactivation rates anchored
                  to Klaviyo 2025 Benchmark Report + Omnisend 2024 ecom data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────── HOW IT WORKS ─────── */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-4">
              ◆ HOW WE RUN IT
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-12">
              30 days, five moves.
            </h2>
            <div className="space-y-px">
              <Step
                day="Day 1"
                title="Klaviyo audit + segmentation"
                body="You grant Klaviyo Admin access (60-second invite). We audit deliverability, segment your dormant list into tiers (VIP / repeat / single-buy / lead), suppress hard bounces, lock baseline."
              />
              <Step
                day="Day 2–7"
                title="Sequence build + flow wiring"
                body="Tier-asymmetric build. VIPs get a personal founder note. Cold leads get a re-acquisition offer + sunset email. Every line read aloud and rewritten before it ships, then sent to you for approval. Klaviyo flows + segments configured live."
              />
              <Step
                day="Day 8"
                title="First send goes live"
                body="VIPs ship first as a deliverability ramp. We watch open + complaint rate in real time. Day 7 health gate must pass before the bigger cohorts launch."
              />
              <Step
                day="Day 8–21"
                title="Campaign rolls"
                body="3–13 emails depending on list size, staggered with day-2 + day-7 health checks. Revenue posts to Klaviyo dashboard live. You can watch it tick."
              />
              <Step
                day="Day 30"
                title="Final report + handover"
                body="Full Klaviyo attribution: revenue, reactivated buyer count, list health delta, ROI multiple. 10% fee invoiced against attributed revenue. You keep every asset."
              />
            </div>
          </div>
        </section>

        {/* ─────── WHO IT'S FOR ─────── */}
        <section className="border-t border-white/[0.06] bg-zilla-dark">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-4">
              ◆ WHO THIS IS FOR
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-10">
              Three yes-es. Otherwise we're not the right fit.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Qualifier num="01" text="You sell on Shopify and use Klaviyo (or are about to)." />
              <Qualifier num="02" text="You have at least 10,000 contacts on your list and your AOV is $40+." />
              <Qualifier num="03" text="You can hand over Klaviyo Admin access and a sending schedule." />
            </div>
          </div>
        </section>

        {/* ─────── FLOOR GUARANTEE (risk reversal) ─────── */}
        <FloorGuarantee />

        {/* ─────── WHO IS GROWZILLA ─────── */}
        <WhoIsGrowzilla />

        {/* ─────── FAQ ─────── */}
        <section className="border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 py-20">
            <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-4">
              ◆ FAQ
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-10">
              The questions you'd ask on a call.
            </h2>
            <div className="space-y-px">
              <FAQItem
                q="What if it doesn't work?"
                a="The Floor Guarantee. If 30 days end and Klaviyo-attributed revenue from our sequences hasn't hit the floor we quoted you, we don't disappear. We keep building — new offers, new sequences, new sends — until it does. No new invoice. We finish the job."
              />
              <FAQItem
                q="How do you measure revenue?"
                a="Klaviyo's own attribution dashboard. We lock your prior 30-day baseline on Day 0 (existing flow revenue, list size, deliverability score). The 10% bills only against revenue ABOVE that baseline — never on revenue you'd have earned anyway. No black-box reporting."
              />
              <FAQItem
                q="Who is Growzilla?"
                a="A senior operator team running 30-day revenue sprints for Shopify brands. Albert leads accounts. A copy chief reads every sequence aloud before it ships. A deliverability specialist runs the SPF/DKIM/DMARC audit. You talk to Albert directly — no junior-handoff, no agency layers."
              />
              <FAQItem
                q="Do I need to install anything?"
                a="One Klaviyo Admin invite. 60 seconds. No new tools, no apps to approve. We work inside your existing Klaviyo workspace."
              />
              <FAQItem
                q="How fast can you start?"
                a="48 hours after Klaviyo access lands. We do the audit + segmentation that same day. First send within 7 days."
              />
              <FAQItem
                q="What exactly is the 10% on?"
                a="Only revenue Klaviyo attributes to the campaigns we build during the 30-day window. Not your existing welcome flow. Not your abandoned cart. Not Meta ads. Just our reactivation sequences."
              />
              <FAQItem
                q="What if my list is mostly cold (180+ days)?"
                a="We still take it but tell you upfront — cold lists reactivate at 1–4% vs warm at 6–15%. We use the calculator above to set realistic expectations before you sign. No false promises."
              />
            </div>
          </div>
        </section>

        {/* ─────── FINAL CTA ─────── */}
        <section className="border-t border-white/[0.06] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,255,148,0.15) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              Pull the revenue out of your old list.
            </h2>
            <p className="text-lg text-white/72 mb-10 max-w-xl mx-auto">
              $500 to start. 10% of what we recover. 30 days. Five slots at the
              founding rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link
                href="/email/quiz"
                className="inline-flex items-center gap-3 bg-zilla-neon text-zilla-black font-semibold px-8 py-4 rounded-md hover:bg-zilla-glow transition-all duration-200 shadow-zilla-glow-lg"
              >
                Get my audit (2 min) →
              </Link>
              <Link
                href="/email/buy"
                className="inline-flex items-center gap-2 text-white/72 hover:text-white text-sm underline underline-offset-4 decoration-white/20 hover:decoration-zilla-neon transition px-3 py-2"
              >
                or skip to checkout — <span className="line-through text-white/32 ml-1">$625</span><span className="text-white ml-1">$500</span>
              </Link>
            </div>
            <div className="mt-6 flex justify-center">
              <SlotCounter
                slotsRemaining={SLOTS_REMAINING}
                anchorPrice={ANCHOR_PRICE}
                foundingPrice={SETUP_FEE}
              />
            </div>
            <p className="text-xs text-white/48 mt-4 font-mono">
              Whop checkout · welcome packet + Klaviyo invite request within 1 hour
            </p>
          </div>
        </section>

        {/* ─────── FOOTER ─────── */}
        <footer className="border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/48">
            <div className="font-mono">© Growzilla · {new Date().getFullYear()}</div>
            <div className="flex gap-6">
              <a href="/" className="hover:text-white/72 transition">Home</a>
              <a href="/privacy" className="hover:text-white/72 transition">Privacy</a>
              <a href="mailto:hello@growzilla.xyz" className="hover:text-white/72 transition">hello@growzilla.xyz</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Local components
// ─────────────────────────────────────────────────────────────────────────────

const Card: React.FC<{ eyebrow: string; title: string; body: string }> = ({
  eyebrow,
  title,
  body,
}) => (
  <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-6 hover:border-zilla-neon/30 transition">
    <div className="text-xs font-mono text-zilla-neon mb-4">{eyebrow}</div>
    <h3 className="font-display text-xl mb-3 leading-snug">{title}</h3>
    <p className="text-sm text-white/64 leading-relaxed">{body}</p>
  </div>
);

const Stat: React.FC<{ label: string; value: string; accent?: boolean }> = ({
  label,
  value,
  accent,
}) => (
  <div className={`p-4 rounded-md border ${accent ? 'border-zilla-neon/30 bg-zilla-neon/[0.04]' : 'border-white/[0.06] bg-black/20'}`}>
    <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/48 mb-1">
      {label}
    </div>
    <div className={`font-display text-2xl ${accent ? 'text-zilla-neon' : 'text-white'}`}>
      {value}
    </div>
  </div>
);

const Step: React.FC<{ day: string; title: string; body: string }> = ({ day, title, body }) => (
  <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-8 py-6 border-b border-white/[0.06]">
    <div className="text-zilla-neon text-sm font-mono">{day}</div>
    <div>
      <h3 className="font-display text-xl mb-2">{title}</h3>
      <p className="text-white/64 leading-relaxed">{body}</p>
    </div>
  </div>
);

const Qualifier: React.FC<{ num: string; text: string }> = ({ num, text }) => (
  <div className="bg-zilla-surface border border-white/[0.06] rounded-lg p-6">
    <div className="text-xs font-mono text-zilla-neon mb-3">{num}</div>
    <p className="text-white/80 leading-relaxed">{text}</p>
  </div>
);

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <details className="border-b border-white/[0.06] group">
    <summary className="cursor-pointer py-5 flex items-center justify-between hover:text-zilla-neon transition list-none">
      <span className="font-medium pr-6">{q}</span>
      <span className="text-white/48 group-open:rotate-45 transition-transform text-xl flex-shrink-0">
        +
      </span>
    </summary>
    <p className="pb-5 text-white/64 leading-relaxed">{a}</p>
  </details>
);

export default EmailOfferPage;
