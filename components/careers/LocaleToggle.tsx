import type { JobLocale } from '@/types/careers';

interface Props {
  locale: JobLocale;
  onChange: (locale: JobLocale) => void;
}

export default function LocaleToggle({ locale, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.02] p-0.5">
      {(['en', 'sv'] as JobLocale[]).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => onChange(loc)}
          className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
            locale === loc
              ? 'bg-zilla-neon/15 text-zilla-neon'
              : 'text-white/45 hover:text-white/75'
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}