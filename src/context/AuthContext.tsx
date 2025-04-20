
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// Mock user data
type UserType = 'woman' | 'child';

interface User {
  id: string;
  name: string;
  email: string;
  type?: UserType;
  phone?: string;
  emergencyContacts?: { name: string; phone: string; relation: string }[];
  location?: { latitude: number; longitude: number };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserType: (type: UserType) => void;
  updateUserLocation: (location: { latitude: number; longitude: number }) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userType: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  setUserType: () => {},
  updateUserLocation: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('safehaven_user');
    const storedType = localStorage.getItem('safehaven_user_type');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedType) {
      setUserType(storedType as UserType);
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      setTimeout(() => {
        // In a real app, you'd validate credentials with backend
        const mockUser: User = {
          id: 'user1',
          name: email.split('@')[0],
          email,
          emergencyContacts: [
            { name: 'John Doe', phone: '9876543210', relation: 'Parent' },
            { name: 'Police', phone: '100', relation: 'Emergency' }
          ]
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('safehaven_user', JSON.stringify(mockUser));
        
        toast.success("Logged in successfully!");
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      setTimeout(() => {
        const mockUser: User = {
          id: 'user' + Math.floor(Math.random() * 1000),
          name,
          email,
          emergencyContacts: [
            { name: 'Emergency Contact', phone: '9876543210', relation: 'Parent' },
            { name: 'Police', phone: '100', relation: 'Emergency' }
          ]
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('safehaven_user', JSON.stringify(mockUser));
        
        toast.success("Account created successfully!");
      }, 1000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('safehaven_user');
    localStorage.removeItem('safehaven_user_type');
    toast.info("Logged out successfully.");
  };

  // Set user type (woman/child)
  const handleSetUserType = (type: UserType) => {
    setUserType(type);
    localStorage.setItem('safehaven_user_type', type);
    
    if (user) {
      const updatedUser = { ...user, type };
      setUser(updatedUser);
      localStorage.setItem('safehaven_user', JSON.stringify(updatedUser));
    }
  };

  // Update user location
  const updateUserLocation = (location: { latitude: number; longitude: number }) => {
    if (user) {
      const updatedUser = { ...user, location };
      setUser(updatedUser);
      localStorage.setItem('safehaven_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    userType,
    login,
    register,
    logout,
    setUserType: handleSetUserType,
    updateUserLocation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
