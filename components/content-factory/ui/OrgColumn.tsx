import OrgBox, { type OrgBranch } from './OrgBox'
import OrgConnector from './OrgConnector'
import PersonCard from './PersonCard'

export type OrgColumnData = {
  person: {
    name: string
    role: string
    quote: string
    image: string
    linkedin?: string
    instagram?: string
  }
  hub: string
  branches: [OrgBranch, OrgBranch]
}

function BranchLabel({ branch }: { branch: OrgBranch }) {
  return (
    <span className="inline-flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/28">
      {branch.adornment === 'contact' && (
        <span className="inline-flex items-center gap-1 text-white/24" aria-hidden>
          <PhoneIconMini />
          <EnvelopeIconMini />
        </span>
      )}
      {branch.label}
      {branch.adornment === 'workflows' && (
        <span className="text-[11px] normal-case tracking-normal text-white/30" aria-hidden>
          ⚡
        </span>
      )}
    </span>
  )
}

function PhoneIconMini() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  )
}

function EnvelopeIconMini() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  )
}

export default function OrgColumn({ data }: { data: OrgColumnData }) {
  const [left, right] = data.branches

  return (
    <div className="w-full">
      {/* Desktop: wireframe tree */}
      <div className="hidden lg:block">
        <PersonCard {...data.person} />
        <OrgConnector variant="stem" />
        <OrgBox label={data.hub} variant="hub" />
        <OrgConnector variant="fork" />
        <div className="grid grid-cols-2 gap-3">
          <OrgBox branch={left} />
          <OrgBox branch={right} />
        </div>
      </div>

      {/* Mobile: indented list */}
      <div className="lg:hidden">
        <PersonCard {...data.person} />
        <div className="mt-5 border-l border-white/[0.06] pl-4 ml-3 space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
            {data.hub}
          </p>
          <BranchLabel branch={left} />
          <BranchLabel branch={right} />
        </div>
      </div>
    </div>
  )
}