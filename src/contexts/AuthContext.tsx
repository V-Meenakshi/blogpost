import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User } from '../types';
import { mockUsers } from '../data/mockData';

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication functions
const mockAuth = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(user => user.email === email);
    if (!user || password !== 'password') {
      throw new Error('Invalid email or password');
    }
    
    return user;
  },
  
  register: async (email: string, password: string, name: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(user => user.email === email)) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
    };
    
    // In a real scenario, we'd add this user to the database
    return newUser;
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Check if user is already logged in from localStorage
  const storedUser = localStorage.getItem('blogUser');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  
  const [state, setState] = useState<AuthContextType>({
    user: initialUser,
    isAuthenticated: !!initialUser,
    isLoading: false,
    error: null,
    login: async (email: string, password: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const user = await mockAuth.login(email, password);
        localStorage.setItem('blogUser', JSON.stringify(user));
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: (error as Error).message,
        }));
        throw error;
      }
    },
    register: async (email: string, password: string, name: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const user = await mockAuth.register(email, password, name);
        localStorage.setItem('blogUser', JSON.stringify(user));
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: (error as Error).message,
        }));
        throw error;
      }
    },
    logout: () => {
      localStorage.removeItem('blogUser');
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
      }));
    },
  });
  
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};