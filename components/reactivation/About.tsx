import Image from "next/image";

export default function About() {
  return (
    <section className="md:-mb-16" style={{ background: "#0a0a0a", overflow: "hidden", position: "relative" }}>
      {/* Main row — stacks on mobile, side-by-side on md+ */}
      <div className="max-w-[1152px] mx-auto flex flex-col md:flex-row md:items-stretch">

        {/* Portrait */}
        <div className="w-full md:w-1/2 overflow-hidden relative z-[2]">
          <Image
            src="/moneybags.png"
            alt="Albert Elmgart"
            width={1545}
            height={1999}
            quality={100}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Text column — pulls up over portrait on mobile, transparent on desktop so ticker shows through */}
        <div
          className="flex-1 flex flex-col justify-start px-6 py-12 md:pt-[72px] md:pb-0 md:pl-16 md:pr-12 -mt-[50vw] md:mt-0"
          style={{ position: "relative", zIndex: 3 }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--green)",
              marginBottom: "20px",
            }}
          >
            Meet the Expert
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Hey! You dropped this{" "}
            <span style={{ color: "var(--green)" }}>10% dormant revenue.</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--slate)",
              maxWidth: "380px",
              marginBottom: "32px",
            }}
          >
            Your dormant subscribers didn&apos;t leave — they just got
            distracted. The right sequence, sent at the right moment, brings
            them back every time.
          </p>

          {/* Expert card */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              background: "rgba(123,143,168,0.06)",
              border: "1px solid rgba(123,143,168,0.15)",
              borderRadius: "12px",
              padding: "14px 18px",
              maxWidth: "320px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(0,255,102,0.1)",
                border: "1px solid rgba(0,255,102,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1a3 3 0 100 6A3 3 0 008 1zM3 13c0-2.76 2.24-5 5-5s5 2.24 5 5"
                  stroke="#00FF66"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
                Albert Elmgart
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--slate)", marginTop: "2px" }}>
                Lead Email Re-activation Strategist
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats ticker — absolutely positioned, behind portrait, desktop only */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "80px",
          zIndex: 1,
          overflow: "hidden",
          borderTop: "1px solid rgba(123,143,168,0.12)",
          padding: "72px 0",
          background: "#0a0a0a",
          opacity: 0.72,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <div style={{ display: "inline-flex", whiteSpace: "nowrap", animation: "ticker-scroll 60s linear infinite" }}>
          {[...Array(8)].flatMap((_, r) =>
            [
              { number: "47%", label: "avg. open rate increase" },
              { number: "3.2×", label: "revenue per email" },
              { number: "89%", label: "list recovery rate" },
            ].map((item, i) => (
              <span
                key={`${r}-${i}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "24px", padding: "0 64px", flexShrink: 0 }}
              >
                <span style={{ fontFamily: "var(--font-syne)", fontSize: "4.5rem", fontWeight: 900, color: "var(--green)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {item.number}
                </span>
                <span style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--slate)" }}>
                  {item.label}
                </span>
                <span style={{ color: "rgba(0,255,102,0.3)", fontSize: "0.45rem" }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

    </section>
  );
}
