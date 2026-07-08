import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import type { ApplicantStatus, JobApplication } from '@/types/careers';
import { getJob, getQuestionLabel } from '@/lib/careers/jobs';

interface Props {
  applicants: JobApplication[];
  onUpdate: (id: string, patch: { status?: ApplicantStatus; notes?: string }) => Promise<void>;
}

const STATUS_OPTIONS: ApplicantStatus[] = [
  'new',
  'reviewed',
  'trial',
  'shortlisted',
  'rejected',
];

const STATUS_STYLE: Record<ApplicantStatus, string> = {
  new: 'bg-zilla-neon/10 text-zilla-neon border-zilla-neon/20',
  reviewed: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  trial: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  shortlisted: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-300 border-red-500/20',
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

export default function ApplicantsTable({ applicants, onUpdate }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  if (applicants.length === 0) {
    return (
      <div className="card-zilla p-8 text-center">
        <p className="text-sm text-gray-300 mb-1 font-medium">No applicants match the current filters.</p>
        <p className="text-xs text-gray-500">Share growzilla.xyz/careers to start receiving applications.</p>
      </div>
    );
  }

  return (
    <div className="card-zilla overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] border-b border-white/[0.06]">
            <tr className="text-[11px] uppercase tracking-wider text-gray-500">
              <th className="px-3 py-3 w-8" />
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Applied</th>
              <th className="px-3 py-3 text-center">Files</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => {
              const isOpen = expanded === app.id;
              const job = getJob(app.jobSlug);

              return (
                <React.Fragment key={app.id}>
                  <tr
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : app.id)}
                  >
                    <td className="px-3 py-2.5 align-middle">
                      {isOpen ? (
                        <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500" />
                      ) : (
                        <ChevronRightIcon className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-white font-medium">{app.name}</td>
                    <td className="px-3 py-2.5 align-middle text-gray-300">{app.email}</td>
                    <td className="px-3 py-2.5 align-middle text-gray-400 text-xs max-w-[180px] truncate">
                      {app.jobTitle}
                    </td>
                    <td className="px-3 py-2.5 align-middle">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide border ${STATUS_STYLE[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 align-middle text-gray-500 whitespace-nowrap">
                      {timeAgo(app.createdAt)}
                    </td>
                    <td className="px-3 py-2.5 align-middle text-center">
                      <div className="flex items-center justify-center gap-2">
                        {app.videoUrl && <VideoCameraIcon className="w-4 h-4 text-zilla-neon" />}
                        {app.resumeUrl && <DocumentArrowDownIcon className="w-4 h-4 text-gray-400" />}
                      </div>
                    </td>
                  </tr>

                  {isOpen && (
                    <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                      <td colSpan={7} className="px-4 py-5">
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            {app.videoUrl && (
                              <div>
                                <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                                  Intro video
                                </p>
                                <video
                                  src={app.videoUrl}
                                  controls
                                  className="w-full max-w-lg rounded-lg border border-white/[0.08] bg-black"
                                  preload="metadata"
                                />
                              </div>
                            )}

                            {app.resumeUrl && (
                              <div>
                                <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                                  Resume
                                </p>
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-zilla-neon hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <DocumentArrowDownIcon className="w-4 h-4" />
                                  Download CV
                                </a>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
                                Answers
                              </p>
                              <div className="space-y-3">
                                {Object.entries(app.answers).map(([key, value]) => {
                                  const question = job?.questions.find((q) => q.id === key);
                                  const label = question
                                    ? getQuestionLabel(question, app.locale)
                                    : key;
                                  return (
                                    <div key={key}>
                                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                                      <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">
                                        {value || '—'}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div
                              className="pt-4 border-t border-white/[0.06] space-y-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div>
                                <label className="text-[11px] uppercase tracking-wider text-gray-500 block mb-2">
                                  Status
                                </label>
                                <select
                                  value={app.status}
                                  onChange={(e) =>
                                    onUpdate(app.id, {
                                      status: e.target.value as ApplicantStatus,
                                    })
                                  }
                                  className="w-full sm:w-auto px-3 py-2 bg-zilla-surface border border-white/[0.08] rounded-lg text-sm text-white"
                                >
                                  {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="text-[11px] uppercase tracking-wider text-gray-500 block mb-2">
                                  Internal notes
                                </label>
                                <textarea
                                  rows={3}
                                  value={notesDraft[app.id] ?? app.notes ?? ''}
                                  onChange={(e) =>
                                    setNotesDraft((prev) => ({
                                      ...prev,
                                      [app.id]: e.target.value,
                                    }))
                                  }
                                  onBlur={() => {
                                    const draft = notesDraft[app.id];
                                    if (draft !== undefined && draft !== (app.notes ?? '')) {
                                      onUpdate(app.id, { notes: draft });
                                    }
                                  }}
                                  className="w-full px-3 py-2 bg-zilla-surface border border-white/[0.08] rounded-lg text-sm text-white resize-none"
                                  placeholder="Notes visible only to your team..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}