const includes = [
  "Full email list health audit (normally $500)",
  "Deliverability score & inbox placement test",
  "List segmentation breakdown",
  "Reactivation opportunity report",
  "30-min strategy call with our team",
];

export default function TheOffer() {
  return (
    <section id="offer" className="py-20 md:py-32 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl p-10 md:p-16 overflow-hidden"
          style={{
            background: "rgba(0,255,102,0.025)",
            border: "1px solid rgba(0,255,102,0.22)",
          }}
        >
          {/* Corner glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(0,255,102,0.1) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10">
            <div
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0,255,102,0.1)",
                color: "var(--green)",
                border: "1px solid rgba(0,255,102,0.2)",
              }}
            >
              No Risk · No Cost · No Commitment
            </div>

            <h2
              className="font-black tracking-tight leading-none mb-6"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
              }}
            >
              FREE EMAIL
              <br />
              <span style={{ color: "var(--green)" }}>AUDIT.</span>
            </h2>

            <p
              className="text-lg mb-12 max-w-xl leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              We show you exactly what your email list is worth and how to
              unlock it. Zero cost. Zero commitment. Just a clear picture of the
              revenue you&apos;re leaving on the table.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {includes.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="font-bold mt-0.5 flex-shrink-0"
                    style={{ color: "var(--green)" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: "var(--slate)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ background: "var(--green)", color: "#080808" }}
              >
                Claim Your Free Audit →
              </a>
              <p className="text-sm" style={{ color: "var(--slate)" }}>
                No credit card. No obligation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
