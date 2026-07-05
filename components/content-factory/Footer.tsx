import type { SocialLink } from './ui/SocialStrip'
import SocialStrip from './ui/SocialStrip'

type Props = {
  socials: SocialLink[]
}

export default function Footer({ socials }: Props) {
  return (
    <footer className="border-t border-white/[0.06] bg-zilla-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-baseline gap-0.5">
          <span className="font-display text-[14px] font-semibold text-white/80">Growzill</span>
          <span className="font-display text-[14px] font-semibold text-zilla-neon">a</span>
        </div>

        <SocialStrip socials={socials} />

        <p className="text-[13px] text-white/40 text-center sm:text-right">
          Content partner for startups · Stockholm
        </p>
      </div>
    </footer>
  )
}