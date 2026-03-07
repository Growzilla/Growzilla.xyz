import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import EliteLayout from '../components/EliteLayout';

export default function DeckPage() {
  const [form, setForm] = useState({ store: '', name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetch('/api/deck/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slide: 'page-view', viewer: params.get('viewer') || undefined }),
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/deck/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Growzilla | Product Overview</title>
        <meta
          name="description"
          content="Shopify-native creator attribution and Meta ads visualization. See which content drives revenue."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Growzilla | Product Overview" />
        <meta property="og:description" content="Creator attribution and revenue visibility for Shopify stores." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="theme-color" content="#0A0A0B" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <EliteLayout>
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back link */}
            <div className="mb-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-zilla-neon transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                Product Overview
              </h1>
              <p className="text-gray-400 text-lg">
                Growzilla by RolloutFactory Inc.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-16 text-gray-300">

              {/* ── 01. What Growzilla Does ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">01</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  What Growzilla Does
                </h2>
                <p className="text-base leading-relaxed">
                  Growzilla is a Shopify-native attribution platform. It tracks which creator content
                  generates revenue and visualizes your full acquisition funnel alongside Meta ad spend.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  The platform connects to your Shopify store, assigns unique tracking links to each
                  creator, and attributes every order back to the content that drove it. Meta campaign
                  data is layered on top so you see blended acquisition cost across paid and organic
                  channels in a single view.
                </p>
              </section>

              {/* ── 02. Why It Matters ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">02</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  Why It Matters
                </h2>
                <p className="text-base leading-relaxed">
                  Creator-led content is becoming the primary ad format for ecommerce.
                  The data supports this:
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zilla-shopify flex-shrink-0" />
                    <p>
                      Creator economy ad spend reached <strong className="text-white">$37 billion</strong> in
                      2025, growing 4x faster than overall media spend.
                      <span className="text-gray-500 text-sm ml-1">(IAB, 2025)</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zilla-shopify flex-shrink-0" />
                    <p>
                      UGC-based ad creatives deliver <strong className="text-white">50% lower CPC</strong> and{' '}
                      <strong className="text-white">2.8x higher conversion rates</strong> compared to
                      brand-produced ads.
                      <span className="text-gray-500 text-sm ml-1">(Meta, 2024)</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zilla-shopify flex-shrink-0" />
                    <p>
                      <strong className="text-white">94%</strong> of organizations report higher ROI from
                      creator content than from brand-produced advertising.
                      <span className="text-gray-500 text-sm ml-1">(IAB, 2025)</span>
                    </p>
                  </li>
                </ul>
                <p className="text-base leading-relaxed mt-6">
                  Most brands running creator programs have no way to measure which content drives
                  actual purchases. Growzilla closes that gap.
                </p>
              </section>

              {/* ── 03. How It Works ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">03</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  How It Works
                </h2>

                <div className="space-y-10">
                  {[
                    {
                      step: '1',
                      title: 'Connect your Shopify store',
                      desc: 'OAuth install. Products, orders, and customer data sync automatically. No manual CSV imports or pixel setup required.',
                      image: '/deck/step-connect.png',
                    },
                    {
                      step: '2',
                      title: 'Add your creators',
                      desc: 'Each creator receives unique tracking links tied to their content. Links work across Instagram, TikTok, YouTube, and any platform that supports URLs.',
                      image: '/deck/step-creators.png',
                    },
                    {
                      step: '3',
                      title: 'Creators post. You see revenue.',
                      desc: 'Every order is attributed back to the creator and post that generated it. Revenue per post, revenue per creator, revenue per platform.',
                      image: '/deck/step-revenue.png',
                    },
                    {
                      step: '4',
                      title: 'Optimize with full data',
                      desc: 'Blended CAC, ROAS by creator, revenue per post. Identify which creators and content types perform. Cut what does not work, scale what does.',
                      image: '/deck/step-optimize.png',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-mono text-zilla-shopify">{item.step}.</span>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                        <p className="text-base leading-relaxed text-gray-400">{item.desc}</p>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="aspect-[16/10] rounded-lg bg-zilla-surface border border-gray-800 flex items-center justify-center">
                          <span className="text-sm text-gray-600">Screenshot placeholder</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 04. What You See ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">04</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  What You See
                </h2>
                <p className="text-base leading-relaxed mb-8">
                  The dashboard provides four primary views. Each is designed to surface a specific
                  decision: where to spend, who to keep, what to cut, and when to scale.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Revenue Attribution Flow',
                      desc: 'A Sankey diagram tracing spend through channels, creators, and content types to revenue. Shows exactly where money converts and where it drops off.',
                      image: '/deck/view-sankey.png',
                    },
                    {
                      title: 'KPI Overview',
                      desc: 'Revenue, orders, blended CAC, AOV, and ROAS at a glance. Period-over-period comparison with trend indicators.',
                      image: '/deck/view-kpi.png',
                    },
                    {
                      title: 'Creator Leaderboard',
                      desc: 'Creators ranked by attributed revenue. Shows conversion rate, total orders, and revenue per post for each creator.',
                      image: '/deck/view-creators.png',
                    },
                    {
                      title: 'Meta Ads Performance',
                      desc: 'Campaign-level spend, ROAS, and CPA pulled directly from the Meta Marketing API. Layered into the same attribution view.',
                      image: '/deck/view-meta.png',
                    },
                  ].map((view) => (
                    <div key={view.title}>
                      <div className="aspect-[16/10] rounded-lg bg-zilla-surface border border-gray-800 flex items-center justify-center mb-3">
                        <span className="text-sm text-gray-600">Screenshot placeholder</span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-1">{view.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{view.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 05. How It Reduces Cost ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">05</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  How It Reduces Cost
                </h2>
                <p className="text-base leading-relaxed mb-8">
                  Stores using structured creator attribution consistently report lower blended CAC
                  because spend is directed by measured performance, not assumptions.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 font-normal">Without attribution</th>
                        <th className="text-left py-3 px-4 text-white font-medium">With Growzilla</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-4">Flat creator fees with no performance data</td>
                        <td className="py-4 px-4 text-gray-300">Pay based on measured revenue contribution</td>
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-4">Ad creative testing by gut feel</td>
                        <td className="py-4 px-4 text-gray-300">Boost top-performing organic content as paid ads</td>
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-4">Blended CAC unknown</td>
                        <td className="py-4 px-4 text-gray-300">Blended CAC tracked per channel, per creator</td>
                      </tr>
                      <tr className="border-b border-gray-800/50">
                        <td className="py-4 px-4">No feedback loop for scaling</td>
                        <td className="py-4 px-4 text-gray-300">Identify winners, cut underperformers, iterate weekly</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── 06. Installation and Setup ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">06</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  Installation and Setup
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-mono text-gray-500 mt-0.5">1.</span>
                    <p>Shopify app install. Takes under five minutes.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-mono text-gray-500 mt-0.5">2.</span>
                    <p>Creator onboarding and UTM link generation.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-mono text-gray-500 mt-0.5">3.</span>
                    <p>Meta Ads account connection (optional).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-mono text-gray-500 mt-0.5">4.</span>
                    <p>First attributed data visible within 24 hours of the first tracked order.</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mt-6 text-gray-400">
                  For custom integrations, white-label agency configurations, or multi-store setups,
                  contact us to discuss your requirements.
                </p>
              </section>

              {/* ── 07. Who We Work With ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">07</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  Who We Work With
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Shopify stores</h3>
                    <p className="text-gray-400">
                      Running or starting creator programs. Need to see which creators generate revenue
                      and which do not, and use that data to scale.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Agencies</h3>
                    <p className="text-gray-400">
                      Managing creator campaigns across multiple merchants. Multi-store dashboard,
                      volume pricing, white-label reporting available.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Consultants and project leads</h3>
                    <p className="text-gray-400">
                      Need an attribution layer for existing engagements. Growzilla provides the data
                      infrastructure. You own the strategy and client relationship.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── 08. Get Started ── */}
              <section>
                <p className="text-sm text-gray-500 font-mono mb-2">08</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  Get Started
                </h2>

                {submitted ? (
                  <div className="p-8 bg-zilla-surface rounded-xl border border-gray-800">
                    <p className="text-white font-semibold text-lg mb-2">Received.</p>
                    <p className="text-gray-400">
                      We will review your information and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="store" className="block text-sm font-medium text-gray-400 mb-1.5">
                        Store URL
                      </label>
                      <div className="flex items-center">
                        <input
                          id="store"
                          type="text"
                          required
                          placeholder="yourstore"
                          value={form.store}
                          onChange={(e) => setForm({ ...form, store: e.target.value })}
                          className="flex-1 px-4 py-3 bg-zilla-surface border border-gray-800 rounded-l-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                        />
                        <span className="px-4 py-3 bg-zilla-dark border border-l-0 border-gray-800 rounded-r-lg text-gray-500 text-sm">
                          .myshopify.com
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">
                        What are you looking to solve?
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-zilla-shopify text-zilla-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                )}

                <div className="mt-8 pt-8 border-t border-gray-800/50">
                  <p className="text-gray-400 mb-3">
                    Or book a call directly:
                  </p>
                  <button
                    onClick={() => {
                      // @ts-expect-error Calendly loaded via script
                      if (typeof window !== 'undefined' && window.Calendly) {
                        // @ts-expect-error Calendly global
                        window.Calendly.initPopupWidget({ url: 'https://calendly.com/growzilla' });
                      }
                    }}
                    className="text-zilla-neon hover:underline transition-colors text-sm"
                  >
                    Schedule on Calendly
                  </button>
                </div>
              </section>

              {/* Footer */}
              <div className="pt-8 border-t border-gray-800/50">
                <div className="p-6 bg-zilla-surface rounded-xl border border-gray-800 space-y-2">
                  <p className="font-medium text-white">RolloutFactory Inc. (Growzilla)</p>
                  <p>
                    <a href="mailto:albert.elmgart@gmail.com" className="text-zilla-neon hover:underline">
                      albert.elmgart@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-500 text-sm mt-4">
                    Registered in the State of Delaware, United States
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </EliteLayout>
    </>
  );
}
