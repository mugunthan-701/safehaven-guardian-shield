// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface User {
  email: string;
  name?: string;
  userType?: 'women' | 'children';
  location?: { latitude: number; longitude: number };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  setUserType: (type: 'women' | 'children') => void;
  updateUserLocation: (location: { latitude: number; longitude: number }) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  setUserType: () => {},
  updateUserLocation: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = (email: string, password: string, name: string) => {
    setUser({ email, name });
    toast.success('Account created successfully!');
  };

  const login = (email: string, password: string) => {
    setUser({ email });
    toast.success('Logged in successfully!');
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  const setUserType = (type: 'women' | 'children') => {
    if (user) {
      const updatedUser = { ...user, userType: type };
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    }
  };

  const updateUserLocation = (location: { latitude: number; longitude: number }) => {
    if (user) {
      const updatedUser = { ...user, location };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        login, 
        signup, 
        logout, 
        setUserType,
        updateUserLocation 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};