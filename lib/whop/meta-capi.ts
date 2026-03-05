// Meta Conversions API client for Whop dashboard
// Handles ad campaign data, conversions, and attribution

const META_ACCESS_TOKEN = process.env.WHOP_META_ACCESS_TOKEN || '';
const META_PIXEL_ID = process.env.WHOP_META_PIXEL_ID || '';
const META_API_VERSION = 'v19.0';
const META_API_URL = `https://graph.facebook.com/${META_API_VERSION}`;

interface MetaAPIResponse<T> {
  data: T[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
  };
}

interface MetaCampaignInsight {
  campaign_id: string;
  campaign_name: string;
  status: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  actions?: Array<{ action_type: string; value: string }>;
  action_values?: Array<{ action_type: string; value: string }>;
  date_start: string;
  date_stop: string;
}

async function metaFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!META_ACCESS_TOKEN) {
    throw new Error('[whop/meta-capi] Missing WHOP_META_ACCESS_TOKEN');
  }

  const searchParams = new URLSearchParams({
    access_token: META_ACCESS_TOKEN,
    ...params,
  });

  const url = `${META_API_URL}/${endpoint}?${searchParams.toString()}`;
  const res = await fetch(url, {
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Meta API error (${res.status}): ${errText}`);
  }

  return res.json();
}

export async function fetchCampaignInsights(options?: {
  datePreset?: string; // 'last_7d' | 'last_30d' | 'last_90d'
  timeRange?: { since: string; until: string };
}) {
  const params: Record<string, string> = {
    fields: 'campaign_id,campaign_name,status,spend,impressions,clicks,ctr,actions,action_values',
    level: 'campaign',
  };

  if (options?.datePreset) {
    params.date_preset = options.datePreset;
  } else if (options?.timeRange) {
    params.time_range = JSON.stringify(options.timeRange);
  } else {
    params.date_preset = 'last_30d';
  }

  const adAccountId = process.env.WHOP_META_AD_ACCOUNT_ID;
  if (!adAccountId) {
    console.warn('[whop/meta-capi] Missing WHOP_META_AD_ACCOUNT_ID');
    return [];
  }

  const response = await metaFetch<MetaAPIResponse<MetaCampaignInsight>>(
    `act_${adAccountId}/insights`,
    params
  );

  return response.data || [];
}

export async function fetchAdSetInsights(campaignId: string) {
  const params: Record<string, string> = {
    fields: 'adset_id,adset_name,spend,impressions,clicks,actions,action_values',
    level: 'adset',
    filtering: JSON.stringify([
      { field: 'campaign.id', operator: 'EQUAL', value: campaignId },
    ]),
    date_preset: 'last_30d',
  };

  const adAccountId = process.env.WHOP_META_AD_ACCOUNT_ID;
  if (!adAccountId) return [];

  const response = await metaFetch<MetaAPIResponse<Record<string, unknown>>>(
    `act_${adAccountId}/insights`,
    params
  );

  return response.data || [];
}

export async function sendConversionEvent(event: {
  eventName: string;
  eventTime: number;
  userData: {
    email?: string;
    externalId?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    contentIds?: string[];
    contentType?: string;
  };
  eventSourceUrl?: string;
  actionSource: 'website' | 'app' | 'email' | 'other';
}) {
  if (!META_PIXEL_ID) {
    throw new Error('[whop/meta-capi] Missing WHOP_META_PIXEL_ID');
  }

  const capiToken = process.env.WHOP_META_CONVERSIONS_API_TOKEN;
  if (!capiToken) {
    throw new Error('[whop/meta-capi] Missing WHOP_META_CONVERSIONS_API_TOKEN');
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime,
        user_data: {
          em: event.userData.email
            ? [event.userData.email]
            : undefined,
          external_id: event.userData.externalId
            ? [event.userData.externalId]
            : undefined,
        },
        custom_data: event.customData
          ? {
              value: event.customData.value,
              currency: event.customData.currency || 'USD',
              content_ids: event.customData.contentIds,
              content_type: event.customData.contentType,
            }
          : undefined,
        event_source_url: event.eventSourceUrl,
        action_source: event.actionSource,
      },
    ],
    access_token: capiToken,
  };

  const res = await fetch(
    `${META_API_URL}/${META_PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Meta CAPI error (${res.status}): ${errText}`);
  }

  return res.json();
}

export function parseMetaConversions(
  insight: MetaCampaignInsight
): { conversions: number; revenue: number } {
  let conversions = 0;
  let revenue = 0;

  if (insight.actions) {
    const purchaseAction = insight.actions.find(
      (a) => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase'
    );
    if (purchaseAction) {
      conversions = parseInt(purchaseAction.value, 10);
    }
  }

  if (insight.action_values) {
    const purchaseValue = insight.action_values.find(
      (a) => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase'
    );
    if (purchaseValue) {
      revenue = parseFloat(purchaseValue.value);
    }
  }

  return { conversions, revenue };
}
