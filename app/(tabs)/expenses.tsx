import { View, Text, ScrollView } from 'react-native';
import { ButtonText, Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input, InputField } from '../../components/ui/input';
import { Plus, Filter, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useThemeColors } from '../../src/hooks/useThemeColors';

export default function ExpensesScreen() {
  const colors = useThemeColors();
  const mockExpenses = [
    { id: 1, date: '2025-08-18', type: 'Bazar', amount: 450, person: 'John Doe', description: 'Vegetables and rice' },
    { id: 2, date: '2025-08-17', type: 'Other', amount: 200, person: 'Maria Smith', description: 'Gas refill' },
    { id: 3, date: '2025-08-16', type: 'Bazar', amount: 380, person: 'Ahmed Khan', description: 'Fish and meat' },
    { id: 4, date: '2025-08-15', type: 'Other', amount: 150, person: 'Sarah Wilson', description: 'Cleaning supplies' },
    { id: 5, date: '2025-08-14', type: 'Bazar', amount: 320, person: 'John Doe', description: 'Fruits and dairy' },
  ];

  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <ScrollView className="flex-1 bg-background-0 px-4 py-6">
      {/* Search and Add */}
      <View className="mb-6">
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Input>
              <InputField placeholder="Search expenses..." />
            </Input>
          </View>
          <Button action="secondary" variant="outline" className="w-12 h-12">
            <Filter size={20} color={colors.icon.secondary} />
          </Button>
        </View>
        
        <Button action="primary" variant="solid">
          <Plus size={20} color={colors.icon.inverse} />
          <ButtonText className="ml-2">Add Expense</ButtonText>
        </Button>
      </View>

      {/* Expense Statistics */}
      <View className="flex-row gap-4 mb-6">
        <Card className="flex-1 p-4">
          <View className="flex-row items-center mb-1">
            <TrendingUp size={16} color={colors.icon.primary} />
            <Text className="text-sm text-typography-600 ml-1">Total Spent</Text>
          </View>
          <Text className="text-2xl font-bold text-primary-600">৳{totalExpenses}</Text>
        </Card>
        <Card className="flex-1 p-4">
          <View className="flex-row items-center mb-1">
            <TrendingDown size={16} color={colors.icon.secondary} />
            <Text className="text-sm text-typography-600 ml-1">Remaining</Text>
          </View>
          <Text className="text-2xl font-bold text-secondary-600">৳1,200</Text>
        </Card>
      </View>

      {/* Expense Categories */}
      <Card className="p-4 mb-6">
        <Text className="text-lg font-bold text-typography-900 mb-3">
          Categories This Month
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-2">
              <Text className="text-primary-600 font-bold">🛒</Text>
            </View>
            <Text className="text-sm text-typography-600">Bazar</Text>
            <Text className="text-sm font-semibold text-typography-900">৳1,150</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 bg-secondary-100 rounded-full items-center justify-center mb-2">
              <Text className="text-secondary-600 font-bold">⚡</Text>
            </View>
            <Text className="text-sm text-typography-600">Utilities</Text>
            <Text className="text-sm font-semibold text-typography-900">৳350</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 bg-tertiary-100 rounded-full items-center justify-center mb-2">
              <Text className="text-tertiary-600 font-bold">🏠</Text>
            </View>
            <Text className="text-sm text-typography-600">Other</Text>
            <Text className="text-sm font-semibold text-typography-900">৳200</Text>
          </View>
        </View>
      </Card>

      {/* Recent Expenses */}
      <Text className="text-xl font-bold text-typography-900 mb-4">
        Recent Expenses
      </Text>

      <View className="space-y-3">
        {mockExpenses.map((expense) => (
          <Card key={expense.id} className="p-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg font-semibold text-typography-900">
                    ৳{expense.amount}
                  </Text>
                  <View className={`ml-2 px-2 py-1 rounded-full ${
                    expense.type === 'Bazar' 
                      ? 'bg-primary-100' 
                      : 'bg-secondary-100'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      expense.type === 'Bazar' 
                        ? 'text-primary-700' 
                        : 'text-secondary-700'
                    }`}>
                      {expense.type}
                    </Text>
                  </View>
                </View>
                <Text className="text-typography-700 text-sm mb-1">
                  {expense.description}
                </Text>
                <Text className="text-typography-600 text-xs">
                  By {expense.person} • {expense.date}
                </Text>
              </View>
              
              <Button action="secondary" variant="outline" size="sm">
                <ButtonText>Edit</ButtonText>
              </Button>
            </View>
          </Card>
        ))}
      </View>

      {/* Monthly Summary */}
      <Card className="p-4 mt-6">
        <Text className="text-lg font-bold text-typography-900 mb-3">
          Monthly Summary
        </Text>
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-typography-600">Total Expenses</Text>
            <Text className="font-semibold text-typography-900">৳{totalExpenses}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-typography-600">Average per Person</Text>
            <Text className="font-semibold text-typography-900">৳425</Text>
          </View>
          <View className="flex-row justify-between border-t border-outline-200 pt-2">
            <Text className="text-typography-700 font-medium">Budget Status</Text>
            <Text className="font-semibold text-success-600">Under Budget</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
