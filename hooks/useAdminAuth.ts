import { useState, useEffect, useCallback } from 'react';
import type { AuthState } from '@/types/admin';

export function useAdminAuth() {
  const [auth, setAuth] = useState<AuthState>({ authenticated: false, loading: true });

  const check = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setAuth({ authenticated: data.authenticated, loading: false });
    } catch {
      setAuth({ authenticated: false, loading: false });
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const login = useCallback(async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuth({ authenticated: true, loading: false });
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch {
      return { success: false, error: 'Network error' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } finally {
      setAuth({ authenticated: false, loading: false });
    }
  }, []);

  return { ...auth, login, logout, check };
}
