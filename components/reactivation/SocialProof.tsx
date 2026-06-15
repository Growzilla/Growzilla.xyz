const testimonials = [
  {
    quote:
      "Growzilla recovered over $40k in revenue from a list we had completely written off. The audit alone changed how we think about email.",
    name: "Sarah K.",
    role: "DTC Brand · 80k subscribers",
  },
  {
    quote:
      "Within 60 days, our open rates went from 8% to 31%. The team knew exactly what they were doing — no guesswork, just results.",
    name: "Marcus T.",
    role: "SaaS Founder",
  },
  {
    quote:
      "We'd tried everything to revive our list ourselves. Growzilla's approach was completely different — and it worked from week one.",
    name: "James R.",
    role: "E-commerce · Fashion",
  },
];

export default function SocialProof() {
  return (
    <section
      id="results"
      className="py-20 md:py-32 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--green)" }}
          >
            Client Results
          </p>
          <h2
            className="font-black tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            Real lists. Real revenue.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl flex flex-col gap-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(123,143,168,0.15)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 1L7.39 4.26L11 4.77L8.5 7.14L9.18 10.73L6 9L2.82 10.73L3.5 7.14L1 4.77L4.61 4.26L6 1Z"
                      fill="var(--green)"
                    />
                  </svg>
                ))}
              </div>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#bbb" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-sm text-white">{t.name}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--slate)" }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
