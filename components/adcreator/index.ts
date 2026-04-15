export { ChatQuiz } from './ChatQuiz'
export type { ChatQuizProps, QuizQuestion, ChatQuizAnswer } from './ChatQuiz'

export { PhaseChecklist } from './PhaseChecklist'
export type { PhaseChecklistProps, PhaseItem, PhaseStatus } from './PhaseChecklist'

export { LiveTerminal } from './LiveTerminal'
export type { LiveTerminalProps, TerminalLine } from './LiveTerminal'

export { AdCard } from './AdCard'
export type { AdCardProps } from './AdCard'

export { BriefCard } from './BriefCard'
export type { BriefCardProps } from './BriefCard'

export { BrandSnapshot } from './BrandSnapshot'
export type { BrandSnapshotProps } from './BrandSnapshot'

export { CompetitorCard } from './CompetitorCard'
export type { CompetitorCardProps, LongevityDistribution } from './CompetitorCard'

// Pass-through re-exports for primitives that live in components/ui/ — so
// `@/components/adcreator/StickyPDFButton` (etc.) also resolves.
// These are the canonical primitives; new code should import from '@/components/ui'.
export { StickyPDFButton } from '../ui/StickyPDFButton'
export type { StickyPDFButtonProps, StickyPDFButtonVariant } from '../ui/StickyPDFButton'

export { AngleBadge, ANGLE_PALETTE } from '../ui/AngleBadge'
export type { AngleBadgeProps } from '../ui/AngleBadge'

export { LongevityBadge, LONGEVITY_PALETTE } from '../ui/LongevityBadge'
export type { LongevityBadgeProps, LongevityFlag } from '../ui/LongevityBadge'

export { StatusBadge, STATUS_PALETTE } from '../ui/StatusBadge'
export type { StatusBadgeProps, StatusVariant } from '../ui/StatusBadge'
