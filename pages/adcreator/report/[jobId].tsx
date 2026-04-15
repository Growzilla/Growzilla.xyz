import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AdCard,
  BriefCard,
  BrandSnapshot,
  CompetitorCard,
  PhaseChecklist,
  type BriefCardProps,
  type LongevityDistribution,
  type PhaseItem,
} from '@/components/adcreator'
import { StickyPDFButton } from '@/components/ui/StickyPDFButton'
import type { LongevityFlag } from '@/components/ui/LongevityBadge'

/**
 * /adcreator/report/[jobId] — the viral artifact.
 *
 * Four semantic states map to backend /api/adcreator/result/{job_id} HTTP statuses:
 *   - 200 COMPLETE  → full report renders.
 *   - 409 PROCESSING (RUNNING/PENDING/QUEUED) → PhaseChecklist + 5s auto-refresh.
 *   - 422 ERROR     → error card + collapsible error_text.
 *   - 404 MISSING   → "cannot find that report" + CTA to /adcreator.
 *
 * `?pdf=1` → PDF-mode stylesheet (no sticky, no animations, A4-safe, watermark).
 * AdCard cap of 60 prevents catastrophic render on edge cases (100+ ads).
 */

interface ReportData {
  brand: {
    domain: string
    name?: string
    logoUrl?: string
    productSummary?: string
    marketIso?: string
    generatedAt: string
  }
  competitors: Array<{
    id?: string
    name: string
    url: string
    activeAdCount: number
    distribution: LongevityDistribution
    metaAdLibraryUrl?: string
  }>
  ads: Array<{
    id: string
    hook: string
    thumbnailUrl?: string
    ratio?: '4:5' | '16:9'
    angle: string
    longevityFlag: LongevityFlag
    daysActive?: number
    competitorName: string
    metaAdLibraryUrl?: string
  }>
  briefs: BriefCardProps[]
  meta: {
    totalAdsScraped: number
    scrapedAt: string
  }
}

const AD_RENDER_CAP = 60
const POLL_INTERVAL_MS = 5000

const DEFAULT_PHASE_ITEMS: PhaseItem[] = [
  { id: 'intake', label: 'Intake & brand lookup', status: 'running' },
  { id: 'discovery', label: 'Competitor discovery', status: 'pending' },
  { id: 'scrape', label: 'Scraping Meta Ad Library', status: 'pending' },
  { id: 'synthesis', label: 'Tagging ads & building angle map', status: 'pending' },
  { id: 'briefs', label: 'Generating 5 ready-to-run briefs', status: 'pending' },
  { id: 'persist', label: 'Finalizing PDF artifact', status: 'pending' },
]

type FetchState =
  | { kind: 'loading' }
  | { kind: 'complete'; data: ReportData }
  | { kind: 'processing'; startedAt: number; now: number }
  | { kind: 'errored'; message: string; errorText?: string }
  | { kind: 'missing' }

export default function AdcreatorReportPage() {
  const router = useRouter()
  const jobIdRaw = router.query.jobId
  const jobId = typeof jobIdRaw === 'string' ? jobIdRaw : Array.isArray(jobIdRaw) ? jobIdRaw[0] : ''
  const pdfMode = router.query.pdf === '1'

  const [fetchState, setFetchState] = useState<FetchState>({ kind: 'loading' })
  const [showAllAds, setShowAllAds] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const processingStartRef = useRef<number | null>(null)

  // Fetch report data — re-runs on jobId. Polls every 5s while in processing state.
  useEffect(() => {
    if (!jobId) return
    let cancelled = false
    let pollTimer: ReturnType<typeof setTimeout> | null = null
    let elapsedTimer: ReturnType<typeof setInterval> | null = null

    async function load() {
      try {
        const r = await fetch(`/api/adcreator/result/${encodeURIComponent(jobId)}`)
        if (cancelled) return

        if (r.status === 404) {
          setFetchState({ kind: 'missing' })
          return
        }

        if (r.status === 409) {
          // Still processing — re-poll every 5s and track elapsed time from first entry.
          if (processingStartRef.current == null) processingStartRef.current = Date.now()
          setFetchState({
            kind: 'processing',
            startedAt: processingStartRef.current,
            now: Date.now(),
          })
          pollTimer = setTimeout(() => {
            if (!cancelled) load()
          }, POLL_INTERVAL_MS)
          return
        }

        if (r.status === 422) {
          // Job errored out.
          let errorText: string | undefined
          let message = 'Something went wrong generating your report.'
          try {
            const body = (await r.json()) as {
              detail?: string
              error?: { error_text?: string; code?: string } | string
              error_text?: string
              message?: string
            }
            if (typeof body.error === 'object' && body.error?.error_text) {
              errorText = body.error.error_text
            } else if (typeof body.error === 'string') {
              errorText = body.error
            } else if (body.error_text) {
              errorText = body.error_text
            } else if (typeof body.detail === 'string') {
              errorText = body.detail
            }
            if (body.message) message = body.message
          } catch {
            /* body may not be JSON — ignore */
          }
          setFetchState({ kind: 'errored', message, errorText })
          return
        }

        if (!r.ok) {
          throw new Error(`Result fetch failed: ${r.status}`)
        }

        const data = (await r.json()) as ReportData
        setFetchState({ kind: 'complete', data })
      } catch (err) {
        if (cancelled) return
        setFetchState({
          kind: 'errored',
          message: err instanceof Error ? err.message : 'Failed to load report',
        })
      }
    }

    load()
    // Tick elapsed counter every 1s while processing, independent of network poll.
    elapsedTimer = setInterval(() => {
      if (cancelled) return
      setFetchState((prev) =>
        prev.kind === 'processing' ? { ...prev, now: Date.now() } : prev
      )
    }, 1000)

    return () => {
      cancelled = true
      if (pollTimer) clearTimeout(pollTimer)
      if (elapsedTimer) clearInterval(elapsedTimer)
    }
  }, [jobId])

  // Group ads by angle for visual coherence.
  const adsByAngle = useMemo(() => {
    if (fetchState.kind !== 'complete') return new Map<string, ReportData['ads']>()
    const map = new Map<string, ReportData['ads']>()
    const ads = showAllAds ? fetchState.data.ads : fetchState.data.ads.slice(0, AD_RENDER_CAP)
    for (const ad of ads) {
      const key = ad.angle || 'Other'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(ad)
    }
    return map
  }, [fetchState, showAllAds])

  async function downloadPDF(currentJobId: string) {
    setPdfLoading(true)
    setPdfError(null)
    try {
      const r = await fetch(`/api/adcreator/pdf/${encodeURIComponent(currentJobId)}`, {
        method: 'POST',
      })
      if (!r.ok) {
        throw new Error(`PDF generation failed: ${r.status}`)
      }
      const data = (await r.json()) as { url?: string }
      if (data.url) {
        window.open(data.url, '_blank', 'noopener,noreferrer')
      } else {
        throw new Error('PDF endpoint returned no url')
      }
    } catch (err) {
      console.error('[adcreator] pdf failed', err)
      setPdfError(err instanceof Error ? err.message : 'PDF generation failed.')
    } finally {
      setPdfLoading(false)
    }
  }

  function trackCalendlyClick() {
    if (!jobId) return
    fetch('/api/adcreator/calendly-clicked', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId }),
      keepalive: true,
    }).catch(() => {
      /* fire-and-forget — don't block the user */
    })
  }

  if (!jobId || fetchState.kind === 'loading') {
    return <ReportShell pdfMode={pdfMode}>
      <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Loading…</div>
    </ReportShell>
  }

  // MISSING — 404 from backend. Job never existed or was deleted.
  if (fetchState.kind === 'missing') {
    return (
      <ReportShell pdfMode={pdfMode}>
        <div
          className="rounded-lg p-6 text-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <div className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
            We cannot find that report
          </div>
          <p className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
            It may have been deleted. Start a new one.
          </p>
          <p className="mt-2 text-[11px] tabular-nums" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Job ID: {jobId}
          </p>
          <Link
            href="/adcreator"
            className="inline-block mt-5 rounded-md px-4 py-2 text-[13px] font-semibold text-black"
            style={{ background: '#00FF94' }}
          >
            Start a new report
          </Link>
        </div>
      </ReportShell>
    )
  }

  // PROCESSING — 409 from backend (RUNNING|PENDING|QUEUED). Auto-refresh every 5s.
  if (fetchState.kind === 'processing') {
    const elapsedMs = Math.max(0, fetchState.now - fetchState.startedAt)
    // Estimated total ~180s (3 min landing promise). Never negative.
    const estimatedTotalMs = 180_000
    const estimatedRemainingMs = Math.max(0, estimatedTotalMs - elapsedMs)
    return (
      <ReportShell pdfMode={pdfMode}>
        <div className="space-y-4">
          <div
            className="rounded-lg p-5 text-center"
            style={{
              background: 'rgba(0,255,148,0.04)',
              boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.18)',
            }}
          >
            <div className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
              Your report is still processing
            </div>
            <p className="mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
              This page will auto-refresh when ready.
            </p>
            <p className="mt-2 text-[11px] tabular-nums" style={{ color: 'rgba(255,255,255,0.40)' }}>
              Job ID: {jobId}
            </p>
          </div>
          <PhaseChecklist
            items={DEFAULT_PHASE_ITEMS}
            elapsedMs={elapsedMs}
            estimatedRemainingMs={estimatedRemainingMs}
          />
          <Link
            href={`/adcreator/run/${encodeURIComponent(jobId)}`}
            className="inline-block text-[12px] font-semibold underline-offset-2 hover:underline"
            style={{ color: 'rgba(0,255,148,0.85)' }}
          >
            Watch live progress ↗
          </Link>
        </div>
      </ReportShell>
    )
  }

  // ERROR — 422 from backend or unrecoverable fetch failure.
  if (fetchState.kind === 'errored') {
    return (
      <ReportShell pdfMode={pdfMode}>
        <div
          className="rounded-lg p-6"
          style={{
            background: 'rgba(244,114,114,0.05)',
            boxShadow: 'inset 0 0 0 1px rgba(244,114,114,0.25)',
          }}
        >
          <div className="text-[14px] font-semibold text-center" style={{ color: '#F87171' }}>
            Something went wrong generating your report
          </div>
          <p className="mt-2 text-[13px] text-center" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {fetchState.message} We have logged it.{' '}
            <a
              href="mailto:hello@growzilla.xyz?subject=Adcreator%20error"
              className="underline-offset-2 hover:underline"
              style={{ color: 'rgba(0,255,148,0.85)' }}
            >
              Please email us
            </a>{' '}
            or try again.
          </p>
          <p className="mt-2 text-[11px] tabular-nums text-center" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Job ID: {jobId}
          </p>
          {fetchState.errorText && (
            <details className="mt-5 text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <summary className="cursor-pointer hover:text-white/80">Technical details</summary>
              <pre
                className="mt-2 p-3 rounded-md text-[11px] overflow-x-auto whitespace-pre-wrap"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  color: 'rgba(255,255,255,0.72)',
                  fontFamily: 'JetBrains Mono, SF Mono, Menlo, monospace',
                }}
              >
                {fetchState.errorText}
              </pre>
            </details>
          )}
          <div className="mt-5 text-center">
            <Link
              href="/adcreator"
              className="inline-block rounded-md px-4 py-2 text-[13px] font-semibold text-black"
              style={{ background: '#00FF94' }}
            >
              Start a new report
            </Link>
          </div>
        </div>
      </ReportShell>
    )
  }

  const { data } = fetchState
  const totalAds = data.ads.length

  return (
    <>
      <Head>
        <title>{`Ad Intelligence Report · ${data.brand.name ?? data.brand.domain} | Growzilla`}</title>
        <meta name="robots" content="noindex" />
        {pdfMode && <style dangerouslySetInnerHTML={{ __html: PDF_STYLESHEET }} />}
      </Head>

      {!pdfMode && (
        <StickyPDFButton jobId={jobId} onClick={downloadPDF} loading={pdfLoading} />
      )}

      <main
        className="min-h-screen pb-24"
        style={{
          background: pdfMode ? '#FFFFFF' : '#050608',
          color: pdfMode ? '#0A0A0B' : 'rgba(255,255,255,0.95)',
          fontFamily: 'Inter, "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        {/* Sticky header */}
        <header
          className={pdfMode ? '' : 'sticky top-0 z-30 backdrop-blur'}
          style={{
            background: pdfMode ? 'transparent' : 'rgba(5,6,8,0.85)',
            borderBottom: pdfMode ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-3">
            {data.brand.logoUrl ? (
              <Image src={data.brand.logoUrl} alt={data.brand.name ?? data.brand.domain} width={28} height={28} unoptimized style={{ borderRadius: 6 }} />
            ) : (
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[12px] font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.72)',
                }}
              >
                {(data.brand.name ?? data.brand.domain).slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold truncate">
                {data.brand.name ?? data.brand.domain} · Ad Intelligence Report
              </div>
              <div className="text-[11px]" style={{ color: pdfMode ? '#666' : 'rgba(255,255,255,0.48)' }}>
                Generated {fmtDate(data.brand.generatedAt)}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1100px] mx-auto px-4 pt-8 space-y-12">
          {/* 1. Brand snapshot */}
          <section>
            <BrandSnapshot {...data.brand} />
          </section>

          {/* 2. Competitive Landscape */}
          <section>
            <SectionTitle eyebrow="01" title="Competitive Landscape" subtitle={`${data.competitors.length} brand${data.competitors.length === 1 ? '' : 's'} actively running ads`} pdfMode={pdfMode} />
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {data.competitors.map((c) => (
                <CompetitorCard
                  key={c.id ?? c.name}
                  name={c.name}
                  url={c.url}
                  activeAdCount={c.activeAdCount}
                  distribution={c.distribution}
                  metaAdLibraryUrl={c.metaAdLibraryUrl}
                />
              ))}
            </div>
          </section>

          {/* 3. Winning Ads — grouped by angle */}
          <section>
            <SectionTitle eyebrow="02" title="Winning Ads" subtitle={`${totalAds} ad${totalAds === 1 ? '' : 's'} grouped by angle`} pdfMode={pdfMode} />
            <div className="mt-4 space-y-6">
              {Array.from(adsByAngle.entries()).map(([angle, ads]) => (
                <div key={angle}>
                  <div
                    className="text-[11px] uppercase tracking-wider mb-2"
                    style={{ color: pdfMode ? '#666' : 'rgba(255,255,255,0.55)', letterSpacing: '0.10em' }}
                  >
                    {angle} · {ads.length}
                  </div>
                  <div
                    className="grid gap-3"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
                  >
                    {ads.map((ad) => (
                      <AdCard
                        key={ad.id}
                        id={ad.id}
                        hook={ad.hook}
                        thumbnailUrl={ad.thumbnailUrl}
                        ratio={ad.ratio}
                        angle={ad.angle}
                        longevityFlag={ad.longevityFlag}
                        daysActive={ad.daysActive}
                        competitorName={ad.competitorName}
                        metaAdLibraryUrl={ad.metaAdLibraryUrl}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {!showAllAds && totalAds > AD_RENDER_CAP && (
              <button
                type="button"
                onClick={() => setShowAllAds(true)}
                className="mt-5 text-[12px] font-semibold underline-offset-2 hover:underline"
                style={{ color: pdfMode ? '#0A0A0B' : 'rgba(0,255,148,0.85)' }}
              >
                Show all {totalAds} ads
              </button>
            )}
          </section>

          {/* 4. The 5 Briefs */}
          <section>
            <SectionTitle eyebrow="03" title="The 5 Briefs" subtitle="Ready-to-run. Hover an ad ID to highlight the inspiration above." pdfMode={pdfMode} />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data.briefs.map((brief) => (
                <BriefCard key={brief.number} {...brief} />
              ))}
            </div>
          </section>

          {/* 5. Dual CTA */}
          {!pdfMode && (
            <section>
              <SectionTitle eyebrow="04" title="What now?" pdfMode={pdfMode} />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <CalendlyEmbed jobId={jobId} onOpened={trackCalendlyClick} />
                <UpsellCard />
              </div>
              {pdfError && (
                <div
                  className="mt-3 rounded-md p-3 text-[12px]"
                  style={{
                    background: 'rgba(244,114,114,0.08)',
                    color: '#F87171',
                    boxShadow: 'inset 0 0 0 1px rgba(244,114,114,0.25)',
                  }}
                >
                  {pdfError}
                </div>
              )}
            </section>
          )}

          {/* Footer */}
          <footer
            className="pt-8 text-[11px] leading-relaxed"
            style={{
              color: pdfMode ? '#666' : 'rgba(255,255,255,0.40)',
              borderTop: pdfMode ? '1px solid #DDD' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            Grounded in {data.meta.totalAdsScraped} competitor ad{data.meta.totalAdsScraped === 1 ? '' : 's'} scraped from the
            Meta Ad Library on {fmtDate(data.meta.scrapedAt)}. Anti-hallucination contract enforced. [NF] = not-found is a valid
            data point.
          </footer>
        </div>

        {pdfMode && <PDFWatermark />}
      </main>
    </>
  )
}

/* ---------- Subcomponents ---------- */

function ReportShell({ pdfMode, children }: { pdfMode: boolean; children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Adcreator Report | Growzilla</title>
        <meta name="robots" content="noindex" />
        {pdfMode && <style dangerouslySetInnerHTML={{ __html: PDF_STYLESHEET }} />}
      </Head>
      <main
        className="min-h-screen"
        style={{
          background: pdfMode ? '#FFFFFF' : '#050608',
          color: pdfMode ? '#0A0A0B' : 'rgba(255,255,255,0.95)',
          fontFamily: 'Inter, "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-12">{children}</div>
      </main>
    </>
  )
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  pdfMode,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  pdfMode: boolean
}) {
  return (
    <header className="flex items-baseline gap-3">
      <span
        className="text-[11px] tabular-nums tracking-widest"
        style={{ color: pdfMode ? '#666' : 'rgba(255,255,255,0.40)', letterSpacing: '0.16em' }}
      >
        {eyebrow}
      </span>
      <div>
        <h2
          className="text-[18px] font-semibold leading-tight tracking-tight"
          style={{ color: pdfMode ? '#0A0A0B' : 'rgba(255,255,255,0.95)', letterSpacing: '-0.01em' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-1 text-[12px]"
            style={{ color: pdfMode ? '#666' : 'rgba(255,255,255,0.55)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}

function CalendlyEmbed({ jobId, onOpened }: { jobId: string; onOpened: () => void }) {
  const [iframeFailed, setIframeFailed] = useState(false)
  const calendlyUrl = `https://calendly.com/growzilla?utm_source=adcreator&jobId=${encodeURIComponent(jobId)}`

  useEffect(() => {
    // If the iframe hasn't loaded in 3s, assume blocked (CSP / ad-blocker).
    const t = setTimeout(() => setIframeFailed((failed) => failed || !iframeOk(`cal-iframe-${jobId}`)), 3000)
    return () => clearTimeout(t)
  }, [jobId])

  return (
    <div
      className="rounded-lg p-5 flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.40)', letterSpacing: '0.10em' }}>
        Talk strategy
      </div>
      <h3 className="text-[16px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
        Book a 15-min strategy call
      </h3>
      <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Walk through your briefs with a Growzilla strategist. Free, no pitch.
      </p>
      <div
        className="mt-3 rounded-md overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.25)', minHeight: 320 }}
      >
        {!iframeFailed ? (
          <iframe
            id={`cal-iframe-${jobId}`}
            src={calendlyUrl}
            width="100%"
            height="320"
            frameBorder={0}
            title="Book a call"
            onLoad={onOpened}
          />
        ) : null}
      </div>
      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onOpened}
        className="mt-3 text-[12px] font-semibold underline-offset-2 hover:underline self-start"
        style={{ color: 'rgba(0,255,148,0.85)' }}
      >
        Or open Calendly in a new tab ↗
      </a>
    </div>
  )
}

function UpsellCard() {
  return (
    <div
      className="rounded-lg p-5 flex flex-col"
      style={{
        background: 'rgba(0,255,148,0.04)',
        boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.18)',
      }}
    >
      <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'rgba(0,255,148,0.85)', letterSpacing: '0.10em' }}>
        Production
      </div>
      <h3 className="text-[16px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
        Turn these into creatives
      </h3>
      <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
        We&apos;ll script, shoot, and ship the assets. Briefs become Reels, Stories, and statics — ready for Ads Manager.
      </p>
      <Link
        href="/adcreate"
        className="mt-auto pt-4 inline-block self-start text-[13px] font-semibold rounded-md px-4 py-2 text-black"
        style={{ background: '#00FF94' }}
      >
        Get on the waitlist
      </Link>
    </div>
  )
}

function PDFWatermark() {
  return (
    <div
      className="fixed bottom-3 right-4 text-[10px] tracking-wider"
      style={{ color: '#999', letterSpacing: '0.10em' }}
      aria-hidden
    >
      growzilla.xyz
    </div>
  )
}

/* ---------- Helpers ---------- */

function fmtDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function iframeOk(id: string): boolean {
  if (typeof document === 'undefined') return true
  const el = document.getElementById(id) as HTMLIFrameElement | null
  if (!el) return false
  try {
    // If we can read contentWindow at all, the iframe was reachable.
    return Boolean(el.contentWindow)
  } catch {
    return false
  }
}

const PDF_STYLESHEET = `
  @page { size: A4; margin: 16mm; }
  html, body { background: #FFFFFF !important; color: #0A0A0B !important; }
  .sticky, [class*='sticky'] { position: static !important; }
  iframe { display: none !important; }
  * { animation: none !important; transition: none !important; }
  a { color: #0A0A0B !important; text-decoration: underline; }
`
