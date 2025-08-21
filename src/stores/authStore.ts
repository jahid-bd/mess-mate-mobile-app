import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types/api';
import { userApi } from '../services/api';
import { DEV_CONFIG } from '../utils/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;

  // Actions
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  updateUser: (userData: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,

      signIn: async (authToken: string) => {
        try {
          set({ isLoading: true });
          
          // Store token securely
          await SecureStore.setItemAsync('authToken', authToken);
          set({ token: authToken });
          
          // Fetch user profile
          const userData = await userApi.getProfile();
          set({ 
            user: userData, 
            isAuthenticated: true,
            isLoading: false 
          });
          
        } catch (error) {
          // Clear token if profile fetch fails
          await SecureStore.deleteItemAsync('authToken');
          set({ 
            token: null, 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
          throw error;
        }
      },

      signOut: async () => {
        await SecureStore.deleteItemAsync('authToken');
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: async (token) => {
        await SecureStore.setItemAsync('authToken', token);
        set({ token });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (userData: User) => {
        set({ user: userData });
      },

      initializeAuth: async () => {
        try {
          const token = await SecureStore.getItemAsync('authToken');
          if (token) {
            set({ token, isLoading: true });
            
            // Check if we have persisted user data first
            const currentState = get();
            if (currentState.user && currentState.isAuthenticated) {
              // We have persisted user data, use it immediately
              set({ 
                user: currentState.user,
                isAuthenticated: true,
                isLoading: false 
              });
              
              // Validate token in background (don't await)
              userApi.getProfile()
                .then((userData) => {
                  set({ user: userData });
                })
                .catch((error: any) => {
                  console.log('Background token validation failed:', error);
                  // Only sign out if it's a real auth error (401), not network issues
                  if (error.response?.status === 401) {
                    get().signOut();
                  }
                });
            } else {
              // No persisted user data, validate token
              try {
                const userData = await userApi.getProfile();
                set({ 
                  user: userData, 
                  isAuthenticated: true,
                  isLoading: false 
                });
              } catch (error: any) {
                console.log('Token validation failed:', error);
                // Only sign out if it's a real auth error (401), not network issues
                if (error.response?.status === 401) {
                  await get().signOut();
                }
                set({ isLoading: false });
              }
            }
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token, // Also persist token
      }),
    },
  ),
);
