'use client';

interface Props {
  label: string;
  description?: string;
  letter?: string;
  selected: boolean;
  onClick: () => void;
}

export default function MorsdagQuizOption({ label, description, letter, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left flex items-center gap-4 rounded-lg px-4 py-4 sm:px-5 sm:py-4 border transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-morsdag-rose/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        selected
          ? 'border-morsdag-rose bg-morsdag-rose/[0.08]'
          : 'bg-white/[0.02] border-white/10 hover:border-morsdag-rose/40 hover:bg-white/[0.04]',
      ].join(' ')}
      aria-pressed={selected}
    >
      {letter && (
        <span
          className={[
            'flex-shrink-0 w-7 text-center font-mono text-xs uppercase tracking-wider',
            selected ? 'text-morsdag-rose' : 'text-morsdag-rose/40',
          ].join(' ')}
        >
          {letter}
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] sm:text-base text-white font-medium leading-snug">{label}</span>
        {description && (
          <span className="block mt-1 text-[13px] text-white/50 leading-snug">{description}</span>
        )}
      </span>
      {selected && (
        <span className="flex-shrink-0 text-morsdag-rose" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </button>
  );
}
