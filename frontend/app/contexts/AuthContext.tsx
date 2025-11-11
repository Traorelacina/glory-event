'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { apiClient } from '../../lib/api';
import { User } from '../../types/index';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userData = await apiClient.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Erreur de vérification auth:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(email, password);

      if (response.user && response.token) {
        setUser(response.user);
        localStorage.setItem('auth_token', response.token);
      } else {
        throw new Error("Échec de la connexion : réponse invalide de l'API");
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);

      // Gestion d'erreur améliorée
      if (error.message.includes('Network') || error.message.includes('fetch')) {
        throw new Error('Erreur réseau. Vérifiez votre connexion internet.');
      } else if (error.message.includes('401')) {
        throw new Error('Identifiants incorrects.');
      } else if (error.message.includes('404')) {
        throw new Error('Service indisponible. Vérifiez la configuration du serveur.');
      } else {
        throw new Error(error.message || 'Une erreur est survenue lors de la connexion.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('auth_token');
    apiClient.logout().catch(console.error);

    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return useAuth();
};