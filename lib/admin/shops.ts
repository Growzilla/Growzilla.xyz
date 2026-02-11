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

  const enriched = await Promise.all(
    registry.map(async (entry): Promise<ShopDetails> => {
      try {
        const shopData = await getShop(entry.domain);
        return {
          domain: entry.domain,
          label: entry.label,
          addedAt: entry.addedAt,
          status: 'active',
          shop_id: shopData.shop_id as string | undefined,
          name: shopData.name as string | undefined,
          currency: shopData.currency as string | undefined,
          plan: shopData.plan as string | undefined,
          last_synced: shopData.last_synced as string | undefined,
          created_at: shopData.created_at as string | undefined,
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

  setCache('enriched_shops', enriched);
  return enriched;
}

export function resolveShopId(shops: ShopDetails[], domain: string): string | null {
  const shop = shops.find((s) => s.domain === domain);
  return shop?.shop_id || null;
}
