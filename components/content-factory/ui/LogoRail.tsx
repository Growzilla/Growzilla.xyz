import type { BrandLogo } from '@/lib/brandfetch'

export default function LogoRail({ logos }: { logos: BrandLogo[] }) {
  const items = [...logos, ...logos]

  return (
    <div className="mt-12 pt-8 border-t border-white/[0.06]">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">
        Our partners
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-12 sm:gap-16 landing-marquee items-center">
          {items.map((logo, i) => (
            <div
              key={`${logo.domain}-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-55 hover:opacity-100 transition-opacity duration-200"
            >
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="font-mono text-[11px] text-white/50">{logo.name}</span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35 hidden sm:inline">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}