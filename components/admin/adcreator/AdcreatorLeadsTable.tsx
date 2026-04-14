import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import type {
  AdcreatorLead,
  PainPoint,
  SpendBucket,
} from '@/types/adcreator';

interface Props {
  leads: AdcreatorLead[];
  pageSize?: number;
  onToggleBooked: (id: string, next: boolean) => void;
}

const PAIN_LABEL: Record<PainPoint, string> = {
  cant_find_winning_creative: 'Find winners',
  cac_too_high: 'CAC too high',
  cant_scale_past_plateau: 'Scale plateau',
  no_attribution_clarity: 'No attribution',
  too_few_creators: 'Too few creators',
  other: 'Other',
};

const SPEND_LABEL: Record<SpendBucket, string> = {
  '<1k': '<$1K/mo',
  '1-5k': '$1–5K/mo',
  '5-25k': '$5–25K/mo',
  '25k+': '$25K+/mo',
  unknown: 'Unknown',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const AdcreatorLeadsTable: React.FC<Props> = ({
  leads,
  pageSize = 200,
  onToggleBooked,
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(pageSize);

  if (leads.length === 0) {
    return (
      <div className="card-zilla p-8 text-center">
        <p className="text-sm text-gray-300 mb-1 font-medium">
          No leads match the current filters.
        </p>
        <p className="text-xs text-gray-500">
          Try clearing filters or share growzilla.xyz/adcreator to collect more reports.
        </p>
      </div>
    );
  }

  const shown = leads.slice(0, visible);
  const hasMore = leads.length > visible;

  return (
    <div className="card-zilla overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] border-b border-white/[0.06]">
            <tr className="text-[11px] uppercase tracking-wider text-gray-500">
              <th className="px-3 py-3 w-8" />
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Brand</th>
              <th className="px-3 py-3">Domain</th>
              <th className="px-3 py-3">Market</th>
              <th className="px-3 py-3">Spend</th>
              <th className="px-3 py-3">Pain</th>
              <th className="px-3 py-3">Created</th>
              <th className="px-3 py-3 text-center">PDF</th>
              <th className="px-3 py-3 text-center">Calendly</th>
              <th className="px-3 py-3 text-center">Booked</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((lead) => {
              const isOpen = expanded === lead.id;
              return (
                <React.Fragment key={lead.id}>
                  <tr
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : lead.id)}
                  >
                    <td className="px-3 py-2.5 align-middle">
                      {isOpen ? (
                        <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
                      ) : (
                        <ChevronRightIcon className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-gray-200">
                      {lead.email}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-white font-medium">
                      {lead.brand_name}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-gray-400 font-mono text-xs">
                      {lead.domain}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-gray-300">
                      {lead.market}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-gray-300 whitespace-nowrap">
                      {SPEND_LABEL[lead.spend_bucket]}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-gray-300 whitespace-nowrap">
                      {PAIN_LABEL[lead.pain]}
                    </td>
                    <td
                      className="px-3 py-2.5 align-middle text-gray-400 whitespace-nowrap"
                      title={new Date(lead.created_at).toLocaleString()}
                    >
                      {timeAgo(lead.created_at)}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-center">
                      {lead.pdf_url ? (
                        <a
                          href={lead.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-zilla-neon hover:bg-zilla-neon/10 transition-colors"
                          title="Open PDF"
                        >
                          <DocumentArrowDownIcon className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-center">
                      {lead.calendly_clicked ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-zilla-neon"
                          title={
                            lead.calendly_clicked_at
                              ? `Clicked ${timeAgo(lead.calendly_clicked_at)}`
                              : 'Clicked'
                          }
                        >
                          <CalendarDaysIcon className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBooked(lead.id, !lead.booked);
                        }}
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
                          lead.booked
                            ? 'text-zilla-neon bg-zilla-neon/10 hover:bg-zilla-neon/20'
                            : 'text-gray-600 hover:text-gray-300 hover:bg-white/5'
                        }`}
                        aria-pressed={lead.booked}
                        aria-label={lead.booked ? 'Mark as not booked' : 'Mark as booked'}
                        title={lead.booked ? 'Booked — click to unmark' : 'Click to mark as booked'}
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {isOpen && lead.result_preview && (
                    <tr className="bg-black/40 border-b border-white/[0.04]">
                      <td colSpan={11} className="px-6 py-5">
                        <ResultPreview lead={lead} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="border-t border-white/[0.06] px-4 py-3 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Showing {shown.length} of {leads.length}
          </span>
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="text-zilla-neon hover:text-white transition-colors"
          >
            Load {Math.min(pageSize, leads.length - visible)} more →
          </button>
        </div>
      )}
    </div>
  );
};

const ResultPreview: React.FC<{ lead: AdcreatorLead }> = ({ lead }) => {
  const preview = lead.result_preview;
  if (!preview) return null;
  const { brand_brief, competitors, ad_briefs } = preview;
  const competitor = competitors[0];
  const brief = ad_briefs[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Block title="Brand brief">
        <Field label="Brand" value={brand_brief.brand_name} />
        <Field label="Product" value={brand_brief.product_type || '—'} />
        <Field label="Market" value={brand_brief.primary_market || '—'} />
        <Field label="Tone" value={brand_brief.brand_tone || '—'} />
        <Field
          label="Daily budget"
          value={brand_brief.daily_budget ? `$${brand_brief.daily_budget}` : '—'}
        />
        {brand_brief.usp && (
          <p className="text-xs text-gray-400 mt-2 leading-snug">{brand_brief.usp}</p>
        )}
      </Block>

      <Block title="First competitor">
        {competitor ? (
          <>
            <Field label="Brand" value={competitor.brand_name} />
            <Field label="Priority" value={competitor.priority || '—'} />
            <Field label="Ads found" value={String(competitor.ads_found ?? 0)} />
            {competitor.ad_library_url && (
              <a
                href={competitor.ad_library_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zilla-neon hover:text-white transition-colors mt-2 inline-block"
              >
                Open Meta Ad Library →
              </a>
            )}
          </>
        ) : (
          <p className="text-xs text-gray-500">No competitors recorded.</p>
        )}
      </Block>

      <Block title="First ad brief">
        {brief ? (
          <>
            <Field label="Hook" value={brief.hook} multiline />
            <Field label="Visual" value={brief.visual_concept} multiline />
            <Field label="CTA" value={brief.cta} />
            <Field label="Angle" value={brief.angle || '—'} />
          </>
        ) : (
          <p className="text-xs text-gray-500">No ad briefs generated.</p>
        )}
      </Block>
    </div>
  );
};

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
    <h4 className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
      {title}
    </h4>
    <div className="space-y-1.5">{children}</div>
  </div>
);

const Field: React.FC<{ label: string; value: string; multiline?: boolean }> = ({
  label,
  value,
  multiline,
}) => (
  <div className={multiline ? 'flex flex-col gap-0.5' : 'flex items-baseline gap-2'}>
    <span className="text-[11px] uppercase tracking-wider text-gray-500 shrink-0">
      {label}
    </span>
    <span
      className={`text-xs text-gray-200 ${multiline ? 'leading-snug' : 'truncate'}`}
    >
      {value}
    </span>
  </div>
);

export default AdcreatorLeadsTable;
