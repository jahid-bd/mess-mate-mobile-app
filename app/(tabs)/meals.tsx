import { View, Text, ScrollView } from 'react-native';
import { ButtonText, Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input, InputField } from '../../components/ui/input';
import { Plus, Search, Filter } from 'lucide-react-native';
import { useThemeColors } from '../../src/hooks/useThemeColors';

export default function MealsScreen() {
  const colors = useThemeColors();
  const mockMeals = [
    { id: 1, date: '2025-08-18', type: 'Lunch', person: 'John Doe', status: 'confirmed' },
    { id: 2, date: '2025-08-18', type: 'Dinner', person: 'Maria Smith', status: 'confirmed' },
    { id: 3, date: '2025-08-17', type: 'Breakfast', person: 'Ahmed Khan', status: 'pending' },
    { id: 4, date: '2025-08-17', type: 'Lunch', person: 'John Doe', status: 'confirmed' },
    { id: 5, date: '2025-08-17', type: 'Dinner', person: 'Sarah Wilson', status: 'confirmed' },
  ];

  return (
    <ScrollView className="flex-1 bg-background-0 px-4 py-6">
      {/* Search and Filter */}
      <View className="mb-6">
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Input>
              <InputField placeholder="Search meals..." />
            </Input>
          </View>
          <Button action="secondary" variant="outline" className="w-12 h-12">
            <Filter size={20} color={colors.icon.secondary} />
          </Button>
        </View>
        
        <Button action="primary" variant="solid">
          <Plus size={20} color={colors.icon.inverse} />
          <ButtonText className="ml-2">Add Meal Entry</ButtonText>
        </Button>
      </View>

      {/* Meal Statistics */}
      <View className="flex-row gap-4 mb-6">
        <Card className="flex-1 p-4">
          <Text className="text-sm text-typography-600 mb-1">Today&apos;s Meals</Text>
          <Text className="text-2xl font-bold text-primary-600">8</Text>
        </Card>
        <Card className="flex-1 p-4">
          <Text className="text-sm text-typography-600 mb-1">This Week</Text>
          <Text className="text-2xl font-bold text-secondary-600">45</Text>
        </Card>
        <Card className="flex-1 p-4">
          <Text className="text-sm text-typography-600 mb-1">This Month</Text>
          <Text className="text-2xl font-bold text-tertiary-600">182</Text>
        </Card>
      </View>

      {/* Recent Meal Entries */}
      <Text className="text-xl font-bold text-typography-900 mb-4">
        Recent Meal Entries
      </Text>

      <View className="space-y-3">
        {mockMeals.map((meal) => (
          <Card key={meal.id} className="p-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg font-semibold text-typography-900">
                    {meal.type}
                  </Text>
                  <View className={`ml-2 px-2 py-1 rounded-full ${
                    meal.status === 'confirmed' 
                      ? 'bg-success-100' 
                      : 'bg-warning-100'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      meal.status === 'confirmed' 
                        ? 'text-success-700' 
                        : 'text-warning-700'
                    }`}>
                      {meal.status}
                    </Text>
                  </View>
                </View>
                <Text className="text-typography-600 text-sm">
                  {meal.person}
                </Text>
                <Text className="text-typography-500 text-xs">
                  {meal.date}
                </Text>
              </View>
              
              <Button action="secondary" variant="outline" size="sm">
                <ButtonText>Edit</ButtonText>
              </Button>
            </View>
          </Card>
        ))}
      </View>

      {/* Empty State (when no meals) */}
      {mockMeals.length === 0 && (
        <Card className="p-8 items-center">
          <Text className="text-typography-600 text-center mb-4">
            No meal entries found for the selected period.
          </Text>
          <Button action="primary" variant="solid">
            <Plus size={20} color={colors.icon.inverse} />
            <ButtonText className="ml-2">Add Your First Meal</ButtonText>
          </Button>
        </Card>
      )}
    </ScrollView>
  );
}
