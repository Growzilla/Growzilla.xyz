// Airtable client for Whop dashboard
// Fetches purchase history, customers, and revenue data from Airtable

const AIRTABLE_API_KEY = process.env.WHOP_AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.WHOP_AIRTABLE_BASE_ID || '';
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

async function fetchTable(
  tableName: string,
  options: {
    filterByFormula?: string;
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
    maxRecords?: number;
    pageSize?: number;
    fields?: string[];
  } = {}
): Promise<AirtableRecord[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn('[whop/airtable] Missing WHOP_AIRTABLE_API_KEY or WHOP_AIRTABLE_BASE_ID');
    return [];
  }

  const allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (options.filterByFormula) params.set('filterByFormula', options.filterByFormula);
    if (options.maxRecords) params.set('maxRecords', String(options.maxRecords));
    if (options.pageSize) params.set('pageSize', String(options.pageSize || 100));
    if (offset) params.set('offset', offset);
    if (options.sort) {
      options.sort.forEach((s, i) => {
        params.set(`sort[${i}][field]`, s.field);
        params.set(`sort[${i}][direction]`, s.direction);
      });
    }
    if (options.fields) {
      options.fields.forEach((f) => params.append('fields[]', f));
    }

    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // cache for 60 seconds
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Airtable error (${res.status}): ${errText}`);
    }

    const data: AirtableResponse = await res.json();
    allRecords.push(...data.records);
    offset = data.offset;
  } while (offset);

  return allRecords;
}

export async function fetchCustomers() {
  return fetchTable('Customers', {
    sort: [{ field: 'Total Spend', direction: 'desc' }],
  });
}

export async function fetchPurchases(options?: {
  since?: string; // ISO date
  productId?: string;
}) {
  let filterParts: string[] = [];
  if (options?.since) {
    filterParts.push(`IS_AFTER({Purchase Date}, '${options.since}')`);
  }
  if (options?.productId) {
    filterParts.push(`{Product ID} = '${options.productId}'`);
  }

  const filterByFormula =
    filterParts.length > 1
      ? `AND(${filterParts.join(', ')})`
      : filterParts[0] || '';

  return fetchTable('Purchases', {
    filterByFormula,
    sort: [{ field: 'Purchase Date', direction: 'desc' }],
  });
}

export async function fetchRevenue(options?: { since?: string }) {
  const filterByFormula = options?.since
    ? `IS_AFTER({Date}, '${options.since}')`
    : '';

  return fetchTable('Revenue', {
    filterByFormula,
    sort: [{ field: 'Date', direction: 'asc' }],
  });
}

export async function fetchProducts() {
  return fetchTable('Products', {
    sort: [{ field: 'Total Revenue', direction: 'desc' }],
  });
}

export { fetchTable };
