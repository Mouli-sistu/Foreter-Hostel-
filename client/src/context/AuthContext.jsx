import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Load user on startup if token exists
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await api.auth.getMe();
          if (res.success && res.data) {
            setUser(res.data);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Session expired or invalid token', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      if (res.success && res.data) {
        setUser(res.data);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        return { success: true, user: res.data };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.auth.register(userData);
      if (res.success && res.data) {
        setUser(res.data);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        return { success: true, user: res.data };
      }
      return { success: false, message: 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const refreshUser = async () => {
    try {
      const res = await api.auth.getMe();
      if (res.success && res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.error('Failed to refresh user profile', err);
    }
  };

  // Quick 1-click test login helper
  const quickLogin = async (type) => {
    const credentials = {
      admin: { email: 'admin@hostel.com', password: 'admin123' },
      rahul: { email: 'rahul@gmail.com', password: 'resident123' },
      arun: { email: 'arun@gmail.com', password: 'resident123' },
      vikram: { email: 'vikram@gmail.com', password: 'resident123' },
    };

    const target = credentials[type] || credentials.admin;
    return await login(target.email, target.password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAdmin: user?.role === 'admin',
        isResident: user?.role === 'resident',
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        quickLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
