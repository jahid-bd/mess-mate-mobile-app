import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '../../components/ui/button';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { useMealsQuery, useMealStatsQuery, useInfiniteMealsQuery } from '../../src/hooks/useMealsQuery';
import { useDeleteMealMutation } from '../../src/hooks/useMealMutations';
import { MonthPicker } from '../../src/components/MonthPicker';
import { UserPicker } from '../../src/components/UserPicker';
import { MealActionModal } from '../../src/components/MealActionModal';
import { Toast } from '../../src/components/Toast';
import { MealEntry, User } from '../../src/types/api';
import {
  MealStatistics,
  MealFiltersCard,
  MealsList,
  MealsHeader,
  type MealStats,
} from '../../src/components/meals';
import { HeaderWithLogo } from '@/src/components/HeaderWithLogo';

export default function MealsScreen() {
  const colors = useThemeColors();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  
  // State management
  const [selectedMonth, setSelectedMonth] = useState('2025-08');
  const [showOnlyMyMeals, setShowOnlyMyMeals] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'user'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealEntry | null>(null);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  // Mutation hooks
  const deleteMealMutation = useDeleteMealMutation();

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  // React Query for meals data with infinite pagination
  const { 
    data: mealsInfiniteData, 
    isLoading, 
    isError, 
    error, 
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMealsQuery({
    month: selectedMonth,
    userId: showOnlyMyMeals ? user?.id : (selectedUser || undefined),
    sortBy,
    order: sortOrder,
    includeStats: true, // Request stats with the meals data
  });


  // Get stats from API response or use separate stats query as fallback
  const { 
    data: separateStats,
  } = useMealStatsQuery({
    month: selectedMonth,
    userId: showOnlyMyMeals ? user?.id : (selectedUser || undefined),
  });



  // Extract meals from infinite query pages and deduplicate by ID
  const allMeals = mealsInfiniteData?.pages?.flatMap(page => page.data) || [];
  const meals = allMeals.filter((meal, index, array) => 
    array.findIndex(m => m.id === meal.id) === index
  );

  console.log('Meals Debug:', {
    totalPages: mealsInfiniteData?.pages?.length,
    allMealsCount: allMeals.length,
    uniqueMealsCount: meals.length,
    duplicatesRemoved: allMeals.length - meals.length
  });

  // Use stats from first page's API response, fallback to separate stats query, or empty stats
  const apiStats = mealsInfiniteData?.pages?.[0]?.stats || separateStats;
  const stats: MealStats = apiStats ? {
    ...apiStats,
    userMeals: apiStats.userMeals || 0, // Convert null to 0
  } : {
    totalEntries: 0,
    totalMeals: 0,
    todayMeals: 0,
    weeklyMeals: 0,
    monthlyMeals: 0,
    averagePerDay: 0,
    userMeals: 0,
  };

  const mockUsers: User[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      role: 'USER',
      status: 'ACTIVE',
      createdAt: '2025-01-01'
    },
    { 
      id: 2, 
      name: 'Maria Smith', 
      email: 'maria@example.com',
      role: 'USER',
      status: 'ACTIVE',
      createdAt: '2025-01-01'
    },
    { 
      id: 3, 
      name: 'Ahmed Khan', 
      email: 'ahmed@example.com',
      role: 'USER',
      status: 'ACTIVE',
      createdAt: '2025-01-01'
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      email: 'sarah@example.com',
      role: 'USER',
      status: 'ACTIVE',
      createdAt: '2025-01-01'
    },
  ];

  // Event handlers
  const handleAddMeal = () => {
    router.push('/(tabs)/add-meal');
  };

  const handleEditMeal = (meal: MealEntry) => {
    // Ensure date is in YYYY-MM-DD format
    let dateString = meal.date;
    if (dateString && dateString.length > 10) {
      // If it's a full ISO string, extract just the date part
      dateString = dateString.split('T')[0];
    }
    
    router.push(`/(tabs)/add-meal?id=${meal.id}&mode=edit&type=${meal.type}&amount=${meal.amount}&note=${encodeURIComponent(meal.note || '')}&date=${dateString}&userId=${meal.userId}`);
  };

  const handleDeleteMeal = (meal: MealEntry) => {
    Alert.alert(
      'Delete Meal Entry',
      `Are you sure you want to delete this ${meal.type.toLowerCase()} entry?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMealMutation.mutateAsync(meal.id);
              showToast('Meal entry deleted successfully!', 'success');
            } catch (error: any) {
              console.error('Error deleting meal:', error);
              showToast(
                error.response?.data?.message || 'Failed to delete meal entry. Please try again.',
                'error'
              );
            }
          }
        }
      ]
    );
  };

  const showMealActions = (meal: MealEntry) => {
    setSelectedMeal(meal);
    setShowActionModal(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Filter change handlers that trigger new API calls
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    // React Query will automatically refetch due to dependency change
  };

  const handleUserFilterChange = (userId: number | null) => {
    setSelectedUser(userId);
    // React Query will automatically refetch due to dependency change
  };

  const handleToggleMyMeals = () => {
    setShowOnlyMyMeals(!showOnlyMyMeals);
    setSelectedUser(null); // Clear user filter when toggling my meals
    // React Query will automatically refetch due to dependency change
  };

  const handleSortChange = (newSortBy: 'date' | 'type' | 'user') => {
    setSortBy(newSortBy);
    // React Query will automatically refetch due to dependency change
  };

  const handleSortOrderChange = (newOrder: 'asc' | 'desc') => {
    setSortOrder(newOrder);
    // React Query will automatically refetch due to dependency change
  };

  const handleClearFilters = () => {
    setSelectedUser(null);
    setShowOnlyMyMeals(false);
    setSortBy('date');
    setSortOrder('desc');
    // Month is not cleared as it's usually the primary filter
  };

  // Check if any filters are active (excluding month and default sort)
  const hasActiveFilters = selectedUser !== null || showOnlyMyMeals || 
    sortBy !== 'date' || sortOrder !== 'desc';

  // Since we're using server-side filtering and sorting, we can use meals directly
  const filteredMeals = meals;

  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: colors.background.primary }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        {/* Meal Statistics */}
        <MealStatistics stats={stats} isLoading={isLoading} />

        {/* Header Actions */}
        <MealsHeader
          showFilters={showFilters}
          onAddMeal={handleAddMeal}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            backgroundColor: colors.primary[50],
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: colors.primary[200]
          }}>
            <View style={{ flex: 1 }}>
              <ButtonText style={{ 
                fontSize: 14, 
                color: colors.primary[700],
                fontWeight: '500'
              }}>
                Filters Active: {[
                  selectedUser && 'User',
                  showOnlyMyMeals && 'My Meals',
                  sortBy !== 'date' && `Sort: ${sortBy}`,
                  sortOrder !== 'desc' && 'Ascending'
                ].filter(Boolean).join(', ')}
              </ButtonText>
            </View>
            <Button 
              action="primary" 
              variant="outline" 
              size="sm"
              onPress={handleClearFilters}
            >
              <ButtonText>Clear</ButtonText>
            </Button>
          </View>
        )}

        {/* Filters */}
        {showFilters && (
          <MealFiltersCard
            selectedMonth={selectedMonth}
            showOnlyMyMeals={showOnlyMyMeals}
            selectedUser={selectedUser}
            sortBy={sortBy}
            sortOrder={sortOrder}
            isAdmin={isAdmin}
            users={mockUsers.map(u => ({ 
              id: u.id, 
              name: u.name || u.email.split('@')[0], 
              email: u.email 
            }))}
            onMonthPickerOpen={() => setShowMonthPicker(true)}
            onUserPickerOpen={() => setShowUserPicker(true)}
            onToggleMyMeals={handleToggleMyMeals}
            onSortByChange={handleSortChange}
            onSortOrderChange={handleSortOrderChange}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <HeaderWithLogo title='Meal Entries' />

      {/* Always show the MealsList component with loading/error states handled internally */}
      <MealsList
        meals={isLoading || isError ? [] : (filteredMeals as any)} // Show empty array while loading
        currentUserId={user?.id}
        showOnlyMyMeals={showOnlyMyMeals}
        isAdmin={isAdmin}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        onMealAction={showMealActions as any}
        onAddMeal={handleAddMeal}
        onRefresh={handleRefresh}
        ListHeaderComponent={ListHeaderComponent}
        error={isError ? error : undefined}
        onRetry={() => refetch()}
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Month Picker Modal */}
      <MonthPicker
        visible={showMonthPicker}
        selectedMonth={selectedMonth}
        onSelect={handleMonthChange}
        onClose={() => setShowMonthPicker(false)}
      />

      {/* User Picker Modal */}
      <UserPicker
        visible={showUserPicker}
        users={mockUsers.map(u => ({ 
          id: u.id, 
          name: u.name || u.email.split('@')[0], 
          email: u.email 
        }))}
        selectedUserId={selectedUser}
        onSelect={handleUserFilterChange}
        onClose={() => setShowUserPicker(false)}
      />

      {/* Meal Action Modal */}
      <MealActionModal
        visible={showActionModal}
        meal={selectedMeal}
        onClose={() => {
          setShowActionModal(false);
          setSelectedMeal(null);
        }}
        onEdit={handleEditMeal}
        onDelete={handleDeleteMeal}
      />

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </View>
  );
}
