"use client";

// SVG perspective room — VP auto-animates left to right (very hard right bias).
// All geometry is re-derived each frame from the live (vpX, vpY) position.

import { useEffect, useRef, useState } from "react";

const W   = 1440;
const H   = 900;
const VX0 = 720;   // default (centre) vanishing point
const VY0 = 450;
const G   = "#7B8FA8";

// Static edge samples for convergence lines — don't change with VP
const floorConvX = Array.from({ length: 11 }, (_, i) => (W / 10) * i);
const wallConvY  = Array.from({ length: 13 }, (_, i) => (H / 12) * i);

// Perspective depth steps — same as before
const Z = [1, 1.5, 2, 3, 5, 8, 15];

export default function HeroBackground() {
  // ── Auto right-to-left-to-right VP sweep ────────────────────────────────────
  // Start at the right extreme (pos = +1 → x = VX0 + 400 = 1120)
  const [vp, setVp] = useState({ x: VX0 + 400, y: VY0 });
  const current = useRef({ x: VX0 + 400, y: VY0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const desktop = window.innerWidth >= 768;
    const PERIOD = desktop ? 135 : 220;
    const xBias  = desktop ? 200 : 260;

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    if (desktop) window.addEventListener("scroll", onScroll, { passive: true });

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      const frac = ((t + PERIOD * 0.567) % PERIOD) / PERIOD;
      const ss = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);

      let pos: number;
      if (frac < 0.233) {
        pos = -1;
      } else if (frac < 0.567) {
        pos = -1 + 2 * ss((frac - 0.233) / 0.334);
      } else if (frac < 0.667) {
        pos = 1;
      } else {
        pos = 1 - 2 * ss((frac - 0.667) / 0.333);
      }

      const targetX = VX0 + xBias + pos * 200;
      const targetY = desktop
        ? VY0 + 30 * Math.sin(t * 0.37 + 1) - scrollY * 0.10
        : VY0 + 30 * Math.sin(t * 0.37 + 1);

      const c = current.current;
      const ny = c.y + (targetY - c.y) * 0.05;
      if (Math.abs(targetX - c.x) > 0.2 || Math.abs(ny - c.y) > 0.2) {
        current.current = { x: targetX, y: ny };
        setVp({ x: targetX, y: ny });
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      if (desktop) window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const vpX = vp.x;
  const vpY = vp.y;

  // ── Geometry helpers (all use live vpX / vpY) ────────────────────────────────

  // Floor horizontal line at y (vpY < y ≤ H)
  const floorH = (y: number) => {
    const t = (H - y) / (H - vpY);
    return { x1: vpX * t, y1: y, x2: W - (W - vpX) * t, y2: y };
  };

  // Ceiling horizontal line at y (0 ≤ y < vpY)
  const ceilH = (y: number) => {
    const t = y / vpY;
    return { x1: vpX * t, y1: y, x2: W - (W - vpX) * t, y2: y };
  };

  // Left-wall vertical at x (0 ≤ x ≤ vpX)
  const leftV = (x: number) => ({
    x1: x, y1: vpY * x / vpX,
    x2: x, y2: H - (H - vpY) * x / vpX,
  });

  // Right-wall vertical at x (vpX ≤ x ≤ W)
  const rightV = (x: number) => {
    const t = (W - x) / (W - vpX);
    return { x1: x, y1: vpY * t, x2: x, y2: H - (H - vpY) * t };
  };

  // ── Grid line positions (z-parameterised, dynamic) ───────────────────────────
  const floorHY = Z.map(z => vpY + (H - vpY) / z);
  const ceilHY  = Z.map(z => vpY - vpY / z);
  const leftVX  = Z.map(z => vpX * (1 - 1 / z));
  const rightVX = Z.map(z => W - (W - vpX) * (1 - 1 / z));

  // ── Opacity (fade toward VP) ──────────────────────────────────────────────────
  const fOp  = (y: number) => 0.02 + 0.10 * ((y  - vpY) / (H - vpY)) ** 0.6;
  const cOp  = (y: number) => 0.02 + 0.10 * ((vpY - y)  / vpY)       ** 0.6;
  const lwOp = (x: number) => 0.02 + 0.10 * (1 - x / vpX)            ** 0.6;
  const rwOp = (x: number) => 0.02 + 0.10 * ((x - vpX) / (W - vpX))  ** 0.6;

  // ── Back wall at z = 4 ────────────────────────────────────────────────────────
  const bwXL = vpX * 0.75;
  const bwXR = W - (W - vpX) * 0.75;
  const bwYT = vpY * 0.75;
  const bwYB = vpY + (H - vpY) / 4;
  const bwW  = bwXR - bwXL;
  const bwHgt = bwYB - bwYT;

  const bwHY = [1, 2, 3, 4, 5].map(i => bwYT + bwHgt * i / 6);
  const bwVX = [1, 2, 3, 4, 5].map(i => bwXL + bwW   * i / 6);

  // ── Corner accent lines ───────────────────────────────────────────────────────
  const corners = [
    { x1: 0, y1: 0, x2: bwXL, y2: bwYT },
    { x1: W, y1: 0, x2: bwXR, y2: bwYT },
    { x1: 0, y1: H, x2: bwXL, y2: bwYB },
    { x1: W, y1: H, x2: bwXR, y2: bwYB },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Both gradients track the live VP position */}
          <radialGradient id="vpFade" cx={vpX / W} cy={vpY / H} r="0.34">
            <stop offset="0%"   stopColor="#080808" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="vpGlow" cx={vpX / W} cy={vpY / H} r="0.42">
            <stop offset="0%"   stopColor="#7B8FA8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7B8FA8" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* FLOOR */}
        {floorConvX.map((x, i) => (
          <line key={`fc${i}`} x1={x} y1={H} x2={vpX} y2={vpY}
            stroke={G} strokeOpacity={0.07} strokeWidth="0.9" />
        ))}
        {floorHY.map((y, i) => {
          const d = floorH(y);
          return <line key={`fh${i}`} {...d} stroke={G} strokeOpacity={fOp(y)} strokeWidth="1" />;
        })}

        {/* CEILING */}
        {floorConvX.map((x, i) => (
          <line key={`cc${i}`} x1={x} y1={0} x2={vpX} y2={vpY}
            stroke={G} strokeOpacity={0.07} strokeWidth="0.9" />
        ))}
        {ceilHY.map((y, i) => {
          const d = ceilH(y);
          return <line key={`ch${i}`} {...d} stroke={G} strokeOpacity={cOp(y)} strokeWidth="1" />;
        })}

        {/* LEFT WALL */}
        {wallConvY.map((y, i) => (
          <line key={`lc${i}`} x1={0} y1={y} x2={vpX} y2={vpY}
            stroke={G} strokeOpacity={0.07} strokeWidth="0.9" />
        ))}
        {leftVX.map((x, i) => {
          const d = leftV(x);
          return <line key={`lv${i}`} {...d} stroke={G} strokeOpacity={lwOp(x)} strokeWidth="1" />;
        })}

        {/* RIGHT WALL */}
        {wallConvY.map((y, i) => (
          <line key={`rc${i}`} x1={W} y1={y} x2={vpX} y2={vpY}
            stroke={G} strokeOpacity={0.07} strokeWidth="0.9" />
        ))}
        {rightVX.map((x, i) => {
          const d = rightV(x);
          return <line key={`rv${i}`} {...d} stroke={G} strokeOpacity={rwOp(x)} strokeWidth="1" />;
        })}

        {/* Dark fade — dissolves convergence lines near VP */}
        <rect width={W} height={H} fill="url(#vpFade)" />

        {/* BACK WALL */}
        <rect x={bwXL} y={bwYT} width={bwW} height={bwHgt}
          stroke={G} strokeOpacity={0.20} strokeWidth="1.2" fill="#080808" />
        {bwHY.map((y, i) => (
          <line key={`bwh${i}`} x1={bwXL} y1={y} x2={bwXR} y2={y}
            stroke={G} strokeOpacity={0.11} strokeWidth="0.9" />
        ))}
        {bwVX.map((x, i) => (
          <line key={`bwv${i}`} x1={x} y1={bwYT} x2={x} y2={bwYB}
            stroke={G} strokeOpacity={0.11} strokeWidth="0.9" />
        ))}

        {/* Green glow — drawn last so it washes over the back wall */}
        <rect width={W} height={H} fill="url(#vpGlow)" />

        {/* Corner accent lines — brighter, stop at back-wall edges */}
        {corners.map((l, i) => (
          <line key={`corner${i}`} {...l}
            stroke={G} strokeOpacity={0.28} strokeWidth="1.4" />
        ))}
      </svg>
    </div>
  );
}
