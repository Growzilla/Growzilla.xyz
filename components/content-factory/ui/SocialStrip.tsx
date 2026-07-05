import type { BrandLogo } from '@/lib/brandfetch'

export type SocialLink = BrandLogo & { href: string }

type Props = {
  socials: SocialLink[]
  className?: string
}

export default function SocialStrip({ socials, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-6 sm:gap-8 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.domain}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2 opacity-45 hover:opacity-100 transition-opacity duration-150"
          aria-label={social.name}
        >
          {social.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={social.src}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain grayscale group-hover:grayscale-0 transition-all duration-150"
              loading="lazy"
            />
          ) : (
            <span className="font-mono text-[10px] text-white/50 group-hover:text-zilla-neon/80 transition-colors duration-150">
              {social.name}
            </span>
          )}
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30 group-hover:text-zilla-neon/70 transition-colors duration-150">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  )
}