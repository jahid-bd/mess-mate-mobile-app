import { View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to MessMate! 🍽️
          </Text>
          <Text className="text-gray-600">
            Your meal management companion
          </Text>
        </View>

        {/* NativeWind Test Section - Very Obvious */}
        <View className="mb-6 p-6 bg-red-500 rounded-xl border-4 border-yellow-400">
          <Text className="text-white text-2xl font-bold text-center mb-2">
            🎨 NATIVEWIND TEST 🎨
          </Text>
          <Text className="text-yellow-200 text-center mb-4">
            If you see this with red background, yellow border, and styled text - NativeWind is working!
          </Text>
          <View className="bg-blue-600 p-3 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Blue nested container
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Today&apos;s Overview
          </Text>
          <View className="flex-row justify-between">
            <View className="bg-blue-100 p-4 rounded-lg flex-1 mr-2">
              <Text className="text-blue-600 font-semibold">Meals</Text>
              <Text className="text-2xl font-bold text-blue-800">3</Text>
            </View>
            <View className="bg-green-100 p-4 rounded-lg flex-1 ml-2">
              <Text className="text-green-600 font-semibold">Expenses</Text>
              <Text className="text-2xl font-bold text-green-800">₹125</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <Text className="text-primary-600 font-semibold">Add Meal Entry</Text>
              <Text className="text-gray-500 text-sm">Record your meals for today</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <Text className="text-primary-600 font-semibold">Add Expense</Text>
              <Text className="text-gray-500 text-sm">Track your meal-related expenses</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <Text className="text-primary-600 font-semibold">Monthly Report</Text>
              <Text className="text-gray-500 text-sm">View your monthly meal costs</Text>
            </View>
          </View>
        </View>

        {/* Original NativeWind Test */}
        <View className="bg-primary-500 p-4 rounded-lg">
          <Text className="text-white font-bold text-center">
            🎉 NativeWind is working! 🎉
          </Text>
          <Text className="text-primary-50 text-center mt-2">
            Tailwind CSS classes are being applied correctly
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
