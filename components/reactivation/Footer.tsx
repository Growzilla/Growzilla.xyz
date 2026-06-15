"use client";

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const BackToTop = () => (
  <a
    href="#"
    aria-label="Back to top"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      border: "1px solid rgba(123,143,168,0.2)",
      color: "var(--slate)",
      opacity: 0.6,
      transition: "all 0.2s ease",
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(0,255,102,0.35)";
      el.style.color = "var(--green)";
      el.style.opacity = "1";
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(123,143,168,0.2)";
      el.style.color = "var(--slate)";
      el.style.opacity = "0.6";
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  </a>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 px-6"
      style={{ background: "var(--bg)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* ── Mobile layout ── */}
      <div className="flex flex-col items-center gap-8 md:hidden">
        <img src="/growzillalogo.png" alt="Growzilla" style={{ height: "64px", width: "auto" }} />
        <a href="#" className="font-black text-xl tracking-tight text-white" style={{ fontFamily: "var(--font-syne-brand)" }}>
          GROW<span style={{ color: "var(--green)" }}>ZILLA</span>
        </a>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs" style={{ color: "var(--slate)" }}>
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
          <a href="#results" className="hover:text-white transition-colors duration-200">Results</a>
          <a href="#offer" className="hover:text-white transition-colors duration-200">The Offer</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          {socials.map(s => (
            <a key={s.label} href={s.href} aria-label={s.label} className="transition-opacity duration-200 hover:opacity-100" style={{ color: "var(--slate)", opacity: 0.45 }}>
              {s.icon}
            </a>
          ))}
          <BackToTop />
        </div>
        <p className="text-xs" style={{ color: "rgba(123,143,168,0.45)" }}>© {year} Growzilla. All rights reserved.</p>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex max-w-6xl mx-auto w-full relative items-center justify-center py-2">
        {/* Left: large logo */}
        <div className="absolute left-0">
          <img src="/growzillalogo.png" alt="Growzilla" style={{ height: "80px", width: "auto" }} />
        </div>

        {/* Center */}
        <div className="flex flex-col items-center gap-6">
          <a href="#" className="font-black text-xl tracking-tight text-white" style={{ fontFamily: "var(--font-syne-brand)" }}>
            GROW<span style={{ color: "var(--green)" }}>ZILLA</span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "var(--slate)" }}>
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#results" className="hover:text-white transition-colors duration-200">Results</a>
            <a href="#offer" className="hover:text-white transition-colors duration-200">The Offer</a>
            <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
          <p className="text-xs" style={{ color: "rgba(123,143,168,0.45)" }}>© {year} Growzilla. All rights reserved.</p>
        </div>

        {/* Right: back to top + socials */}
        <div className="absolute right-0 flex items-center gap-5">
          <BackToTop />
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className="transition-opacity duration-200 hover:opacity-100" style={{ color: "var(--slate)", opacity: 0.45 }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
