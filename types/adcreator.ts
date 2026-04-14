// Types for the adcreator funnel — admin view of leads + report payloads.
// Keep aligned with /dev/shared/modules/adcreator/MODULE.md and SCHEMA A/B/C/E.

export type SpendBucket = '<1k' | '1-5k' | '5-25k' | '25k+' | 'unknown';

export type PainPoint =
  | 'cant_find_winning_creative'
  | 'cac_too_high'
  | 'cant_scale_past_plateau'
  | 'no_attribution_clarity'
  | 'too_few_creators'
  | 'other';

export type LeadStatus = 'pending' | 'rendering' | 'ready' | 'failed';

// Trimmed mirror of SCHEMA A — what the frontend actually renders.
export interface BrandBriefLite {
  brand_name: string;
  product_type?: string;
  usp?: string;
  primary_market?: string; // ISO country code
  daily_budget?: number;
  brand_tone?: string;
}

// Trimmed mirror of SCHEMA B.
export interface CompetitorLite {
  id: string;
  brand_name: string;
  url?: string;
  ad_library_url?: string;
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  ads_found?: number;
}

// Trimmed mirror of SCHEMA E (AdBrief-lite).
export interface AdBriefLite {
  id: string;
  source_ad_id: string; // must reference a SCHEMA C ad_tag
  hook: string;
  visual_concept: string;
  cta: string;
  angle?: string;
}

export interface AdcreatorResultPreview {
  brand_brief: BrandBriefLite;
  competitors: CompetitorLite[]; // at least the first one for preview
  ad_briefs: AdBriefLite[];      // at least the first one for preview
}

export interface AdcreatorLead {
  id: string;
  email: string;
  brand_name: string;
  domain: string;
  market: string; // ISO country code, e.g. "SE"
  spend_bucket: SpendBucket;
  pain: PainPoint;
  created_at: string; // ISO timestamp
  status: LeadStatus;
  pdf_url?: string;
  pdf_downloaded_at?: string | null;
  calendly_clicked: boolean;
  calendly_clicked_at?: string | null;
  booked: boolean; // editable inline by operator
  result_preview?: AdcreatorResultPreview;
}

export interface AdcreatorLeadsResponse {
  data: AdcreatorLead[];
  total: number;
  source: 'mock' | 'backend';
}

export interface AdcreatorFunnelStats {
  reports: number;
  unique_emails: number;
  pdf_downloads: number;
  calendly_clicks: number;
  bookings: number;
}

// Filter state for the table.
export interface AdcreatorLeadFilters {
  market: string | null;
  spend_bucket: SpendBucket | null;
  pain: PainPoint | null;
  calendly_clicked_only: boolean;
}
