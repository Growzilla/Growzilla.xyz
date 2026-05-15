type Props = {
  items: string[]
}

export default function TrustRow({ items }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-white/40 font-mono">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-x-3">
          {i > 0 && <span aria-hidden className="text-white/20">·</span>}
          {item}
        </span>
      ))}
    </div>
  )
}
