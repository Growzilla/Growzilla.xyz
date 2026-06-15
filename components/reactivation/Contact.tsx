"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition";

const contactDetails = [
  {
    label: "Give us a call",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Send us an email",
    value: "hello@growzilla.com",
    href: "mailto:hello@growzilla.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Posts to the host's existing lead pipeline: emails the operator via
      // Resend + pings WhatsApp (CallMeBot). See pages/api/lead-notify.ts.
      const res = await fetch("/api/lead-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          store: String(data.get("company") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""), // honeypot — must stay empty
          source: "homepage_audit",
        }),
      });
      if (res.ok || res.status === 202) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-20"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 15% 60%, rgba(0,255,102,0.07) 0%, transparent 60%), linear-gradient(135deg, #04110a 0%, #0a2416 50%, #040f07 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">

          {/* Left: heading + contact buttons */}
          <div className="flex flex-col gap-10 lg:pr-10 lg:flex-1">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--green)" }}>
                Get Started
              </p>
              <h2
                className="font-black leading-tight mb-4"
                style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                Book Your{" "}
                <span style={{ color: "var(--green)" }}>Free Audit.</span>
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Fill in the form or reach us directly. We respond within 24 hours with a clear picture of what your list is worth.
              </p>
            </div>

            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.1)" }} />

            <ul className="flex flex-col gap-3">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-4 w-full rounded-xl px-5 py-4 transition-all duration-200"
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
                  >
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,255,102,0.1)", color: "var(--green)", border: "1px solid rgba(0,255,102,0.15)" }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {item.label}
                      </p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px self-stretch mx-10" style={{ background: "rgba(255,255,255,0.1)" }} />

          {/* Right: form */}
          {status === "success" ? (
            <div className="lg:pl-10 lg:flex-1 flex flex-col items-center justify-center text-center py-16">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(0,255,102,0.1)", border: "1px solid rgba(0,255,102,0.2)" }}
              >
                <svg className="w-7 h-7" fill="none" stroke="var(--green)" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thanks — we&apos;ll be in touch!</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>Expect to hear from us within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full lg:pl-10 lg:flex-1">
              {/* Honeypot — real users never see/fill this; bots do. lead-notify rejects on non-empty. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Name <span className="text-red-300">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required placeholder="Your name"
                    className={inputClass}
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Email <span className="text-red-300">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required placeholder="you@company.com"
                    className={inputClass}
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Company
                </label>
                <input
                  id="company" name="company" type="text" placeholder="Your company"
                  className={inputClass}
                  style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Tell us about your list
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="List size, email platform, last send date..."
                  className={`${inputClass} resize-none`}
                  style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-300">Something went wrong. Please try again or contact us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-full font-bold text-base disabled:opacity-60 transition-all duration-200 hover:brightness-110 active:scale-[0.99] mt-1"
                style={{ background: "var(--green)", color: "#080808", boxShadow: "0 0 24px rgba(0,255,102,0.2)" }}
              >
                {status === "loading" ? "Sending…" : "Get My Free Audit →"}
              </button>

              <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                No spam. No commitment. We respond within 24 hours.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
