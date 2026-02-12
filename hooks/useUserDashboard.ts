import { useState, useEffect, useCallback } from 'react';
import type { DashboardStats, RevenueChartData, TopProduct, Insight } from '@/types/admin';

interface DashboardShop {
  domain: string;
  name: string;
  shop_id: string;
  last_synced: string | null;
}

interface DashboardData {
  shop: DashboardShop;
  stats: DashboardStats | null;
  chart: RevenueChartData | null;
  products: TopProduct[] | null;
  insights: Insight[] | null;
}

export function useUserDashboard(period = '30d') {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/user/dashboard?period=${encodeURIComponent(period)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetch_();
  }, [fetch_]);

  return { data, loading, error, refetch: fetch_ };
}
