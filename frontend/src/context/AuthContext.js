import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuth } from '../mock/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for stored authentication
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setUser(authData.user);
      setIsAuthenticated(true);
    } else {
      // For demo purposes, auto-login with mock user
      setUser(mockAuth.currentUser);
      setIsAuthenticated(mockAuth.isAuthenticated);
      localStorage.setItem('auth', JSON.stringify({
        user: mockAuth.currentUser,
        isAuthenticated: mockAuth.isAuthenticated
      }));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - in real app, this would make API call
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = mockAuth.currentUser;
      setUser(userData);
      setIsAuthenticated(true);
      
      localStorage.setItem('auth', JSON.stringify({
        user: userData,
        isAuthenticated: true
      }));
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'Admin') return true;
    return user.permissions.includes(permission) || user.permissions.includes('all');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};