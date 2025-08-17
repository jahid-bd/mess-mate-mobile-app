import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setToken: async (token) => {
        await SecureStore.setItemAsync('authToken', token);
        set({ token });
      },

      logout: async () => {
        await SecureStore.deleteItemAsync('authToken');
        set({ 
          user: null, 
          isAuthenticated: false, 
          token: null 
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      initializeAuth: async () => {
        try {
          const token = await SecureStore.getItemAsync('authToken');
          if (token) {
            set({ token, isAuthenticated: true });
            // You can add API call to verify token and get user data
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
