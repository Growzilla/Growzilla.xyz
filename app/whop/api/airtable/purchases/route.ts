import { NextRequest, NextResponse } from 'next/server';
import { fetchPurchases } from '@/lib/whop/airtable';
import { transformPurchase } from '@/lib/whop/transforms';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const since = searchParams.get('since') || undefined;
    const productId = searchParams.get('productId') || undefined;

    const records = await fetchPurchases({ since, productId });
    const purchases = records.map((r) => transformPurchase(r.fields, r.id));
    return NextResponse.json({ data: purchases });
  } catch (err) {
    console.error('[whop/api/airtable/purchases] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch purchases', data: [] },
      { status: 500 }
    );
  }
}
