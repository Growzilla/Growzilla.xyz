/** Vertical stem + T-fork into two branch columns (desktop org tree). */
export default function OrgConnector({ variant }: { variant: 'stem' | 'fork' }) {
  const stroke = 'rgba(255,255,255,0.09)'

  if (variant === 'stem') {
    return (
      <div className="flex justify-center w-full" aria-hidden>
        <svg width="1" height="20" className="overflow-visible">
          <line x1="0.5" y1="0" x2="0.5" y2="20" stroke={stroke} strokeWidth="1" />
        </svg>
      </div>
    )
  }

  return (
    <div className="w-full" aria-hidden>
      <svg
        viewBox="0 0 200 26"
        fill="none"
        className="w-full h-[26px]"
        preserveAspectRatio="none"
      >
        {/* Centers at 25% / 75% to match the 2-col branch grid */}
        <path
          d="M100 0 V10 H50 V26 M100 10 H150 V26"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}