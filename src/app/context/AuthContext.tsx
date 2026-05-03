import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../lib/api";

export type UserRole = "donor" | "receiver" | "volunteer";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, "id">, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("ff_token");
      if (token) {
        try {
          const data = await api.getMe();
          if (data && data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("ff_token");
          }
        } catch (error) {
          console.error("Session restoration failed:", error);
          localStorage.removeItem("ff_token");
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await api.login({ email, password });
      localStorage.setItem("ff_token", data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (userData: Omit<User, "id">, password: string): Promise<boolean> => {
    try {
      const data = await api.signup({ ...userData, password });
      localStorage.setItem("ff_token", data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("ff_token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
