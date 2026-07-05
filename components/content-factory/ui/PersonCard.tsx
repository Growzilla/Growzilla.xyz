type Props = {
  name: string
  role: string
  quote: string
  image: string
  linkedin?: string
  instagram?: string
}

export default function PersonCard({
  name,
  role,
  quote,
  image,
  linkedin,
  instagram,
}: Props) {
  return (
    <article className="flex h-[200px] sm:h-[220px] w-full border border-white/[0.09] rounded-lg overflow-hidden bg-[#0C0C0D]">
      <div className="w-[120px] sm:w-[136px] h-full shrink-0 border-r border-white/[0.09] bg-[#0A0A0B]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="flex flex-col justify-center min-w-0 p-5 sm:p-6 text-left">
        <h4 className="font-display text-[18px] sm:text-[20px] font-medium text-white/95 tracking-[-0.02em] truncate">
          {name}
        </h4>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
          {role}
        </p>
        <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.55] text-white/48 line-clamp-2">
          &ldquo;{quote}&rdquo;
        </p>
        {(linkedin || instagram) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/42 hover:text-white/70 transition-colors duration-150"
              >
                LinkedIn
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/42 hover:text-white/70 transition-colors duration-150"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}