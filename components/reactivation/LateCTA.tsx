export default function LateCTA() {
  return (
    <section className="py-24 px-6" style={{ background: "var(--bg)" }}>
      <div
        className="max-w-3xl mx-auto text-center"
        style={{
          borderTop: "1px solid rgba(123,143,168,0.12)",
          paddingTop: "80px",
        }}
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
          Still here?
        </p>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Your list is losing value{" "}
          <span style={{ color: "var(--green)" }}>every day you wait.</span>
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--slate)",
            maxWidth: "480px",
            margin: "0 auto 40px",
          }}
        >
          The audit is free. The call is 30 minutes. The only thing it costs you is doing nothing.
        </p>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            background: "#00FF66",
            color: "#080808",
            fontWeight: 700,
            fontSize: "0.95rem",
            padding: "16px 40px",
            borderRadius: "9999px",
            boxShadow: "0 0 28px rgba(0,255,102,0.25)",
            textDecoration: "none",
            transition: "filter 0.2s ease",
          }}
        >
          Claim Your Free Audit →
        </a>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--slate)",
            marginTop: "16px",
            opacity: 0.7,
          }}
        >
          No credit card. No commitment. We respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
