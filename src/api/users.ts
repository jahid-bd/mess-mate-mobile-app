import { api } from './client';
import { User } from '../types/api';

export const usersApi = {
  getAllActiveUsers: async (): Promise<User[]> => {
    const response = await api.get('/user/active');
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (userId: number, data: Partial<User>): Promise<{ message: string }> => {
    const response = await api.patch(`/user/${userId}`, data);
    return response.data;
  },
};
