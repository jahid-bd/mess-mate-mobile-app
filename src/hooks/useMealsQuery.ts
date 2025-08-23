import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
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
  page?: number;
  search?: string;
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

// Hook for infinite/paginated meals
export const useInfiniteMealsQuery = (params: Omit<UseMealsQueryParams, 'page' | 'limit'> = {}) => {
  return useInfiniteQuery<PaginatedResponse<MealEntry> & { stats?: MealStats }>({
    queryKey: ['meals-infinite', params],
    queryFn: ({ pageParam = 1 }) => mealApi.getMealEntries({
      ...params,
      page: pageParam as number,
      limit: pageParam === 1 ? 30 : 20, // First load: 30, subsequent: 20
    }),
    enabled: true,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage;
      
      console.log('Pagination Debug:', {
        meta,
        lastPage,
        hasMeta: !!meta,
        currentPage: meta?.page,
        totalPages: meta?.totalPages,
        hasMore: meta ? meta.page < meta.totalPages : false
      });

      // If meta is not provided or doesn't exist, assume no more pages
      if (!meta) {
        console.log('No meta object found');
        return undefined;
      }

      const currentPage = meta.page;
      const totalPages = meta.totalPages;

      // If we have more pages, return the next page number
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      
      return undefined; // No more pages
    },
    initialPageParam: 1,
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
