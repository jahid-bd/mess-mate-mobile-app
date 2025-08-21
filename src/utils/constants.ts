import { Platform } from 'react-native';

// API Configuration
const getBaseUrl = () => {
  // If environment variable is set, use it directly
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }
  
  // Fallback to platform-specific URLs for development
  if (!__DEV__) {
    return 'https://messmate-api.com';
  }
  
  // Development environment fallbacks
  if (Platform.OS === 'web') {
    return process.env.EXPO_PUBLIC_API_BASE_URL_LOCALHOST || 'http://localhost:4000';
  }
  
  // For Android emulator, use 10.0.2.2 to reach host machine
  if (Platform.OS === 'android') {
    return process.env.EXPO_PUBLIC_API_BASE_URL_ANDROID_EMULATOR || 'http://10.0.2.2:4000';
  }
  
  // For iOS simulator and physical devices, use local IP
  return process.env.EXPO_PUBLIC_API_BASE_URL_IOS_DEVICE || 'http://192.168.0.138:4000';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000', 10),
};

// Meal Types
export const MEAL_TYPES = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
  SHAHUR: 'SHAHUR',
} as const;

// Expense Types
export const EXPENSE_TYPES = {
  BAZAR: 'BAZAR',
  OTHER: 'OTHER',
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
} as const;

// Development Configuration
export const DEV_CONFIG = {
  SKIP_TOKEN_VALIDATION: __DEV__, // Skip token validation during development hot reloads
  AUTH_RETRY_DELAY: 1000, // Delay before retrying auth operations
};
