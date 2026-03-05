// Whop API client for products, members, and membership data

const WHOP_API_KEY = process.env.WHOP_API_KEY || '';
const WHOP_API_URL = 'https://api.whop.com/api/v5';

interface WhopAPIListResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
}

async function whopFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!WHOP_API_KEY) {
    throw new Error('[whop/whop-api] Missing WHOP_API_KEY');
  }

  const searchParams = new URLSearchParams(params);
  const url = `${WHOP_API_URL}${endpoint}?${searchParams.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${WHOP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 120 }, // cache for 2 minutes
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Whop API error (${res.status}): ${errText}`);
  }

  return res.json();
}

export interface WhopProductRaw {
  id: string;
  name: string;
  visibility: string;
  created_at: number;
  experiences: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  plans: Array<{
    id: string;
    plan_type: string;
    renewal_period: string;
    initial_price: number;
    renewal_price: number;
    currency: string;
  }>;
}

export interface WhopMemberRaw {
  id: string;
  product: { id: string; name: string };
  user: {
    id: string;
    email: string;
    username: string;
  };
  status: string;
  plan: {
    id: string;
    plan_type: string;
    renewal_period: string;
    initial_price: number;
  };
  created_at: number;
  renewal_date?: number;
  canceled_at?: number;
}

export async function fetchWhopProducts(): Promise<WhopProductRaw[]> {
  try {
    const response = await whopFetch<WhopAPIListResponse<WhopProductRaw>>('/products', {
      per: '100',
    });
    return response.data;
  } catch (err) {
    console.error('[whop/whop-api] fetchWhopProducts error:', err);
    return [];
  }
}

export async function fetchWhopMembers(options?: {
  productId?: string;
  status?: 'active' | 'canceled' | 'past_due';
  page?: number;
}): Promise<WhopMemberRaw[]> {
  try {
    const params: Record<string, string> = {
      per: '100',
    };
    if (options?.productId) params.product_id = options.productId;
    if (options?.status) params.status = options.status;
    if (options?.page) params.page = String(options.page);

    const response = await whopFetch<WhopAPIListResponse<WhopMemberRaw>>('/memberships', params);
    return response.data;
  } catch (err) {
    console.error('[whop/whop-api] fetchWhopMembers error:', err);
    return [];
  }
}

export async function fetchWhopMemberById(memberId: string): Promise<WhopMemberRaw | null> {
  try {
    return await whopFetch<WhopMemberRaw>(`/memberships/${memberId}`);
  } catch (err) {
    console.error('[whop/whop-api] fetchWhopMemberById error:', err);
    return null;
  }
}
