import React from 'react';
import { Text } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button, ButtonText } from '../../../components/ui/button';
import { Plus, Utensils } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface EmptyMealsListProps {
  showOnlyMyMeals: boolean;
  onAddMeal: () => void;
}

export function EmptyMealsList({ showOnlyMyMeals, onAddMeal }: EmptyMealsListProps) {
  const colors = useThemeColors();

  return (
    <Card style={{ 
      padding: 32, 
      alignItems: 'center',
      backgroundColor: colors.background.primary,
      borderWidth: 1,
      borderColor: colors.border.primary
    }}>
      <Utensils size={48} color={colors.icon.muted} />
      <Text style={{ 
        fontSize: 16, 
        color: colors.text.secondary, 
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 16
      }}>
        {showOnlyMyMeals 
          ? "You haven't added any meals yet"
          : "No meal entries found for the selected period"
        }
      </Text>
      <Button action="primary" variant="solid" onPress={onAddMeal}>
        <Plus size={20} color={colors.text.inverse} />
        <ButtonText style={{ marginLeft: 8, color: colors.text.inverse }}>
          Add Your First Meal
        </ButtonText>
      </Button>
    </Card>
  );
}
