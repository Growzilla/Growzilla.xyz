import { useState, useEffect, useCallback } from 'react';
import type { Insight, InsightSeverity } from '@/types/admin';

interface InsightsState {
  insights: Insight[];
  loading: boolean;
  error: string | null;
  filter: InsightSeverity | 'all';
}

export function useInsights(domain: string | undefined) {
  const [state, setState] = useState<InsightsState>({
    insights: [],
    loading: true,
    error: null,
    filter: 'all',
  });

  const fetchInsights = useCallback(async () => {
    if (!domain) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch(`/api/admin/shops/${encodeURIComponent(domain)}/insights`);
      if (!res.ok) throw new Error('Failed to fetch insights');
      const json = await res.json();
      const insights = Array.isArray(json.data) ? json.data : [];
      setState((prev) => ({ ...prev, insights, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: (err as Error).message }));
    }
  }, [domain]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const dismiss = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/admin/insights/${encodeURIComponent(id)}/dismiss`, {
        method: 'POST',
      });
      if (res.ok) {
        setState((prev) => ({
          ...prev,
          insights: prev.insights.filter((i) => i.id !== id),
        }));
      }
    } catch {
      // Silently fail — user can retry
    }
  }, []);

  const action = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/admin/insights/${encodeURIComponent(id)}/action`, {
        method: 'POST',
      });
      if (res.ok) {
        setState((prev) => ({
          ...prev,
          insights: prev.insights.map((i) =>
            i.id === id ? { ...i, status: 'actioned' as const } : i
          ),
        }));
      }
    } catch {
      // Silently fail
    }
  }, []);

  const setFilter = useCallback((filter: InsightSeverity | 'all') => {
    setState((prev) => ({ ...prev, filter }));
  }, []);

  const filtered =
    state.filter === 'all'
      ? state.insights
      : state.insights.filter((i) => i.severity === state.filter);

  return {
    insights: filtered,
    allInsights: state.insights,
    loading: state.loading,
    error: state.error,
    filter: state.filter,
    setFilter,
    dismiss,
    action,
    refetch: fetchInsights,
  };
}
