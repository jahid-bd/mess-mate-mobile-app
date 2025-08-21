import React from 'react';
import { View } from 'react-native';
import { Button, ButtonText } from '../../../components/ui/button';
import { Plus, Filter } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface ExpensesHeaderProps {
  showFilters: boolean;
  onAddExpense: () => void;
  onToggleFilters: () => void;
}

export function ExpensesHeader({ showFilters, onAddExpense, onToggleFilters }: ExpensesHeaderProps) {
  const colors = useThemeColors();

  return (
    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
      <Button 
        action="primary" 
        variant="solid" 
        style={{ flex: 1, height: 38 }}
        onPress={onAddExpense}
      >
        <Plus size={20} color={colors.text.inverse} />
        <ButtonText style={{ marginLeft: 8, color: colors.text.inverse }}>
          Add Expense
        </ButtonText>
      </Button>
      
      <Button 
        action={showFilters ? "primary" : "default"}
        variant={showFilters ? "solid" : "outline"}
        style={{ 
          width: 40, 
          height: 40,
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
