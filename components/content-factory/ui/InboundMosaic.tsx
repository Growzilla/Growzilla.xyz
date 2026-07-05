import { INBOUND_MOSAIC_TILES } from '@/lib/content-factory/inbound-proof'

const ROW_ONE = INBOUND_MOSAIC_TILES.slice(0, 10)
const ROW_TWO = INBOUND_MOSAIC_TILES.slice(10)

function MosaicRow({ tiles }: { tiles: string[] }) {
  return (
    <div
      className="grid h-[140px] sm:h-[180px] md:h-[220px] gap-0"
      style={{ gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))` }}
    >
      {tiles.map((src) => (
        <div key={src} className="h-full overflow-hidden bg-[#0A0A0B]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            width={240}
            height={427}
            className="w-full h-full object-cover object-top scale-[1.06]"
            loading="lazy"
            decoding="async"
            aria-hidden
          />
        </div>
      ))}
    </div>
  )
}

export default function InboundMosaic() {
  return (
    <div
      className="relative mx-auto w-full max-w-[80rem] rounded-xl border border-zilla-neon/25 bg-[#0A0A0B] overflow-hidden shadow-[0_0_48px_rgba(0,255,148,0.12),0_24px_80px_rgba(0,0,0,0.45)]"
      aria-label="Inbound message requests"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zilla-neon/60 to-transparent"
        aria-hidden
      />
      <MosaicRow tiles={ROW_ONE} />
      <MosaicRow tiles={ROW_TWO} />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent"
        aria-hidden
      />
    </div>
  )
}