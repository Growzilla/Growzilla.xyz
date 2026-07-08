export type JobLocale = 'en' | 'sv';

export type ApplicantStatus =
  | 'new'
  | 'reviewed'
  | 'trial'
  | 'shortlisted'
  | 'rejected';

export type JobQuestionType = 'text' | 'textarea' | 'url';

export interface JobQuestion {
  id: string;
  type: JobQuestionType;
  label: Partial<Record<JobLocale, string>>;
  placeholder?: Partial<Record<JobLocale, string>>;
  required?: boolean;
}

export interface JobSection {
  heading: Partial<Record<JobLocale, string>>;
  body?: Partial<Record<JobLocale, string>>;
  list?: Partial<Record<JobLocale, string[]>>;
}

export interface JobLocaleContent {
  title: string;
  summary: string;
  meta: string;
  intro: string;
  sections: JobSection[];
  applyHeading: string;
  applyNote: string;
}

export type JobContentMap = Partial<Record<JobLocale, JobLocaleContent>> & {
  [key in JobLocale]?: JobLocaleContent;
};

export interface JobUploadConfig {
  required: boolean;
  label: Partial<Record<JobLocale, string>>;
  hint?: Partial<Record<JobLocale, string>>;
  maxMB: number;
  accept: string;
}

export interface JobPosting {
  slug: string;
  location: string;
  locales: JobLocale[];
  defaultLocale: JobLocale;
  content: JobContentMap;
  questions: JobQuestion[];
  uploads: {
    video?: JobUploadConfig;
    resume: JobUploadConfig;
  };
  active: boolean;
  continuous: boolean;
}

export interface JobApplication {
  id: string;
  jobSlug: string;
  jobTitle: string;
  locale: JobLocale;
  name: string;
  email: string;
  answers: Record<string, string>;
  videoUrl?: string;
  resumeUrl?: string;
  status: ApplicantStatus;
  notes?: string;
  createdAt: string;
}

export interface JobApplicationIndexEntry {
  id: string;
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  status: ApplicantStatus;
  createdAt: string;
}

export interface ApplicantsResponse {
  data: JobApplication[];
  total: number;
}

export interface ApplicantFilters {
  jobSlug: string | null;
  status: ApplicantStatus | null;
  search: string;
}