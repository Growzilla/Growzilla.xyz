type Props = {
  eyebrow: string
  priceMain: string
  priceSub: string
  perfFee?: string
  adSpendNote?: string
}

export default function PriceBlock({
  eyebrow,
  priceMain,
  priceSub,
  perfFee,
  adSpendNote,
}: Props) {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
        {eyebrow}
      </span>

      <h1 className="mt-5 font-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.025em] text-morsdag-ivory tabular-nums">
        {priceMain}
      </h1>

      <p className="mt-4 text-[13px] sm:text-sm text-white/55 tracking-wide">
        {priceSub}
      </p>

      {perfFee && (
        <p className="mt-5 text-[13px] sm:text-sm text-morsdag-rose/85 leading-relaxed">
          {perfFee}
        </p>
      )}

      {adSpendNote && (
        <p className="mt-1 text-[12px] text-white/40">
          {adSpendNote}
        </p>
      )}
    </div>
  )
}
