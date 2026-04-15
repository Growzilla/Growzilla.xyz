/**
 * /install-repair — post-OAuth fallback landing.
 *
 * Operator (or LLM) lands here with ?error_id=<6-char id>. The page calls
 * a server-side proxy (/api/error-lookup) that holds the admin key, fetches
 * the persisted envelope from the backend, and renders <ErrorCard>.
 *
 * If error_id is absent, the proxy 404s, or anything else fails, the page
 * still renders cleanly with three CTAs: copy error, reinstall from Shopify,
 * email support.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §6.4, §7
 *
 * SECURITY: the backend admin key is held server-side only — see
 * pages/api/error-lookup.ts. This file must never reference it.
 */

import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ErrorCard, type ErrorEnvelope } from '@/components/ErrorCard'

const APP_STORE_URL = 'https://apps.shopify.com/growzilla'
const SUPPORT_EMAIL = 'albert.elmgart@proton.me'

type LoadState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'loaded'; envelope: ErrorEnvelope }
  | { kind: 'missing' } // no error_id OR proxy failed

export default function InstallRepairPage() {
  const router = useRouter()
  const errorId = typeof router.query.error_id === 'string' ? router.query.error_id : null

  const [state, setState] = useState<LoadState>({ kind: 'idle' })

  useEffect(() => {
    if (!router.isReady) return
    if (!errorId) {
      setState({ kind: 'missing' })
      return
    }
    let cancelled = false
    setState({ kind: 'loading' })

    fetch(`/api/error-lookup?id=${encodeURIComponent(errorId)}`)
      .then(async (res) => {
        if (cancelled) return
        if (!res.ok) {
          setState({ kind: 'missing' })
          return
        }
        try {
          const body = (await res.json()) as ErrorEnvelope
          if (body?.error?.code) {
            setState({ kind: 'loaded', envelope: body })
          } else {
            setState({ kind: 'missing' })
          }
        } catch {
          setState({ kind: 'missing' })
        }
      })
      .catch(() => {
        if (!cancelled) setState({ kind: 'missing' })
      })

    return () => {
      cancelled = true
    }
  }, [router.isReady, errorId])

  const envelope: ErrorEnvelope =
    state.kind === 'loaded'
      ? state.envelope
      : {
          error: {
            id: errorId,
            code: 'install_failed',
            message:
              'Something went wrong installing Growzilla. Use one of the options below — we usually fix this within minutes.',
          },
        }

  const mailtoBody = encodeURIComponent(
    `Hi,\n\nI hit an install error.\n\nError id: ${errorId ?? '(none)'}\nURL: ${
      typeof window !== 'undefined' ? window.location.href : ''
    }\n\nWhat I was doing:\n`,
  )
  const mailtoSubject = encodeURIComponent(
    `Install failed${errorId ? ` ${errorId}` : ''}`,
  )

  return (
    <>
      <Head>
        <title>Install repair | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="relative min-h-screen" style={{ background: '#0A0A0B' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              'radial-gradient(800px 280px at 50% -40px, rgba(244,114,114,0.18), transparent 70%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-xl px-4 pt-16 pb-20">
          <div className="text-center mb-8">
            <span className="font-display text-3xl font-bold tracking-tight">
              <span className="text-white">GROW</span>
              <span className="text-zilla-neon">ZILLA</span>
            </span>
            <h1 className="mt-4 text-[20px] font-semibold text-white">Install repair</h1>
            <p className="mt-1.5 text-[13px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {state.kind === 'loading'
                ? 'Looking up the error…'
                : 'Pick the option below that fits and we will get you running.'}
            </p>
          </div>

          <div
            className="rounded-lg p-6"
            style={{
              background: '#151518',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            <ErrorCard envelope={envelope} />

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center justify-center btn-zilla text-xs px-4 py-2.5"
              >
                Reinstall from Shopify
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`}
                className="inline-flex items-center justify-center text-xs px-4 py-2.5 rounded-md"
                style={{
                  color: 'rgba(255,255,255,0.92)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)',
                }}
              >
                Email support
              </a>
            </div>

            <p className="mt-4 text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Tip: tap <span className="text-white">Copy error</span> above before emailing — the
              full envelope helps us fix it on the first reply.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
