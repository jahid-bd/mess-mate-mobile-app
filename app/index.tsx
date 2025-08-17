import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-gradient-to-br from-primary-500 to-primary-700 px-6 pt-12 pb-8">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-white mb-2">
            Welcome to MessMate! 🍽️
          </Text>
          <Text className="text-primary-100 text-lg">
            Your smart mess management companion
          </Text>
        </View>
        
        {/* Quick Stats Cards */}
        <View className="flex-row justify-between">
          <View className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex-1 mr-3">
            <Text className="text-primary-100 text-sm font-medium">Today&apos;s Meals</Text>
            <Text className="text-3xl font-bold text-white">3</Text>
            <Text className="text-primary-200 text-xs">Breakfast, Lunch, Dinner</Text>
          </View>
          <View className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex-1 ml-3">
            <Text className="text-primary-100 text-sm font-medium">This Month</Text>
            <Text className="text-3xl font-bold text-white">₹2,450</Text>
            <Text className="text-primary-200 text-xs">Total expenses</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="px-6 py-6 -mt-4">
        {/* Theme Demo Section */}
        <View className="bg-white rounded-3xl p-6 shadow-soft mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            🎨 Modern Theme Demo
          </Text>
          
          {/* Color Palette Demo */}
          <Text className="text-gray-600 mb-4">Color System:</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            <View className="bg-primary-500 w-12 h-12 rounded-xl" />
            <View className="bg-secondary-500 w-12 h-12 rounded-xl" />
            <View className="bg-accent-500 w-12 h-12 rounded-xl" />
            <View className="bg-success w-12 h-12 rounded-xl" />
            <View className="bg-error w-12 h-12 rounded-xl" />
            <View className="bg-warning w-12 h-12 rounded-xl" />
          </View>

          {/* Button Variants Demo */}
          <Text className="text-gray-600 mb-4">Button Variants:</Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-primary-500 py-4 px-6 rounded-xl">
              <Text className="text-white font-semibold text-center">Primary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary-500 py-4 px-6 rounded-xl">
              <Text className="text-white font-semibold text-center">Secondary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border-2 border-accent-500 py-4 px-6 rounded-xl">
              <Text className="text-accent-500 font-semibold text-center">Outline Button</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-3xl p-6 shadow-soft mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-gradient-to-r from-secondary-500 to-secondary-600 p-4 rounded-2xl flex-row items-center">
              <View className="bg-white/20 w-12 h-12 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">🍽️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-lg">Add Meal Entry</Text>
                <Text className="text-secondary-100 text-sm">Record your meals for today</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gradient-to-r from-accent-500 to-accent-600 p-4 rounded-2xl flex-row items-center">
              <View className="bg-white/20 w-12 h-12 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">💰</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-lg">Add Expense</Text>
                <Text className="text-accent-100 text-sm">Track your meal-related expenses</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gradient-to-r from-info to-primary-600 p-4 rounded-2xl flex-row items-center">
              <View className="bg-white/20 w-12 h-12 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">📊</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-lg">Monthly Report</Text>
                <Text className="text-blue-100 text-sm">View your monthly meal costs</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Cards */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-success/10 border border-success/20 p-4 rounded-2xl flex-1 mr-2">
            <Text className="text-success font-semibold">✅ Active</Text>
            <Text className="text-gray-600 text-sm">All systems working</Text>
          </View>
          <View className="bg-warning/10 border border-warning/20 p-4 rounded-2xl flex-1 ml-2">
            <Text className="text-warning font-semibold">⚠️ Pending</Text>
            <Text className="text-gray-600 text-sm">2 calculations due</Text>
          </View>
        </View>

        {/* Final Demo Card */}
        <View className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-strong">
          <Text className="text-white text-xl font-bold mb-2">
            🚀 Modern Theme Ready!
          </Text>
          <Text className="text-gray-300 mb-4">
            Beautiful design system with comprehensive color palette, typography, and component styles.
          </Text>
          <TouchableOpacity className="bg-white py-3 px-6 rounded-xl">
            <Text className="text-gray-900 font-semibold text-center">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
