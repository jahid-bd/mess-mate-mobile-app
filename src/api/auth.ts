import { api } from './client';
import { 
  AuthResponse, 
  LoginRequest, 
  SignupRequest,
  User 
} from '../types/api';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (userId: number, updateData: Partial<User>): Promise<User> => {
    const response = await api.patch(`/user/${userId}`, updateData);
    return response.data;
  },
};
