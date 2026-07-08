import Head from 'next/head';
import EliteLayout from '@/components/EliteLayout';
import JobListingRow from '@/components/careers/JobListingRow';
import { getContinuousJobs } from '@/lib/careers/jobs';

export default function CareersPage() {
  const jobs = getContinuousJobs();

  return (
    <>
      <Head>
        <title>Careers | Growzilla</title>
        <meta
          name="description"
          content="Join Growzilla. We're hiring a Creator in Residence in Stockholm and a B2B Closer for Swedish AI startups."
        />
        <meta name="theme-color" content="#0A0A0B" />
      </Head>

      <EliteLayout>
        <section className="relative pt-32 pb-24">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon/80 mb-6">
              Careers
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white/95 tracking-[-0.02em]">
              Build with us
            </h1>
            <p className="mt-6 text-lg text-white/45 max-w-xl leading-relaxed">
              Small team, high agency. We go on-site with funded AI startups — creating content
              and closing deals that actually move the needle.
            </p>

            <div className="mt-16">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">
                Roles we continuously hire for
              </h2>
              <div className="border-b border-white/[0.06]">
                {jobs.map((job) => (
                  <JobListingRow key={job.slug} job={job} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </EliteLayout>
    </>
  );
}