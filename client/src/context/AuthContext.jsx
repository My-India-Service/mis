import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .getMe()
      .then((res) => setAdmin(res.admin))
      .catch(() => localStorage.removeItem('adminToken'))
      .finally(() => setLoading(false));
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
