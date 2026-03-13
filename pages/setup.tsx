import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { SyncLoadingScreen } from '@/components/onboarding/SyncLoadingScreen';
import { OnboardingQuestionnaire, type OnboardingAnswers } from '@/components/onboarding/OnboardingQuestionnaire';
import { useOnboardingTracker } from '@/hooks/useEventTracker';

type SetupPhase = 'form' | 'syncing' | 'onboarding' | 'redirecting';
const STORAGE_PREFIX = 'gz_onboarding_';

export default function SetupPage() {
  const router = useRouter();
  const { store, tier } = router.query as { store?: string; tier?: string };
  const isStarter = tier === 'starter';

  const [phase, setPhase] = useState<SetupPhase>('form');
  const [shopId, setShopId] = useState('');
  const tracker = useOnboardingTracker(shopId || 'unknown');

  // Resume from localStorage if user already created account
  useEffect(() => {
    if (!router.isReady || !store) return;
    const key = `${STORAGE_PREFIX}${store}`;
    const savedPhase = localStorage.getItem(`${key}_phase`) as SetupPhase | null;
    const savedShopId = localStorage.getItem(`${key}_shopId`);
    const savedToken = localStorage.getItem('gz_token');
    const completed = localStorage.getItem(`${key}_completed`);

    if (completed === 'true' && savedToken) {
      // Already finished onboarding — go to dashboard
      router.replace('/whop');
      return;
    }

    if (savedPhase && savedPhase !== 'form' && savedToken && savedShopId) {
      setShopId(savedShopId);
      setPhase(savedPhase);
    }
  }, [router.isReady, store, router]);

  // Persist phase to localStorage
  useEffect(() => {
    if (!store || phase === 'form') return;
    const key = `${STORAGE_PREFIX}${store}`;
    localStorage.setItem(`${key}_phase`, phase);
    if (shopId) localStorage.setItem(`${key}_shopId`, shopId);
  }, [store, phase, shopId]);

  const handleSyncComplete = useCallback(() => {
    setPhase('onboarding');
    tracker.started();
  }, [tracker]);

  const handleOnboardingComplete = useCallback(async (answers: OnboardingAnswers) => {
    setPhase('redirecting');
    const key = `${STORAGE_PREFIX}${store}`;

    // Save completion state
    localStorage.setItem(`${key}_completed`, 'true');
    localStorage.setItem(`${key}_answers`, JSON.stringify(answers));
    localStorage.setItem(`${key}_tour`, answers.tourChoice || 'skip');

    // Fire completed event
    tracker.completed({ answers });

    // POST onboarding answers to backend (fire-and-forget)
    const token = localStorage.getItem('gz_token');
    fetch('/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ shop_id: shopId, store_domain: store, answers }),
    }).catch(() => {});

    router.push('/whop');
  }, [store, shopId, tracker, router]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Validation
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const passwordLongEnough = password.length >= 8;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    name.trim().length > 0 &&
    emailValid &&
    passwordLongEnough &&
    passwordsMatch &&
    !!store &&
    !submitting;

  // Password strength indicator
  const passwordStrength = useMemo(() => {
    if (password.length === 0) return null;
    if (password.length < 8) return { label: 'Too short', color: '#EF4444' };
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (score <= 2) return { label: 'Fair', color: '#F59E0B' };
    if (score === 3) return { label: 'Good', color: '#00E676' };
    return { label: 'Strong', color: '#00FF94' };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store: store!,
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      // Store token and transition to sync phase
      if (data.token) {
        localStorage.setItem('gz_token', data.token);
      }
      if (data.shopId) {
        setShopId(data.shopId);
      }

      setPhase('syncing');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  // No store param — invalid access
  if (router.isReady && !store) {
    return (
      <>
        <Head>
          <title>Setup | Growzilla</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-zilla-black flex items-center justify-center p-4">
          <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
          <div className="relative z-10 card-zilla p-8 max-w-sm w-full text-center">
            <p className="text-gray-400">
              Invalid setup link. Please install Growzilla from your Shopify admin.
            </p>
          </div>
        </div>
      </>
    );
  }

  // --- Phase: Syncing ---
  if (phase === 'syncing') {
    return (
      <>
        <Head>
          <title>Syncing Store | Growzilla</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <SyncLoadingScreen shopId={shopId} onSyncComplete={handleSyncComplete} />
      </>
    );
  }

  // --- Phase: Onboarding questionnaire ---
  if (phase === 'onboarding' && store) {
    return (
      <>
        <Head>
          <title>Get Started | Growzilla</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <OnboardingQuestionnaire
          shopId={shopId}
          shopDomain={store}
          onComplete={handleOnboardingComplete}
          onStepEvent={(event) => {
            // Persist progress for resume
            const key = `${STORAGE_PREFIX}${store}`;
            localStorage.setItem(`${key}_step`, String(event.stepNumber));
            localStorage.setItem(`${key}_answers`, JSON.stringify(event.answers));

            // Fire tracking events
            tracker.stepCompleted(event.stepNumber, event.stepName, event.answers);
          }}
        />
      </>
    );
  }

  // --- Phase: Redirecting to dashboard ---
  if (phase === 'redirecting') {
    return (
      <>
        <Head>
          <title>Growzilla</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: '#0A0A0B' }}
        >
          <div
            className="w-6 h-6 border-2 rounded-full animate-spin"
            style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }}
          />
        </div>
      </>
    );
  }

  // --- Phase: Account creation form ---
  return (
    <>
      <Head>
        <title>Set Up Your Account | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-zilla-black flex items-center justify-center p-4">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="card-zilla p-8">
            {/* Logo */}
            <div className="text-center mb-6">
              <span className="font-display text-3xl font-bold tracking-tight">
                <span className="text-white">GROW</span>
                <span className="text-zilla-neon">ZILLA</span>
              </span>
              <p className="mt-2 text-sm text-gray-500">
                Set up your account to get started
              </p>
            </div>

            {/* Store badge */}
            <div className="mb-6 flex items-center justify-center gap-2 px-3 py-2 bg-zilla-dark rounded-lg border border-gray-800">
              <div className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
              <span className="text-xs text-gray-400">Connected store:</span>
              <span className="text-xs text-white font-medium">{store}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  autoFocus
                  className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                />
                {email.length > 0 && !emailValid && (
                  <p className="mt-1 text-xs text-red-400">Enter a valid email address</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width:
                            passwordStrength.label === 'Too short'
                              ? '25%'
                              : passwordStrength.label === 'Fair'
                              ? '50%'
                              : passwordStrength.label === 'Good'
                              ? '75%'
                              : '100%',
                          backgroundColor: passwordStrength.color,
                        }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    tabIndex={-1}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <div className="mt-1 flex items-center gap-1.5">
                    {passwordsMatch ? (
                      <>
                        <CheckCircleIcon className="w-3.5 h-3.5 text-zilla-neon" />
                        <span className="text-xs text-zilla-neon">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <ExclamationCircleIcon className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-400">Passwords don&apos;t match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Phone - more prominent on starter tier */}
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Phone Number
                  {isStarter ? (
                    <span className="ml-1.5 text-zilla-neon/70">Recommended</span>
                  ) : (
                    <span className="ml-1.5 text-gray-600">Optional</span>
                  )}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isStarter ? 'We may reach out with tips' : '+1 (555) 000-0000'}
                  autoComplete="tel"
                  className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                />
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full btn-zilla text-sm disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-zilla-black border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-zilla-neon/70 hover:text-zilla-neon transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
