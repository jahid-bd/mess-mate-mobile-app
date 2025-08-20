import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { ButtonText, Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallbackText } from '../../components/ui/avatar';
import { Spinner } from '../../components/ui/spinner';
import { Sun, Moon, TrendingUp, DollarSign as DollarSignIcon, UtensilsCrossed } from 'lucide-react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { HeaderWithLogo } from '../../src/components/HeaderWithLogo';

export default function DashboardScreen() {
  const [isLoading] = useState(false);
  const { colorScheme, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const isDark = colorScheme === 'dark';

  const mockData = {
    currentMonth: 'August 2025',
    totalMeals: 45,
    totalExpenses: 2850,
    perPersonCost: 1425,
    remainingBudget: 575,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {/* Custom Header with Logo */}
      <HeaderWithLogo />
      
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        {/* Welcome Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: 4,
          }}>
            Welcome back! 👋
          </Text>
          <Text style={{
            fontSize: 16,
            color: colors.text.secondary,
          }}>
            {mockData.currentMonth} Overview
          </Text>
        </View>

        {/* Theme Toggle */}
        <View style={{ alignItems: 'flex-end', marginBottom: 24 }}>
          <Button 
            size="md" 
            variant="outline" 
            action="secondary"
            onPress={toggleTheme}
            className="w-12 h-12 rounded-full"
          >
            {isDark ? (
              <Sun size={20} color={colors.icon.secondary} />
            ) : (
              <Moon size={20} color={colors.icon.secondary} />
            )}
          </Button>
        </View>

      {/* Quick Stats Grid */}
      <View className="flex-row flex-wrap gap-4 mb-6">
        <Card className="flex-1 min-w-[160px] p-4">
          <View className="flex-row items-center mb-2">
            <UtensilsCrossed size={20} color={colors.icon.primary} />
            <Text className="text-typography-600 ml-2 text-sm">Total Meals</Text>
          </View>
          <Text className="text-2xl font-bold text-typography-900">
            {mockData.totalMeals}
          </Text>
          <Text className="text-success-600 text-xs mt-1">
            +12% from last month
          </Text>
        </Card>

        <Card className="flex-1 min-w-[160px] p-4">
          <View className="flex-row items-center mb-2">
            <DollarSignIcon size={20} color={colors.icon.secondary} />
            <Text className="text-typography-600 ml-2 text-sm">Total Cost</Text>
          </View>
          <Text className="text-2xl font-bold text-typography-900">
            ৳{mockData.totalExpenses}
          </Text>
          <Text className="text-error-600 text-xs mt-1">
            +5% from last month
          </Text>
        </Card>
      </View>

      {/* Monthly Summary Card */}
      <Card className="p-6 mb-6">
        <Text className="text-xl font-bold text-typography-900 mb-4">
          Monthly Summary
        </Text>
        
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-typography-700">Per Person Cost</Text>
            <Text className="text-lg font-semibold text-primary-600">
              ৳{mockData.perPersonCost}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center">
            <Text className="text-typography-700">Remaining Budget</Text>
            <Text className="text-lg font-semibold text-success-600">
              ৳{mockData.remainingBudget}
            </Text>
          </View>
          
          <View className="border-t border-outline-200 pt-3 mt-3">
            <Button action="primary" variant="solid">
              <ButtonText>View Detailed Report</ButtonText>
            </Button>
          </View>
        </View>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 mb-6">
        <Text className="text-xl font-bold text-typography-900 mb-4">
          Recent Activity
        </Text>
        
        <View className="space-y-4">
          <View className="flex-row items-center">
            <Avatar className="bg-primary-500 mr-3">
              <AvatarFallbackText>JD</AvatarFallbackText>
            </Avatar>
            <View className="flex-1">
              <Text className="text-typography-900 font-medium">
                John added lunch entry
              </Text>
              <Text className="text-typography-600 text-sm">2 hours ago</Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <Avatar className="bg-secondary-500 mr-3">
              <AvatarFallbackText>MS</AvatarFallbackText>
            </Avatar>
            <View className="flex-1">
              <Text className="text-typography-900 font-medium">
                Maria added grocery expense
              </Text>
              <Text className="text-typography-600 text-sm">5 hours ago</Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <Avatar className="bg-tertiary-500 mr-3">
              <AvatarFallbackText>AK</AvatarFallbackText>
            </Avatar>
            <View className="flex-1">
              <Text className="text-typography-900 font-medium">
                Ahmed completed monthly calculation
              </Text>
              <Text className="text-typography-600 text-sm">1 day ago</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 mb-6">
        <Text className="text-xl font-bold text-typography-900 mb-4">
          Quick Actions
        </Text>
        
        <View className="space-y-3">
          <Button action="primary" variant="solid">
            <ButtonText>Add Meal Entry</ButtonText>
          </Button>
          
          <Button action="secondary" variant="outline">
            <ButtonText>Add Expense</ButtonText>
          </Button>
          
          <Button action="positive" variant="link">
            <TrendingUp size={16} color={colors.icon.secondary} />
            <ButtonText className="ml-2">View Analytics</ButtonText>
          </Button>
        </View>
      </Card>

      {/* Loading Demo */}
      {isLoading && (
        <Card className="p-6 items-center">
          <Spinner color="$primary500" size="large" />
          <Text className="text-typography-600 mt-2">Loading data...</Text>
        </Card>
      )}
      </ScrollView>
    </View>
  );
}