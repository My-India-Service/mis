import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

function readStoredToken() {
  try {
    return localStorage.getItem('adminToken');
  } catch {
    return null;
  }
}

function adminFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    if (!payload.id && !payload._id) return null;
    return {
      id: payload.id || payload._id,
      email: payload.email || '',
      name: payload.name || '',
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const token = readStoredToken();
    return token ? adminFromToken(token) : null;
  });
  const [loading, setLoading] = useState(() => {
    const token = readStoredToken();
    // Only block UI if we have a token but can't read it yet
    return Boolean(token && !adminFromToken(token));
  });

  useEffect(() => {
    let cancelled = false;
    const token = readStoredToken();

    if (!token) {
      setAdmin(null);
      setLoading(false);
      return undefined;
    }

    const cached = adminFromToken(token);
    if (!cached) {
      localStorage.removeItem('adminToken');
      setAdmin(null);
      setLoading(false);
      return undefined;
    }

    setAdmin(cached);

    api
      .getMe()
      .then((res) => {
        if (cancelled) return;
        const user = res.admin;
        setAdmin({
          id: user.id || user._id,
          email: user.email,
          name: user.name,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('adminToken');
          setAdmin(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    localStorage.setItem('adminToken', res.token);
    setAdmin(res.admin);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
