import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, mockUsuarios } from '../lib/mockData';

export const AuthContext = createContext<{
  user: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<Usuario, 'id' | 'created_at' | 'status'>) => Promise<boolean>;
  isLoading: boolean;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // URL base do seu Django (ajuste se a porta for diferente)
  const API_URL = 'http://localhost:8000/api';

  useEffect(() => {
    const storedUser = localStorage.getItem('ecosmart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // LOGIN REAL CONECTADO AO DJANGO
  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('ecosmart_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecosmart_user');
  };

  // SIGNUP REAL CONECTADO AO DJANGO -> SUPABASE
  const signup = async (userData: Omit<Usuario, 'id' | 'created_at' | 'status'>): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUser(newUser);
        localStorage.setItem('ecosmart_user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
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
