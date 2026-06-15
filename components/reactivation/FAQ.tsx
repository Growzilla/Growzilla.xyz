"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How much does it cost?",
    a: "The audit is completely free. If you decide to work with us after, pricing depends on your list size and goals. We give you a clear proposal upfront — no surprises, no lock-in.",
  },
  {
    q: "How long before we see results?",
    a: "Most clients see measurable improvement in open rates within the first 2–3 weeks. Full reactivation campaigns typically run 6–8 weeks for maximum recovery.",
  },
  {
    q: "What if my list is old or really cold?",
    a: "That's our specialty. We've reactivated lists that haven't been emailed in over 2 years. Older lists often have untapped value — we know how to wake them up without damaging your sender reputation.",
  },
  {
    q: "What if it doesn't work?",
    a: "We only take on clients we're confident we can deliver results for. The audit exists precisely to assess this honestly. If we don't think we can move the needle, we'll tell you upfront — no wasted time on either side.",
  },
  {
    q: "What do you need from us to get started?",
    a: "Access to your email platform (ESP), your list, and some basic info about your business and audience. We handle the rest — copy, strategy, execution, and reporting.",
  },
  {
    q: "Won't reactivation campaigns hurt my deliverability?",
    a: "Done wrong, yes. Done right — like we do it — it actually improves your deliverability. We remove truly dead addresses and re-engage the rest, which strengthens your sender reputation rather than damaging it.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
            style={{ color: "var(--green)" }}
          >
            FAQ
          </p>
          <h2
            className="font-black tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            }}
          >
            Questions? Answered.
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: "var(--bg-card)",
                border:
                  open === i
                    ? "1px solid rgba(0,255,102,0.18)"
                    : "1px solid rgba(123,143,168,0.12)",
              }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm text-white">{faq.q}</span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-base font-light transition-all duration-200"
                  style={{
                    background:
                      open === i
                        ? "var(--green)"
                        : "rgba(255,255,255,0.06)",
                    color: open === i ? "#080808" : "var(--slate)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
