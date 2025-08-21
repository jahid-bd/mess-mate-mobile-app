import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { ExpenseEntryCard } from './ExpenseEntryCard';
import { EmptyExpensesList } from './EmptyExpensesList';
import { useThemeColors } from '../../hooks/useThemeColors';

export interface ExpenseEntry {
  id: number;
  title?: string;
  amount: number;
  type: 'BAZAR' | 'OTHER';
  note?: string;
  date: string;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ExpensesListProps {
  expenses: ExpenseEntry[];
  isLoading: boolean;
  isRefreshing: boolean;
  showOnlyMyExpenses: boolean;
  currentUserId: number;
  onRefresh: () => void;
  onAddExpense: () => void;
  onEditExpense: (expense: ExpenseEntry) => void;
  onDeleteExpense: (expenseId: number) => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export function ExpensesList({
  expenses,
  isLoading,
  isRefreshing,
  showOnlyMyExpenses,
  currentUserId,
  onRefresh,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  ListHeaderComponent
}: ExpensesListProps) {
  const colors = useThemeColors();

  const renderExpenseItem = ({ item, index }: { item: ExpenseEntry; index: number }) => (
    <ExpenseEntryCard
      expense={{
        ...item,
        note: item.note || '',
      }}
      currentUserId={currentUserId}
      canEdit={item.user.id === currentUserId}
      onActionPress={(expense) => onEditExpense(expense)}
      style={{ 
        marginBottom: index === expenses.length - 1 ? 0 : 12,
        marginHorizontal: 16 
      }}
    />
  );

  const renderSectionHeader = (date: string) => (
    <View style={{ 
      paddingHorizontal: 16, 
      paddingVertical: 8, 
      backgroundColor: colors.background.secondary 
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

  const groupExpensesByDate = (expenses: ExpenseEntry[]) => {
    const grouped = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    }, {} as Record<string, ExpenseEntry[]>);

    // Convert to flat array with headers
    const flatData: (ExpenseEntry | { type: 'header'; date: string })[] = [];
    Object.entries(grouped).forEach(([date, expenseList]) => {
      flatData.push({ type: 'header', date });
      flatData.push(...expenseList);
    });

    return flatData;
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item.type === 'header') {
      return renderSectionHeader(item.date);
    }
    return renderExpenseItem({ item, index });
  };

  if (expenses.length === 0 && !isLoading) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        {ListHeaderComponent && (
          React.isValidElement(ListHeaderComponent) ? 
            ListHeaderComponent : 
            React.createElement(ListHeaderComponent)
        )}
        <EmptyExpensesList
          showOnlyMyExpenses={showOnlyMyExpenses}
          onAddExpense={onAddExpense}
        />
      </View>
    );
  }

  const groupedData = groupExpensesByDate(expenses);

  return (
    <FlatList
      data={groupedData}
      renderItem={renderItem}
      keyExtractor={(item, index) => 
        item.type === 'header' ? `header-${item.date}` : `expense-${item.id}`
      }
      contentContainerStyle={{ 
        paddingBottom: 16,
        backgroundColor: colors.background.secondary 
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
      style={{ backgroundColor: colors.background.secondary }}
    />
  );
}
