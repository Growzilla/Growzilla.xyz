// Flat grid that continues from the hero room's floor.
// Vertical lines are at the same x-positions as the hero's floor convergence lines (W/10 = 144px apart).
// The ledge edge line at y=0 marks the front lip where the hero floor drops off.

const W = 1440;
const G = "#00FF66";

// Match hero's floorConvX: 11 lines at 0, 144, 288 … 1440
const vX = Array.from({ length: 11 }, (_, i) => (W / 10) * i);

// Flat horizontal lines — uniform spacing, no perspective compression
const hY = [60, 120, 180, 240, 300];

export default function ProblemBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "300px",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${W} 300`}
        preserveAspectRatio="xMidYMin slice"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Fade mask: fully visible at top, gone by bottom */}
          <linearGradient id="ledgeFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="60%"  stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="ledgeMask">
            <rect width={W} height={300} fill="url(#ledgeFade)" />
          </mask>
        </defs>

        {/* Front ledge edge — the lip where the hero floor ends */}
        <line x1={0} y1={0.5} x2={W} y2={0.5}
          stroke={G} strokeOpacity={0.35} strokeWidth="1.5" />

        <g mask="url(#ledgeMask)">
          {/* Horizontal flat-grid lines */}
          {hY.map((y, i) => (
            <line key={`lh${i}`} x1={0} y1={y} x2={W} y2={y}
              stroke={G} strokeOpacity={0.10 - i * 0.015} strokeWidth="1" />
          ))}
          {/* Vertical lines — same positions as hero floor convergence lines */}
          {vX.map((x, i) => (
            <line key={`lv${i}`} x1={x} y1={0} x2={x} y2={300}
              stroke={G} strokeOpacity={0.08} strokeWidth="1" />
          ))}
        </g>
      </svg>
    </div>
  );
}
