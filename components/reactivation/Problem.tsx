"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    prefix: "",
    number: 68,
    suffix: "%",
    label: "of your subscribers haven't opened an email in 6+ months",
    delay: 0,
    duration: 1800,
    featured: false,
  },
  {
    prefix: "$",
    number: 0,
    suffix: "",
    label: "is what most businesses make from their dormant list right now",
    delay: 150,
    duration: 1800,
    featured: true,
  },
  {
    prefix: "",
    number: 3,
    suffix: "×",
    label: "more revenue per email is possible with a properly reactivated list",
    delay: 300,
    duration: 1400,
    featured: false,
  },
];

function StatCard({
  prefix = "",
  number,
  suffix = "",
  label,
  delay = 0,
  duration = 1800,
  featured = false,
}: (typeof stats)[0]) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || number === 0) return;
        observer.disconnect();
        let raf: number;
        const timer = setTimeout(() => {
          let t0: number | null = null;
          const step = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * number));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }, delay);
        return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [number, delay, duration]);

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden"
      style={{
        position: "relative",
        padding: featured ? "44px 40px" : "36px 32px",
        background: "rgba(14,14,14,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: featured
          ? "1px solid rgba(0,255,102,0.09)"
          : "1px solid rgba(0,255,102,0.05)",
        boxShadow: featured
          ? "0 0 20px rgba(0,255,102,0.025), 4px 4px 20px rgba(0,255,102,0.04)"
          : "0 0 12px rgba(0,255,102,0.015), 3px 3px 14px rgba(0,255,102,0.025)",
        transform: featured ? "translateY(-14px)" : "none",
        zIndex: featured ? 1 : 0,
      }}
    >
      {/* Bottom-right backlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: featured
            ? "radial-gradient(ellipse 70% 80% at 100% 100%, rgba(0,255,102,0.06) 0%, transparent 65%)"
            : "radial-gradient(ellipse 70% 80% at 100% 100%, rgba(0,255,102,0.03) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", textAlign: "center" }}>
        <div
          className="font-black leading-none mb-4"
          style={{
            fontFamily: "var(--font-syne)",
            color: "var(--green)",
            fontSize: featured ? "5.5rem" : "4.5rem",
          }}
        >
          {prefix}{number === 0 ? 0 : count}{suffix}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Problem() {
  return (
    <section className="pt-16 md:pt-32 pb-12 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--green)" }}
          >
            The Problem
          </p>
          <h2
            className="font-black tracking-tight leading-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            Your email list is a{" "}
            <span style={{ color: "var(--green)" }}>gold mine.</span>
            <br />
            and you&apos;re not mining it.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-20" style={{ alignItems: "flex-end" }}>
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        <div
          className="p-8 rounded-2xl"
          style={{
            position: "relative",
            background: "rgba(123,143,168,0.04)",
            border: "1px solid rgba(123,143,168,0.15)",
          }}
        >
          {/* Speech bubble arrow pointing down toward Albert's portrait */}
          <div className="left-1/2 md:left-1/4" style={{
            position: "absolute",
            bottom: -14,
            transform: "translateX(-50%) rotate(45deg)",
            width: 26,
            height: 26,
            background: "rgba(123,143,168,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(123,143,168,0.25)",
            borderRight: "1px solid rgba(123,143,168,0.25)",
            boxShadow: "3px 3px 10px rgba(123,143,168,0.08)",
          }} />
          <p className="text-base leading-relaxed" style={{ color: "var(--slate)" }}>
            Most businesses spend thousands acquiring new leads while completely ignoring
            the thousands of people who already trusted them with their email address.{" "}
            <strong style={{ color: "var(--text)" }}>Growzilla fixes that.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
