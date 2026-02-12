import fs from 'fs';
import path from 'path';
import type { UserRecord } from '@/types/admin';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export function readUsers(): UserRecord[] {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeUsers(users: UserRecord[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2) + '\n', 'utf-8');
}

export function findUserByEmail(email: string): UserRecord | undefined {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserStoreDomain(email: string): string | null {
  const user = findUserByEmail(email);
  return user?.storeDomain ?? null;
}

export function updateLastLogin(email: string): void {
  const users = readUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) return;
  users[idx].lastLoginAt = new Date().toISOString();
  writeUsers(users);
}
