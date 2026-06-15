const features = [
  "Full email list health audit",
  "Deliverability & spam score analysis",
  "Custom re-engagement sequence (written for you)",
  "List segmentation & cleaning",
  "A/B tested subject lines",
  "Real-time campaign monitoring",
  "Monthly performance reports",
  "Dedicated account strategist",
];

export default function WhatYouGet() {
  return (
    <section className="py-32 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--green)" }}
          >
            What&apos;s Included
          </p>
          <h2
            className="font-black tracking-tight mb-6 leading-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            Everything you need to turn dead emails into live revenue.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            No half-measures. No templates. Every campaign is built from scratch
            around your list, your brand, and your goals.
          </p>
        </div>

        <div className="space-y-2">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-colors duration-200"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(123,143,168,0.10)",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,255,102,0.1)",
                  color: "var(--green)",
                }}
              >
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm" style={{ color: "var(--slate)" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
