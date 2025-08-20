import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/api';
import { STORAGE_KEYS } from '../utils/constants';
import { userApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load stored auth data on app start
  useEffect(() => {
    loadStoredAuthData();
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setToken(null);
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  }, []);

  const loadStoredAuthData = useCallback(async () => {
    try {
      const [storedToken, storedUserData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      if (storedToken && storedUserData) {
        setToken(storedToken);
        setUser(JSON.parse(storedUserData));
        
        // Validate token by fetching fresh user profile
        try {
          const freshUserData = await userApi.getProfile();
          setUser(freshUserData);
          await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(freshUserData));
        } catch (error) {
          // Token is invalid, clear stored data
          console.log('Token validation failed:', error);
          await signOut();
        }
      }
    } catch (error) {
      console.log('Error loading stored auth data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [signOut]);

  const signIn = async (authToken: string) => {
    try {
      setIsLoading(true);
      setToken(authToken);
      
      // Store token first so API calls can use it
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
      
      // Fetch user profile
      const userData = await userApi.getProfile();
      setUser(userData);
      
      // Store user data
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      // Clear token if profile fetch fails
      setToken(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
