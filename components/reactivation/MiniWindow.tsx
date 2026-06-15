export default function MiniWindow() {
  const g = "#00FF66";
  const emailRows = [134, 166, 198, 230];
  const sidebarItems = [118, 138, 158, 178, 198];

  return (
    <div style={{ width: "100%", maxWidth: "260px" }}>
      <svg
        viewBox="40 15 400 330"
        fill="none"
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <filter id="mw-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mw-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <path id="mw-envPath"    d="M 385 158 C 460 68 526 258 452 350" fill="none" stroke="none" />
          <path id="mw-dollarPath" d="M 452 350 C 526 258 460 68 385 158" fill="none" stroke="none" />

          <style>{`
            .mw-browser  { animation: browserbob 6s ease-in-out infinite; }
            .mw-browser2 { animation: browserbob 7.5s ease-in-out infinite 1.8s; }
          `}</style>
        </defs>

        <g transform="translate(30, 0)">
          {/* Main browser window */}
          <g className="mw-browser">
            <rect x="54" y="28" width="352" height="308" rx="10"
              stroke={g} strokeWidth="1.5" fill="#1a1a1a" filter="url(#mw-soft)" />
            <rect x="55" y="29" width="350" height="42" rx="10" fill="#222" />
            <rect x="55" y="57" width="350" height="13" fill="#222" />
            <line x1="54" y1="70" x2="406" y2="70" stroke={g} strokeWidth="1" strokeOpacity="0.5" filter="url(#mw-soft)" />
            {[76, 94, 112].map((cx, i) => (
              <circle key={i} cx={cx} cy={50} r={5} stroke={g} strokeWidth="1.2" strokeOpacity="0.65" filter="url(#mw-soft)" />
            ))}
            <rect x="130" y="41" width="200" height="18" rx="9" stroke={g} strokeWidth="1" strokeOpacity="0.4" fill="#1e1e1e" />
            <rect x="150" y="47" width="90" height="4" rx="2" fill={g} fillOpacity="0.22" />
            <line x1="140" y1="70" x2="140" y2="335" stroke={g} strokeWidth="1" strokeOpacity="0.18" />
            <rect x="60" y="82" width="72" height="26" rx="13" stroke={g} strokeWidth="1.3" strokeOpacity="0.7" fill="#1e1e1e" filter="url(#mw-soft)" />
            <rect x="74" y="92" width="44" height="4" rx="2" fill={g} fillOpacity="0.4" />
            {sidebarItems.map((y, i) => (
              <rect key={i} x="60" y={y} width={38 + (i % 3) * 10} height="4" rx="2" fill={g} fillOpacity={i === 0 ? 0.55 : 0.18} />
            ))}
            <rect x="150" y="80" width="248" height="26" rx="13" stroke={g} strokeWidth="1.3" strokeOpacity="0.5" fill="#1e1e1e" filter="url(#mw-soft)" />
            <circle cx="168" cy="93" r="5.5" stroke={g} strokeWidth="1" strokeOpacity="0.45" />
            <line x1="172" y1="97" x2="177" y2="102" stroke={g} strokeWidth="1" strokeOpacity="0.45" />
            <rect x="186" y="90" width="80" height="4" rx="2" fill={g} fillOpacity="0.15" />
            <rect x="150" y="116" width="58" height="4" rx="2" fill={g} fillOpacity="0.7" />
            <line x1="150" y1="122" x2="208" y2="122" stroke={g} strokeWidth="1.5" strokeOpacity="0.9" filter="url(#mw-soft)" />
            <rect x="218" y="116" width="52" height="4" rx="2" fill={g} fillOpacity="0.2" />
            <rect x="280" y="116" width="62" height="4" rx="2" fill={g} fillOpacity="0.2" />
            {emailRows.map((y, i) => (
              <g key={i}>
                <line x1="150" y1={y} x2="402" y2={y} stroke={g} strokeWidth="0.5" strokeOpacity="0.1" />
                <rect x="154" y={y + 9} width="11" height="11" rx="2" stroke={g} strokeWidth="0.8" strokeOpacity="0.3" />
                <circle cx="183" cy={y + 15} r="9" stroke={g} strokeWidth="0.9" strokeOpacity={i === 0 ? 0.6 : 0.25} />
                <rect x="200" y={y + 9} width={35 + (i % 3) * 12} height="5" rx="2" fill={g} fillOpacity={i === 0 ? 0.7 : 0.28} />
                <rect x="200" y={y + 19} width={90 + (i % 4) * 16} height="4" rx="2" fill={g} fillOpacity={i === 0 ? 0.38 : 0.13} />
                <rect x="378" y={y + 9} width="20" height="4" rx="2" fill={g} fillOpacity="0.22" />
              </g>
            ))}
          </g>

          {/* Small secondary window */}
          <g className="mw-browser2">
            <rect x="365" y="288" width="170" height="132" rx="8"
              stroke={g} strokeWidth="1.4" fill="#1a1a1a" strokeOpacity="0.85" filter="url(#mw-soft)" />
            <rect x="366" y="289" width="168" height="32" rx="8" fill="#222" />
            <rect x="366" y="310" width="168" height="11" fill="#222" />
            <line x1="365" y1="321" x2="535" y2="321" stroke={g} strokeWidth="0.9" strokeOpacity="0.5" />
            {[380, 394, 408].map((cx, i) => (
              <circle key={i} cx={cx} cy={305} r={4} stroke={g} strokeWidth="1" strokeOpacity="0.7" />
            ))}
            {[332, 350, 368, 386].map((y, i) => (
              <rect key={i} x="378" y={y} width={105 - i * 14} height="4" rx="2" fill={g} fillOpacity={0.35 - i * 0.05} />
            ))}
          </g>

          {/* Envelope */}
          <g filter="url(#mw-glow)" opacity="0">
            <animate attributeName="opacity" values="0;0.92;0.92;0;0" keyTimes="0;0.08;0.52;0.65;1" dur="7s" repeatCount="indefinite" begin="0s" />
            <animateMotion dur="7s" repeatCount="indefinite" begin="0s" rotate="auto"
              calcMode="spline" keyTimes="0;0.55;1" keyPoints="0;1;1" keySplines="0.42 0 0.58 1;0 0 1 1">
              <mpath href="#mw-envPath" />
            </animateMotion>
            <rect x="-8" y="-5.5" width="16" height="11" rx="2" fill="#00FF66" />
            <path d="M-8 -5.5 L0 1 L8 -5.5" stroke="#080808" strokeWidth="0.9" fill="none" />
          </g>

          {/* Dollar */}
          <g filter="url(#mw-glow)" opacity="0">
            <animate attributeName="opacity" values="0;0.92;0.92;0;0" keyTimes="0;0.08;0.52;0.65;1" dur="7s" repeatCount="indefinite" begin="4.5s" />
            <animateMotion dur="7s" repeatCount="indefinite" begin="4.5s" rotate="auto"
              calcMode="spline" keyTimes="0;0.55;1" keyPoints="0;1;1" keySplines="0.42 0 0.58 1;0 0 1 1">
              <mpath href="#mw-dollarPath" />
            </animateMotion>
            <rect x="-10" y="-6" width="20" height="12" rx="2" fill="#00FF66" />
            <text x="0" y="4.5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#080808" fontFamily="sans-serif">$</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
