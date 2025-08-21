import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button, ButtonText } from '../../../components/ui/button';
import { Plus, Receipt } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface EmptyExpensesListProps {
  showOnlyMyExpenses: boolean;
  onAddExpense: () => void;
}

export function EmptyExpensesList({ showOnlyMyExpenses, onAddExpense }: EmptyExpensesListProps) {
  const colors = useThemeColors();

  return (
    <Card style={{ 
      padding: 32, 
      alignItems: 'center',
      backgroundColor: colors.background.primary,
      borderWidth: 1,
      borderColor: colors.border.primary,
      borderStyle: 'dashed'
    }}>
      <View style={{ 
        width: 64, 
        height: 64, 
        borderRadius: 32, 
        backgroundColor: colors.primary[50],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
      }}>
        <Receipt size={32} color={colors.primary[600]} />
      </View>
      
      <Text style={{ 
        fontSize: 18, 
        fontWeight: '600', 
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: 8
      }}>
        No Expenses Found
      </Text>
      
      <Text style={{ 
        fontSize: 14, 
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20
      }}>
        {showOnlyMyExpenses 
          ? "You haven't added any expenses yet. Start tracking your spending!" 
          : "No expenses found for the selected filters. Try adjusting your search criteria or add a new expense."
        }
      </Text>
      
      <Button 
        action="primary" 
        variant="solid"
        onPress={onAddExpense}
        style={{ minWidth: 140 }}
      >
        <Plus size={20} color={colors.text.inverse} />
        <ButtonText style={{ marginLeft: 8, color: colors.text.inverse }}>
          Add Expense
        </ButtonText>
      </Button>
    </Card>
  );
}
