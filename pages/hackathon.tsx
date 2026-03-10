import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Countdown timer hook
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

const exampleBuilds = [
  {
    title: 'AI Store Clerk',
    description: 'A branded AI assistant that lives in your store and converts browsers into buyers.',
    icon: '🤖',
  },
  {
    title: 'Smart Inventory',
    description: 'Predictive inventory management that saves merchants millions in dead stock.',
    icon: '📦',
  },
  {
    title: 'ICP Builder',
    description: 'Analyze store data to build ideal customer profiles and targeting strategies.',
    icon: '🎯',
  },
  {
    title: 'Data Visualizer',
    description: 'Real-time dashboards that surface insights merchants can\'t see in Shopify admin.',
    icon: '📊',
  },
  {
    title: 'Creator Growth Tools',
    description: 'Tools that help merchants find, manage, and scale creator partnerships.',
    icon: '🚀',
  },
  {
    title: 'AI UGC Generator',
    description: 'Generate user-generated content variations for ads and product pages.',
    icon: '🎬',
  },
];

const schedule = [
  { time: '9:00 AM', event: 'Doors Open — Coffee & Setup', description: 'Get settled, connect to WiFi, fork the starter repo' },
  { time: '10:00 AM', event: 'Kickoff & Starter Repo Walkthrough', description: 'Quick intro to the stack, API access, and what\'s possible' },
  { time: '10:30 AM', event: 'Hacking Begins', description: '4 hours. Build something unreasonable.' },
  { time: '12:30 PM', event: 'Lunch Break', description: 'Food provided. Keep building if you want.' },
  { time: '2:30 PM', event: 'Code Freeze & Demos', description: 'Present what you built — 3 minutes per team' },
  { time: '3:30 PM', event: 'Judging & Prizes', description: 'Winners announced. Prizes distributed.' },
  { time: '4:00 PM', event: 'Networking & Wrap', description: 'Connect with other builders, sponsors, and organizers' },
];

// TODO: Replace with your Lu.ma event URL once created
const LUMA_URL = '#register';

export default function HackathonPage() {
  const countdown = useCountdown('2026-03-28T10:00:00+08:00');

  return (
    <>
      <Head>
        <title>Claude Code x Shopify Hackathon | March 28, 2026 | Growzilla.xyz</title>
        <meta
          name="description"
          content="4 hours to build the most unreasonably smart Shopify app using Claude Code. March 28, 2026 at Forest City Marina Hotel, Malaysia. Prizes, API access, and everything you need to build."
        />
        <meta property="og:title" content="Claude Code x Shopify Hackathon | March 28, 2026" />
        <meta
          property="og:description"
          content="4 hours to build the most unreasonably smart Shopify app using Claude Code. Prizes, API access, and everything you need."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz/hackathon" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-30 bg-grid-zilla" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

        {/* Floating green glow orbs */}
        <div className="fixed top-1/4 -left-32 w-96 h-96 bg-zilla-neon/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-zilla-neon/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Nav - minimal */}
        <nav className="relative z-50 flex items-center justify-between px-6 sm:px-12 py-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/growzilla-kaiju.png"
              alt="Growzilla"
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="font-display text-lg font-bold tracking-tight text-zilla-neon">
              GROWZILLA
            </span>
          </Link>
          <a
            href="#register"
            className="btn-zilla text-sm px-6 py-2.5"
          >
            Register Now
          </a>
        </nav>

        {/* ===== HERO ===== */}
        <section className="relative z-10 pt-12 sm:pt-20 pb-16 sm:pb-24 px-6 sm:px-12">
          <div className="max-w-5xl mx-auto text-center">
            {/* Event badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zilla-neon/20 bg-zilla-neon/5 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-glow-pulse" />
              <span className="text-sm text-zilla-neon font-medium">March 28, 2026 — Forest City Marina Hotel, Malaysia</span>
            </div>

            {/* Logos row */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
              {/* Claude Logo - text based since we use community branding */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#C4916C] flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">C</span>
                </div>
                <span className="font-display text-lg sm:text-xl font-bold text-white">Claude</span>
              </div>

              <span className="text-2xl sm:text-3xl text-gray-600 font-light">×</span>

              {/* Shopify Logo */}
              <div className="flex items-center gap-2">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 109.5 124.5" fill="none">
                  <path d="M95.6 28.2c-.1-.6-.6-1-1.1-1-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.7-.7-2.2-.5-2.7-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7h-.5c-1.5-1.9-3.4-2.8-5-2.8-12.4.3-18.3 15.5-20.2 23.4-4.8 1.5-8.2 2.5-8.6 2.7-2.7.8-2.8.9-3.1 3.5-.2 1.9-7.3 56.4-7.3 56.4l58.5 10.1 25.4-6.3S95.7 28.8 95.6 28.2zM67.6 21.2l-5.7 1.8c0-.3 0-.6 0-.9 0-2.8-.4-5.1-1-6.9 2.5.3 4.2 3.2 5.2 5.2.5.3.5.6.5.8zm-9-5.3c.7 2 1.1 4.7 1.1 8.1v.5l-11.7 3.6c2.3-8.7 6.5-12.9 10.6-12.2zm-4-4.6c.7 0 1.4.2 2 .7-3.5 1.6-7.2 5.8-8.8 14.1l-9.3 2.9C40.4 20.8 45.6 11.4 54.6 11.3z" fill="#95BF47"/>
                  <path d="M94.5 27.2c-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.3-.3-.6-.4-1-.4l-3.6 73.5 25.4-6.3S95.7 28.8 95.6 28.2c-.1-.6-.6-1-1.1-1z" fill="#5E8E3E"/>
                  <path d="M60.1 44.2l-4.4 13c0 0-3.9-2.1-8.6-2.1c-7 0-7.3 4.4-7.3 5.5 0 6 15.7 8.3 15.7 22.4 0 11.1-7 18.2-16.4 18.2-11.3 0-17.1-7-17.1-7l3-9.9s5.9 5.1 10.9 5.1c3.3 0 4.6-2.6 4.6-4.5 0-7.8-12.9-8.2-12.9-21.1 0-10.8 7.8-21.3 23.5-21.3 6 .1 9 1.7 9 1.7z" fill="#fff"/>
                </svg>
                <span className="font-display text-lg sm:text-xl font-bold text-white">Shopify</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-white">Build the Most </span>
              <span className="text-zilla-neon text-glow">Unreasonably Smart</span>
              <br />
              <span className="text-white">Shopify App</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              4 hours. Claude Code. Full Shopify API access. No setup, no auth headaches — just build.
              Fork the starter repo and create something that could be worth millions.
            </p>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Min' },
                { value: countdown.seconds, label: 'Sec' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zilla-charcoal/80 border border-zilla-neon/10 flex items-center justify-center mb-2">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-zilla-neon">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#register"
              className="inline-flex items-center gap-2 btn-zilla text-lg px-10 py-4 shadow-zilla-glow-lg"
            >
              Register Now — It&apos;s Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* ===== WHAT YOU GET ===== */}
        <section className="relative z-10 py-20 sm:py-28 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
              Everything You Need to <span className="text-zilla-neon">Ship</span>
            </h2>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
              Zero setup. Zero auth headaches. You walk in, fork the repo, and start building.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '⚡',
                  title: 'Pre-Built Starter Repo',
                  desc: 'Auth, data sync, and API access already wired up. Fork it and go.',
                },
                {
                  icon: '🔑',
                  title: 'Full Shopify API Access',
                  desc: 'Connected test store with real flowing data — products, orders, customers, analytics.',
                },
                {
                  icon: '🤖',
                  title: 'Claude Code Ready',
                  desc: 'CLAUDE.md with full project context. Index the docs and let Claude build with you.',
                },
                {
                  icon: '📖',
                  title: 'Complete Documentation',
                  desc: 'Every permission, every GraphQL query, every endpoint — documented and ready.',
                },
                {
                  icon: '☕',
                  title: 'Food & Drinks',
                  desc: 'Coffee, energy drinks, snacks, and lunch. Stay fueled, stay focused.',
                },
                {
                  icon: '🏆',
                  title: 'Real Prizes',
                  desc: 'Cash prizes for the best builds. Plus exposure to major players in the space.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-xl bg-zilla-dark/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300"
                >
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EXAMPLE BUILDS ===== */}
        <section className="relative z-10 py-20 sm:py-28 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
              What Could You <span className="text-zilla-neon">Build?</span>
            </h2>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
              The e-commerce space is exploding. The right app can create millions in enterprise value.
              Here&apos;s what&apos;s possible in 4 hours with Claude Code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleBuilds.map((build) => (
                <div
                  key={build.title}
                  className="group p-6 rounded-xl bg-zilla-dark/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-3xl mb-4 block">{build.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{build.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{build.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 mt-10 text-sm">
              If your app is good — sell it on the Shopify App Store or pitch it directly. This is your launchpad.
            </p>
          </div>
        </section>

        {/* ===== SCHEDULE ===== */}
        <section className="relative z-10 py-20 sm:py-28 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
              The <span className="text-zilla-neon">Schedule</span>
            </h2>
            <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
              Saturday, March 28, 2026 — Forest City Marina Hotel, Malaysia
            </p>

            <div className="space-y-0">
              {schedule.map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-zilla-neon/80 ring-4 ring-zilla-neon/10 group-hover:ring-zilla-neon/20 transition-all" />
                    {i < schedule.length - 1 && (
                      <div className="w-px flex-1 bg-gray-800 group-hover:bg-zilla-neon/10 transition-colors" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10">
                    <span className="text-sm font-mono text-zilla-neon/70">{item.time}</span>
                    <h3 className="font-display text-lg font-semibold text-white mt-1">{item.event}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRIZES ===== */}
        <section className="relative z-10 py-20 sm:py-28 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-zilla-neon">Prizes</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-16">
              Build something great. Get rewarded.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* 1st place */}
              <div className="p-8 rounded-xl bg-gradient-to-b from-zilla-neon/10 to-transparent border border-zilla-neon/30 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-zilla-neon text-black text-xs font-bold uppercase tracking-wider">
                  1st Place
                </div>
                <span className="text-5xl block mb-4 mt-2">🥇</span>
                <p className="font-display text-3xl font-bold text-zilla-neon">$2,000</p>
                <p className="text-sm text-gray-400 mt-2">in BTC or USDC</p>
              </div>

              {/* 2nd place */}
              <div className="p-8 rounded-xl bg-zilla-dark/50 border border-gray-700/50">
                <span className="text-5xl block mb-4">🥈</span>
                <p className="font-display text-3xl font-bold text-white">$750</p>
                <p className="text-sm text-gray-400 mt-2">in BTC or USDC</p>
              </div>

              {/* 3rd place */}
              <div className="p-8 rounded-xl bg-zilla-dark/50 border border-gray-700/50">
                <span className="text-5xl block mb-4">🥉</span>
                <p className="font-display text-3xl font-bold text-white">$250</p>
                <p className="text-sm text-gray-400 mt-2">in BTC or USDC</p>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-8">
              + Claude Code API credits for all participants
            </p>
          </div>
        </section>

        {/* ===== NO EXPERIENCE NEEDED ===== */}
        <section className="relative z-10 py-20 sm:py-28 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              You Don&apos;t Need Shopify <span className="text-zilla-neon">Experience</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              All authentication is pre-built. All documentation is ready to index into Claude Code.
              The starter repo handles OAuth, data sync, and API connections — so you can focus
              100% on building the product you want to build.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-zilla-charcoal/50 border border-gray-800/50">
              <span className="font-mono text-sm text-gray-400">$</span>
              <span className="font-mono text-sm text-zilla-neon">git clone starter-repo && npm run dev</span>
              <span className="font-mono text-sm text-gray-400 animate-pulse">▊</span>
            </div>
          </div>
        </section>

        {/* ===== REGISTER ===== */}
        <section id="register" className="relative z-10 py-20 sm:py-28 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Claim Your <span className="text-zilla-neon">Spot</span>
            </h2>
            <p className="text-gray-400 mb-10">
              Limited spots available. Register now to secure yours.
            </p>

            <a
              href={LUMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 btn-zilla text-lg px-10 py-4 shadow-zilla-glow-lg"
            >
              Register on Lu.ma
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <p className="text-gray-600 text-xs mt-6">
              March 28, 2026 · 9 AM – 4 PM · Forest City Marina Hotel, Malaysia
            </p>
          </div>
        </section>

        {/* ===== PRESENTED BY ===== */}
        <section className="relative z-10 py-16 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-8">Presented by</p>
            <div className="flex items-center justify-center gap-10 sm:gap-16 flex-wrap">
              {/* Growzilla */}
              <Link href="/" className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/growzilla-kaiju.png"
                  alt="Growzilla"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="font-display text-lg font-bold text-zilla-neon">GROWZILLA</span>
              </Link>
            </div>
            <p className="text-xs text-gray-600 mt-8">Hosted at Network School — Forest City Marina Hotel, Malaysia</p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="relative z-10 py-8 px-6 sm:px-12 border-t border-gray-800/50">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">&copy; 2026 Growzilla. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Terms
              </Link>
              <a href="mailto:contact@growzilla.xyz" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
