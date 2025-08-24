import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';

export interface FilterOption {
  value: string;
  label: string;
}

export interface UserOption {
  id: number;
  name: string;
  email: string;
}

export interface FilterOptions {
  months: FilterOption[];
  users: UserOption[];
  expenseTypes: FilterOption[];
  mealTypes: FilterOption[];
}

const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const response = await apiClient.get<FilterOptions>('/meal-entries/filter-options');
  return response;
};

export const useFilterOptions = () => {
  return useQuery<FilterOptions>({
    queryKey: ['filter-options'],
    queryFn: fetchFilterOptions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
