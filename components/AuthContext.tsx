'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  nama: string;
  role: 'teacher' | 'admin';
  nip?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { id: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('sigma_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    // Use timeout to avoid synchronous setState in effect body
    const timer = setTimeout(checkAuth, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = async (credentials: { id: string; password?: string }) => {
    // Simple Admin Check (Hardcoded for 3 admins as requested)
    const adminKeys = ['admin123', 'sigma_buol_2026', 'mgmp_math'];
    
    if (credentials.password && adminKeys.includes(credentials.password)) {
      const adminUser: User = { id: 'admin', nama: 'Administrator MGMP', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('sigma_user', JSON.stringify(adminUser));
      return true;
    }

    // Teacher Login (Check against Spreadsheet data)
    try {
      const res = await fetch('https://opensheet.elk.sh/16ggvffW2O41rZiM5n3oztSlLamxVHTbNmeCup4ihf40/guru');
      const gurus = await res.json();
      const foundGuru = gurus.find((g: any) => g.nip === credentials.id);
      
      if (foundGuru) {
        const teacherUser: User = { 
          id: foundGuru.id, 
          nama: foundGuru.nama, 
          role: 'teacher',
          nip: foundGuru.nip
        };
        setUser(teacherUser);
        localStorage.setItem('sigma_user', JSON.stringify(teacherUser));
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sigma_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
