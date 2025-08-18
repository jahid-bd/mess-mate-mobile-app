import { api } from './client';
import { Expense, CreateExpenseRequest, PaginatedResponse } from '../types/api';

export const expenseApi = {
  getExpenses: async (params?: {
    page?: number;
    limit?: number;
    month?: string;
    userId?: number;
    type?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Expense>> => {
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
    const response = await api.post('/expenses', data);
    return response.data;
  },

  updateExpense: async (
    id: number,
    data: Partial<CreateExpenseRequest>,
  ): Promise<Expense> => {
    const response = await api.patch(`/expenses/${id}`, data);
    return response.data;
  },

  deleteExpense: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },
};
