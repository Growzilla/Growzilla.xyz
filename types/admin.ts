// === Shop Registry (local shops.json) ===

export interface ShopRegistryEntry {
  domain: string;
  label: string;
  addedAt: string;
}

// === Shop Details (enriched from EcomDash) ===

export interface ShopDetails {
  domain: string;
  label: string;
  addedAt: string;
  status: 'active' | 'unreachable' | 'pending';
  shop_id?: string;
  name?: string;
  currency?: string;
  plan?: string;
  last_synced?: string;
  created_at?: string;
}

// === Dashboard Stats ===

export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  total_customers: number;
  revenue_change: number;
  orders_change: number;
  aov_change: number;
  customers_change: number;
}

// === Revenue Chart ===

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface RevenueChartData {
  data: RevenueDataPoint[];
  period: string;
  total_revenue: number;
  total_orders: number;
}

// === Top Products ===

export interface TopProduct {
  rank: number;
  product_id: string;
  title: string;
  revenue: number;
  orders: number;
  average_price: number;
  image_url?: string;
}

// === Dashboard Summary ===

export interface DashboardSummary {
  shop_id: string;
  summary: string;
  highlights: string[];
  generated_at: string;
}

// === Insights ===

export type InsightSeverity = 'critical' | 'high' | 'medium' | 'low';
export type InsightStatus = 'active' | 'dismissed' | 'actioned';

export interface Insight {
  id: string;
  shop_id: string;
  title: string;
  description: string;
  severity: InsightSeverity;
  status: InsightStatus;
  category: string;
  action_summary?: string;
  expected_uplift?: string;
  created_at: string;
}

export interface InsightStats {
  total: number;
  active: number;
  dismissed: number;
  actioned: number;
  by_severity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// === API Response Wrappers ===

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// === Auth ===

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
}

export interface UserAuthState extends AuthState {
  email: string | null;
}

// === User Records ===

export interface UserRecord {
  email: string;
  passwordHash: string;
  storeDomain: string;
  name: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginResponse {
  success: boolean;
  error?: string;
}

// === Sync ===

export interface SyncResponse {
  success: boolean;
  message?: string;
  synced_at?: string;
}

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';
