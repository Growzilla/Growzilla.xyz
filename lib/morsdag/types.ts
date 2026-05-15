export type Platform = 'Shopify' | 'WooCommerce' | 'Custom/other' | 'Vi har ingen riktig butik ännu';
export type Revenue = '0–25k kr' | '25k–100k kr' | '100k–500k kr' | '500k+ kr';
export type ProductFit = 'Ja, tydligt' | 'Kanske' | 'Nej';
export type Fulfillment = 'Ja' | 'Osäker' | 'Nej';
export type Budget = 'Ja' | 'Kanske, om caset är rätt' | 'Nej';
export type AdBudget = 'Under 5 000 kr' | '5 000–15 000 kr' | '15 000–50 000 kr' | '50 000 kr+';
export type Urgency = 'Igår' | 'Inom 48h' | 'Inom en vecka' | 'Bara nyfiken';
export type ResultRoute = 'good' | 'maybe' | 'bad';

export interface MorsdagQuizData {
  contact: { namn: string; foretag: string; email: string; telefon?: string; url: string };
  platform?: Platform;
  revenue?: Revenue;
  productFit?: ProductFit;
  fulfillment?: Fulfillment;
  budget?: Budget;
  adBudget?: AdBudget;
  urgency?: Urgency;
  notes: string;
  attribution: Record<string, string>;
  submittedAt?: string;
}

export interface MorsdagLeadPayload extends MorsdagQuizData {
  score: number;
  route: ResultRoute;
  kind?: 'final';
  id?: string;
}
