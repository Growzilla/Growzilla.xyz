import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { ShopRegistryEntry, ShopDetails } from '@/types/admin';
import { getShop } from './ecomdash';

const SHOPS_FILE = join(process.cwd(), 'data', 'shops.json');

// Simple in-memory cache with 5 min TTL
const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL });
}

export function readShops(): ShopRegistryEntry[] {
  try {
    const raw = readFileSync(SHOPS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeShops(shops: ShopRegistryEntry[]): void {
  writeFileSync(SHOPS_FILE, JSON.stringify(shops, null, 2) + '\n', 'utf-8');
}

export function addShop(domain: string, label: string): ShopRegistryEntry {
  const shops = readShops();
  const existing = shops.find((s) => s.domain === domain);
  if (existing) throw new Error(`Shop ${domain} already exists`);

  const entry: ShopRegistryEntry = {
    domain,
    label,
    addedAt: new Date().toISOString(),
  };

  shops.push(entry);
  writeShops(shops);
  cache.delete('enriched_shops');
  return entry;
}

export function removeShop(domain: string): void {
  const shops = readShops();
  const filtered = shops.filter((s) => s.domain !== domain);
  if (filtered.length === shops.length) throw new Error(`Shop ${domain} not found`);
  writeShops(filtered);
  cache.delete('enriched_shops');
}

export async function getEnrichedShops(): Promise<ShopDetails[]> {
  const cached = getCached<ShopDetails[]>('enriched_shops');
  if (cached) return cached;

  const registry = readShops();
  const registryDomains = new Set(registry.map((s) => s.domain));

  // Enrich registry shops via backend
  const enriched = await Promise.all(
    registry.map(async (entry): Promise<ShopDetails> => {
      try {
        const shopData = await getShop(entry.domain);
        return {
          domain: entry.domain,
          label: entry.label,
          addedAt: entry.addedAt,
          status: 'active',
          shop_id: (shopData.id || shopData.shop_id) as string | undefined,
          name: shopData.name as string | undefined,
          currency: shopData.currency as string | undefined,
          plan: shopData.plan as string | undefined,
          last_synced: (shopData.lastSyncAt || shopData.last_synced) as string | undefined,
          created_at: (shopData.createdAt || shopData.created_at) as string | undefined,
        };
      } catch {
        return {
          domain: entry.domain,
          label: entry.label,
          addedAt: entry.addedAt,
          status: 'unreachable',
        };
      }
    })
  );

  // Also pull ALL shops from the backend database (catches stores installed
  // via the Shopify app that weren't manually added to data/shops.json).
  // Uses the admin data endpoint which requires first 16 chars of SECRET_KEY.
  try {
    const API_BASE = process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';
    const adminDataKey = process.env.BACKEND_ADMIN_KEY || process.env.ADMIN_API_KEY || '';
    const res = await fetch(`${API_BASE}/api/admin/data/shops`, {
      headers: {
        'X-Admin-Key': adminDataKey,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const json = await res.json();
      const dbShops: { id: string; domain: string; sync_status: string; last_sync_at: string | null; created_at: string }[] = json.shops || json.data || json || [];
      for (const dbShop of dbShops) {
        if (!dbShop.domain || registryDomains.has(dbShop.domain)) continue;
        enriched.push({
          domain: dbShop.domain,
          label: dbShop.domain.replace('.myshopify.com', ''),
          addedAt: dbShop.created_at || new Date().toISOString(),
          status: 'active',
          shop_id: dbShop.id,
          last_synced: dbShop.last_sync_at || undefined,
          created_at: dbShop.created_at,
        });
      }
    }
  } catch {
    // Backend unreachable — show only registry shops
  }

  setCache('enriched_shops', enriched);
  return enriched;
}

export function resolveShopId(shops: ShopDetails[], domain: string): string | null {
  const shop = shops.find((s) => s.domain === domain);
  return shop?.shop_id || null;
}
