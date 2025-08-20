import { api } from './client';
import {
  MealEntry,
  CreateMealEntryRequest,
  PaginatedResponse,
  MealStats,
} from '../types/api';

export const mealApi = {
  getMealEntries: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    month?: string;
    userId?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    includeStats?: boolean;
  }): Promise<PaginatedResponse<MealEntry> & { stats?: MealStats }> => {
    const response = await api.get('/meal-entries', { params });
    return response.data;
  },

  getMealStats: async (params?: {
    month?: string;
    userId?: number;
  }): Promise<MealStats> => {
    const response = await api.get('/meal-entries/stats', { params });
    return response.data;
  },

  createMealEntry: async (data: CreateMealEntryRequest): Promise<MealEntry> => {
    const response = await api.post('/meal-entries', data);
    return response.data;
  },

  updateMealEntry: async (
    id: number,
    data: Partial<CreateMealEntryRequest>,
  ): Promise<MealEntry> => {
    const response = await api.patch(`/meal-entries/${id}`, data);
    return response.data;
  },

  deleteMealEntry: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/meal-entries/${id}`);
    return response.data;
  },
};
