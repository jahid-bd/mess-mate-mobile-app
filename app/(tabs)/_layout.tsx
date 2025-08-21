import { Tabs } from 'expo-router';
import { Home, UtensilsCrossed, DollarSign, User } from 'lucide-react-native';
import { View } from 'react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useThemeColors } from '../../src/hooks/useThemeColors';

function TabBarIcon({ Icon, color, focused }: { Icon: any; color: string; focused: boolean }) {
  return (
    <View className="items-center justify-center">
      <Icon 
        size={24} 
        color={color} 
        strokeWidth={focused ? 2.5 : 2}
      />
    </View>
  );
}

export default function TabLayout() {
  const colors = useThemeColors();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.icon.muted,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopWidth: isDark ? 0 : 1,
          borderTopColor: isDark ? 'transparent' : colors.border.primary,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          elevation: isDark ? 0 : 4,
          shadowOpacity: isDark ? 0 : 0.05,
          shadowRadius: isDark ? 0 : 4,
          shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: -2 },
          shadowColor: '#000',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: colors.background.primary,
          borderBottomWidth: 1,
          borderBottomColor: colors.border.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Home} color={color} focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={UtensilsCrossed} color={color} focused={focused} />
          ),
          headerTitle: 'Meal Entries',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={DollarSign} color={color} focused={focused} />
          ),
          headerTitle: 'Expense Tracking',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={User} color={color} focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="add-meal"
        options={{
          href: null, // Hide from tab bar
          headerTitle: 'Add Meal Entry',
           headerShown: false,
        }}
      />
    </Tabs>
  );
}
