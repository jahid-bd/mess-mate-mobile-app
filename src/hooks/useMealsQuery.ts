import { useQuery } from '@tanstack/react-query';
import { mealApi } from '../api/meals';
import { MealEntry, PaginatedResponse, MealStats } from '../types/api';

interface UseMealsQueryParams {
  month?: string;
  limit?: number;
  userId?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  offset?: number;
  includeStats?: boolean;
}

export const useMealsQuery = (params: UseMealsQueryParams = {}) => {
  return useQuery<PaginatedResponse<MealEntry> & { stats?: MealStats }>({
    queryKey: ['meals', params],
    queryFn: () => mealApi.getMealEntries(params),
    enabled: true,
    staleTime: 1000 * 30, // 30 seconds - more aggressive refresh
    refetchOnWindowFocus: true, // Refetch when app comes into focus
    refetchOnMount: true, // Always refetch on mount
  });
};

// Hook for getting just meal stats
export const useMealStatsQuery = (params: {
  month?: string;
  userId?: number;
} = {}) => {
  return useQuery<MealStats>({
    queryKey: ['meal-stats', params],
    queryFn: () => mealApi.getMealStats(params),
    enabled: true,
    staleTime: 1000 * 30, // 30 seconds - more aggressive refresh
    refetchOnWindowFocus: true, // Refetch when app comes into focus
    refetchOnMount: true, // Always refetch on mount
  });
};

export const MEALS_QUERY_KEY = 'meals';
