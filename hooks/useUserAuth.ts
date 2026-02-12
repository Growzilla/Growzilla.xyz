import { useState, useEffect, useCallback } from 'react';
import type { UserAuthState } from '@/types/admin';

export function useUserAuth() {
  const [auth, setAuth] = useState<UserAuthState>({ authenticated: false, loading: true, email: null });

  const check = useCallback(async () => {
    try {
      const res = await fetch('/api/user/auth');
      const data = await res.json();
      setAuth({ authenticated: data.authenticated, email: data.email || null, loading: false });
    } catch {
      setAuth({ authenticated: false, email: null, loading: false });
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/user/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuth({ authenticated: true, email: data.email || email, loading: false });
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch {
      return { success: false, error: 'Network error' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/user/auth', { method: 'DELETE' });
    } finally {
      setAuth({ authenticated: false, email: null, loading: false });
    }
  }, []);

  return { ...auth, login, logout, check };
}
