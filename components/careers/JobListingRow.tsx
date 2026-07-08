import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import type { JobPosting } from '@/types/careers';
import { getLocalizedContent } from '@/lib/careers/jobs';

interface Props {
  job: JobPosting;
  locale?: 'en' | 'sv';
}

export default function JobListingRow({ job, locale }: Props) {
  const loc = locale ?? job.defaultLocale;
  const content = getLocalizedContent(job, loc);

  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex items-center justify-between gap-6 py-6 border-t border-white/[0.06] first:border-t-0 hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-lg"
    >
      <div className="min-w-0">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-white/95 group-hover:text-zilla-neon transition-colors">
          {content.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
          {job.location}
        </p>
        <p className="mt-2 text-sm text-white/55 max-w-2xl">{content.summary}</p>
      </div>
      <ArrowRightIcon className="w-5 h-5 text-zilla-neon shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}