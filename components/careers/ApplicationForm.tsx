import React, { useState } from 'react';
import Link from 'next/link';
import type { JobLocale, JobPosting } from '@/types/careers';
import { getLocalizedContent, getQuestionLabel } from '@/lib/careers/jobs';
import FileUpload from './FileUpload';

interface Props {
  job: JobPosting;
  locale: JobLocale;
}

const inputClass =
  'w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors';

export default function ApplicationForm({ job, locale }: Props) {
  const content = getLocalizedContent(job, locale);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobSlug: job.slug,
          locale,
          name: name.trim(),
          email: email.trim(),
          answers,
          videoUrl,
          resumeUrl,
          website,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zilla-neon/15 flex items-center justify-center">
          <svg className="w-8 h-8 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-white/95 mb-3">Application received</h3>
        <p className="text-white/50 max-w-md mx-auto mb-8">
          We review every application personally. If it&apos;s a fit, you&apos;ll hear from us soon.
        </p>
        <Link href="/careers" className="btn-zilla-outline">
          Back to careers
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-white/95 mb-2">{content.applyHeading}</h2>
        <p className="text-sm text-white/50">{content.applyNote}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full name <span className="text-zilla-neon">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email <span className="text-zilla-neon">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>
      </div>

      {job.questions.map((q) => {
        const label = getQuestionLabel(q, locale);
        const placeholder =
          q.placeholder?.[locale] ?? q.placeholder?.en ?? q.placeholder?.sv ?? '';

        return (
          <div key={q.id}>
            <label htmlFor={q.id} className="block text-sm font-medium text-gray-300 mb-2">
              {label}
              {q.required && <span className="text-zilla-neon ml-1">*</span>}
            </label>
            {q.type === 'textarea' ? (
              <textarea
                id={q.id}
                required={q.required}
                rows={4}
                value={answers[q.id] ?? ''}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder={placeholder}
              />
            ) : (
              <input
                id={q.id}
                type={q.type === 'url' ? 'url' : 'text'}
                required={q.required}
                value={answers[q.id] ?? ''}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                className={inputClass}
                placeholder={placeholder}
              />
            )}
          </div>
        );
      })}

      {job.uploads.video && (
        <FileUpload
          config={job.uploads.video}
          locale={locale}
          jobSlug={job.slug}
          kind="video"
          value={videoUrl}
          onChange={setVideoUrl}
          fileName={videoName}
          onFileNameChange={setVideoName}
        />
      )}

      <FileUpload
        config={job.uploads.resume}
        locale={locale}
        jobSlug={job.slug}
        kind="resume"
        value={resumeUrl}
        onChange={setResumeUrl}
        fileName={resumeName}
        onFileNameChange={setResumeName}
      />

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || (job.uploads.video?.required && !videoUrl) || (job.uploads.resume.required && !resumeUrl)}
        className="w-full btn-zilla text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting…' : 'Submit application'}
      </button>

      <p className="text-xs text-white/35 text-center">
        By applying you agree to our{' '}
        <Link href="/privacy" className="text-zilla-neon/80 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}