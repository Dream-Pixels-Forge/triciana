import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Auth Context
 * Manages user authentication state
 */
const AuthContext = createContext(null);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('triciana-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('triciana-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('triciana-user');
    }
  }, [user]);

  // Sign in
  const signIn = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication (replace with real API)
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: null,
        role: 'customer',
      };
      
      setUser(mockUser);
      setIsSignInOpen(false);
      return { success: true, user: mockUser };
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign up
  const signUp = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration (replace with real API)
      const mockUser = {
        id: '1',
        name,
        email,
        avatar: null,
        role: 'customer',
      };
      
      setUser(mockUser);
      setIsSignUpOpen(false);
      return { success: true, user: mockUser };
    } catch (err) {
      setError('Failed to create account. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(() => {
    setUser(null);
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setError(null);
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock password reset (replace with real API)
      return { success: true };
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isSignInOpen,
    isSignUpOpen,
    isLoading,
    error,
    setIsSignInOpen,
    setIsSignUpOpen,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Use Auth Hook
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
