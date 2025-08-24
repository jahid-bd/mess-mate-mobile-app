import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '../../components/ui/button';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { useInfiniteMealsQuery } from '../../src/hooks/useMealsQuery';
import { useDeleteMealMutation } from '../../src/hooks/useMealMutations';
import { useFilterOptions } from '../../src/hooks/useFilterOptions';
import { MealActionModal } from '../../src/components/MealActionModal';
import { Toast } from '../../src/components/Toast';
import { MealEntry } from '../../src/types/api';
import {
  MealStatistics,
  MealFiltersCard,
  MealsList,
  MealsHeader,
  type MealStats,
  type MealFilters,
} from '../../src/components/meals';
import { HeaderWithLogo } from '@/src/components/HeaderWithLogo';

export default function MealsScreen() {
  const colors = useThemeColors();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  
  // Fetch filter options
  const { data: filterOptions } = useFilterOptions();
  
  // New unified filter state
  const [mealFilters, setMealFilters] = useState<MealFilters>({
    selectedMonth: new Date().toISOString().slice(0, 7), // Current month
    selectedUserId: undefined,
    selectedType: 'ALL',
    searchQuery: ''
  });

  console.log("selected month:", mealFilters.selectedMonth  );  
  
  // State management
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
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
    month: mealFilters.selectedMonth,
    userId: mealFilters.selectedUserId,
    includeStats: true,
  });

  console.log("Meals data:", mealsInfiniteData);


  // Extract meals from infinite query pages and deduplicate by ID
  const allMeals = mealsInfiniteData?.pages?.flatMap(page => page.data) || [];
  const meals = allMeals.filter((meal, index, array) => 
    array.findIndex(m => m.id === meal.id) === index
  );



  // Use stats from first page's API response, fallback to separate stats query, or empty stats
  const apiStats = mealsInfiniteData?.pages?.[0]?.stats
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



  const handleMealFiltersChange = (newFilters: MealFilters) => {
    setMealFilters(newFilters);
    // TODO: Apply these filters to the meal query
    console.log('New meal filters:', newFilters);
  };



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


        {/* Filters */}
        {showFilters && (
          <MealFiltersCard
            filters={mealFilters}
            filterOptions={filterOptions}
            onFiltersChange={handleMealFiltersChange}
            style={{ marginBottom: 16 }}
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
        showOnlyMyMeals={user?.id === mealFilters.selectedUserId}
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
