import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "donor" | "receiver" | "volunteer";

interface User {
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Users for testing
const MOCK_USERS = [
  { id: "1", email: "donor@feastforward.com", password: "password123", name: "The Green Kitchen", role: "donor" as UserRole },
  { id: "2", email: "receiver@feastforward.com", password: "password123", name: "Hope Shelter", role: "receiver" as UserRole },
  { id: "3", email: "volunteer@feastforward.com", password: "password123", name: "Alex Volunteer", role: "volunteer" as UserRole },
  { id: "4", email: "pasta@feastforward.com", password: "password123", name: "Pasta Palace", role: "donor" as UserRole },
  { id: "5", email: "community@feastforward.com", password: "password123", name: "Community Center", role: "receiver" as UserRole },
  { id: "6", email: "sarah@feastforward.com", password: "password123", name: "Sarah Transport", role: "volunteer" as UserRole },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("ff_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mocking an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem("ff_user", JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const signup = async (userData: Omit<User, "id">, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...userData, id: Date.now().toString() };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("ff_user", JSON.stringify(newUser));
        resolve(true);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("ff_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
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
