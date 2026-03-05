import { NextRequest, NextResponse } from 'next/server';
import { fetchWhopMembers } from '@/lib/whop/whop-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || undefined;
    const status = searchParams.get('status') as 'active' | 'canceled' | 'past_due' | undefined;

    const members = await fetchWhopMembers({ productId, status });

    const transformed = members.map((m) => ({
      id: m.id,
      productId: m.product.id,
      productName: m.product.name,
      email: m.user.email,
      username: m.user.username,
      status: m.status,
      planType: m.plan.plan_type,
      price: m.plan.initial_price,
      joinedAt: new Date(m.created_at * 1000).toISOString(),
      renewalDate: m.renewal_date
        ? new Date(m.renewal_date * 1000).toISOString()
        : null,
      canceledAt: m.canceled_at
        ? new Date(m.canceled_at * 1000).toISOString()
        : null,
    }));

    return NextResponse.json({ data: transformed });
  } catch (err) {
    console.error('[whop/api/whop/members] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch Whop members', data: [] },
      { status: 500 }
    );
  }
}
