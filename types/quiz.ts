export type RevenueRange = 'under_50k' | '50k_150k' | '150k_400k' | '400k_1m' | 'over_1m'
export type SpendRange = 'zero_3k' | '3k_8k' | '8k_20k' | '20k_50k' | 'over_50k'
export type CreatorCount = '1_5' | '6_15' | '16_30' | '30_plus'
export type QuizPlatform = 'instagram_reels' | 'tiktok' | 'youtube_shorts' | 'pinterest_other'
export type TrackingMethod = 'guesswork' | 'spreadsheets' | 'ga_meta' | 'not_accurate'

export interface QuizAnswers {
  storeUrl: string
  revenueRange: RevenueRange
  creatorSpend: SpendRange
  creatorCount: CreatorCount
  platforms: QuizPlatform[]
  trackingMethod: TrackingMethod
}

export interface LeakBreakdown {
  attributionGap: number
  platformBlindSpots: number
  creatorScaleLoss: number
  unoptimizedSpend: number
}

export interface QuizResult {
  score: number
  leakEstimate: number
  breakdown: LeakBreakdown
  bucket: 'low' | 'moderate' | 'high' | 'critical'
  headline: string
  insight: string
}

export interface QuizState {
  step: number
  direction: 1 | -1
  answers: Partial<QuizAnswers>
  email: string
  phone: string
  result: QuizResult | null
}

export interface QuizLeadPayload {
  storeUrl: string
  email: string
  phone: string
  score: number
  leakEstimate: number
  revenueRange: RevenueRange
  platforms: QuizPlatform[]
  trackingMethod: TrackingMethod
  submittedAt: string
}
