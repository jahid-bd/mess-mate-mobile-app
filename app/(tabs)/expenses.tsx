import React, { useState } from 'react';
import { View } from 'react-native';
import { 
  ExpenseStatistics, 
  ExpensesHeader, 
  ExpenseFiltersCard, 
  ExpensesList,
  ExpenseEntry,
  ExpenseStats,
  ExpenseFilters,
  User
} from '../../src/components/expenses';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { HeaderWithLogo } from '@/src/components/HeaderWithLogo';

export default function ExpensesScreen() {
  const colors = useThemeColors();
  
  // Mock data - replace with actual API calls
  const currentUserId = 1;
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState<ExpenseFilters>({
    selectedMonth: new Date().toISOString().slice(0, 7), // Current month
    selectedUserId: null,
    selectedType: 'ALL',
    searchQuery: ''
  });

  // Mock users data
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Maria Smith', email: 'maria@example.com' },
    { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
  ];

  // Mock expenses data
  const expenses: ExpenseEntry[] = [
    {
      id: 1,
      amount: 450,
      type: 'BAZAR',
      note: 'Vegetables and rice for weekly shopping',
      date: '2025-08-18',
      userId: 1,
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      createdAt: '2025-08-18T10:00:00Z',
      updatedAt: '2025-08-18T10:00:00Z'
    },
    {
      id: 2,
      amount: 200,
      type: 'OTHER',
      note: 'Gas cylinder refill',
      date: '2025-08-17',
      userId: 2,
      user: { id: 2, name: 'Maria Smith', email: 'maria@example.com' },
      createdAt: '2025-08-17T14:30:00Z',
      updatedAt: '2025-08-17T14:30:00Z'
    },
    {
      id: 3,
      amount: 380,
      type: 'BAZAR',
      note: 'Fresh fish and meat',
      date: '2025-08-16',
      userId: 3,
      user: { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com' },
      createdAt: '2025-08-16T16:45:00Z',
      updatedAt: '2025-08-16T16:45:00Z'
    },
    {
      id: 4,
      amount: 150,
      type: 'OTHER',
      note: 'Cleaning supplies and toiletries',
      date: '2025-08-15',
      userId: 4,
      user: { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
      createdAt: '2025-08-15T11:20:00Z',
      updatedAt: '2025-08-15T11:20:00Z'
    },
    {
      id: 5,
      amount: 320,
      type: 'BAZAR',
      note: 'Fruits, dairy products and snacks',
      date: '2025-08-14',
      userId: 1,
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      createdAt: '2025-08-14T09:15:00Z',
      updatedAt: '2025-08-14T09:15:00Z'
    }
  ];

  // Mock statistics
  const stats: ExpenseStats = {
    totalEntries: expenses.length,
    totalSpent: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    userSpent: expenses.filter(e => e.userId === currentUserId).reduce((sum, expense) => sum + expense.amount, 0),
    bazarSpent: expenses.filter(e => e.type === 'BAZAR').reduce((sum, expense) => sum + expense.amount, 0),
    otherSpent: expenses.filter(e => e.type === 'OTHER').reduce((sum, expense) => sum + expense.amount, 0),
    todaySpent: expenses.filter(e => e.date === new Date().toISOString().slice(0, 10)).reduce((sum, expense) => sum + expense.amount, 0),
    weeklySpent: 1200, // Mock weekly calculation
    monthlySpent: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    averagePerDay: expenses.reduce((sum, expense) => sum + expense.amount, 0) / 7
  };

  const handleAddExpense = () => {
    // TODO: Navigate to add expense screen
    console.log('Add expense pressed');
  };

  const handleEditExpense = (expense: ExpenseEntry) => {
    // TODO: Navigate to edit expense screen
    console.log('Edit expense:', expense.id);
  };

  const handleDeleteExpense = (expenseId: number) => {
    // TODO: Implement delete expense
    console.log('Delete expense:', expenseId);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: Refetch data
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleFiltersChange = (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
    // TODO: Apply filters to expense list
  };

  // Filter expenses based on current filters
  const filteredExpenses = expenses.filter(expense => {
    const matchesUser = !filters.selectedUserId || expense.userId === filters.selectedUserId;
    const matchesType = filters.selectedType === 'ALL' || expense.type === filters.selectedType;
    const matchesSearch = !filters.searchQuery || 
      expense.note?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      expense.user.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesMonth = expense.date.startsWith(filters.selectedMonth);
    
    return matchesUser && matchesType && matchesSearch && matchesMonth;
  });

  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: colors.background.primary  }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <ExpenseStatistics stats={stats} />
        <ExpensesHeader 
          onAddExpense={handleAddExpense}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />
        {showFilters && (
          <ExpenseFiltersCard
            filters={filters}
            users={users}
            onFiltersChange={handleFiltersChange}
            style={{ marginBottom: 16 }}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <HeaderWithLogo title='Expenses' />
      <ExpensesList
        expenses={filteredExpenses}
        isLoading={false}
        isRefreshing={isRefreshing}
        showOnlyMyExpenses={filters.selectedUserId === currentUserId}
        currentUserId={currentUserId}
        onRefresh={handleRefresh}
        onAddExpense={handleAddExpense}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
}
