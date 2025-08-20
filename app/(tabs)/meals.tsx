import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, Alert, ActionSheetIOS, Platform } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '../../components/ui/button';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { useMealsQuery, useMealStatsQuery } from '../../src/hooks/useMealsQuery';
import { MonthPicker } from '../../src/components/MonthPicker';
import { UserPicker } from '../../src/components/UserPicker';
import { MealEntry, User } from '../../src/types/api';
import {
  MealStatistics,
  MealFiltersCard,
  MealsList,
  MealsHeader,
  type MealStats,
} from '../../src/components/meals';
import { Header } from '@react-navigation/elements';
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

  // React Query for meals data with comprehensive filtering and stats
  const { 
    data: mealsResponse, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useMealsQuery({
    month: selectedMonth,
    userId: showOnlyMyMeals ? user?.id : (selectedUser || undefined),
    sortBy,
    order: sortOrder,
    limit: 50,
    includeStats: true, // Request stats with the meals data
  });

  // Get stats from API response or use separate stats query as fallback
  const { 
    data: separateStats,
    isLoading: statsLoading 
  } = useMealStatsQuery({
    month: selectedMonth,
    userId: showOnlyMyMeals ? user?.id : (selectedUser || undefined),
  });

  console.log("Query params:", {
    month: selectedMonth,
    userId: showOnlyMyMeals ? user?.id : (selectedUser || undefined),
    sortBy,
    order: sortOrder,
    limit: 50,
  });
  console.log("Meals data:", mealsResponse);
  console.log("Stats data:", mealsResponse?.stats || separateStats);

  // Extract meals from response
  const meals = mealsResponse?.data || [];

  // Use stats from API response, fallback to separate stats query, or empty stats
  const apiStats = mealsResponse?.stats || separateStats;
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
    router.push(`/(tabs)/add-meal?id=${meal.id}&mode=edit`);
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
          onPress: () => {
            console.log('Delete meal:', meal.id);
            // TODO: Call delete API
          }
        }
      ]
    );
  };

  const showMealActions = (meal: MealEntry) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Edit', 'Delete'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            handleEditMeal(meal);
          } else if (buttonIndex === 2) {
            handleDeleteMeal(meal);
          }
        }
      );
    } else {
      Alert.alert(
        'Meal Actions',
        'What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Edit', onPress: () => handleEditMeal(meal) },
          { text: 'Delete', style: 'destructive', onPress: () => handleDeleteMeal(meal) }
        ]
      );
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <HeaderWithLogo title='Meal Entries' />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary[500]}
          />
        }
      >
        {/* Header Actions */}
        <MealsHeader
          showFilters={showFilters}
          onAddMeal={handleAddMeal}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Meal Statistics */}
        <MealStatistics
          stats={stats}
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

        {/* Loading State */}
        {(isLoading || (!mealsResponse?.stats && statsLoading)) && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Button action="secondary" variant="outline" disabled>
              <ButtonText>Loading meals...</ButtonText>
            </Button>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Button action="negative" variant="outline" disabled>
              <ButtonText>Error: {error?.message || 'Failed to load meals'}</ButtonText>
            </Button>
            <Button 
              action="primary" 
              variant="solid" 
              style={{ marginTop: 8 }}
              onPress={() => refetch()}
            >
              <ButtonText>Retry</ButtonText>
            </Button>
          </View>
        )}

        {/* Meal Entries List - only show when not loading and no error */}
        {!isLoading && !isError && (
          <MealsList
            meals={filteredMeals as any} // Temporary type assertion to fix type conflict
            currentUserId={user?.id}
            showOnlyMyMeals={showOnlyMyMeals}
            isAdmin={isAdmin}
            onMealAction={showMealActions as any} // Temporary type assertion
            onAddMeal={handleAddMeal}
          />
        )}

        {/* Load More Button (Pagination) */}
        {filteredMeals.length > 0 && (
          <Button 
            action="secondary" 
            variant="outline" 
            style={{ marginTop: 16 }}
          >
            <ButtonText>Load More Entries</ButtonText>
          </Button>
        )}
      </ScrollView>

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
    </View>
  );
}
