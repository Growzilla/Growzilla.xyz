const tickerItems = [
  { number: "47%", label: "avg. open rate increase" },
  { number: "3.2×", label: "revenue per email" },
  { number: "89%", label: "list recovery rate" },
];
const ticker = [...Array(8)].flatMap(() => tickerItems);

export default function StatsBand() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        overflow: "hidden",
        borderTop: "1px solid rgba(123,143,168,0.08)",
        borderBottom: "1px solid rgba(123,143,168,0.08)",
        padding: "32px 0",
        opacity: 0.6,
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "ticker-scroll 60s linear infinite",
        }}
      >
        {ticker.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              padding: "0 56px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "3rem",
                fontWeight: 900,
                color: "var(--green)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {item.number}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--slate)",
              }}
            >
              {item.label}
            </span>
            <span style={{ color: "rgba(0,255,102,0.3)", fontSize: "0.4rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
