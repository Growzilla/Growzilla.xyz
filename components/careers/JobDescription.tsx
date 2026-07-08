import type { JobLocale, JobPosting } from '@/types/careers';
import { getLocalizedContent } from '@/lib/careers/jobs';
import LocaleToggle from './LocaleToggle';

interface Props {
  job: JobPosting;
  locale: JobLocale;
  onLocaleChange?: (locale: JobLocale) => void;
}

export default function JobDescription({ job, locale, onLocaleChange }: Props) {
  const content = getLocalizedContent(job, locale);
  const showToggle = job.locales.length > 1 && onLocaleChange;

  return (
    <div>
      {showToggle && (
        <div className="flex justify-end mb-8">
          <LocaleToggle locale={locale} onChange={onLocaleChange} />
        </div>
      )}

      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon/80 mb-4">
        {content.meta}
      </p>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white/95 tracking-[-0.02em]">
        {content.title}
      </h1>

      <p className="mt-6 text-lg text-white/55 leading-relaxed max-w-3xl">{content.intro}</p>

      <div className="mt-12 space-y-10">
        {content.sections.map((section, i) => {
          const heading = section.heading[locale] ?? section.heading[job.defaultLocale] ?? '';
          const body = section.body?.[locale] ?? section.body?.[job.defaultLocale] ?? '';
          const list = section.list?.[locale] ?? section.list?.[job.defaultLocale];

          if (!heading && !body && (!list || list.length === 0)) return null;

          return (
            <section key={i}>
              {heading && (
                <h2 className="font-display text-xl font-semibold text-white/90 mb-4">{heading}</h2>
              )}
              {body && (
                <p className="text-white/55 leading-relaxed whitespace-pre-line">{body}</p>
              )}
              {list && list.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {list.map((item, j) => (
                    <li key={j} className="flex gap-3 text-white/55 leading-relaxed">
                      <span className="text-zilla-neon/60 shrink-0 mt-1.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}