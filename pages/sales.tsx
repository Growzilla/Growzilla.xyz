import Head from 'next/head';
import React, { useState, useEffect, useCallback } from 'react';
import LoginGate from '@/components/admin/LoginGate';
import {
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  GlobeAltIcon,
  UserGroupIcon,
  FunnelIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  PaperAirplaneIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { PhoneIcon as PhoneIconSolid } from '@heroicons/react/24/solid';
import type {
  Lead,
  LeadStage,
  PipelineMetrics,
  CallWindow,
  CallScheduleResponse,
  EmailPreview,
  ApolloImportResult,
  BatchEmailResult,
} from '@/types/sales';
import { STAGE_LABELS, STAGE_COLORS, STAGE_BG } from '@/types/sales';

const API_BASE = process.env.NEXT_PUBLIC_ECOMDASH_API_URL || process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

async function salesFetch<T>(path: string, opts: { method?: string; body?: unknown; params?: Record<string, string> } = {}): Promise<T> {
  let url = `${API_BASE}/api/sales${path}`;
  if (opts.params) url += '?' + new URLSearchParams(opts.params).toString();
  const res = await fetch(url, {
    method: opts.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─── METRIC CARD ──────────────────────────────────────────────
function MetricCard({ label, value, icon: Icon, accent }: { label: string; value: string | number; icon: React.ElementType; accent?: boolean }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${accent ? 'text-[#00FF94]' : 'text-zinc-500'}`} />
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{label}</span>
      </div>
      <div className={`text-2xl font-bold font-mono ${accent ? 'text-[#00FF94]' : 'text-white'}`}>{value}</div>
    </div>
  );
}

// ─── STAGE BADGE ──────────────────────────────────────────────
function StageBadge({ stage, onClick }: { stage: LeadStage; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${STAGE_COLORS[stage]} ${STAGE_BG[stage]} ${onClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
    >
      {STAGE_LABELS[stage]}
    </button>
  );
}

// ─── CALL SCHEDULE PANEL ──────────────────────────────────────
function CallSchedulePanel({ schedule }: { schedule: CallScheduleResponse | null }) {
  if (!schedule) return null;
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon className="w-5 h-5 text-[#00FF94]" />
        <h3 className="text-sm font-semibold text-white">Call Schedule</h3>
        <span className="ml-auto text-xs text-zinc-500 font-mono">{schedule.current_time} ({schedule.timezone})</span>
      </div>
      <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
        {schedule.windows.map((w, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs ${w.active ? 'bg-[#00FF94]/10 border border-[#00FF94]/20' : 'bg-white/[0.01]'}`}>
            <span className={`font-mono font-medium w-24 ${w.active ? 'text-[#00FF94]' : 'text-zinc-400'}`}>{w.your_time}</span>
            <GlobeAltIcon className={`w-3.5 h-3.5 ${w.active ? 'text-[#00FF94]' : 'text-zinc-600'}`} />
            <span className={`flex-1 ${w.active ? 'text-white' : 'text-zinc-500'}`}>{w.region}</span>
            <span className={`font-mono ${w.active ? 'text-[#00FF94]' : 'text-zinc-600'}`}>{w.local_time}</span>
            {w.active && <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EMAIL PREVIEW MODAL ──────────────────────────────────────
function EmailPreviewModal({ lead, onClose, onSend }: { lead: Lead; onClose: () => void; onSend: (leadId: string, template: string) => void }) {
  const [template, setTemplate] = useState<'intro' | 'value' | 'followup'>('intro');
  const [preview, setPreview] = useState<EmailPreview | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    salesFetch<EmailPreview>('/email/preview', {
      params: {
        template,
        first_name: lead.first_name || 'there',
        company_name: lead.company_name || 'your company',
      },
    })
      .then(setPreview)
      .catch(() => setPreview(null))
      .finally(() => setLoading(false));
  }, [template, lead]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#111113] border border-white/[0.08] rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-white">Email Preview</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{lead.email}</p>
          </div>
          <div className="flex gap-2">
            {(['intro', 'value', 'followup'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${template === t ? 'bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20' : 'text-zinc-400 hover:text-white'}`}
              >
                {t === 'intro' ? 'Day 0' : t === 'value' ? 'Day 3' : 'Day 7'}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 overflow-y-auto max-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <ArrowPathIcon className="w-5 h-5 text-zinc-500 animate-spin" />
            </div>
          ) : preview ? (
            <div>
              <div className="text-xs text-zinc-500 mb-1">Subject:</div>
              <div className="text-sm text-white font-medium mb-4">{preview.subject}</div>
              <div className="text-xs text-zinc-500 mb-1">Body:</div>
              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{preview.body_text}</div>
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Failed to load preview</p>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-4 py-2 text-xs text-zinc-400 hover:text-white rounded-md transition-colors">Cancel</button>
          <button
            onClick={() => { onSend(lead.id, template); onClose(); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#00FF94] text-black rounded-md text-xs font-semibold hover:bg-[#00FF94]/90 transition-colors"
          >
            <PaperAirplaneIcon className="w-3.5 h-3.5" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LEAD ROW ─────────────────────────────────────────────────
function LeadRow({ lead, onStageChange, onCall, onEmail }: {
  lead: Lead;
  onStageChange: (id: string, stage: LeadStage) => void;
  onCall: (lead: Lead) => void;
  onEmail: (lead: Lead) => void;
}) {
  const [showStages, setShowStages] = useState(false);
  const stages: LeadStage[] = ['new', 'emailed', 'replied', 'called', 'meeting_booked', 'negotiating', 'closed_won', 'closed_lost'];

  return (
    <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium">{lead.first_name} {lead.last_name}</span>
          <span className="text-xs text-zinc-500">{lead.title}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm text-white">{lead.company_name}</span>
          <span className="text-xs text-zinc-500">{lead.company_industry}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-zinc-400">{lead.company_country}</span>
      </td>
      <td className="px-4 py-3">
        <div className="relative">
          <StageBadge stage={lead.stage} onClick={() => setShowStages(!showStages)} />
          {showStages && (
            <div className="absolute z-20 top-full mt-1 left-0 bg-[#151518] border border-white/[0.08] rounded-lg py-1 shadow-xl">
              {stages.map(s => (
                <button
                  key={s}
                  onClick={() => { onStageChange(lead.id, s); setShowStages(false); }}
                  className="block w-full px-3 py-1.5 text-left text-xs text-zinc-300 hover:bg-white/[0.05] transition-colors"
                >
                  {STAGE_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        {lead.lead_score != null && (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${lead.lead_score}%`,
                  backgroundColor: lead.lead_score >= 60 ? '#00FF94' : lead.lead_score >= 30 ? '#FFB84D' : '#FF3366',
                }}
              />
            </div>
            <span className="text-xs font-mono text-zinc-400">{lead.lead_score.toFixed(0)}</span>
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-zinc-500">
          {lead.emails_sent > 0 ? `${lead.emails_sent}/3` : '—'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {lead.phone && (
            <button
              onClick={() => onCall(lead)}
              className="p-1.5 rounded-md text-zinc-500 hover:text-[#00FF94] hover:bg-[#00FF94]/10 transition-colors"
              title={`Call ${lead.phone}`}
            >
              <PhoneIcon className="w-3.5 h-3.5" />
            </button>
          )}
          {lead.email && (
            <button
              onClick={() => onEmail(lead)}
              className="p-1.5 rounded-md text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
              title={`Email ${lead.email}`}
            >
              <EnvelopeIcon className="w-3.5 h-3.5" />
            </button>
          )}
          {lead.linkedin_url && (
            <a
              href={lead.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
              title="LinkedIn"
            >
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── MAIN SALES OS DASHBOARD ──────────────────────────────────
function SalesOSDashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics | null>(null);
  const [schedule, setSchedule] = useState<CallScheduleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'leads' | 'calls' | 'pipeline'>('leads');

  // Modals
  const [emailLead, setEmailLead] = useState<Lead | null>(null);
  const [callingLead, setCallingLead] = useState<Lead | null>(null);

  // Import state
  const [importing, setImporting] = useState(false);
  const [batchSending, setBatchSending] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (stageFilter) params.stage = stageFilter;

      const [leadsData, metricsData, scheduleData] = await Promise.all([
        salesFetch<Lead[]>('/leads', { params }),
        salesFetch<PipelineMetrics>('/pipeline/metrics'),
        salesFetch<CallScheduleResponse>('/call-schedule'),
      ]);
      setLeads(leadsData);
      setMetrics(metricsData);
      setSchedule(scheduleData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [search, stageFilter]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleStageChange = async (leadId: string, stage: LeadStage) => {
    try {
      await salesFetch(`/leads/${leadId}`, { method: 'PATCH', body: { stage } });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage } : l));
      loadData(); // refresh metrics
    } catch (err: any) {
      alert('Failed to update stage: ' + err.message);
    }
  };

  const handleSendEmail = async (leadId: string, template: string) => {
    try {
      await salesFetch('/email/send', { method: 'POST', body: { lead_id: leadId, template } });
      loadData();
    } catch (err: any) {
      alert('Failed to send: ' + err.message);
    }
  };

  const handleMarkCalled = async (lead: Lead) => {
    setCallingLead(lead);
    try {
      await salesFetch(`/leads/${lead.id}/mark-called`, { method: 'POST' });
      loadData();
    } catch (err: any) {
      alert('Failed: ' + err.message);
    }
    setCallingLead(null);
  };

  const handleApolloImport = async () => {
    if (!confirm('Import leads from Apollo? (Shopify + Beauty/Skincare, up to 500 leads)')) return;
    setImporting(true);
    try {
      const result = await salesFetch<{ imported: number; skipped: number }>('/apollo/import-all', {
        method: 'POST',
        params: { max_pages: '5', per_page: '100' },
      });
      alert(`Imported ${result.imported} leads (${result.skipped} duplicates skipped)`);
      loadData();
    } catch (err: any) {
      alert('Import failed: ' + err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleBatchEmails = async () => {
    if (!confirm('Send next sequence email to all eligible leads?')) return;
    setBatchSending(true);
    try {
      const result = await salesFetch<BatchEmailResult>('/email/send-batch', { method: 'POST', params: { limit: '50' } });
      alert(`Sent: ${result.sent} | Failed: ${result.failed} | Eligible: ${result.total_eligible}`);
      loadData();
    } catch (err: any) {
      alert('Batch send failed: ' + err.message);
    } finally {
      setBatchSending(false);
    }
  };

  const stages: LeadStage[] = ['new', 'emailed', 'replied', 'called', 'meeting_booked', 'negotiating', 'closed_won', 'closed_lost'];

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <RocketLaunchIcon className="w-5 h-5 text-[#00FF94]" />
              <span className="font-display text-lg font-bold tracking-tight">
                <span className="text-white">Sales</span>
                <span className="text-[#00FF94]">OS</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20">
                Growzilla
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleApolloImport}
                disabled={importing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.08] rounded-md hover:bg-white/[0.08] transition-colors disabled:opacity-50"
              >
                {importing ? <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" /> : <UserGroupIcon className="w-3.5 h-3.5" />}
                {importing ? 'Importing...' : 'Import Apollo'}
              </button>
              <button
                onClick={handleBatchEmails}
                disabled={batchSending}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-[#00FF94] rounded-md hover:bg-[#00FF94]/90 transition-colors disabled:opacity-50"
              >
                {batchSending ? <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" /> : <BoltIcon className="w-3.5 h-3.5" />}
                {batchSending ? 'Sending...' : 'Send Batch'}
              </button>
              <button onClick={onLogout} className="p-1.5 text-zinc-500 hover:text-white transition-colors">
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        {/* Metrics row */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <MetricCard label="Total Leads" value={metrics.total_leads} icon={UserGroupIcon} />
            <MetricCard label="Meetings" value={metrics.meeting_booked} icon={CalendarDaysIcon} accent />
            <MetricCard label="Won" value={metrics.closed_won} icon={CheckCircleIcon} accent />
            <MetricCard label="Emails Today" value={metrics.emails_sent_today} icon={EnvelopeIcon} />
            <MetricCard label="Replied" value={metrics.replied} icon={ChatBubbleLeftRightIcon} />
            <MetricCard label="In Pipeline" value={metrics.emailed + metrics.called + metrics.negotiating} icon={FunnelIcon} />
          </div>
        )}

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex gap-1 bg-white/[0.02] border border-white/[0.06] rounded-lg p-1">
            {(['leads', 'calls', 'pipeline'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === tab ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab === 'leads' ? 'All Leads' : tab === 'calls' ? 'Call Now' : 'Pipeline'}
              </button>
            ))}
          </div>
          <div className="flex-1 flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="w-full pl-9 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-xs text-zinc-400 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">All Stages</option>
              {stages.map(s => (
                <option key={s} value={s}>{STAGE_LABELS[s]}</option>
              ))}
            </select>
            <button onClick={loadData} className="p-2 text-zinc-500 hover:text-white transition-colors">
              <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main table area */}
          <div className="lg:col-span-3">
            {activeTab === 'leads' && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Contact</th>
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Company</th>
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Country</th>
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Stage</th>
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Score</th>
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Seq</th>
                      <th className="px-4 py-3 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={7} className="px-4 py-10 text-center text-zinc-500 text-sm">Loading...</td></tr>
                    ) : leads.length === 0 ? (
                      <tr><td colSpan={7} className="px-4 py-10 text-center text-zinc-500 text-sm">No leads yet. Click &quot;Import Apollo&quot; to pull leads.</td></tr>
                    ) : (
                      leads.map(lead => (
                        <LeadRow
                          key={lead.id}
                          lead={lead}
                          onStageChange={handleStageChange}
                          onCall={handleMarkCalled}
                          onEmail={setEmailLead}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'calls' && schedule && (
              <div className="space-y-4">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <PhoneIconSolid className="w-5 h-5 text-[#00FF94]" />
                    <h3 className="text-sm font-semibold text-white">Leads to Call Now</h3>
                    <span className="ml-auto text-xs text-zinc-500">{schedule.leads_to_call.length} leads ready</span>
                  </div>
                  {schedule.leads_to_call.length === 0 ? (
                    <p className="text-sm text-zinc-500 py-4">No leads with phone numbers in the current call window. Try importing more leads.</p>
                  ) : (
                    <div className="space-y-2">
                      {schedule.leads_to_call.map(lead => (
                        <div key={lead.id} className="flex items-center gap-4 px-4 py-3 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                          <div className="flex-1">
                            <div className="text-sm text-white font-medium">{lead.first_name} {lead.last_name}</div>
                            <div className="text-xs text-zinc-500">{lead.title} at {lead.company_name}</div>
                          </div>
                          <div className="text-right">
                            <a href={`tel:${lead.phone}`} className="text-sm text-[#00FF94] font-mono hover:underline">{lead.phone}</a>
                            <div className="text-[10px] text-zinc-600">{lead.company_country}</div>
                          </div>
                          <StageBadge stage={lead.stage} />
                          <button
                            onClick={() => handleMarkCalled(lead)}
                            className="px-3 py-1.5 bg-[#00FF94]/10 text-[#00FF94] rounded-md text-xs font-medium hover:bg-[#00FF94]/20 transition-colors"
                          >
                            Mark Called
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'pipeline' && metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => { setStageFilter(stage); setActiveTab('leads'); }}
                    className={`${STAGE_BG[stage]} border border-white/[0.06] rounded-lg p-4 text-left hover:border-white/[0.12] transition-colors`}
                  >
                    <div className={`text-[11px] uppercase tracking-wider font-medium mb-1 ${STAGE_COLORS[stage]}`}>{STAGE_LABELS[stage]}</div>
                    <div className="text-2xl font-bold font-mono text-white">{metrics[stage as keyof PipelineMetrics] ?? 0}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <CallSchedulePanel schedule={schedule} />
          </div>
        </div>
      </main>

      {/* Email Preview Modal */}
      {emailLead && (
        <EmailPreviewModal
          lead={emailLead}
          onClose={() => setEmailLead(null)}
          onSend={handleSendEmail}
        />
      )}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function SalesPage() {
  return (
    <>
      <Head>
        <title>SalesOS | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>
        {(logout) => <SalesOSDashboard onLogout={logout} />}
      </LoginGate>
    </>
  );
}
