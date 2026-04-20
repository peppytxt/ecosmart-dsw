import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, mockUsuarios } from '../lib/mockData';

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<Usuario, 'id' | 'created_at' | 'status'>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('ecosmart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsuarios.find(
      u => u.email === email && u.senha === senha && u.status === 'ativo'
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('ecosmart_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecosmart_user');
  };

  const signup = async (userData: Omit<Usuario, 'id' | 'created_at' | 'status'>): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: Usuario = {
      ...userData,
      id: `user_${Date.now()}`,
      status: 'ativo',
      created_at: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem('ecosmart_user', JSON.stringify(newUser));
    return true;
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
