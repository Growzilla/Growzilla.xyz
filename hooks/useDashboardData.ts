import { useState, useEffect, useCallback } from 'react';
import type { DashboardStats, RevenueChartData, TopProduct, InsightStats } from '@/types/admin';

interface DashboardData {
  stats: DashboardStats | null;
  revenueChart: RevenueChartData | null;
  topProducts: TopProduct[] | null;
  insightStats: InsightStats | null;
  loading: boolean;
  error: string | null;
}

export function useDashboardData(domain: string | undefined, period = '30d') {
  const [data, setData] = useState<DashboardData>({
    stats: null,
    revenueChart: null,
    topProducts: null,
    insightStats: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!domain) return;
    setData((prev) => ({ ...prev, loading: true, error: null }));

    const base = `/api/admin/shops/${encodeURIComponent(domain)}`;

    try {
      const [statsRes, chartRes, productsRes, insightStatsRes] = await Promise.allSettled([
        fetch(`${base}/stats`),
        fetch(`${base}/revenue-chart?period=${period}`),
        fetch(`${base}/top-products`),
        fetch(`${base}/insights-stats`),
      ]);

      const parse = async (result: PromiseSettledResult<Response>) => {
        if (result.status === 'rejected') return null;
        if (!result.value.ok) return null;
        const json = await result.value.json();
        return json.data ?? null;
      };

      setData({
        stats: await parse(statsRes),
        revenueChart: await parse(chartRes),
        topProducts: await parse(productsRes),
        insightStats: await parse(insightStatsRes),
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: (err as Error).message,
      }));
    }
  }, [domain, period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, refetch: fetchData };
}
