export { MealStatistics } from './MealStatistics';
export { MealFiltersCard } from './MealFiltersCard';
export { MealEntryCard } from './MealEntryCard';
export { EmptyMealsList } from './EmptyMealsList';
export { MealsList } from './MealsList';
export { MealsHeader } from './MealsHeader';
export { MealListSkeleton } from './MealListSkeleton';
export { MealListError } from './MealListError';

// Re-export types from MealFiltersCard
export type { MealFilters } from './MealFiltersCard';

// Export types for better reusability
export interface MealEntry {
  id: number;
  date: string;
  amount: number;
  note?: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MealStats {
  totalEntries: number;
  totalMeals: number;
  todayMeals: number;
  weeklyMeals: number;
  monthlyMeals: number;
  averagePerDay: number;
  userMeals: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
