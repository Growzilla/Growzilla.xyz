/**
 * GET /api/admin/adcreator-leads
 * ===============================
 * Admin-only proxy to the backend adcreator leads endpoint.
 *
 * Behavior:
 *   - Requires admin session cookie (uses lib/admin/auth.requireAuth).
 *   - If ADCREATOR_API_URL (or legacy ECOMDASH_API_URL) + ADMIN_API_KEY are present
 *     AND the upstream call succeeds, proxies the response from
 *     `${BACKEND_URL}/api/adcreator/admin/leads` and adapts it to the frontend shape.
 *   - Otherwise (no env set / upstream unreachable / non-2xx) falls back to
 *     deterministic mock data so the UI stays testable locally.
 *
 * Backend wire shape (api-contract 2026-04-15):
 *   { leads: [{job_id, email, domain, country, status, fallback_used,
 *              calendly_clicked_at?, created_at}], totals: {...} }
 * Frontend shape (AdcreatorLead) has richer fields (brand_name, market, spend_bucket,
 * pain, result_preview, ...). The adapter fills intake-answer fields with safe
 * defaults ('unknown' / 'other') until be-api extends the admin response to include
 * QuizLead.answers.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/admin/auth';
import type {
  AdcreatorLead,
  AdcreatorLeadsResponse,
  LeadStatus,
  PainPoint,
  SpendBucket,
} from '@/types/adcreator';

// Prefer a dedicated ADCREATOR_API_URL (if adcreator ever moves off ecomdash),
// fall back to ECOMDASH_API_URL which is the current deployment.
const BACKEND_URL = process.env.ADCREATOR_API_URL || process.env.ECOMDASH_API_URL;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// Backend lead row — matches api-contract 2026-04-15.
interface BackendLead {
  job_id: string;
  email: string;
  domain: string;
  country?: string;
  status: string;
  fallback_used?: boolean;
  calendly_clicked_at?: string | null;
  created_at: string;
}

interface BackendLeadsResponse {
  leads?: BackendLead[];
  totals?: Record<string, number>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AdcreatorLeadsResponse | { error: string }>
) {
  if (!requireAuth(req, res)) return;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Try real backend first if configured.
  if (BACKEND_URL && ADMIN_API_KEY) {
    try {
      const upstream = await fetch(
        `${BACKEND_URL.replace(/\/$/, '')}/api/adcreator/admin/leads`,
        {
          method: 'GET',
          headers: { 'X-Admin-Key': ADMIN_API_KEY, Accept: 'application/json' },
          // Render free tier can take 30-60s on cold start; cap at 8s and fall back.
          signal: AbortSignal.timeout(8_000),
        }
      );

      if (upstream.ok) {
        const json = (await upstream.json()) as BackendLeadsResponse;
        const backendLeads = Array.isArray(json?.leads) ? json.leads : [];
        const data: AdcreatorLead[] = backendLeads.map(adaptBackendLead);
        return res.status(200).json({
          data,
          total: data.length,
          source: 'backend',
        });
      }

      // Upstream returned a non-2xx (likely 404 — route not yet shipped).
      // Fall through to mock so the UI keeps working.
    } catch {
      // Network/timeout/abort — fall through to mock.
    }
  }

  // 2. Mock fallback (dev / pre-backend / upstream unreachable).
  const data = buildMockLeads();
  return res.status(200).json({ data, total: data.length, source: 'mock' });
}

// -- Backend → Frontend adapter ------------------------------------------------
// Backend admin response currently lacks intake-answer fields (spend, goal, market
// niceties) and PDF paths. Fill with safe 'unknown'/'other' defaults so the table
// renders — T3 can layer cost + extra columns once be-api extends the shape.

function adaptBackendLead(b: BackendLead): AdcreatorLead {
  const status = normalizeStatus(b.status);
  const calendlyClicked = Boolean(b.calendly_clicked_at);
  return {
    id: b.job_id,
    email: b.email,
    brand_name: brandNameFromDomain(b.domain),
    domain: b.domain,
    market: (b.country || '').toUpperCase() || 'unknown',
    spend_bucket: 'unknown',
    pain: 'other',
    created_at: b.created_at,
    status,
    pdf_url: status === 'ready' ? `/adcreator/report/${encodeURIComponent(b.job_id)}?pdf=1` : undefined,
    pdf_downloaded_at: null,
    calendly_clicked: calendlyClicked,
    calendly_clicked_at: b.calendly_clicked_at ?? null,
    booked: false, // not tracked on backend yet; operator-editable via [id] PATCH
  };
}

function normalizeStatus(s: string): LeadStatus {
  switch ((s || '').toLowerCase()) {
    case 'done':
    case 'ready':
      return 'ready';
    case 'error':
    case 'failed':
      return 'failed';
    case 'running':
    case 'rendering':
    case 'intake':
    case 'discovery':
    case 'scrape':
    case 'synthesis':
    case 'briefs':
    case 'persist':
      return 'rendering';
    default:
      return 'pending';
  }
}

function brandNameFromDomain(domain: string): string {
  if (!domain) return 'Unknown';
  // "scentandco.com" → "Scentandco"; "glow-nordic.com" → "Glow Nordic"
  const bare = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  const root = bare.split('.')[0] || bare;
  return root
    .split(/[-_]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

// -- Mock data -----------------------------------------------------------------
// Deterministic so screenshots & Playwright stay stable.

function buildMockLeads(): AdcreatorLead[] {
  const now = Date.now();
  const day = 86_400_000;

  const seed: Array<Partial<AdcreatorLead> & {
    brand_name: string;
    domain: string;
    email: string;
    market: string;
    spend_bucket: SpendBucket;
    pain: PainPoint;
    daysAgo: number;
    pdf?: boolean;
    calendly?: boolean;
    booked?: boolean;
  }> = [
    { brand_name: 'Glow Nordic', domain: 'glow-nordic.com', email: 'sara@glow-nordic.com',
      market: 'SE', spend_bucket: '5-25k', pain: 'cant_find_winning_creative',
      daysAgo: 0.3, pdf: true, calendly: true, booked: true },
    { brand_name: 'StreetLayer', domain: 'streetlayer.com', email: 'jonas@streetlayer.com',
      market: 'NO', spend_bucket: '1-5k', pain: 'cac_too_high',
      daysAgo: 0.8, pdf: true, calendly: true },
    { brand_name: 'Nordic Laptops', domain: 'nordiclaptops.com', email: 'erik@nordiclaptops.com',
      market: 'DE', spend_bucket: '25k+', pain: 'cant_scale_past_plateau',
      daysAgo: 1.4, pdf: true, calendly: false },
    { brand_name: 'ScentnCo', domain: 'scentnco.com', email: 'jay@scentnco.com',
      market: 'GB', spend_bucket: '5-25k', pain: 'no_attribution_clarity',
      daysAgo: 2.1, pdf: true, calendly: true, booked: true },
    { brand_name: 'Scandinavian Poster', domain: 'scandinavianposter.com', email: 'joanna@scandinavianposter.com',
      market: 'SE', spend_bucket: '5-25k', pain: 'too_few_creators',
      daysAgo: 2.6, pdf: true, calendly: false },
    { brand_name: 'Casedus', domain: 'casedus.com', email: 'amir@casedus.com',
      market: 'US', spend_bucket: '25k+', pain: 'cant_find_winning_creative',
      daysAgo: 3.5, pdf: true, calendly: true },
    { brand_name: 'Nuvoo', domain: 'nuvoo.com', email: 'mikko@nuvoo.com',
      market: 'FI', spend_bucket: '1-5k', pain: 'cac_too_high',
      daysAgo: 4.2, pdf: false, calendly: false },
    { brand_name: 'Aether Apparel', domain: 'aetherapparel.com', email: 'lina@aetherapparel.com',
      market: 'DK', spend_bucket: '5-25k', pain: 'cant_scale_past_plateau',
      daysAgo: 5.1, pdf: true, calendly: true },
    { brand_name: 'Pour & Sip', domain: 'pourandsip.com', email: 'tom@pourandsip.com',
      market: 'GB', spend_bucket: '<1k', pain: 'other',
      daysAgo: 6.0, pdf: true, calendly: false },
    { brand_name: 'Rune Studio', domain: 'runestudio.io', email: 'ola@runestudio.io',
      market: 'NO', spend_bucket: '5-25k', pain: 'no_attribution_clarity',
      daysAgo: 6.7, pdf: true, calendly: true, booked: true },
    { brand_name: 'Bloomr', domain: 'bloomr.shop', email: 'ines@bloomr.shop',
      market: 'NL', spend_bucket: '1-5k', pain: 'cant_find_winning_creative',
      daysAgo: 7.5, pdf: true, calendly: false },
    { brand_name: 'Tundra Goods', domain: 'tundragoods.co', email: 'sven@tundragoods.co',
      market: 'IS', spend_bucket: '<1k', pain: 'too_few_creators',
      daysAgo: 8.3, pdf: false, calendly: false },
  ];

  return seed.map((s, i): AdcreatorLead => {
    const created_at = new Date(now - s.daysAgo * day).toISOString();
    const pdf = s.pdf ?? false;
    const calendly = s.calendly ?? false;
    return {
      id: `lead_${String(i + 1).padStart(4, '0')}`,
      email: s.email,
      brand_name: s.brand_name,
      domain: s.domain,
      market: s.market,
      spend_bucket: s.spend_bucket,
      pain: s.pain,
      created_at,
      status: pdf ? 'ready' : 'rendering',
      pdf_url: pdf ? `/adcreator/report/${`mock_${i + 1}`}.pdf` : undefined,
      pdf_downloaded_at: pdf
        ? new Date(now - s.daysAgo * day + 60_000).toISOString()
        : null,
      calendly_clicked: calendly,
      calendly_clicked_at: calendly
        ? new Date(now - s.daysAgo * day + 600_000).toISOString()
        : null,
      booked: s.booked ?? false,
      result_preview: {
        brand_brief: {
          brand_name: s.brand_name,
          product_type: inferProductType(s.brand_name),
          usp: 'Premium quality, fast shipping, sustainable materials.',
          primary_market: s.market,
          daily_budget: spendBucketToDaily(s.spend_bucket),
          brand_tone: 'Confident, minimal, Scandinavian.',
        },
        competitors: [
          {
            id: 'C1',
            brand_name: `${s.brand_name} Rival #1`,
            url: `https://rival1-${s.domain}`,
            ad_library_url: `https://www.facebook.com/ads/library/?q=${encodeURIComponent(s.brand_name)}`,
            priority: 'HIGH',
            ads_found: 24,
          },
        ],
        ad_briefs: [
          {
            id: 'B1',
            source_ad_id: 'A1-3',
            hook: 'I tried 12 brands. This one finally fits.',
            visual_concept:
              'UGC-style talking head, founder POV, product unbox in second 4, before/after shot at second 9.',
            cta: 'Shop now — free returns',
            angle: 'SocialProof',
          },
        ],
      },
    };
  });
}

function inferProductType(brand: string): string {
  if (/poster|print/i.test(brand)) return 'Wall art / posters';
  if (/laptop|tech/i.test(brand)) return 'Refurbished electronics';
  if (/glow|skin|scent/i.test(brand)) return 'Beauty / personal care';
  if (/layer|apparel|wear|studio/i.test(brand)) return 'Apparel';
  if (/sip|pour|tundra|bloom/i.test(brand)) return 'Lifestyle goods';
  return 'Consumer goods';
}

function spendBucketToDaily(b: SpendBucket): number {
  switch (b) {
    case '<1k':
      return 25;
    case '1-5k':
      return 100;
    case '5-25k':
      return 400;
    case '25k+':
      return 1500;
    default:
      return 0;
  }
}
