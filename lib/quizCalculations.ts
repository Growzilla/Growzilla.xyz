import type {
  RevenueRange,
  SpendRange,
  CreatorCount,
  QuizPlatform,
  TrackingMethod,
  QuizAnswers,
  QuizResult,
  LeakBreakdown,
} from '@/types/quiz'

const REVENUE_MIDPOINTS: Record<RevenueRange, number> = {
  under_50k: 30_000,
  '50k_150k': 100_000,
  '150k_400k': 275_000,
  '400k_1m': 700_000,
  over_1m: 1_500_000,
}

const SPEND_MIDPOINTS: Record<SpendRange, number> = {
  zero_3k: 1_500,
  '3k_8k': 5_500,
  '8k_20k': 14_000,
  '20k_50k': 35_000,
  over_50k: 75_000,
}

const TRACKING_QUALITY: Record<TrackingMethod, number> = {
  guesswork: 0.0,
  spreadsheets: 0.25,
  ga_meta: 0.50,
  not_accurate: 0.20,
}

const CREATOR_SCALE: Record<CreatorCount, number> = {
  '1_5': 0.4,
  '6_15': 0.6,
  '16_30': 0.8,
  '30_plus': 1.0,
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function getPlatformComplexity(platforms: QuizPlatform[]): number {
  const count = platforms.length
  if (count <= 1) return 0.70
  if (count === 2) return 0.85
  return 1.0
}

function getSpendRatio(spend: SpendRange, revenue: RevenueRange): number {
  const spendMid = SPEND_MIDPOINTS[spend]
  const revMid = REVENUE_MIDPOINTS[revenue]
  return Math.min((spendMid / revMid) * 5, 1.0)
}

export function calculateQuizResult(answers: QuizAnswers): QuizResult {
  const trackingQuality = TRACKING_QUALITY[answers.trackingMethod]
  const platformComplexity = getPlatformComplexity(answers.platforms)
  const creatorScale = CREATOR_SCALE[answers.creatorCount]
  const spendRatio = getSpendRatio(answers.creatorSpend, answers.revenueRange)

  const rawScore =
    (1 - trackingQuality) * 60 +
    platformComplexity * 20 +
    creatorScale * 10 +
    spendRatio * 10

  const score = clamp(Math.round(rawScore), 0, 100)
  const leakRate = 0.08 + (score / 100) * 0.22
  const revenueMidpoint = REVENUE_MIDPOINTS[answers.revenueRange]
  const leakEstimate = Math.round((revenueMidpoint * leakRate) / 12)

  // Breakdown proportional to each weight's contribution
  const totalWeighted =
    (1 - trackingQuality) * 60 +
    platformComplexity * 20 +
    creatorScale * 10 +
    spendRatio * 10

  const breakdown: LeakBreakdown = {
    attributionGap: totalWeighted > 0
      ? Math.round((((1 - trackingQuality) * 60) / totalWeighted) * leakEstimate)
      : 0,
    platformBlindSpots: totalWeighted > 0
      ? Math.round(((platformComplexity * 20) / totalWeighted) * leakEstimate)
      : 0,
    creatorScaleLoss: totalWeighted > 0
      ? Math.round(((creatorScale * 10) / totalWeighted) * leakEstimate)
      : 0,
    unoptimizedSpend: totalWeighted > 0
      ? Math.round(((spendRatio * 10) / totalWeighted) * leakEstimate)
      : 0,
  }

  // Adjust rounding
  const breakdownSum =
    breakdown.attributionGap +
    breakdown.platformBlindSpots +
    breakdown.creatorScaleLoss +
    breakdown.unoptimizedSpend
  if (breakdownSum !== leakEstimate) {
    breakdown.attributionGap += leakEstimate - breakdownSum
  }

  const bucket = getBucket(score)
  const headline = buildHeadline(answers, leakEstimate)
  const insight = buildInsight(answers, leakEstimate, score)

  return { score, leakEstimate, breakdown, bucket, headline, insight }
}

function getBucket(score: number): QuizResult['bucket'] {
  if (score < 30) return 'low'
  if (score < 55) return 'moderate'
  if (score < 75) return 'high'
  return 'critical'
}

export const BUCKET_COLORS: Record<QuizResult['bucket'], string> = {
  low: '#00FF94',
  moderate: '#FFB84D',
  high: '#FF8C42',
  critical: '#FF3366',
}

export const BUCKET_LABELS: Record<QuizResult['bucket'], string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk',
  critical: 'Critical',
}

function buildHeadline(answers: QuizAnswers, leakEstimate: number): string {
  const leak = `$${leakEstimate.toLocaleString()}`

  if (answers.trackingMethod === 'guesswork') {
    return `You have zero visibility into which posts drive real sales — that means ${leak}/mo in creator-driven revenue is going completely unattributed.`
  }

  const hasTiktok = answers.platforms.includes('tiktok')
  const hasInstagram = answers.platforms.includes('instagram_reels')

  if (hasTiktok && !hasInstagram) {
    const pctTiktok = Math.round((1 / answers.platforms.length) * 100)
    return `You're focusing ~${pctTiktok}% of creator effort on TikTok, yet most brands in your revenue range see 65%+ of attributed sales from Instagram-style content.`
  }

  const creatorCountNum = answers.creatorCount === '30_plus' ? 30 : parseInt(answers.creatorCount.split('_')[1] || '15')
  if (creatorCountNum >= 16 && answers.trackingMethod !== 'ga_meta') {
    const spendLabel = SPEND_MIDPOINTS[answers.creatorSpend].toLocaleString()
    return `Managing ${creatorCountNum}+ creators with no solid attribution is like running Meta ads with no pixel. You're spending $${spendLabel} monthly with no idea what's working.`
  }

  return `Your creators are generating revenue — but ${leak}/mo is slipping through the cracks because your current tracking can't connect posts to purchases.`
}

function buildInsight(answers: QuizAnswers, leakEstimate: number, score: number): string {
  const leak = `$${leakEstimate.toLocaleString()}`
  const annual = `$${(leakEstimate * 12).toLocaleString()}`

  if (score >= 75) {
    return `At ${leak}/mo in unattributed revenue, you're looking at ${annual} per year that could be optimized with proper attribution. The good news: brands in your range typically see 20-40% improvement within the first 60 days of implementing post-level tracking.`
  }

  if (score >= 55) {
    return `Your current setup is leaving ${leak}/mo on the table. That's not unusual for brands at your stage, but it adds up to ${annual}/yr. With post-level revenue attribution, you'd know exactly which creators and content types drive purchases — and double down on what works.`
  }

  return `You're in decent shape compared to most brands, but there's still ${leak}/mo in potential optimization. Even well-tracked programs benefit from post-level attribution data to fine-tune creator briefs and content strategy.`
}

export function formatLeakEstimate(amount: number): string {
  if (amount >= 10_000) {
    return `$${(amount / 1000).toFixed(0)}K`
  }
  return `$${amount.toLocaleString()}`
}
