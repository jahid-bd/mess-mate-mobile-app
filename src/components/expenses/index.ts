export { ExpenseStatistics } from './ExpenseStatistics';
export { ExpenseFiltersCard } from './ExpenseFiltersCard';
export { ExpenseEntryCard } from './ExpenseEntryCard';
export { EmptyExpensesList } from './EmptyExpensesList';
export { ExpensesList } from './ExpensesList';
export { ExpensesHeader } from './ExpensesHeader';

// Export types for better reusability
export interface ExpenseEntry {
  id: number;
  amount: number;
  type: 'BAZAR' | 'OTHER';
  note?: string;
  date: string;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseStats {
  totalEntries: number;
  totalSpent: number;
  userSpent: number;
  bazarSpent: number;
  otherSpent: number;
  todaySpent: number;
  weeklySpent: number;
  monthlySpent: number;
  averagePerDay: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ExpenseFilters {
  selectedMonth: string;
  selectedUserId: number | null;
  selectedType: 'ALL' | 'BAZAR' | 'OTHER';
  searchQuery: string;
}
