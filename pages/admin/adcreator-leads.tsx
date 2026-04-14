import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Head from 'next/head';
import {
  EnvelopeIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';
import KPICard from '@/components/admin/KPICard';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import ConversionFunnelChart from '@/components/admin/adcreator/ConversionFunnelChart';
import AdcreatorLeadsTable from '@/components/admin/adcreator/AdcreatorLeadsTable';
import type {
  AdcreatorLead,
  AdcreatorLeadFilters,
  AdcreatorLeadsResponse,
  AdcreatorFunnelStats,
  PainPoint,
  SpendBucket,
} from '@/types/adcreator';

export default function AdcreatorLeadsPage() {
  return (
    <>
      <Head>
        <title>Adcreator Leads | Growzilla Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>
        {(logout) => <AdcreatorLeadsView onLogout={logout} />}
      </LoginGate>
    </>
  );
}

function AdcreatorLeadsView({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<AdcreatorLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'mock' | 'backend' | null>(null);
  const [filters, setFilters] = useState<AdcreatorLeadFilters>({
    market: null,
    spend_bucket: null,
    pain: null,
    calendly_clicked_only: false,
  });

  const fetchLeads = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/adcreator-leads');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: AdcreatorLeadsResponse = await res.json();
      setLeads(json.data);
      setSource(json.source);
    } catch (err) {
      setError((err as Error).message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Optimistic toggle of `booked`. Reverts on error.
  const handleToggleBooked = useCallback(async (id: string, next: boolean) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, booked: next } : l)));
    try {
      const res = await fetch(`/api/admin/adcreator-leads/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booked: next }),
      });
      if (!res.ok) throw new Error('failed');
    } catch {
      // Revert
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, booked: !next } : l)),
      );
    }
  }, []);

  const filtered = useMemo(() => {
    return leads
      .filter((l) => !filters.market || l.market === filters.market)
      .filter((l) => !filters.spend_bucket || l.spend_bucket === filters.spend_bucket)
      .filter((l) => !filters.pain || l.pain === filters.pain)
      .filter((l) => !filters.calendly_clicked_only || l.calendly_clicked)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }, [leads, filters]);

  const stats: AdcreatorFunnelStats = useMemo(() => {
    const reports = filtered.length;
    const unique = new Set(filtered.map((l) => l.email.toLowerCase())).size;
    const pdfs = filtered.filter((l) => !!l.pdf_downloaded_at).length;
    const calendly = filtered.filter((l) => l.calendly_clicked).length;
    const bookings = filtered.filter((l) => l.booked).length;
    return {
      reports,
      unique_emails: unique,
      pdf_downloads: pdfs,
      calendly_clicks: calendly,
      bookings,
    };
  }, [filtered]);

  const pdfRate = stats.reports > 0 ? (stats.pdf_downloads / stats.reports) * 100 : 0;
  const calendlyRate =
    stats.pdf_downloads > 0 ? (stats.calendly_clicks / stats.pdf_downloads) * 100 : 0;

  // Distinct values for filter dropdowns.
  const markets = useMemo(
    () => Array.from(new Set(leads.map((l) => l.market))).sort(),
    [leads],
  );

  const isEmpty = !loading && leads.length === 0;

  return (
    <AdminLayout onLogout={onLogout}>
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Adcreator leads
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Public funnel reports + Calendly bookings
            {source === 'mock' && (
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
                mock
              </span>
            )}
            {source === 'backend' && (
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
                live
              </span>
            )}
          </p>
        </div>
      </div>

      {error && (
        <div className="card-zilla p-4 mb-6 border-red-500/20 bg-red-500/5">
          <p className="text-sm text-red-400">Failed to load leads: {error}</p>
        </div>
      )}

      {loading ? (
        <AdminLoadingSkeleton type="grid" />
      ) : isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* KPI strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard
              label="Total reports"
              value={stats.reports.toLocaleString()}
              icon={<DocumentTextIcon className="w-4 h-4" />}
            />
            <KPICard
              label="Unique emails"
              value={stats.unique_emails.toLocaleString()}
              icon={<EnvelopeIcon className="w-4 h-4" />}
            />
            <KPICard
              label="PDF download rate"
              value={`${pdfRate.toFixed(0)}%`}
              icon={<ArrowDownTrayIcon className="w-4 h-4" />}
            />
            <KPICard
              label="Calendly click rate"
              value={`${calendlyRate.toFixed(0)}%`}
              icon={<CalendarDaysIcon className="w-4 h-4" />}
            />
          </div>

          {/* Funnel chart */}
          <section className="card-zilla p-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-white">Conversion funnel</h2>
              <p className="text-xs text-gray-500">
                Reports → PDFs → Calendly clicks → Bookings
              </p>
            </div>
            <ConversionFunnelChart stats={stats} />
          </section>

          {/* Filters — outside the table panel, per FE-DASH design rules. */}
          <Filters
            markets={markets}
            filters={filters}
            onChange={setFilters}
            total={filtered.length}
          />

          {/* Table */}
          <AdcreatorLeadsTable
            leads={filtered}
            onToggleBooked={handleToggleBooked}
          />
        </>
      )}
    </AdminLayout>
  );
}

// ---------------------------------------------------------------------------

const PAIN_OPTIONS: { value: PainPoint; label: string }[] = [
  { value: 'cant_find_winning_creative', label: 'Find winners' },
  { value: 'cac_too_high', label: 'CAC too high' },
  { value: 'cant_scale_past_plateau', label: 'Scale plateau' },
  { value: 'no_attribution_clarity', label: 'No attribution' },
  { value: 'too_few_creators', label: 'Too few creators' },
  { value: 'other', label: 'Other' },
];

const SPEND_OPTIONS: { value: SpendBucket; label: string }[] = [
  { value: '<1k', label: '<$1K/mo' },
  { value: '1-5k', label: '$1–5K/mo' },
  { value: '5-25k', label: '$5–25K/mo' },
  { value: '25k+', label: '$25K+/mo' },
  { value: 'unknown', label: 'Unknown' },
];

interface FiltersProps {
  markets: string[];
  filters: AdcreatorLeadFilters;
  onChange: (next: AdcreatorLeadFilters) => void;
  total: number;
}

const Filters: React.FC<FiltersProps> = ({ markets, filters, onChange, total }) => {
  const set = (patch: Partial<AdcreatorLeadFilters>) =>
    onChange({ ...filters, ...patch });
  const reset = () =>
    onChange({ market: null, spend_bucket: null, pain: null, calendly_clicked_only: false });
  const isFiltered =
    filters.market !== null ||
    filters.spend_bucket !== null ||
    filters.pain !== null ||
    filters.calendly_clicked_only;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <FilterSelect
        value={filters.market || ''}
        onChange={(v) => set({ market: v || null })}
        placeholder="Market"
        options={markets.map((m) => ({ value: m, label: m }))}
      />
      <FilterSelect
        value={filters.spend_bucket || ''}
        onChange={(v) => set({ spend_bucket: (v as SpendBucket) || null })}
        placeholder="Spend"
        options={SPEND_OPTIONS}
      />
      <FilterSelect
        value={filters.pain || ''}
        onChange={(v) => set({ pain: (v as PainPoint) || null })}
        placeholder="Pain"
        options={PAIN_OPTIONS}
      />
      <button
        type="button"
        onClick={() => set({ calendly_clicked_only: !filters.calendly_clicked_only })}
        className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
          filters.calendly_clicked_only
            ? 'border-zilla-neon/40 bg-zilla-neon/10 text-zilla-neon'
            : 'border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20'
        }`}
      >
        Calendly clicked
      </button>

      <div className="flex-1" />
      <span className="text-xs text-gray-500 mr-2">{total} matching</span>
      {isFiltered && (
        <button
          type="button"
          onClick={reset}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
};

interface FilterSelectProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  placeholder,
  options,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`text-xs bg-zilla-dark border border-white/10 text-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-zilla-neon/40 transition-colors ${
      value ? 'text-zilla-neon border-zilla-neon/40' : ''
    }`}
  >
    <option value="">{placeholder}: all</option>
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const EmptyState: React.FC = () => (
  <div className="card-zilla p-10 text-center">
    <h2 className="text-lg font-semibold text-white mb-2">No reports yet</h2>
    <p className="text-sm text-gray-400 max-w-md mx-auto mb-4">
      Once a brand runs the public funnel at growzilla.xyz/adcreator, their lead will
      appear here with the generated PDF and Calendly tracking.
    </p>
    <a
      href="/adcreator"
      className="inline-flex items-center text-xs text-zilla-neon hover:text-white transition-colors"
    >
      Open the public funnel →
    </a>
  </div>
);
