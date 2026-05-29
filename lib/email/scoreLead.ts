import type { EmailQuizData, ResultRoute, GrowthStrategy, Temp, Urgency } from './types';

const STRATEGY_WEIGHTS: Record<GrowthStrategy, number> = {
  'reactivation': 5,
  'multiple': 4,
  'paid-ads': 3,
  'influencers': 2,
  'organic-social': 2,
  'seo': 1,
};

const TEMP_WEIGHTS: Record<Temp, number> = {
  warm: 4,
  cool: 3,
  cold: 1,
};

const URGENCY_WEIGHTS: Record<Urgency, number> = {
  'this-month': 5,
  'next-month': 2,
  'exploring': -2,
};

const LIST_RATES: Record<Temp, number> = {
  warm: 0.06,
  cool: 0.03,
  cold: 0.01,
};

export function computeFloorUsd(listSize: number, aov: number, temp: Temp): number {
  const rate = LIST_RATES[temp];
  return Math.round(listSize * rate * aov);
}

export function scoreLead(data: EmailQuizData): {
  score: number;
  route: ResultRoute;
  floorUsd: number;
} {
  let score = 0;
  if (data.growthStrategy) score += STRATEGY_WEIGHTS[data.growthStrategy];
  if (data.temp) score += TEMP_WEIGHTS[data.temp];
  if (data.urgency) score += URGENCY_WEIGHTS[data.urgency];

  const listSize = data.listSize ?? 0;
  const aov = data.aov ?? 0;
  const temp = data.temp ?? 'cool';

  if (listSize >= 10000) score += 5;
  else if (listSize >= 5000) score += 3;
  else if (listSize >= 1500) score += 1;
  else score -= 4;

  if (aov >= 80) score += 3;
  else if (aov >= 40) score += 1;
  else score -= 4;

  const floorUsd = computeFloorUsd(listSize, aov, temp);

  const isBad =
    listSize < 1500 ||
    aov < 40 ||
    data.urgency === 'exploring' ||
    score < 7;

  if (isBad) return { score, route: 'bad', floorUsd };

  const isGood =
    listSize >= 5000 &&
    aov >= 60 &&
    data.urgency === 'this-month' &&
    score >= 14;

  if (isGood) return { score, route: 'good', floorUsd };

  return { score, route: 'maybe', floorUsd };
}
