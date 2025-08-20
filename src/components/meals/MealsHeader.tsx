import React from 'react';
import { View } from 'react-native';
import { Button, ButtonText } from '../../../components/ui/button';
import { Plus, Filter } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface MealsHeaderProps {
  showFilters: boolean;
  onAddMeal: () => void;
  onToggleFilters: () => void;
}

export function MealsHeader({ showFilters, onAddMeal, onToggleFilters }: MealsHeaderProps) {
  const colors = useThemeColors();

  return (
    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
      <Button 
        action="primary" 
        variant="solid" 
        style={{ flex: 1, height: 40 }}
        onPress={onAddMeal}
      >
        <Plus size={20} color={colors.text.inverse} />
        <ButtonText style={{ marginLeft: 8, color: colors.text.inverse }}>
          Add Meal Entry
        </ButtonText>
      </Button>
      
      <Button 
        action={showFilters ? "primary" : "default"}
        variant={showFilters ? "solid" : "outline"}
        style={{ 
          width: 42, 
          height: 42,
          borderColor: showFilters ? colors.primary[500] : colors.border.primary,
          backgroundColor: showFilters ? colors.primary[100] : 'transparent'
        }}
        onPress={onToggleFilters}
      >
        <Filter size={20} color={showFilters ? colors.primary[600] : colors.icon.muted} />
      </Button>
    </View>
  );
}
