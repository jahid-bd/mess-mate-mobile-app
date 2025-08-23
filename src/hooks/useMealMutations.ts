import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mealApi } from '../api/meals';
import { CreateMealEntryRequest } from '../types/api';

export function useCreateMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMealEntryRequest) => mealApi.createMealEntry(data),
    onSuccess: () => {
      // Invalidate all meal-related queries
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['meals-infinite'] });
      queryClient.invalidateQueries({ queryKey: ['meal-stats'] });
      
      // Force refetch by removing cached data
      queryClient.removeQueries({ queryKey: ['meals'] });
      queryClient.removeQueries({ queryKey: ['meals-infinite'] });
      queryClient.removeQueries({ queryKey: ['meal-stats'] });
    },
  });
}

export function useUpdateMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateMealEntryRequest> }) =>
      mealApi.updateMealEntry(id, data),
    onSuccess: () => {
      // Invalidate all meal-related queries
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['meals-infinite'] });
      queryClient.invalidateQueries({ queryKey: ['meal-stats'] });
      
      // Force refetch by removing cached data
      queryClient.removeQueries({ queryKey: ['meals'] });
      queryClient.removeQueries({ queryKey: ['meals-infinite'] });
      queryClient.removeQueries({ queryKey: ['meal-stats'] });
    },
  });
}

export function useDeleteMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mealApi.deleteMealEntry(id),
    onSuccess: () => {
      // Invalidate all meal-related queries
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['meals-infinite'] });
      queryClient.invalidateQueries({ queryKey: ['meal-stats'] });
      
      // Force refetch by removing cached data
      queryClient.removeQueries({ queryKey: ['meals'] });
      queryClient.removeQueries({ queryKey: ['meals-infinite'] });
      queryClient.removeQueries({ queryKey: ['meal-stats'] });
    },
  });
}

export function useGetMealByIdQuery(id: number | null) {
  return {
    // For now, we'll get the meal from the existing meals data
    // In a real app, you might want a separate API endpoint
    data: null, // We'll pass the meal data directly from the list
  };
}
