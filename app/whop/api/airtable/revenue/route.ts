import { NextRequest, NextResponse } from 'next/server';
import { fetchRevenue } from '@/lib/whop/airtable';
import { transformRevenue } from '@/lib/whop/transforms';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const since = searchParams.get('since') || undefined;

    const records = await fetchRevenue({ since });
    const revenue = records.map((r) => transformRevenue(r.fields));
    return NextResponse.json({ data: revenue });
  } catch (err) {
    console.error('[whop/api/airtable/revenue] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch revenue', data: [] },
      { status: 500 }
    );
  }
}
