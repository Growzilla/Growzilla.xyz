import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import {
  UserGroupIcon,
  SparklesIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';
import KPICard from '@/components/admin/KPICard';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import ApplicantsTable from '@/components/admin/applicants/ApplicantsTable';
import { getAllJobs, getLocalizedContent } from '@/lib/careers/jobs';
import type {
  ApplicantFilters,
  ApplicantStatus,
  ApplicantsResponse,
  JobApplication,
} from '@/types/careers';

export default function ApplicantsAdminPage() {
  return (
    <>
      <Head>
        <title>Applicants | Growzilla Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>{(logout) => <ApplicantsView onLogout={logout} />}</LoginGate>
    </>
  );
}

function ApplicantsView({ onLogout }: { onLogout: () => void }) {
  const [applicants, setApplicants] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ApplicantFilters>({
    jobSlug: null,
    status: null,
    search: '',
  });

  const jobs = getAllJobs();

  const fetchApplicants = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/applicants');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ApplicantsResponse = await res.json();
      setApplicants(json.data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load applicants');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const handleUpdate = useCallback(
    async (id: string, patch: { status?: ApplicantStatus; notes?: string }) => {
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      );
      try {
        const res = await fetch(`/api/admin/applicants/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error('failed');
        const updated = (await res.json()) as JobApplication;
        setApplicants((prev) => prev.map((a) => (a.id === id ? updated : a)));
      } catch {
        fetchApplicants();
      }
    },
    [fetchApplicants],
  );

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return applicants
      .filter((a) => !filters.jobSlug || a.jobSlug === filters.jobSlug)
      .filter((a) => !filters.status || a.status === filters.status)
      .filter(
        (a) =>
          !q ||
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q),
      );
  }, [applicants, filters]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: applicants.length,
      new: applicants.filter((a) => a.status === 'new').length,
      thisWeek: applicants.filter((a) => new Date(a.createdAt).getTime() >= weekAgo).length,
      creator: applicants.filter((a) => a.jobSlug === 'creator-in-residence').length,
      closer: applicants.filter((a) => a.jobSlug === 'b2b-closer').length,
    };
  }, [applicants]);

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Job applicants</h1>
          <p className="text-sm text-gray-400 mt-1">
            Applications from growzilla.xyz/careers
          </p>
        </div>
      </div>

      {error && (
        <div className="card-zilla p-4 mb-6 border-red-500/20 bg-red-500/5">
          <p className="text-sm text-red-400">Failed to load applicants: {error}</p>
        </div>
      )}

      {loading ? (
        <AdminLoadingSkeleton type="grid" />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard
              label="Total applicants"
              value={stats.total.toLocaleString()}
              icon={<UserGroupIcon className="w-4 h-4" />}
            />
            <KPICard
              label="New"
              value={stats.new.toLocaleString()}
              icon={<SparklesIcon className="w-4 h-4" />}
            />
            <KPICard
              label="This week"
              value={stats.thisWeek.toLocaleString()}
              icon={<BriefcaseIcon className="w-4 h-4" />}
            />
            <KPICard
              label="Creator / Closer"
              value={`${stats.creator} / ${stats.closer}`}
              icon={<BriefcaseIcon className="w-4 h-4" />}
            />
          </div>

          <div className="card-zilla p-4 mb-6 flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1.5">
                Role
              </label>
              <select
                value={filters.jobSlug ?? ''}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    jobSlug: e.target.value || null,
                  }))
                }
                className="px-3 py-2 bg-zilla-black border border-white/[0.08] rounded-lg text-sm text-white min-w-[200px]"
              >
                <option value="">All roles</option>
                {jobs.map((j) => (
                  <option key={j.slug} value={j.slug}>
                    {getLocalizedContent(j, j.defaultLocale).title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1.5">
                Status
              </label>
              <select
                value={filters.status ?? ''}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    status: (e.target.value as ApplicantStatus) || null,
                  }))
                }
                className="px-3 py-2 bg-zilla-black border border-white/[0.08] rounded-lg text-sm text-white min-w-[160px]"
              >
                <option value="">All statuses</option>
                {(['new', 'reviewed', 'trial', 'shortlisted', 'rejected'] as ApplicantStatus[]).map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1.5">
                Search
              </label>
              <input
                type="search"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                placeholder="Name or email..."
                className="w-full px-3 py-2 bg-zilla-black border border-white/[0.08] rounded-lg text-sm text-white"
              />
            </div>
          </div>

          <ApplicantsTable applicants={filtered} onUpdate={handleUpdate} />
        </>
      )}
    </AdminLayout>
  );
}