import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { MealEntryCard } from './MealEntryCard';
import { EmptyMealsList } from './EmptyMealsList';
import { MealListSkeleton } from './MealListSkeleton';
import { MealListError } from './MealListError';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Button, ButtonText, ButtonSpinner } from '../../../components/ui/button';

export interface MealEntry {
  id: number;
  date: string;
  amount: number;
  note?: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface MealsListProps {
  meals: MealEntry[];
  currentUserId?: number;
  showOnlyMyMeals: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  onMealAction: (meal: MealEntry) => void;
  onAddMeal: () => void;
  onRefresh: () => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  error?: Error;
  onRetry?: () => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function MealsList({
  meals,
  currentUserId,
  showOnlyMyMeals,
  isAdmin,
  isLoading,
  isRefreshing,
  onMealAction,
  onAddMeal,
  onRefresh,
  ListHeaderComponent,
  error,
  onRetry,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage
}: MealsListProps) {
  const colors = useThemeColors();



  const canEditMeal = (meal: MealEntry) => {
    return isAdmin || meal.userId === currentUserId;
  };

  const renderMealItem = ({ item, index }: { item: MealEntry; index: number }) => (
    <View style={{ 
      marginBottom:  12,
      marginHorizontal: 16 
    }}>
      <MealEntryCard
        meal={item}
        currentUserId={currentUserId}
        canEdit={canEditMeal(item)}
        onActionPress={onMealAction}
      />
    </View>
  );

  const renderSectionHeader = (date: string) => (
    <View style={{ 
      paddingHorizontal: 16, 
      paddingVertical: 8, 
      backgroundColor: colors.background.primary
    }}>
      <Text style={{ 
        fontSize: 14, 
        fontWeight: '600', 
        color: colors.text.secondary 
      }}>
        {date}
      </Text>
    </View>
  );

  const groupMealsByDate = (meals: MealEntry[]) => {
    const grouped = meals.reduce((acc, meal) => {
      const date = new Date(meal.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(meal);
      return acc;
    }, {} as Record<string, MealEntry[]>);

    // Convert to flat array with headers
    const flatData: (MealEntry | { type: 'header'; date: string })[] = [];
    Object.entries(grouped).forEach(([date, mealList]) => {
      flatData.push({ type: 'header', date });
      flatData.push(...mealList);
    });

    return flatData;
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item.type === 'header') {
      return renderSectionHeader(item.date);
    }
    return renderMealItem({ item, index });
  };

  const renderFooter = () => {


    if (!hasNextPage && !isFetchingNextPage) {
      return null;
    }

    if (isFetchingNextPage) {
      return (
        <View style={{ 
          padding: 20, 
          alignItems: 'center',
          backgroundColor: colors.background.primary 
        }}>
          <Button
            action="primary"
            variant="solid"
            size="lg"
            className="min-w-32"
            disabled={true}
          >
            <ButtonSpinner color="white" />
            <ButtonText className='text-sm'>Loading...</ButtonText>
          </Button>
        </View>
      );
    }

    if (hasNextPage) {
      return (
        <View style={{ 
          padding: 20, 
          alignItems: 'center',
          backgroundColor: colors.background.primary 
        }}>
          <Button
            onPress={onLoadMore}
            action="primary"
            variant="solid"
            size="lg"
            className="min-w-32"
          >
            <ButtonText className='text-sm'>Load More</ButtonText>
          </Button>
        </View>
      );
    }

    return null;
  };

  // Show loading skeleton on first load
  if (isLoading && meals.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        {ListHeaderComponent && (
          React.isValidElement(ListHeaderComponent) ? 
            ListHeaderComponent : 
            React.createElement(ListHeaderComponent)
        )}
        <MealListSkeleton />
      </View>
    );
  }

  // Show error state
  if (error && meals.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        {ListHeaderComponent && (
          React.isValidElement(ListHeaderComponent) ? 
            ListHeaderComponent : 
            React.createElement(ListHeaderComponent)
        )}
        <MealListError error={error} onRetry={onRetry} />
      </View>
    );
  }

  // Show empty state when no meals and not loading
  if (meals.length === 0 && !isLoading) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        {ListHeaderComponent && (
          React.isValidElement(ListHeaderComponent) ? 
            ListHeaderComponent : 
            React.createElement(ListHeaderComponent)
        )}
        <EmptyMealsList
          showOnlyMyMeals={showOnlyMyMeals}
          onAddMeal={onAddMeal}
        />
      </View>
    );
  }

  const groupedData = groupMealsByDate(meals);

  return (
    <FlatList
      data={groupedData}
      renderItem={renderItem}
      keyExtractor={(item, index) => 
        item.type === 'header' ? `header-${item.date}-${index}` : `meal-${item.id}-${index}`
      }
      contentContainerStyle={{ 
        paddingBottom: 16,
        backgroundColor: colors.background.primary
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary[600]}
          colors={[colors.primary[600]]}
        />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={renderFooter}
      style={{ backgroundColor: colors.background.primary }}
    />
  );
}
