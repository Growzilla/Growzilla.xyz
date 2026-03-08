import fs from 'fs';
import path from 'path';
import type { MerchantDeploy } from '@/types/admin';

const DATA_FILE = path.join(process.cwd(), 'data', 'merchants.json');

export function getMerchants(): MerchantDeploy[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMerchants(merchants: MerchantDeploy[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(merchants, null, 2));
}

export function getMerchant(id: string): MerchantDeploy | undefined {
  return getMerchants().find((m) => m.id === id);
}

export function upsertMerchant(merchant: MerchantDeploy): void {
  const merchants = getMerchants();
  const idx = merchants.findIndex((m) => m.id === merchant.id);
  if (idx >= 0) {
    merchants[idx] = merchant;
  } else {
    merchants.push(merchant);
  }
  saveMerchants(merchants);
}

export function updateMerchantStatus(
  id: string,
  updates: Partial<MerchantDeploy>
): MerchantDeploy | null {
  const merchants = getMerchants();
  const idx = merchants.findIndex((m) => m.id === id);
  if (idx < 0) return null;

  merchants[idx] = { ...merchants[idx], ...updates, updatedAt: new Date().toISOString() };
  saveMerchants(merchants);
  return merchants[idx];
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
