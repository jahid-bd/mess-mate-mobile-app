// API Configuration
export const API_CONFIG = {
  // Update this to your server's IP address when testing on device
  // For iOS Simulator: localhost
  // For Android Emulator: 10.0.2.2
  // For Physical Device: Your computer's IP address
  BASE_URL: __DEV__
    ? 'http://localhost:3000'
    : 'https://your-production-api.com',
  TIMEOUT: 10000,
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
