import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, STORAGE_KEYS } from '../utils/constants';
import { 
  LoginRequest, 
  SignupRequest, 
  AuthResponse, 
  User,
  MealEntry,
  CreateMealEntryRequest
} from '../types/api';

// API Client Configuration
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getAuthToken();

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    if (options.body) {
      console.log('📤 Request Body:', options.body);
    }

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(`📱 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('🚨 Network Error:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - Please check your internet connection');
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
          throw new Error('Network error - Unable to connect to server. Please check your connection and try again.');
        }
        throw error;
      }
      throw new Error('Network error - Something went wrong with the request');
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Auth API
export const authApi = {
  signIn: (credentials: LoginRequest): Promise<AuthResponse> => 
    apiClient.post<AuthResponse>('/auth/signin', credentials),
  
  signUp: (userData: SignupRequest): Promise<AuthResponse> => 
    apiClient.post<AuthResponse>('/auth/signup', userData),
};

// User API
export const userApi = {
  getProfile: (): Promise<User> => 
    apiClient.get<User>('/user/profile'),
  
  updateProfile: (id: number, userData: Partial<User>): Promise<User> => 
    apiClient.patch<User>(`/user/${id}`, userData),
};

// Meal Entries API
export const mealEntriesApi = {
  getAll: (): Promise<MealEntry[]> => 
    apiClient.get<MealEntry[]>('/meal-entries'),
  
  create: (mealData: CreateMealEntryRequest): Promise<MealEntry> => 
    apiClient.post<MealEntry>('/meal-entries', mealData),
  
  update: (id: number, mealData: Partial<CreateMealEntryRequest>): Promise<MealEntry> => 
    apiClient.patch<MealEntry>(`/meal-entries/${id}`, mealData),
  
  delete: (id: number): Promise<void> => 
    apiClient.delete<void>(`/meal-entries/${id}`),
};

// Export API client for custom requests
export default apiClient;
