"use client";

// Six-segment cubic bezier figure-8 in hero-relative px coords (~1280×800 hero)
// Segments 1-3: right loop sweeping around the browser window area
// Segments 4-6: left loop dipping into the CTA button area, then returning
// C1 continuity is maintained at the crossing point (~490,380) so the path
// stays smooth when the two loops meet.
const FIGURE_8 =
  "M 720,240 " +
  "C 1060,80 1140,340 1060,510 " +
  "C 980,670 800,620 630,470 " +
  "C 460,330 310,140 200,200 " +
  "C 60,270 55,530 160,460 " +
  "C 250,400 410,340 530,370 " +
  "C 620,395 665,305 720,240 Z";

export default function HeroPlaneFlight() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div className="flyer">
          {/* Paper airplane */}
          <svg
            className="plane-icon"
            width="52"
            height="42"
            viewBox="-22 -20 60 40"
            fill="none"
            style={{
              position: "absolute",
              top: "-21px",
              left: "-26px",
              filter:
                "drop-shadow(0 0 8px #00FF94) drop-shadow(0 0 20px #00FF9450)",
            }}
          >
            <path
              d="M 38 0 L -22 -20 L -6 0 L -22 20 Z"
              stroke="#00FF94"
              strokeWidth="2"
              fill="rgba(0,255,148,0.18)"
              strokeLinejoin="round"
            />
            <line
              x1="-6" y1="0" x2="-22" y2="-20"
              stroke="#00FF94" strokeWidth="1.2" strokeOpacity="0.6"
            />
            <line
              x1="-6" y1="0" x2="38" y2="0"
              stroke="#00FF94" strokeWidth="0.9" strokeOpacity="0.4"
            />
          </svg>

          {/* Dollar sign */}
          <div
            className="dollar-icon"
            style={{
              position: "absolute",
              top: "-23px",
              left: "-11px",
              color: "#00FF94",
              fontSize: "38px",
              fontWeight: 900,
              lineHeight: 1,
              fontFamily: "var(--font-syne)",
              textShadow:
                "0 0 18px #00FF9490, 0 0 40px #00FF9450, 0 0 80px #00FF9420",
            }}
          >
            $
          </div>
        </div>
      </div>

      <style>{`
        .flyer {
          position: absolute;
          width: 0;
          height: 0;
          offset-path: path('${FIGURE_8}');
          /* linear is critical — any easing on a looping path creates jank */
          animation: figureeight 14s linear infinite;
        }

        .plane-icon {
          animation: planevis 14s linear infinite;
        }

        .dollar-icon {
          opacity: 0;
          animation: dollarvis 14s linear infinite;
        }

        @keyframes figureeight {
          /* z-index 10 = in front of everything (left col is z-index:3) */
          /* z-index 2  = behind left column → behind ALL left content incl. button */
          0%   { offset-distance:   0%; z-index: 10; offset-rotate: auto; }
          46%  { offset-distance:  46%; z-index: 10; offset-rotate: auto; }
          47%  {                         z-index:  2; }
          50%  {                                      offset-rotate: 0deg; }
          68%  { offset-distance:  68%; z-index:  2; offset-rotate: 0deg; }
          69%  {                         z-index: 10; }
          72%  {                                      offset-rotate: auto; }
          100% { offset-distance: 100%; z-index: 10; offset-rotate: auto; }
        }

        @keyframes planevis {
          0%,  46% { opacity: 1; }
          50%       { opacity: 0; }
          67%       { opacity: 0; }
          71%       { opacity: 1; }
          100%      { opacity: 1; }
        }

        @keyframes dollarvis {
          0%,  46% { opacity: 0; }
          50%       { opacity: 1; }
          67%       { opacity: 1; }
          71%       { opacity: 0; }
          100%      { opacity: 0; }
        }
      `}</style>
    </>
  );
}
