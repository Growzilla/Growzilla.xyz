type Props = {
  label: string
  items: string[]
}

export default function IncludedRecap({ label, items }: Props) {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
        {label}
      </span>

      <ul className="mt-5 divide-y divide-white/[0.06]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 py-3 first:pt-0">
            <span
              aria-hidden
              className="mt-[9px] h-1.5 w-1.5 rounded-full bg-morsdag-rose flex-shrink-0"
            />
            <span className="text-[14px] sm:text-[15px] text-white/85 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
