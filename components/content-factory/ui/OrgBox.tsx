import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export type OrgBranch = {
  label: string
  adornment?: 'contact' | 'workflows'
}

type Props = {
  branch?: OrgBranch
  label?: string
  variant?: 'hub' | 'branch'
}

export default function OrgBox({ branch, label, variant = 'branch' }: Props) {
  const text = branch?.label ?? label ?? ''
  const adornment = branch?.adornment

  return (
    <div
      className={[
        'w-full rounded-md border border-white/[0.07] bg-[#0A0A0B] flex items-center justify-center text-center',
        variant === 'hub' ? 'px-5 py-4 min-h-[52px]' : 'px-4 py-4 min-h-[64px] sm:min-h-[72px]',
      ].join(' ')}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {adornment === 'contact' && (
          <span className="inline-flex items-center gap-1.5 text-white/28" aria-hidden>
            <PhoneIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
            <EnvelopeIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        )}
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30 leading-relaxed">
          {text}
        </p>
        {adornment === 'workflows' && (
          <span className="text-[11px] leading-none text-white/32" aria-hidden>
            ⚡
          </span>
        )}
      </div>
    </div>
  )
}