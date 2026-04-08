/**
 * Sales pipeline types for SalesOS.
 */

export interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  title: string | null;
  company_name: string | null;
  company_domain: string | null;
  company_industry: string | null;
  company_size: string | null;
  company_country: string | null;
  company_city: string | null;
  company_timezone: string | null;
  shopify_url: string | null;
  stage: LeadStage;
  lead_score: number | null;
  call_priority: number;
  emails_sent: number;
  sequence_step: number;
  sequence_paused: boolean;
  last_emailed_at: string | null;
  last_called_at: string | null;
  last_replied_at: string | null;
  next_action_at: string | null;
  apollo_id: string | null;
  technologies: string[] | null;
  social_media_signals: Record<string, string> | null;
  notes: string | null;
  tags: string[] | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export type LeadStage =
  | 'new'
  | 'emailed'
  | 'replied'
  | 'called'
  | 'meeting_booked'
  | 'negotiating'
  | 'closed_won'
  | 'closed_lost';

export const STAGE_LABELS: Record<LeadStage, string> = {
  new: 'New',
  emailed: 'Emailed',
  replied: 'Replied',
  called: 'Called',
  meeting_booked: 'Meeting',
  negotiating: 'Negotiating',
  closed_won: 'Won',
  closed_lost: 'Lost',
};

export const STAGE_COLORS: Record<LeadStage, string> = {
  new: 'text-zinc-400',
  emailed: 'text-blue-400',
  replied: 'text-yellow-400',
  called: 'text-orange-400',
  meeting_booked: 'text-emerald-400',
  negotiating: 'text-purple-400',
  closed_won: 'text-green-400',
  closed_lost: 'text-red-400',
};

export const STAGE_BG: Record<LeadStage, string> = {
  new: 'bg-zinc-400/10',
  emailed: 'bg-blue-400/10',
  replied: 'bg-yellow-400/10',
  called: 'bg-orange-400/10',
  meeting_booked: 'bg-emerald-400/10',
  negotiating: 'bg-purple-400/10',
  closed_won: 'bg-green-400/10',
  closed_lost: 'bg-red-400/10',
};

export interface PipelineMetrics {
  total_leads: number;
  new: number;
  emailed: number;
  replied: number;
  called: number;
  meeting_booked: number;
  negotiating: number;
  closed_won: number;
  closed_lost: number;
  emails_sent_today: number;
  emails_sent_total: number;
}

export interface CallWindow {
  your_time: string;
  region: string;
  local_time: string;
  active: boolean;
}

export interface CallScheduleResponse {
  current_time: string;
  timezone: string;
  windows: CallWindow[];
  leads_to_call: Lead[];
}

export interface EmailPreview {
  subject: string;
  body_html: string;
  body_text: string;
}

export interface ApolloImportResult {
  imported: number;
  skipped: number;
  total_found: number;
}

export interface BatchEmailResult {
  sent: number;
  failed: number;
  total_eligible: number;
}
