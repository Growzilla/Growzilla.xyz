'use client';

import Script from 'next/script';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEmailPurchase } from '@/lib/email/pixel';

const CALENDLY_URL = 'https://calendly.com/albert-elmgart/ecommerce-ai-systems-review';

function WelcomeInner() {
  const params = useSearchParams();
  const sessionId = params?.get('session_id') || params?.get('membership_id') || '';
  const success = params?.get('success');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const purchaseFiredRef = useRef(false);

  useEffect(() => {
    if (success && !purchaseFiredRef.current) {
      purchaseFiredRef.current = true;
      trackEmailPurchase();
    }
  }, [success]);

  async function fireWelcome(e: React.FormEvent) {
    e.preventDefault();
    if (sending || sent) return;
    if (!email.trim()) return;
    setSending(true);
    try {
      await fetch('/api/email/post-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          brand: brand.trim(),
          sessionId,
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-zilla-black text-white">
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
          <span className="text-xs text-zilla-neon font-mono">◆ PAYMENT CLEARED</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-xs tracking-[0.25em] font-mono text-zilla-neon mb-6">
          ◆ WELCOME · NEXT 3 STEPS
        </div>
        <h1 className="font-display text-3xl sm:text-5xl leading-[1.05] tracking-tight mb-4">
          The sprint starts now.
        </h1>
        <p className="text-white/72 leading-relaxed mb-10 max-w-xl">
          Thanks for trusting us. We hold a real 30-day calendar open for you. Here are the three
          things that get the work moving — pick step 1 first.
        </p>

        {/* Step 1 — Intake form / send welcome */}
        <section className="bg-zilla-surface border border-zilla-neon/30 rounded-lg p-6 mb-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-zilla-neon mb-3">
            ◆ STEP 1 · CONFIRM YOUR INFO
          </div>
          <h2 className="font-display text-xl mb-3">Tell us where to send the kickoff packet.</h2>
          <p className="text-sm text-white/64 mb-5 leading-relaxed">
            Confirm your email + brand. We send the full kickoff packet (Klaviyo invite
            instructions + intake form + Calendly link) within a minute.
          </p>
          {sent ? (
            <div className="bg-zilla-neon/[0.06] border border-zilla-neon/30 rounded-md p-4">
              <p className="text-sm text-white">
                ✓ Kickoff packet sent to <span className="text-zilla-neon">{email}</span>. Check
                your inbox in the next 60 seconds.
              </p>
            </div>
          ) : (
            <form onSubmit={fireWelcome} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-md text-white placeholder-white/30 focus:outline-none transition"
              />
              <input
                type="text"
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-md text-white placeholder-white/30 focus:outline-none transition"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-md text-white placeholder-white/30 focus:outline-none transition sm:col-span-2"
              />
              <button
                type="submit"
                disabled={sending || !email.trim()}
                className="bg-zilla-neon text-zilla-black font-medium px-6 py-3 rounded-md hover:bg-zilla-glow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending…' : 'Send packet'}
              </button>
            </form>
          )}
        </section>

        {/* Step 2 — Book kickoff */}
        <section className="bg-zilla-surface border border-white/[0.08] rounded-lg p-6 mb-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/48 mb-3">
            ◆ STEP 2 · BOOK YOUR 20-MIN KICKOFF
          </div>
          <h2 className="font-display text-xl mb-3">Pick a slot in the next 48 hours.</h2>
          <p className="text-sm text-white/64 mb-5 leading-relaxed">
            We walk through your list, your offer, and lock the sending schedule. You'll meet
            Albert directly.
          </p>
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '640px' }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </section>

        {/* Step 3 — Klaviyo invite */}
        <section className="bg-zilla-surface border border-white/[0.08] rounded-lg p-6 mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/48 mb-3">
            ◆ STEP 3 · GRANT KLAVIYO ADMIN
          </div>
          <h2 className="font-display text-xl mb-3">60 seconds inside Klaviyo.</h2>
          <ol className="text-sm text-white/72 leading-relaxed space-y-2 list-decimal pl-5">
            <li>
              In Klaviyo: <span className="font-mono text-white">Account → Settings → Users → Invite User</span>
            </li>
            <li>
              Email: <code className="bg-white/[0.06] px-2 py-1 rounded text-zilla-neon">albert@growzilla.xyz</code>
            </li>
            <li>Role: <span className="text-white">Admin</span></li>
            <li>Send invite. We accept within an hour and start the audit immediately.</li>
          </ol>
        </section>

        <p className="text-xs text-white/48 font-mono">
          Order reference: <span className="text-white/72">{sessionId || 'n/a'}</span>
        </p>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/48">
          <div className="font-mono">© Growzilla · {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <a href="mailto:hello@growzilla.xyz" className="hover:text-white/72 transition">hello@growzilla.xyz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function EmailWelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zilla-black" />}>
      <WelcomeInner />
    </Suspense>
  );
}
