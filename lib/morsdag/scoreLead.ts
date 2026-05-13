import type {
  MorsdagQuizData,
  ResultRoute,
  Platform,
  Revenue,
  ProductFit,
  Fulfillment,
  Budget,
  AdBudget,
  Urgency,
} from './types';

const PLATFORM_WEIGHTS: Record<Platform, number> = {
  'Shopify': 3,
  'WooCommerce': 1,
  'Custom/other': 1,
  'Vi har ingen riktig butik ännu': -5,
};

const REVENUE_WEIGHTS: Record<Revenue, number> = {
  '0–25k kr': -3,
  '25k–100k kr': 1,
  '100k–500k kr': 3,
  '500k+ kr': 5,
};

const PRODUCT_FIT_WEIGHTS: Record<ProductFit, number> = {
  'Ja, tydligt': 4,
  'Kanske': 1,
  'Nej': -5,
};

const FULFILLMENT_WEIGHTS: Record<Fulfillment, number> = {
  'Ja': 4,
  'Osäker': -1,
  'Nej': -6,
};

const BUDGET_WEIGHTS: Record<Budget, number> = {
  'Ja': 4,
  'Kanske, om caset är rätt': 1,
  'Nej': -6,
};

const AD_BUDGET_WEIGHTS: Record<AdBudget, number> = {
  'Under 5 000 kr': -3,
  '5 000–15 000 kr': 1,
  '15 000–50 000 kr': 3,
  '50 000 kr+': 5,
};

const URGENCY_WEIGHTS: Record<Urgency, number> = {
  'Igår': 3,
  'Inom 48h': 3,
  'Inom en vecka': 2,
  'Bara nyfiken': -2,
};

export function scoreLead(data: MorsdagQuizData): { score: number; route: ResultRoute } {
  let score = 0;
  if (data.platform) score += PLATFORM_WEIGHTS[data.platform];
  if (data.revenue) score += REVENUE_WEIGHTS[data.revenue];
  if (data.productFit) score += PRODUCT_FIT_WEIGHTS[data.productFit];
  if (data.fulfillment) score += FULFILLMENT_WEIGHTS[data.fulfillment];
  if (data.budget) score += BUDGET_WEIGHTS[data.budget];
  if (data.adBudget) score += AD_BUDGET_WEIGHTS[data.adBudget];
  if (data.urgency) score += URGENCY_WEIGHTS[data.urgency];

  // Bad-fit short-circuits — checked FIRST, override any "good" outcome
  const isBad =
    score < 7 ||
    data.platform === 'Vi har ingen riktig butik ännu' ||
    data.fulfillment === 'Nej' ||
    data.productFit === 'Nej' ||
    data.budget === 'Nej';

  if (isBad) {
    return { score, route: 'bad' };
  }

  // Good fit requires: score >= 15 AND no soft-Nej on the three gating fields
  const isGood =
    score >= 15 &&
    data.fulfillment !== 'Nej' &&
    data.productFit !== 'Nej' &&
    data.budget !== 'Nej';

  if (isGood) {
    return { score, route: 'good' };
  }

  return { score, route: 'maybe' };
}
