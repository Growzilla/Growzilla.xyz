import OrgColumn, { type OrgColumnData } from './OrgColumn'

const COLUMNS: OrgColumnData[] = [
  {
    person: {
      name: 'Albert Elmgart',
      role: 'Partner · Sweden',
      quote:
        'Every partnership runs through me. Ex-founder, now focused on getting startups seen.',
      image: '/images/team/albert.png',
      linkedin: 'https://linkedin.com/in/albert-elmgart',
    },
    hub: 'Partnership & delivery',
    branches: [
      { label: 'Sales reps · Dev', adornment: 'contact' },
      { label: 'Fulfillment · Content' },
    ],
  },
  {
    person: {
      name: 'Jayleen Ko',
      role: 'CMO · AI',
      quote:
        'Strategy, testing, and scale. Always on behind every account. Albert is your voice on calls.',
      image: '/images/team/jayleen.jpeg',
      linkedin: 'https://www.linkedin.com/in/jayleen-ko-6412b3418/',
      instagram: 'https://www.instagram.com/jayleenmarketing/',
    },
    hub: 'Strategy & intelligence',
    branches: [
      { label: 'Templates' },
      { label: 'Agents · Workflows', adornment: 'workflows' },
    ],
  },
]

export default function MeetTeam() {
  return (
    <div className="w-full">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
          Operations
        </p>
        <h2 className="mt-4 font-display font-medium text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.04] tracking-[-0.03em] text-white/95">
          Meet the team
        </h2>
        <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.65] text-white/45 max-w-2xl mx-auto">
          Specialists across content production, distribution, and AI systems. Ex-startup
          operators on the front — a systematized org behind delivery, built to fulfill at
          volume.
        </p>
      </div>

      <div className="mt-14 sm:mt-16 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        {COLUMNS.map((column) => (
          <OrgColumn key={column.person.name} data={column} />
        ))}
      </div>
    </div>
  )
}