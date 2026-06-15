"use client";
import { useState, useEffect } from "react";

const glassStyle = {
  background: "rgba(12, 12, 12, 0.6)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        ...glassStyle,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        overflow: "visible",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

        {/* Left: wordmark */}
        <a
          href="#"
          className="font-black text-xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-syne-brand)" }}
        >
          GROW<span style={{ color: "var(--green)" }}>ZILLA</span>
        </a>

        {/* Center: semicircle (collapsed on scroll, desktop only) */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2"
          style={{
            top: 0,
            width: "160px",
            height: "150px",
            transformOrigin: "top center",
            transform: scrolled ? "scaleY(0)" : "scaleY(1)",
            opacity: scrolled ? 0 : 1,
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
            pointerEvents: scrolled ? "none" : "auto",
          }}
        >
          {/* Glass shape — clipped to only show below navbar */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderBottomLeftRadius: "9999px",
              borderBottomRightRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.07)",
              ...glassStyle,
              clipPath: "inset(64px 0 0 0)",
            }}
          />

          {/* Logo — sits above the clip, fully visible */}
          <img
            src="/growzillalogo.png"
            alt="Growzilla"
            style={{
              position: "absolute",
              width: "92%",
              height: "92%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              objectFit: "contain",
              zIndex: 10,
            }}
          />
        </div>

        {/* Center: inline logo (appears on scroll, desktop only) */}
        <div
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center"
          style={{
            height: "64px",
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: scrolled ? "auto" : "none",
          }}
        >
          <img
            src="/growzillalogo.png"
            alt="Growzilla"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Right: nav links + CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-white">
            <a href="#how-it-works" className="opacity-70 hover:opacity-100 transition-opacity duration-200">
              How It Works
            </a>
            <a href="#results" className="opacity-70 hover:opacity-100 transition-opacity duration-200">
              Results
            </a>
            <a href="#faq" className="opacity-70 hover:opacity-100 transition-opacity duration-200">
              FAQ
            </a>
          </div>
          <a
            href="#contact"
            className="text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: "#00FF66", color: "#080808", boxShadow: "0 0 16px #00FF6666, 0 0 40px #00FF6633" }}
          >
            Get Free Audit
          </a>
        </div>

      </div>
    </nav>
  );
}
