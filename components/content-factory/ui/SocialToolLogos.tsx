import type { BrandLogo } from '@/lib/brandfetch'

export default function SocialToolLogos({ tools }: { tools: BrandLogo[] }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
        Built on the stack startups actually use
      </span>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {tools.map((tool) => (
          <div
            key={tool.domain}
            className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            {tool.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tool.src}
                alt={tool.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                loading="lazy"
              />
            ) : (
              <span className="font-mono text-[11px] text-white/40">{tool.name}</span>
            )}
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/30">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-white/35 max-w-sm">
        Instagram + Facebook published as one batch · TikTok native · CapCut in the edit pipeline
      </p>
    </div>
  )
}