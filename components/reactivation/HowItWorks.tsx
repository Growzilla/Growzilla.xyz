"use client";

import { useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Free Audit",
    description:
      "We analyse your email list, deliverability health, and segmentation. You get a full breakdown of what's working, what's dead, and what's recoverable — at zero cost.",
  },
  {
    number: "02",
    title: "Reactivation Strategy",
    description:
      "We build a custom sequence engineered to win back cold subscribers. Subject lines, timing, segmentation — every detail crafted for re-engagement.",
  },
  {
    number: "03",
    title: "Execute & Scale",
    description:
      "We run the campaigns, monitor performance, and optimise in real-time. You watch your open rates, click rates, and revenue climb.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 3), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--green)" }}
          >
            The Process
          </p>
          <h2
            className="font-black tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const glowing = hovered === i || (hovered === null && active === i);
            return (
              <div
                key={step.number}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "16px",
                  padding: "40px 36px 44px",
                  background: glowing
                    ? "radial-gradient(ellipse 120% 80% at 50% 130%, rgba(0,255,102,0.08) 0%, transparent 65%), #0e0e0e"
                    : "#0e0e0e",
                  border: glowing
                    ? "1px solid rgba(0,255,102,0.22)"
                    : "1px solid rgba(123,143,168,0.1)",
                  boxShadow: glowing
                    ? "0 0 48px rgba(0,255,102,0.07)"
                    : "none",
                  transition: "all 0.5s ease",
                  cursor: "default",
                }}
              >
                {/* Large background number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-0.1em",
                    right: "-0.02em",
                    fontFamily: "var(--font-syne)",
                    fontSize: "11rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: glowing
                      ? "rgba(0,255,102,0.055)"
                      : "rgba(255,255,255,0.03)",
                    userSelect: "none",
                    pointerEvents: "none",
                    transition: "color 0.5s ease",
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div style={{ position: "relative" }}>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: glowing ? "var(--green)" : "var(--slate)",
                      marginBottom: "24px",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {step.number}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                      lineHeight: 1.1,
                      marginBottom: "14px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                      color: "var(--text-muted)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
