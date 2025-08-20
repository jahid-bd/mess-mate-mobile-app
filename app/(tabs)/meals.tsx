import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, Alert, ActionSheetIOS, Platform } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '../../components/ui/button';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { MonthPicker } from '../../src/components/MonthPicker';
import { UserPicker } from '../../src/components/UserPicker';
import {
  MealStatistics,
  MealFiltersCard,
  MealsList,
  MealsHeader,
  type MealEntry,
  type MealStats,
  type User,
} from '../../src/components/meals';

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

  // Mock data - this will be replaced with API calls
  const mockStats: MealStats = {
    totalMeals: 145,
    todayMeals: 12,
    weeklyMeals: 84,
    monthlyMeals: 145,
    averagePerDay: 4.8,
    userMeals: 23,
  };

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Maria Smith', email: 'maria@example.com' },
    { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
  ];

  const mockMeals: MealEntry[] = [
    {
      id: 1,
      date: '2025-08-20',
      amount: 1,
      type: 'LUNCH',
      note: 'Regular meal',
      userId: 1,
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      createdAt: '2025-08-20T12:30:00Z',
      updatedAt: '2025-08-20T12:30:00Z',
    },
    {
      id: 2,
      date: '2025-08-20',
      amount: 1,
      type: 'DINNER',
      note: 'Late dinner',
      userId: 2,
      user: { id: 2, name: 'Maria Smith', email: 'maria@example.com' },
      createdAt: '2025-08-20T20:30:00Z',
      updatedAt: '2025-08-20T20:30:00Z',
    },
    {
      id: 3,
      date: '2025-08-19',
      amount: 1,
      type: 'BREAKFAST',
      note: undefined,
      userId: 1,
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      createdAt: '2025-08-19T08:00:00Z',
      updatedAt: '2025-08-19T08:00:00Z',
    },
    {
      id: 4,
      date: '2025-08-19',
      amount: 1,
      type: 'SHAHUR',
      note: 'Ramadan sehri',
      userId: 3,
      user: { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com' },
      createdAt: '2025-08-19T04:30:00Z',
      updatedAt: '2025-08-19T04:30:00Z',
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
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Data processing
  const filteredMeals = mockMeals
    .filter(meal => !showOnlyMyMeals || meal.userId === user?.id)
    .filter(meal => !selectedUser || meal.userId === selectedUser)
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'user':
          comparison = a.user.name.localeCompare(b.user.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
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
          stats={mockStats}
          isAdmin={isAdmin}
        />

        {/* Filters */}
        {showFilters && (
          <MealFiltersCard
            selectedMonth={selectedMonth}
            showOnlyMyMeals={showOnlyMyMeals}
            selectedUser={selectedUser}
            sortBy={sortBy}
            sortOrder={sortOrder}
            isAdmin={isAdmin}
            users={mockUsers}
            onMonthPickerOpen={() => setShowMonthPicker(true)}
            onUserPickerOpen={() => setShowUserPicker(true)}
            onToggleMyMeals={() => setShowOnlyMyMeals(!showOnlyMyMeals)}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />
        )}

        {/* Meal Entries List */}
        <MealsList
          meals={filteredMeals}
          currentUserId={user?.id}
          showOnlyMyMeals={showOnlyMyMeals}
          isAdmin={isAdmin}
          onMealAction={showMealActions}
          onAddMeal={handleAddMeal}
        />

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
        onSelect={setSelectedMonth}
        onClose={() => setShowMonthPicker(false)}
      />

      {/* User Picker Modal */}
      <UserPicker
        visible={showUserPicker}
        users={mockUsers}
        selectedUserId={selectedUser}
        onSelect={setSelectedUser}
        onClose={() => setShowUserPicker(false)}
      />
    </View>
  );
}
