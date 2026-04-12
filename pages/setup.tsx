import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { SyncLoadingScreen } from '@/components/onboarding/SyncLoadingScreen';
import { OnboardingQuestionnaire, type OnboardingAnswers } from '@/components/onboarding/OnboardingQuestionnaire';
import { useOnboardingTracker } from '@/hooks/useEventTracker';
import { getShop, postOnboardingProfile, postEvent, type ShopResponse, type OnboardingProfileRequest } from '@/lib/api-client';
import { setActiveShop, addKnownShop } from '@/components/whop/StoreSelector';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** New stepper flow: checking → connected → profile → plan → complete */
type SetupStep = 'checking' | 'connected' | 'profile' | 'plan' | 'complete';

/** Legacy flow kept for backward compat with ?store= param */
type LegacyPhase = 'form' | 'syncing' | 'onboarding' | 'redirecting';

const STORAGE_PREFIX = 'gz_onboarding_';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'Get started with basic attribution',
    features: ['UTM link generation', 'Basic attribution', 'Up to 100 orders/mo'],
    accent: false,
  },
  {
    id: 'brand',
    name: 'Brand',
    price: '$97',
    period: '/mo',
    description: 'Full attribution + creator tracking',
    features: ['Everything in Starter', 'Sankey visualization', 'Creator management', 'Meta Ads integration', 'Unlimited orders'],
    accent: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$997',
    period: '/mo',
    description: 'Multi-brand + dedicated support',
    features: ['Everything in Brand', 'Multi-store dashboard', 'Custom integrations', 'Priority support', 'API access'],
    accent: false,
  },
];

const INDUSTRIES = [
  'Fashion & Apparel',
  'Beauty & Skincare',
  'Health & Fitness',
  'Food & Beverage',
  'Electronics',
  'Home & Garden',
  'Sports & Outdoors',
  'Jewelry & Accessories',
  'Other',
];

const REVENUE_RANGES = [
  'Just starting',
  '$1k - $10k/mo',
  '$10k - $50k/mo',
  '$50k - $100k/mo',
  '$100k+/mo',
];

const GOALS = [
  { id: 'creator_sales', label: 'Track creator-driven sales' },
  { id: 'meta_data', label: 'Visualize Meta ads data' },
  { id: 'reduce_cac', label: 'Reduce customer acquisition cost' },
  { id: 'attribution', label: 'Understand multi-touch attribution' },
  { id: 'other', label: 'Something else' },
];

// ===========================================================================
// Setup Page — supports both NEW flow (?shop=) and LEGACY flow (?store=)
// ===========================================================================

export default function SetupPage() {
  const router = useRouter();
  const rawQuery = router.query as { shop?: string; store?: string; tier?: string };

  // Support both ?shop= (new) and ?store= (legacy)
  const shopDomain = rawQuery.shop || rawQuery.store || '';
  const isLegacyFlow = !rawQuery.shop && !!rawQuery.store;
  const tier = rawQuery.tier;

  // ---------------------------------------------------------------------------
  // NEW FLOW state (?shop= param)
  // ---------------------------------------------------------------------------
  const [step, setStep] = useState<SetupStep>('checking');
  const [shopData, setShopData] = useState<ShopResponse | null>(null);
  const [checkError, setCheckError] = useState('');

  // Manual domain entry removed — store is always known from OAuth install (?shop= param)
  // Kept for backward compat: if no ?shop param, show informational message
  const [manualDomain, setManualDomain] = useState('');
  const [manualMode, setManualMode] = useState(false);

  // Profile form
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  // Plan selection
  const [selectedPlan, setSelectedPlan] = useState('brand');

  // ---------------------------------------------------------------------------
  // LEGACY FLOW state (?store= param) — preserved for backward compat
  // ---------------------------------------------------------------------------
  const [legacyPhase, setLegacyPhase] = useState<LegacyPhase>('form');
  const [legacyShopId, setLegacyShopId] = useState('');
  const legacyTracker = useOnboardingTracker(legacyShopId || 'unknown');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // =========================================================================
  // NEW FLOW: Check shop connection on mount
  // =========================================================================

  const activeDomain = manualMode ? manualDomain.trim() : shopDomain;

  const checkShop = useCallback(async (domain: string) => {
    if (!domain) return;
    setStep('checking');
    setCheckError('');

    try {
      const shop = await getShop(domain);
      setShopData(shop);

      // Persist to store selector
      setActiveShop({ domain: shop.domain, name: shop.name, id: shop.id });
      addKnownShop({ domain: shop.domain, name: shop.name, id: shop.id });

      // Track event
      postEvent({
        event: 'setup.shop_connected',
        shop_id: shop.id,
        properties: { domain: shop.domain },
      }).catch(() => {});

      // Check if already completed onboarding
      const key = `${STORAGE_PREFIX}${domain}`;
      const completed = localStorage.getItem(`${key}_completed`);
      if (completed === 'true') {
        router.replace(`/whop?shop=${encodeURIComponent(domain)}`);
        return;
      }

      setStep('connected');

      // Auto-advance after 1.5s
      setTimeout(() => setStep('profile'), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (msg.includes('404')) {
        setCheckError('Store not found. Make sure Growzilla is installed on this store.');
      } else {
        setCheckError('Unable to connect. Please try again.');
      }
      setStep('checking');
    }
  }, [router]);

  // Auto-check on mount when ?shop= is present (new flow only)
  useEffect(() => {
    if (!router.isReady || isLegacyFlow) return;
    if (shopDomain) {
      checkShop(shopDomain);
    } else {
      setManualMode(true);
    }
  }, [router.isReady, shopDomain, isLegacyFlow, checkShop]);

  // =========================================================================
  // NEW FLOW: Profile submit
  // =========================================================================

  const handleProfileSubmit = useCallback(async () => {
    if (!shopData) return;
    setProfileSubmitting(true);

    const profile: OnboardingProfileRequest = {
      business_name: businessName.trim() || undefined,
      industry: industry || undefined,
      monthly_revenue: monthlyRevenue || undefined,
      main_goal: mainGoal || undefined,
    };

    try {
      await postOnboardingProfile(shopData.id, profile);
    } catch {
      // Non-blocking: profile save is best-effort
      console.warn('[Setup] Profile save failed, continuing...');
    }

    // Track event
    postEvent({
      event: 'setup.profile_completed',
      shop_id: shopData.id,
      properties: { ...profile } as Record<string, unknown>,
    }).catch(() => {});

    // Persist locally
    const key = `${STORAGE_PREFIX}${shopData.domain}`;
    localStorage.setItem(`${key}_profile`, JSON.stringify(profile));

    setProfileSubmitting(false);
    setStep('plan');
  }, [shopData, businessName, industry, monthlyRevenue, mainGoal]);

  // =========================================================================
  // NEW FLOW: Plan select & complete
  // =========================================================================

  const handlePlanSelect = useCallback(async () => {
    if (!shopData) return;

    // Track event
    postEvent({
      event: 'setup.plan_selected',
      shop_id: shopData.id,
      properties: { plan: selectedPlan },
    }).catch(() => {});

    // Persist completion
    const key = `${STORAGE_PREFIX}${shopData.domain}`;
    localStorage.setItem(`${key}_completed`, 'true');
    localStorage.setItem(`${key}_plan`, selectedPlan);

    // Save onboarding answers for dashboard personalization
    localStorage.setItem(`${key}_answers`, JSON.stringify({
      mainGoal,
      selectedPlan,
      industry,
      monthlyRevenue,
    }));

    setStep('complete');

    // Redirect to dashboard
    setTimeout(() => {
      router.push(`/whop?shop=${encodeURIComponent(shopData.domain)}`);
    }, 800);
  }, [shopData, selectedPlan, mainGoal, industry, monthlyRevenue, router]);

  // =========================================================================
  // LEGACY FLOW: Resume + handlers (unchanged logic, refactored to coexist)
  // =========================================================================

  useEffect(() => {
    if (!router.isReady || !isLegacyFlow || !shopDomain) return;
    const key = `${STORAGE_PREFIX}${shopDomain}`;
    const savedPhase = localStorage.getItem(`${key}_phase`) as LegacyPhase | null;
    const savedShopId = localStorage.getItem(`${key}_shopId`);
    const savedToken = localStorage.getItem('gz_token');
    const completed = localStorage.getItem(`${key}_completed`);

    if (completed === 'true' && savedToken) {
      router.replace('/whop');
      return;
    }

    if (savedPhase && savedPhase !== 'form' && savedToken && savedShopId) {
      setLegacyShopId(savedShopId);
      setLegacyPhase(savedPhase);
    }
  }, [router.isReady, shopDomain, isLegacyFlow, router]);

  useEffect(() => {
    if (!isLegacyFlow || !shopDomain || legacyPhase === 'form') return;
    const key = `${STORAGE_PREFIX}${shopDomain}`;
    localStorage.setItem(`${key}_phase`, legacyPhase);
    if (legacyShopId) localStorage.setItem(`${key}_shopId`, legacyShopId);
  }, [isLegacyFlow, shopDomain, legacyPhase, legacyShopId]);

  const handleSyncComplete = useCallback(() => {
    setLegacyPhase('onboarding');
    legacyTracker.started();
  }, [legacyTracker]);

  const handleOnboardingComplete = useCallback(async (answers: OnboardingAnswers) => {
    setLegacyPhase('redirecting');
    const key = `${STORAGE_PREFIX}${shopDomain}`;
    localStorage.setItem(`${key}_completed`, 'true');
    localStorage.setItem(`${key}_answers`, JSON.stringify(answers));
    localStorage.setItem(`${key}_tour`, answers.tourChoice || 'skip');
    legacyTracker.completed({ answers });
    const token = localStorage.getItem('gz_token');
    fetch('/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ shop_id: legacyShopId, store_domain: shopDomain, answers }),
    }).catch(() => {});
    router.push('/whop');
  }, [shopDomain, legacyShopId, legacyTracker, router]);

  const isStarter = tier === 'starter';
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const passwordLongEnough = password.length >= 8;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    name.trim().length > 0 &&
    emailValid &&
    passwordLongEnough &&
    passwordsMatch &&
    !!shopDomain &&
    !submitting;

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

  const handleLegacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store: shopDomain,
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
      if (data.token) localStorage.setItem('gz_token', data.token);
      if (data.shopId) setLegacyShopId(data.shopId);
      setLegacyPhase('syncing');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  // =========================================================================
  // RENDER
  // =========================================================================

  // --- Not ready yet ---
  if (!router.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0B' }}>
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  // =========================================================================
  // LEGACY FLOW RENDERS (?store= param)
  // =========================================================================

  if (isLegacyFlow) {
    // --- Legacy: Syncing ---
    if (legacyPhase === 'syncing') {
      return (
        <>
          <Head><title>Syncing Store | Growzilla</title><meta name="robots" content="noindex, nofollow" /></Head>
          <SyncLoadingScreen shopId={legacyShopId} onSyncComplete={handleSyncComplete} />
        </>
      );
    }

    // --- Legacy: Onboarding questionnaire ---
    if (legacyPhase === 'onboarding' && shopDomain) {
      return (
        <>
          <Head><title>Get Started | Growzilla</title><meta name="robots" content="noindex, nofollow" /></Head>
          <OnboardingQuestionnaire
            shopId={legacyShopId}
            shopDomain={shopDomain}
            onComplete={handleOnboardingComplete}
            onStepEvent={(event) => {
              const key = `${STORAGE_PREFIX}${shopDomain}`;
              localStorage.setItem(`${key}_step`, String(event.stepNumber));
              localStorage.setItem(`${key}_answers`, JSON.stringify(event.answers));
              legacyTracker.stepCompleted(event.stepNumber, event.stepName, event.answers);
            }}
          />
        </>
      );
    }

    // --- Legacy: Redirecting ---
    if (legacyPhase === 'redirecting') {
      return (
        <>
          <Head><title>Growzilla</title><meta name="robots" content="noindex, nofollow" /></Head>
          <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0B' }}>
            <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }} />
          </div>
        </>
      );
    }

    // --- Legacy: Account creation form ---
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
              <div className="text-center mb-6">
                <span className="font-display text-3xl font-bold tracking-tight">
                  <span className="text-white">GROW</span>
                  <span className="text-zilla-neon">ZILLA</span>
                </span>
                <p className="mt-2 text-sm text-gray-500">Set up your account to get started</p>
              </div>
              <div className="mb-6 flex items-center justify-center gap-2 px-3 py-2 bg-zilla-dark rounded-lg border border-gray-800">
                <div className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
                <span className="text-xs text-gray-400">Connected store:</span>
                <span className="text-xs text-white font-medium">{shopDomain}</span>
              </div>
              <form onSubmit={handleLegacySubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                  <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" autoFocus className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors" />
                  {email.length > 0 && !emailValid && <p className="mt-1 text-xs text-red-400">Enter a valid email address</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
                  <div className="relative">
                    <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password" className="w-full px-4 py-3 pr-12 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors" tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordStrength && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: passwordStrength.label === 'Too short' ? '25%' : passwordStrength.label === 'Fair' ? '50%' : passwordStrength.label === 'Good' ? '75%' : '100%', backgroundColor: passwordStrength.color }} />
                      </div>
                      <span className="text-xs" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-400 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input id="confirmPassword" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" autoComplete="new-password" className="w-full px-4 py-3 pr-12 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors" tabIndex={-1} aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                      {showConfirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <div className="mt-1 flex items-center gap-1.5">
                      {passwordsMatch ? (<><CheckCircleIcon className="w-3.5 h-3.5 text-zilla-neon" /><span className="text-xs text-zilla-neon">Passwords match</span></>) : (<><ExclamationCircleIcon className="w-3.5 h-3.5 text-red-400" /><span className="text-xs text-red-400">Passwords don&apos;t match</span></>)}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-400 mb-1.5">Phone Number {isStarter ? <span className="ml-1.5 text-zilla-neon/70">Recommended</span> : <span className="ml-1.5 text-gray-600">Optional</span>}</label>
                  <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={isStarter ? 'We may reach out with tips' : '+1 (555) 000-0000'} autoComplete="tel" className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors" />
                </div>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-red-400">
                    <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
                  </motion.div>
                )}
                <button type="submit" disabled={!canSubmit} className="w-full btn-zilla text-sm disabled:opacity-40 disabled:cursor-not-allowed mt-2">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-zilla-black border-t-transparent rounded-full animate-spin" />Creating account...
                    </span>
                  ) : 'Create Account'}
                </button>
              </form>
              <p className="mt-6 text-center text-xs text-gray-600">
                Already have an account?{' '}<a href="/signin" className="text-zilla-neon/70 hover:text-zilla-neon transition-colors">Sign in</a>
              </p>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // =========================================================================
  // NEW FLOW RENDERS (?shop= param or manual entry)
  // =========================================================================

  const stepNumber = step === 'checking' ? 1 : step === 'connected' ? 1 : step === 'profile' ? 2 : step === 'plan' ? 3 : 3;

  return (
    <>
      <Head>
        <title>
          {step === 'checking' ? 'Connecting Store' : step === 'profile' ? 'Business Profile' : step === 'plan' ? 'Choose Plan' : 'Setup'} | Growzilla
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A0A0B' }}>
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-white">GROW</span>
            <span style={{ color: '#00FF94' }}>ZILLA</span>
          </span>
          {!manualMode && shopDomain && (
            <span className="text-xs text-gray-500 font-mono">{shopDomain.replace('.myshopify.com', '')}</span>
          )}
        </header>

        {/* Step indicator */}
        {step !== 'checking' && step !== 'complete' && (
          <div className="flex items-center justify-center gap-2 pt-6 pb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-200"
                  style={{
                    backgroundColor: s < stepNumber ? '#00FF94' : s === stepNumber ? 'rgba(0,255,148,0.15)' : 'rgba(255,255,255,0.05)',
                    color: s < stepNumber ? '#0A0A0B' : s === stepNumber ? '#00FF94' : '#6B7280',
                    border: s === stepNumber ? '1px solid rgba(0,255,148,0.3)' : '1px solid transparent',
                  }}
                >
                  {s < stepNumber ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  ) : s}
                </div>
                {s < 3 && (
                  <div className="w-8 h-px" style={{ backgroundColor: s < stepNumber ? '#00FF94' : 'rgba(255,255,255,0.08)' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            {/* --- Step: Checking / Manual Entry --- */}
            {step === 'checking' && (
              <motion.div
                key="checking"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-sm text-center"
              >
                {manualMode ? (
                  <div className="rounded-xl p-8" style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h2 className="text-lg font-semibold text-white mb-2">Install Growzilla first</h2>
                    <p className="text-sm text-gray-400 mb-4">Your store is automatically detected when you install Growzilla from the Shopify App Store.</p>
                    <a
                      href="https://apps.shopify.com/growzilla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150"
                      style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                    >
                      Install from Shopify App Store
                    </a>
                    {checkError && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 flex items-center justify-center gap-1.5 mt-4">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {checkError}
                      </motion.p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="w-8 h-8 mx-auto mb-4 border-2 rounded-full animate-spin" style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }} />
                    <p className="text-sm text-gray-400">Connecting to {shopDomain.replace('.myshopify.com', '')}...</p>
                    {checkError && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-xl p-4" style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <p className="text-sm text-red-400 mb-3">{checkError}</p>
                        <button
                          onClick={() => { setManualMode(true); setCheckError(''); }}
                          className="text-xs font-medium transition-colors"
                          style={{ color: '#00FF94' }}
                        >
                          Need help?
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* --- Step: Connected (brief confirmation) --- */}
            {step === 'connected' && shopData && (
              <motion.div
                key="connected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}>
                  <CheckCircleIcon className="w-7 h-7" style={{ color: '#00FF94' }} />
                </div>
                <h2 className="text-lg font-semibold text-white mb-1">Store connected</h2>
                <p className="text-sm text-gray-400">{shopData.domain.replace('.myshopify.com', '')}</p>
              </motion.div>
            )}

            {/* --- Step: Profile --- */}
            {step === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-lg"
              >
                <div className="rounded-xl p-8" style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h2 className="text-lg font-semibold text-white mb-1">Tell us about your business</h2>
                  <p className="text-sm text-gray-400 mb-6">This helps us personalize your dashboard</p>

                  <div className="space-y-5">
                    {/* Business name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Business name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your brand name"
                        autoFocus
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                        style={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors appearance-none"
                        style={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <option value="" className="text-gray-500">Select industry</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    {/* Monthly revenue */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Monthly revenue</label>
                      <select
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors appearance-none"
                        style={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <option value="" className="text-gray-500">Select range</option>
                        {REVENUE_RANGES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    {/* Main goal */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2.5">What&apos;s your main goal?</label>
                      <div className="grid grid-cols-1 gap-2">
                        {GOALS.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setMainGoal(g.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left transition-all duration-150"
                            style={{
                              backgroundColor: mainGoal === g.id ? 'rgba(0,255,148,0.08)' : 'rgba(255,255,255,0.02)',
                              border: mainGoal === g.id ? '1px solid rgba(0,255,148,0.25)' : '1px solid rgba(255,255,255,0.06)',
                              color: mainGoal === g.id ? '#E5E7EB' : '#9CA3AF',
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                border: mainGoal === g.id ? '2px solid #00FF94' : '2px solid rgba(255,255,255,0.15)',
                              }}
                            >
                              {mainGoal === g.id && (
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00FF94' }} />
                              )}
                            </div>
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={() => setStep('plan')}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      Skip for now
                    </button>
                    <button
                      onClick={handleProfileSubmit}
                      disabled={profileSubmitting}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50"
                      style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                    >
                      {profileSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-[#0A0A0B] border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </span>
                      ) : 'Continue'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Step: Plan selection --- */}
            {step === 'plan' && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-3xl"
              >
                <div className="text-center mb-8">
                  <h2 className="text-lg font-semibold text-white mb-1">Choose your plan</h2>
                  <p className="text-sm text-gray-400">You can change this anytime</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className="rounded-xl p-6 text-left transition-all duration-150 relative"
                        style={{
                          backgroundColor: '#151518',
                          border: isSelected
                            ? '1px solid rgba(0,255,148,0.4)'
                            : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {plan.accent && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}>
                            Popular
                          </div>
                        )}
                        <h3 className="text-base font-semibold text-white mb-1">{plan.name}</h3>
                        <div className="flex items-baseline gap-0.5 mb-2">
                          <span className="text-2xl font-bold text-white">{plan.price}</span>
                          <span className="text-xs text-gray-500">{plan.period}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">{plan.description}</p>
                        <ul className="space-y-2">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                              <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#00FF94' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00FF94' }}>
                            <svg className="w-3 h-3" style={{ color: '#0A0A0B' }} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-center mt-8">
                  <button
                    onClick={handlePlanSelect}
                    className="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                  >
                    Get started with {PLANS.find((p) => p.id === selectedPlan)?.name}
                  </button>
                </div>
              </motion.div>
            )}

            {/* --- Step: Complete (redirect) --- */}
            {step === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-center"
              >
                <div className="w-8 h-8 mx-auto mb-4 border-2 rounded-full animate-spin" style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }} />
                <p className="text-sm text-gray-400">Setting up your dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
