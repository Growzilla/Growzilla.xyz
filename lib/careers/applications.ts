import { list, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import type {
  JobApplication,
  JobApplicationIndexEntry,
} from '@/types/careers';

const INDEX_PATH = 'careers/applications-index.json';
const APPLICATION_PREFIX = 'careers/applications/';
const LOCAL_DIR = path.join(process.cwd(), 'data', 'careers');
const LOCAL_INDEX = path.join(LOCAL_DIR, 'applications-index.json');

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function useLocalStore(): boolean {
  return !hasBlobToken();
}

function ensureLocalDir() {
  if (!fs.existsSync(LOCAL_DIR)) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
  }
}

function readLocalIndex(): JobApplicationIndexEntry[] {
  try {
    if (fs.existsSync(LOCAL_INDEX)) {
      return JSON.parse(fs.readFileSync(LOCAL_INDEX, 'utf-8'));
    }
  } catch {
    /* ignore */
  }
  return [];
}

function writeLocalIndex(entries: JobApplicationIndexEntry[]) {
  ensureLocalDir();
  fs.writeFileSync(LOCAL_INDEX, JSON.stringify(entries, null, 2));
}

function readLocalApplication(id: string): JobApplication | null {
  const file = path.join(LOCAL_DIR, `${id}.json`);
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8')) as JobApplication;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function writeLocalApplication(application: JobApplication) {
  ensureLocalDir();
  const file = path.join(LOCAL_DIR, `${application.id}.json`);
  fs.writeFileSync(file, JSON.stringify(application, null, 2));
}

async function readIndex(): Promise<JobApplicationIndexEntry[]> {
  if (useLocalStore()) return readLocalIndex();
  try {
    const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
    if (blobs.length === 0) return [];
    const res = await fetch(blobs[0].url);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeIndex(entries: JobApplicationIndexEntry[]): Promise<void> {
  if (useLocalStore()) {
    writeLocalIndex(entries);
    return;
  }
  await put(INDEX_PATH, JSON.stringify(entries, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export async function saveApplication(application: JobApplication): Promise<void> {
  if (useLocalStore()) {
    writeLocalApplication(application);
    const index = readLocalIndex();
    const entry: JobApplicationIndexEntry = {
      id: application.id,
      jobSlug: application.jobSlug,
      jobTitle: application.jobTitle,
      name: application.name,
      email: application.email,
      status: application.status,
      createdAt: application.createdAt,
    };
    const existing = index.findIndex((e) => e.id === application.id);
    if (existing >= 0) index[existing] = entry;
    else index.unshift(entry);
    writeLocalIndex(index);
    return;
  }

  const blobPath = `${APPLICATION_PREFIX}${application.id}.json`;
  await put(blobPath, JSON.stringify(application, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });

  const index = await readIndex();
  const entry: JobApplicationIndexEntry = {
    id: application.id,
    jobSlug: application.jobSlug,
    jobTitle: application.jobTitle,
    name: application.name,
    email: application.email,
    status: application.status,
    createdAt: application.createdAt,
  };

  const existing = index.findIndex((e) => e.id === application.id);
  if (existing >= 0) {
    index[existing] = entry;
  } else {
    index.unshift(entry);
  }

  await writeIndex(index);
}

export async function getApplication(id: string): Promise<JobApplication | null> {
  if (useLocalStore()) return readLocalApplication(id);
  try {
    const path = `${APPLICATION_PREFIX}${id}.json`;
    const { blobs } = await list({ prefix: path, limit: 1 });
    if (blobs.length === 0) return null;
    const res = await fetch(blobs[0].url);
    if (!res.ok) return null;
    return (await res.json()) as JobApplication;
  } catch {
    return null;
  }
}

export async function listApplications(): Promise<JobApplication[]> {
  if (useLocalStore()) {
    const index = readLocalIndex();
    return index
      .map((e) => readLocalApplication(e.id))
      .filter((a): a is JobApplication => a !== null);
  }
  const index = await readIndex();
  const apps = await Promise.all(index.map((e) => getApplication(e.id)));
  return apps.filter((a): a is JobApplication => a !== null);
}

export async function updateApplication(
  id: string,
  patch: Partial<Pick<JobApplication, 'status' | 'notes'>>,
): Promise<JobApplication | null> {
  const existing = await getApplication(id);
  if (!existing) return null;

  const updated: JobApplication = {
    ...existing,
    ...patch,
  };

  await saveApplication(updated);
  return updated;
}

export function createApplicationId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}