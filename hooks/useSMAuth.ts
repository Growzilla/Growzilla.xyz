import { useState, useEffect, useCallback } from 'react';
import * as api from '@/lib/smdashboard/api';

interface SMUser {
  id: string;
  name: string;
  username: string;
  email: string | null;
  role: 'org_owner' | 'creator';
  org_id: string;
}

interface SMOrg {
  id: string;
  name: string;
  slug: string;
  shop_domain: string;
}

interface SMAuthState {
  loading: boolean;
  authenticated: boolean;
  user: SMUser | null;
  org: SMOrg | null;
}

export function useSMAuth() {
  const [state, setState] = useState<SMAuthState>({
    loading: true,
    authenticated: false,
    user: null,
    org: null,
  });

  const check = useCallback(async () => {
    if (!api.isLoggedIn()) {
      setState({ loading: false, authenticated: false, user: null, org: null });
      return;
    }
    try {
      const data = await api.getMe();
      setState({
        loading: false,
        authenticated: true,
        user: data.user,
        org: data.org,
      });
    } catch {
      api.clearToken();
      setState({ loading: false, authenticated: false, user: null, org: null });
    }
  }, []);

  useEffect(() => { check(); }, [check]);

  const login = useCallback(async (
    role: 'org_owner' | 'creator',
    identifier: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const data = await api.login(role, identifier, password);
      setState({
        loading: false,
        authenticated: true,
        user: data.user,
        org: data.org,
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Login failed' };
    }
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setState({ loading: false, authenticated: false, user: null, org: null });
  }, []);

  return { ...state, login, logout, check };
}

export type { SMUser, SMOrg, SMAuthState };
