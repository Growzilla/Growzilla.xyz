import { NextResponse } from 'next/server';
import { fetchWhopProducts } from '@/lib/whop/whop-api';
import type { WhopProduct } from '@/types/whop';

export async function GET() {
  try {
    const rawProducts = await fetchWhopProducts();

    const products: WhopProduct[] = rawProducts.map((p) => {
      const mainPlan = p.plans?.[0];
      return {
        id: p.id,
        name: p.name,
        type: mainPlan?.plan_type === 'one_time' ? 'one_time' : 'membership',
        price: mainPlan?.initial_price || 0,
        billingPeriod: mainPlan?.renewal_period === 'month'
          ? 'monthly'
          : mainPlan?.renewal_period === 'year'
          ? 'yearly'
          : 'one_time',
        activeSubscribers: 0,
        totalRevenue: 0,
        churnRate: 0,
        mrr: 0,
      };
    });

    return NextResponse.json({ data: products });
  } catch (err) {
    console.error('[whop/api/whop/products] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch Whop products', data: [] },
      { status: 500 }
    );
  }
}
