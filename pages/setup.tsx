/**
 * /setup — Install→Demo Zero-Friction Pipeline (spec §7)
 *
 * The 4-minute window between Shopify install and first tracked link.
 * Highest-stakes route in the entire product.
 *
 * Chain (each step awaited, every error rendered inline via ErrorCard):
 *   1. POST /api/shops/provision  { shop, hmac, token }     -> { id: shopId }
 *   2. POST /api/auth/signup      { shopId, email, password, name } -> { jwt }
 *      (api.setJwt(jwt) immediately)
 *   3. POST /api/shops/{shopId}/onboarding  { ...answers }
 *   4. POST /api/shops/{shopId}/sync/start  {}
 *   5. router.push('/dashboard')
 *
 * Invariant I1 (frontend half): the shop fetch must NOT precede the
 * provisioning POST. The old proxy hit the read endpoint first, which
 * produced "Store not found". We now go straight to provision.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §6.1, §7
 */

import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

import { api, ApiError } from '@/lib/install-client'
import { ErrorCard, type ErrorEnvelope } from '@/components/ErrorCard'

const APP_STORE_URL =
  'https://apps.shopify.com/growzilla' // pending real listing slug

type ChainStep = 'provision' | 'signup' | 'onboarding' | 'sync_start'

type Stage =
  | { kind: 'collecting' }
  | { kind: 'running'; step: ChainStep }
  | { kind: 'done' }

interface OnboardingAnswers {
  goal: string
  monthly_revenue: string
  channels: string[]
  team_size: string
  current_attribution: string
  biggest_problem: string
}

const REVENUE_OPTIONS = [
  '< 50k SEK / mo',
  '50k–150k SEK / mo',
  '150k–500k SEK / mo',
  '500k–2M SEK / mo',
  '> 2M SEK / mo',
]
const TEAM_OPTIONS = ['Just me', '2–5 people', '6–20 people', '20+ people']
const CHANNEL_OPTIONS = ['Meta ads', 'TikTok ads', 'Google ads', 'Influencers / UGC', 'SEO / organic', 'Email / SMS']
const ATTRIBUTION_OPTIONS = [
  'Shopify reports only',
  'Triple Whale / Northbeam',
  'GA4 + UTMs',
  'Spreadsheets',
  'Nothing systematic',
]

function fireSetupEvent(step: ChainStep) {
  // Fail-silent telemetry per inbox proactive item.
  if (typeof window === 'undefined') return
  try {
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({ event: 'setup_step_completed', step }),
    }).catch(() => {})
  } catch {
    /* swallow */
  }
}

export default function SetupPage() {
  const router = useRouter()
  // hmac arrives in the URL too but is verified by the Shopify install
  // handler upstream; /setup itself doesn't re-check it.
  // Accept either ?token= (legacy) or ?accessToken= (Remix's native param name).
  const { shop, token: queryToken, accessToken: queryAccessToken } = router.query as {
    shop?: string
    hmac?: string
    token?: string
    accessToken?: string
  }
  const token = queryToken || queryAccessToken

  const [orgName, setOrgName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [answers, setAnswers] = useState<OnboardingAnswers>({
    goal: '',
    monthly_revenue: '',
    channels: [],
    team_size: '',
    current_attribution: '',
    biggest_problem: '',
  })

  const [stage, setStage] = useState<Stage>({ kind: 'collecting' })
  const [error, setError] = useState<ErrorEnvelope | null>(null)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordValid = password.length >= 8
  const formValid =
    orgName.trim().length > 0 &&
    ownerName.trim().length > 0 &&
    emailValid &&
    passwordValid &&
    answers.goal.trim().length > 0 &&
    !!answers.monthly_revenue &&
    answers.channels.length > 0 &&
    !!answers.team_size &&
    !!answers.current_attribution &&
    answers.biggest_problem.trim().length > 0

  // Invalid setup link → ErrorCard with App Store reinstall CTA.
  // hmac is verified upstream by the Shopify install handler; provision
  // itself only needs `shop` (domain) + `token` (accessToken). We accept
  // either ?token= or ?accessToken= so we tolerate both Remix shapes.
  const linkInvalid = router.isReady && (!shop || !token)

  function toggleChannel(value: string) {
    setAnswers((prev) => {
      const has = prev.channels.includes(value)
      return {
        ...prev,
        channels: has
          ? prev.channels.filter((c) => c !== value)
          : [...prev.channels, value],
      }
    })
  }

  async function runChain(e: React.FormEvent) {
    e.preventDefault()
    if (!formValid || !shop || !token) return
    setError(null)

    // STEP 1 — provision. Closes I1: we never fetch the shop before this POST.
    // Backend: POST /api/shops/provision { domain, accessToken, scopes?, currency? }
    //          -> { id, domain, healed }
    setStage({ kind: 'running', step: 'provision' })
    let shopId: string
    try {
      const provisioned = await api.post<{ id: string; domain: string; healed: boolean }>(
        '/api/shops/provision',
        {
          domain: shop,
          accessToken: token,
          // hmac is verified by the Shopify install handler upstream of /setup;
          // the provision endpoint itself only needs domain + accessToken.
        },
      )
      shopId = provisioned.id
      fireSetupEvent('provision')
    } catch (err) {
      handleStepError(err)
      return
    }

    // STEP 2 — signup + JWT.
    // Backend: POST /api/auth/signup
    //   { shop_domain, org_name, owner_name, owner_email, owner_password }
    //   -> { token, user, org }
    setStage({ kind: 'running', step: 'signup' })
    try {
      const signupRes = await api.post<{ token: string }>('/api/auth/signup', {
        shop_domain: shop,
        org_name: orgName.trim(),
        owner_name: ownerName.trim(),
        owner_email: email.trim(),
        owner_password: password,
      })
      api.setJwt(signupRes.token)
      fireSetupEvent('signup')
    } catch (err) {
      handleStepError(err)
      return
    }

    // STEP 3 — onboarding answers.
    setStage({ kind: 'running', step: 'onboarding' })
    try {
      await api.post(`/api/shops/${shopId}/onboarding`, answers)
      fireSetupEvent('onboarding')
    } catch (err) {
      handleStepError(err)
      return
    }

    // STEP 4 — kick sync. Backend returns immediately; sync runs server-side.
    setStage({ kind: 'running', step: 'sync_start' })
    try {
      await api.post(`/api/shops/${shopId}/sync/start`, {})
      fireSetupEvent('sync_start')
    } catch (err) {
      handleStepError(err)
      return
    }

    setStage({ kind: 'done' })
    router.push('/dashboard')
  }

  function handleStepError(err: unknown) {
    if (err instanceof ApiError) {
      setError(err.envelope)
    } else {
      setError({
        error: {
          id: null,
          code: 'unknown',
          message: err instanceof Error ? err.message : String(err),
        },
      })
    }
    setStage({ kind: 'collecting' })
  }

  // ── invalid link branch ───────────────────────────────────────────────
  if (linkInvalid) {
    return (
      <SetupShell title="Setup link invalid">
        <ErrorCard
          envelope={{
            error: {
              id: null,
              code: 'invalid_setup_link',
              message:
                'This setup link is missing required parameters. Reinstall Growzilla from your Shopify admin to start over.',
            },
          }}
        />
        <a
          href={APP_STORE_URL}
          className="mt-4 inline-flex items-center justify-center btn-zilla text-sm px-5 py-2.5"
        >
          Reinstall from Shopify
        </a>
      </SetupShell>
    )
  }

  // ── main view ─────────────────────────────────────────────────────────
  const isRunning = stage.kind === 'running'
  const isProvisionError =
    error?.error?.code === 'invalid_setup_link' ||
    error?.error?.code?.startsWith('provision')

  return (
    <SetupShell
      title={
        isRunning
          ? 'Setting up Growzilla…'
          : 'Welcome to Growzilla'
      }
      subtitle={
        isRunning
          ? 'Hang tight. We are wiring your store, account, and first sync.'
          : 'Three minutes from here to your first tracked link.'
      }
      shopBadge={shop}
    >
      {error && (
        <div className="mb-5">
          <ErrorCard envelope={error} />
          <div className="mt-3 flex flex-wrap gap-2">
            {isProvisionError ? (
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center justify-center btn-zilla text-xs px-4 py-2"
              >
                Reinstall from Shopify
              </a>
            ) : null}
            {error.error?.id ? (
              <a
                href={`/install-repair?error_id=${encodeURIComponent(error.error.id)}`}
                className="inline-flex items-center justify-center text-xs px-4 py-2 rounded-md"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
                }}
              >
                Open install repair
              </a>
            ) : null}
          </div>
        </div>
      )}

      <form onSubmit={runChain} className="space-y-5" aria-busy={isRunning}>
        <fieldset disabled={isRunning} className="space-y-5">
          <Section title="Your account">
            <Field label="Brand / company name">
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Acme Skincare"
                autoComplete="organization"
                autoFocus
                className="setup-input"
              />
            </Field>

            <Field label="Your name">
              <input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
                className="setup-input"
              />
            </Field>

            <Field label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                type="email"
                autoComplete="email"
                className="setup-input"
              />
              {email.length > 0 && !emailValid && (
                <p className="mt-1 text-[11px] text-red-400">Enter a valid email.</p>
              )}
            </Field>

            <Field
              label="Password"
              hint={passwordValid ? 'Strong enough.' : 'Min. 8 characters.'}
              hintTone={passwordValid ? 'good' : 'muted'}
            >
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="setup-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Field>
          </Section>

          <Section title="A few questions so the dashboard is useful on day 1">
            <Field label="What's your top goal for the next 90 days?">
              <input
                value={answers.goal}
                onChange={(e) => setAnswers((p) => ({ ...p, goal: e.target.value }))}
                placeholder="Scale Meta + UGC profitably"
                className="setup-input"
              />
            </Field>

            <RadioRow
              label="Current monthly revenue"
              value={answers.monthly_revenue}
              options={REVENUE_OPTIONS}
              onChange={(v) => setAnswers((p) => ({ ...p, monthly_revenue: v }))}
            />

            <Field label="Where do most of your sales come from? (pick all)">
              <div className="flex flex-wrap gap-2">
                {CHANNEL_OPTIONS.map((opt) => {
                  const active = answers.channels.includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleChannel(opt)}
                      className="text-[12px] px-3 py-1.5 rounded-md transition-colors"
                      style={{
                        background: active ? 'rgba(0,255,148,0.10)' : 'rgba(255,255,255,0.03)',
                        color: active ? '#00FF94' : 'rgba(255,255,255,0.78)',
                        boxShadow: active
                          ? 'inset 0 0 0 1px rgba(0,255,148,0.45)'
                          : 'inset 0 0 0 1px rgba(255,255,255,0.10)',
                      }}
                    >
                      {active ? '✓ ' : ''}
                      {opt}
                    </button>
                  )
                })}
              </div>
            </Field>

            <RadioRow
              label="Team size"
              value={answers.team_size}
              options={TEAM_OPTIONS}
              onChange={(v) => setAnswers((p) => ({ ...p, team_size: v }))}
            />

            <RadioRow
              label="What do you use for attribution today?"
              value={answers.current_attribution}
              options={ATTRIBUTION_OPTIONS}
              onChange={(v) => setAnswers((p) => ({ ...p, current_attribution: v }))}
            />

            <Field label="Biggest problem we should help solve first?">
              <textarea
                value={answers.biggest_problem}
                onChange={(e) =>
                  setAnswers((p) => ({ ...p, biggest_problem: e.target.value }))
                }
                rows={3}
                placeholder="e.g. iOS killed our Meta attribution; we cannot tell which UGC posts drive sales."
                className="setup-input resize-none"
              />
            </Field>
          </Section>
        </fieldset>

        <button
          type="submit"
          disabled={!formValid || isRunning}
          className="w-full btn-zilla text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunning ? <RunningLabel step={stage.step} /> : 'Finish setup → open dashboard'}
        </button>
      </form>

      <p className="mt-5 text-center text-[11px] text-gray-600">
        Already set up?{' '}
        <a href="/signin" className="text-zilla-neon/70 hover:text-zilla-neon transition-colors">
          Sign in
        </a>
      </p>

      <style jsx>{`
        :global(.setup-input) {
          width: 100%;
          padding: 10px 12px;
          background: #0f0f12;
          color: rgba(255, 255, 255, 0.95);
          font-size: 13px;
          border-radius: 6px;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          transition: box-shadow 150ms ease-out;
        }
        :global(.setup-input::placeholder) {
          color: rgba(255, 255, 255, 0.32);
        }
        :global(.setup-input:focus) {
          outline: none;
          box-shadow: inset 0 0 0 1px rgba(0, 255, 148, 0.45);
        }
      `}</style>
    </SetupShell>
  )
}

// ── shell + helpers ─────────────────────────────────────────────────────

function SetupShell({
  title,
  subtitle,
  shopBadge,
  children,
}: {
  title: string
  subtitle?: string
  shopBadge?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>{title} | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Hero strip — Zilla landing-mode glow (per spec) */}
      <div
        className="relative min-h-screen"
        style={{ background: '#0A0A0B' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              'radial-gradient(800px 280px at 50% -40px, rgba(0,255,148,0.18), transparent 70%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-xl px-4 pt-16 pb-20">
          <div className="text-center mb-8">
            <span className="font-display text-3xl font-bold tracking-tight">
              <span className="text-white">GROW</span>
              <span className="text-zilla-neon">ZILLA</span>
            </span>
            <h1 className="mt-4 text-[20px] font-semibold text-white">{title}</h1>
            {subtitle && (
              <p className="mt-1.5 text-[13px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {subtitle}
              </p>
            )}
            {shopBadge && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
                style={{
                  background: 'rgba(0,255,148,0.06)',
                  boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.30)',
                }}
              >
                <CheckCircleIcon className="w-3.5 h-3.5 text-zilla-neon" />
                <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Connected store: <span className="text-white font-medium">{shopBadge}</span>
                </span>
              </div>
            )}
          </div>

          {/* Content card — dashboard-clean (per spec) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="rounded-lg p-6"
            style={{
              background: '#151518',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2
        className="text-[12px] uppercase tracking-wider"
        style={{ color: 'rgba(255,255,255,0.48)' }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function Field({
  label,
  hint,
  hintTone = 'muted',
  children,
}: {
  label: string
  hint?: string
  hintTone?: 'muted' | 'good'
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[12px] mb-1.5" style={{ color: 'rgba(255,255,255,0.72)' }}>
        {label}
      </label>
      {children}
      {hint && (
        <p
          className="mt-1 text-[11px]"
          style={{ color: hintTone === 'good' ? '#00FF94' : 'rgba(255,255,255,0.45)' }}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

function RadioRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className="text-[12px] px-3 py-1.5 rounded-md transition-colors"
              style={{
                background: active ? 'rgba(0,255,148,0.10)' : 'rgba(255,255,255,0.03)',
                color: active ? '#00FF94' : 'rgba(255,255,255,0.78)',
                boxShadow: active
                  ? 'inset 0 0 0 1px rgba(0,255,148,0.45)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.10)',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </Field>
  )
}

const STEP_LABELS: Record<ChainStep, string> = {
  provision: 'Provisioning your shop…',
  signup: 'Creating your account…',
  onboarding: 'Saving your answers…',
  sync_start: 'Starting first sync…',
}

function RunningLabel({ step }: { step: ChainStep }) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-zilla-black border-t-transparent rounded-full animate-spin" />
      {STEP_LABELS[step]}
    </span>
  )
}
