import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import EliteLayout from '@/components/EliteLayout';
import ApplicationForm from '@/components/careers/ApplicationForm';
import JobDescription from '@/components/careers/JobDescription';
import { getJob, getJobSlugs, resolveLocale } from '@/lib/careers/jobs';
import type { JobLocale, JobPosting } from '@/types/careers';

interface Props {
  job: JobPosting;
}

export default function JobDetailPage({ job }: Props) {
  const router = useRouter();
  const [locale, setLocale] = useState<JobLocale>(job.defaultLocale);

  useEffect(() => {
    const lang = router.query.lang;
    if (typeof lang === 'string') {
      setLocale(resolveLocale(job, lang));
    }
  }, [router.query.lang, job]);

  const handleLocaleChange = (next: JobLocale) => {
    setLocale(next);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, lang: next } },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <Head>
        <title>{(job.content[locale] ?? job.content[job.defaultLocale])?.title} | Careers | Growzilla</title>
        <meta
          name="description"
          content={(job.content[locale] ?? job.content[job.defaultLocale])?.summary ?? ''}
        />
        <meta name="theme-color" content="#0A0A0B" />
      </Head>

      <EliteLayout>
        <section className="relative pt-32 pb-24">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-zilla-neon transition-colors mb-10"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to careers
            </Link>

            <JobDescription
              job={job}
              locale={locale}
              onLocaleChange={job.locales.length > 1 ? handleLocaleChange : undefined}
            />

            <div className="mt-16 pt-16 border-t border-white/[0.06]">
              <ApplicationForm job={job} locale={locale} />
            </div>
          </div>
        </section>
      </EliteLayout>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: getJobSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) {
    return { notFound: true };
  }
  return {
    props: { job },
  };
}