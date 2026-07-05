import SectionRule from '../ui/SectionRule'

export default function AuditTeaser() {
  return (
    <SectionRule compact className="bg-zilla-black">
      <div className="max-w-2xl mx-auto text-center border-t border-white/[0.06] pt-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
          Not ready to partner?
        </p>
        <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.6] text-white/45">
          Book a free 30-minute content audit. We&apos;ll tell you what&apos;s blocking
          distribution.
        </p>
        <a
          href="/enterprise/book-call"
          className="landing-btn-primary mt-6 inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-[14px] sm:text-[15px]"
        >
          Book a call
          <span aria-hidden>→</span>
        </a>
      </div>
    </SectionRule>
  )
}