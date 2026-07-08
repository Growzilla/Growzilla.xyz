import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createApplicationId,
  saveApplication,
} from '@/lib/careers/applications';
import { getJob, getLocalizedContent, resolveLocale } from '@/lib/careers/jobs';
import { EMAIL_RE, sendResendEmail, sendWhatsApp } from '@/lib/careers/notify';
import type { JobApplication, JobLocale } from '@/types/careers';

type ApplyBody = {
  jobSlug?: string;
  locale?: string;
  name?: string;
  email?: string;
  answers?: Record<string, string>;
  videoUrl?: string;
  resumeUrl?: string;
  website?: string;
};

function clean(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as ApplyBody;

  if (clean(body.website) !== '') {
    return res.status(202).json({ ok: true });
  }

  const jobSlug = clean(body.jobSlug);
  const job = getJob(jobSlug);
  if (!job) {
    return res.status(400).json({ error: 'invalid_job' });
  }

  const locale = resolveLocale(job, body.locale) as JobLocale;
  const content = getLocalizedContent(job, locale);

  const name = clean(body.name);
  const email = clean(body.email);
  const answers = body.answers && typeof body.answers === 'object' ? body.answers : {};
  const videoUrl = clean(body.videoUrl);
  const resumeUrl = clean(body.resumeUrl);

  if (!name) {
    return res.status(400).json({ error: 'name_required' });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'email_invalid' });
  }

  for (const q of job.questions) {
    if (q.required && !clean(answers[q.id])) {
      return res.status(400).json({ error: 'missing_answer', field: q.id });
    }
  }

  if (job.uploads.video?.required && !videoUrl) {
    return res.status(400).json({ error: 'video_required' });
  }
  if (job.uploads.resume.required && !resumeUrl) {
    return res.status(400).json({ error: 'resume_required' });
  }

  const id = createApplicationId();
  const application: JobApplication = {
    id,
    jobSlug: job.slug,
    jobTitle: content.title,
    locale,
    name,
    email,
    answers: Object.fromEntries(
      Object.entries(answers).map(([k, v]) => [k, clean(v)]),
    ),
    videoUrl: videoUrl || undefined,
    resumeUrl: resumeUrl || undefined,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  try {
    await saveApplication(application);
  } catch (err) {
    console.error('[careers/apply] save_failed', err);
    return res.status(500).json({ error: 'save_failed' });
  }

  const adminUrl = 'https://growzilla.xyz/admin/applicants';
  const waText = [
    '📋 New job application',
    content.title,
    name,
    email,
    adminUrl,
  ].join('\n');

  const wa = await sendWhatsApp(waText);
  if (!wa.ok) {
    console.error('[careers/apply] whatsapp_failed', wa);
  }

  const emailLines = [
    `Role:     ${content.title}`,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Locale:   ${locale}`,
    '',
    '--- Answers ---',
    ...Object.entries(application.answers).map(([k, v]) => `${k}: ${v}`),
    '',
    videoUrl ? `Video:  ${videoUrl}` : null,
    resumeUrl ? `Resume: ${resumeUrl}` : null,
    '',
    `Review: ${adminUrl}`,
    `ID: ${id}`,
  ].filter(Boolean);

  const emailed = await sendResendEmail({
    subject: `[APPLY] ${name} · ${content.title}`,
    text: emailLines.join('\n'),
    replyTo: email,
  });
  if (!emailed.ok) {
    console.error('[careers/apply] resend_failed', emailed);
  }

  return res.status(200).json({ ok: true, id });
}