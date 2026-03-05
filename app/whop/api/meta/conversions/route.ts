import { NextRequest, NextResponse } from 'next/server';
import { fetchCampaignInsights, parseMetaConversions } from '@/lib/whop/meta-capi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datePreset = searchParams.get('datePreset') || 'last_30d';

    const insights = await fetchCampaignInsights({ datePreset });

    const campaigns = insights.map((insight) => {
      const { conversions, revenue } = parseMetaConversions(insight);
      const spend = parseFloat(insight.spend) || 0;

      return {
        id: insight.campaign_id,
        name: insight.campaign_name,
        platform: 'meta' as const,
        status: insight.status === 'ACTIVE' ? 'active' : 'paused',
        spend,
        revenue,
        roas: spend > 0 ? revenue / spend : 0,
        cpa: conversions > 0 ? spend / conversions : 0,
        impressions: parseInt(insight.impressions, 10) || 0,
        clicks: parseInt(insight.clicks, 10) || 0,
        conversions,
        ctr: parseFloat(insight.ctr) || 0,
        startDate: insight.date_start,
        endDate: insight.date_stop,
      };
    });

    return NextResponse.json({ data: campaigns });
  } catch (err) {
    console.error('[whop/api/meta/conversions] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch Meta campaigns', data: [] },
      { status: 500 }
    );
  }
}
