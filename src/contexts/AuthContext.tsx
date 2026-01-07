import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, deleteUser } from 'firebase/auth'; 
import { auth } from '../services/firebaseConfig';
import { register as firebaseRegister, login as firebaseLogin, logout as firebaseLogout } from '../services/auth';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  deleteAccount: () => Promise<void>; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await firebaseLogin(email, password);
  };

  const register = async (email: string, password: string, name: string) => {
    await firebaseRegister(email, password, name);
  };

  const logout = async () => {
    await firebaseLogout();
  };

  // Login Google Android
  const loginWithGoogle = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
  };

  // --- Função para Excluir Conta (LGPD) ---
  const deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        // Exclui o usuário do Firebase Auth
        await deleteUser(auth.currentUser);
        // O onAuthStateChanged vai detectar automaticamente que o user é null
        setUser(null);
      } catch (error: any) {
        console.error("Erro ao excluir conta:", error);

        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      register,
      logout,
      loginWithGoogle,
      deleteAccount, 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};