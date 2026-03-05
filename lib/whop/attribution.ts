// Attribution logic — UTM parsing, touchpoint matching, channel detection
import type { AttributionChannel, Touchpoint, WhopCustomer } from '@/types/whop';

// ─── UTM Parsing ──────────────────────────────────────────────────────────────

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export function parseUTM(url: string): UTMParams {
  try {
    const parsed = new URL(url);
    return {
      source: parsed.searchParams.get('utm_source') || undefined,
      medium: parsed.searchParams.get('utm_medium') || undefined,
      campaign: parsed.searchParams.get('utm_campaign') || undefined,
      term: parsed.searchParams.get('utm_term') || undefined,
      content: parsed.searchParams.get('utm_content') || undefined,
    };
  } catch {
    return {};
  }
}

// ─── Channel Detection ────────────────────────────────────────────────────────

export function detectChannel(touchpoint: {
  utmSource?: string;
  utmMedium?: string;
  referrerUrl?: string;
  campaignId?: string;
}): AttributionChannel {
  const { utmSource, utmMedium, referrerUrl, campaignId } = touchpoint;

  const src = (utmSource || '').toLowerCase();
  const med = (utmMedium || '').toLowerCase();
  const ref = (referrerUrl || '').toLowerCase();

  // Paid ads detection
  if (med === 'cpc' || med === 'paid' || med === 'ppc') {
    if (src.includes('facebook') || src.includes('fb') || src.includes('meta') || src.includes('ig')) return 'meta';
    if (src.includes('tiktok') || src.includes('tt')) return 'tiktok';
    if (src.includes('google') || src.includes('gclid')) return 'google';
  }

  // Campaign ID based detection
  if (campaignId) {
    // Meta campaign IDs are typically numeric
    if (/^\d+$/.test(campaignId)) return 'meta';
  }

  // Source-based detection
  if (src.includes('facebook') || src.includes('fb') || src.includes('instagram') || src.includes('meta')) return 'meta';
  if (src.includes('tiktok') || src.includes('tt')) return 'tiktok';
  if (src.includes('google') || src.includes('youtube')) return 'google';
  if (src.includes('email') || src.includes('newsletter') || med === 'email') return 'email';

  // Referrer-based detection
  if (ref.includes('facebook.com') || ref.includes('instagram.com') || ref.includes('fb.com')) return 'meta';
  if (ref.includes('tiktok.com')) return 'tiktok';
  if (ref.includes('google.com') || ref.includes('youtube.com')) return 'google';

  // Referral detection (has referrer but doesn't match known platforms)
  if (referrerUrl && ref !== '') return 'referral';

  // Default to organic
  return 'organic';
}

// ─── Attribution Models ───────────────────────────────────────────────────────

export type AttributionModel = 'first_touch' | 'last_touch' | 'linear';

export function attributeRevenue(
  customer: WhopCustomer,
  revenue: number,
  model: AttributionModel = 'last_touch'
): Record<AttributionChannel, number> {
  const result: Record<AttributionChannel, number> = {
    meta: 0,
    tiktok: 0,
    google: 0,
    organic: 0,
    email: 0,
    referral: 0,
  };

  if (!customer.touchpoints || customer.touchpoints.length === 0) {
    result[customer.firstTouchChannel] = revenue;
    return result;
  }

  switch (model) {
    case 'first_touch':
      result[customer.touchpoints[0].channel] = revenue;
      break;

    case 'last_touch':
      result[customer.touchpoints[customer.touchpoints.length - 1].channel] = revenue;
      break;

    case 'linear': {
      const perTouch = revenue / customer.touchpoints.length;
      for (const tp of customer.touchpoints) {
        result[tp.channel] += perTouch;
      }
      break;
    }
  }

  return result;
}

// ─── Touchpoint Matching ──────────────────────────────────────────────────────

export function matchTouchpointToCampaign(
  touchpoint: Touchpoint,
  campaigns: Array<{ id: string; name: string; platform: string }>
): string | null {
  if (touchpoint.campaignId) {
    const match = campaigns.find((c) => c.id === touchpoint.campaignId);
    if (match) return match.id;
  }

  // Try matching by UTM campaign name
  if (touchpoint.source) {
    const match = campaigns.find(
      (c) => c.name.toLowerCase().includes(touchpoint.source.toLowerCase())
    );
    if (match) return match.id;
  }

  return null;
}

// ─── Channel Colors & Labels ──────────────────────────────────────────────────

export const CHANNEL_COLORS: Record<AttributionChannel, string> = {
  meta: '#1877F2',
  tiktok: '#00F2EA',
  google: '#4285F4',
  organic: '#00FF94',
  email: '#FFB84D',
  referral: '#FF3366',
};

export const CHANNEL_LABELS: Record<AttributionChannel, string> = {
  meta: 'Meta Ads',
  tiktok: 'TikTok Ads',
  google: 'Google Ads',
  organic: 'Organic',
  email: 'Email',
  referral: 'Referral',
};

export function getChannelColor(channel: AttributionChannel | string): string {
  return CHANNEL_COLORS[channel as AttributionChannel] || '#6B7280';
}

export function getChannelLabel(channel: AttributionChannel | string): string {
  return CHANNEL_LABELS[channel as AttributionChannel] || channel;
}
