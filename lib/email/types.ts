export type GrowthStrategy =
  | 'paid-ads'
  | 'organic-social'
  | 'influencers'
  | 'seo'
  | 'reactivation'
  | 'multiple';

export type Temp = 'warm' | 'cool' | 'cold';

export type Urgency = 'this-month' | 'next-month' | 'exploring';

export type ResultRoute = 'good' | 'maybe' | 'bad';

export interface EmailQuizContact {
  name: string;
  email: string;
  brand: string;
  url: string;
  phone?: string;
}

export interface EmailQuizData {
  contact: EmailQuizContact;
  growthStrategy?: GrowthStrategy;
  listSize?: number;
  aov?: number;
  temp?: Temp;
  urgency?: Urgency;
  notes: string;
  attribution: Record<string, string>;
  submittedAt?: string;
}

export interface EmailLeadPayload extends EmailQuizData {
  score: number;
  route: ResultRoute;
  floorUsd?: number;
  kind?: 'final';
  id?: string;
}
