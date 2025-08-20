export interface User {
  id: number;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PAST';
  createdAt: string;
}

export interface MealEntry {
  id: number;
  date: string;
  amount: number;
  note?: string;
  userId: number;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Expense {
  id: number;
  date: string;
  note: string;
  amount: number;
  userId: number;
  type: 'BAZAR' | 'OTHER';
  createdAt: string;
  user?: User;
  sharedExpenseId?: number;
}

export interface UserMonthlyCost {
  id: number;
  userId: number;
  month: string;
  totalMontlyBill: number;
  totalMeals: number;
  mealCost: number;
  totalBazarContribution: number;
  totalOtherContribution: number;
  totalCost: number;
  totalContribution: number;
  subTotalCost: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface AuthResponse {
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateMealEntryRequest {
  date?: string;
  amount: number;
  note?: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';
}

export interface CreateExpenseRequest {
  date?: string;
  note: string;
  amount: number;
  type: 'BAZAR' | 'OTHER';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MealStats {
  totalEntries: number;
  totalMeals: number;
  todayMeals: number;
  weeklyMeals: number;
  monthlyMeals: number;
  averagePerDay: number;
  userMeals: number | null;
}
