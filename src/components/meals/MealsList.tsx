import React from 'react';
import { View, Text } from 'react-native';
import { MealEntryCard } from './MealEntryCard';
import { EmptyMealsList } from './EmptyMealsList';
import { useThemeColors } from '../../hooks/useThemeColors';

interface MealEntry {
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
  onMealAction: (meal: MealEntry) => void;
  onAddMeal: () => void;
}

export function MealsList({ 
  meals, 
  currentUserId, 
  showOnlyMyMeals, 
  isAdmin, 
  onMealAction, 
  onAddMeal 
}: MealsListProps) {
  const colors = useThemeColors();

  const canEditMeal = (meal: MealEntry) => {
    return isAdmin || meal.userId === currentUserId;
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 12 
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: '600', 
          color: colors.text.primary 
        }}>
          Meal Entries
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: colors.text.secondary 
        }}>
          {meals.length} entries
        </Text>
      </View>

      {meals.length === 0 ? (
        <EmptyMealsList 
          showOnlyMyMeals={showOnlyMyMeals}
          onAddMeal={onAddMeal}
        />
      ) : (
        <View style={{ gap: 8 }}>
          {meals.map((meal) => (
            <MealEntryCard
              key={meal.id}
              meal={meal}
              currentUserId={currentUserId}
              canEdit={canEditMeal(meal)}
              onActionPress={onMealAction}
            />
          ))}
        </View>
      )}
    </View>
  );
}
