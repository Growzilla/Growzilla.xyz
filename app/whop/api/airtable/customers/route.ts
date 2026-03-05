import { NextResponse } from 'next/server';
import { fetchCustomers } from '@/lib/whop/airtable';
import { transformCustomer } from '@/lib/whop/transforms';

export async function GET() {
  try {
    const records = await fetchCustomers();
    const customers = records.map((r) => transformCustomer(r.fields, r.id));
    return NextResponse.json({ data: customers });
  } catch (err) {
    console.error('[whop/api/airtable/customers] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch customers', data: [] },
      { status: 500 }
    );
  }
}
