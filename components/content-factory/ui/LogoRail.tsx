import type { BrandLogo } from '@/lib/brandfetch'

export default function LogoRail({ logos }: { logos: BrandLogo[] }) {
  const items = [...logos, ...logos]

  return (
    <div className="mt-12 pt-8 border-t border-white/[0.06]">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 mb-8">
        Worked with 30+ startups
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max gap-14 landing-marquee items-center">
          {items.map((logo, i) => (
            <div
              key={`${logo.domain}-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-25 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-200"
            >
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="font-mono text-[11px] text-white/40">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}