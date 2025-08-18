import { View, Text, ScrollView, Alert } from 'react-native';
import { ButtonText, Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallbackText } from '../../components/ui/avatar';
import { 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Sun, 
  Moon,
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useThemeColors } from '../../src/hooks/useThemeColors';

export default function ProfileScreen() {
  const { colorScheme, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-background-0 px-4 py-6">
      {/* Profile Header */}
      <Card className="p-6 mb-6">
        <View className="items-center">
          <Avatar size="xl" className="bg-primary-500 mb-4">
            <AvatarFallbackText className="text-2xl">JD</AvatarFallbackText>
          </Avatar>
          <Text className="text-2xl font-bold text-typography-900 mb-1">
            John Doe
          </Text>
          <Text className="text-typography-600 mb-4">
            Active Member • Joined Aug 2024
          </Text>
          <Button action="secondary" variant="outline" size="sm">
            <ButtonText>Edit Profile</ButtonText>
          </Button>
        </View>
      </Card>

      {/* Profile Info */}
      <Card className="p-4 mb-6">
        <Text className="text-lg font-bold text-typography-900 mb-4">
          Contact Information
        </Text>
        <View className="space-y-3">
          <View className="flex-row items-center">
            <Mail size={20} color={colors.icon.muted} />
            <Text className="text-typography-700 ml-3">john.doe@email.com</Text>
          </View>
          <View className="flex-row items-center">
            <Phone size={20} color={colors.icon.muted} />
            <Text className="text-typography-700 ml-3">+880 1234 567890</Text>
          </View>
        </View>
      </Card>

      {/* Monthly Stats */}
      <Card className="p-4 mb-6">
        <Text className="text-lg font-bold text-typography-900 mb-4">
          This Month Stats
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary-600">23</Text>
            <Text className="text-sm text-typography-600">Meals</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-secondary-600">৳1,250</Text>
            <Text className="text-sm text-typography-600">Expenses</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-tertiary-600">৳425</Text>
            <Text className="text-sm text-typography-600">Per Meal</Text>
          </View>
        </View>
      </Card>

      {/* Settings Section */}
      <Text className="text-xl font-bold text-typography-900 mb-4">
        Settings
      </Text>

      <View className="space-y-3 mb-6">
        {/* Theme Toggle */}
        <Card className="p-4">
          <Button 
            action="secondary" 
            variant="link" 
            onPress={toggleTheme}
            className="justify-between p-0"
          >
            <View className="flex-row items-center flex-1">
              {isDark ? (
                <Sun size={20} color={colors.icon.primary} />
              ) : (
                <Moon size={20} color={colors.icon.primary} />
              )}
              <Text className="text-typography-900 ml-3 flex-1">
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>

        {/* Notifications */}
        <Card className="p-4">
          <Button 
            action="secondary" 
            variant="link" 
            className="justify-between p-0"
          >
            <View className="flex-row items-center flex-1">
              <Bell size={20} color={colors.icon.secondary} />
              <Text className="text-typography-900 ml-3 flex-1">
                Notifications
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>

        {/* Account Settings */}
        <Card className="p-4">
          <Button 
            action="secondary" 
            variant="link" 
            className="justify-between p-0"
          >
            <View className="flex-row items-center flex-1">
              <Settings size={20} color={colors.icon.tertiary} />
              <Text className="text-typography-900 ml-3 flex-1">
                Account Settings
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>

        {/* Help & Support */}
        <Card className="p-4">
          <Button 
            action="secondary" 
            variant="link" 
            className="justify-between p-0"
          >
            <View className="flex-row items-center flex-1">
              <HelpCircle size={20} color={colors.icon.muted} />
              <Text className="text-typography-900 ml-3 flex-1">
                Help & Support
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>
      </View>

      {/* Logout Button */}
      <Button 
        action="negative" 
        variant="outline" 
        onPress={handleLogout}
        className="mb-6"
      >
        <LogOut size={20} color={colors.error[600]} />
        <ButtonText className="ml-2">Logout</ButtonText>
      </Button>

      {/* App Info */}
      <View className="items-center py-4">
        <Text className="text-typography-500 text-sm">
          MessMate v1.0.0
        </Text>
        <Text className="text-typography-400 text-xs mt-1">
          Built with ❤️ for better mess management
        </Text>
      </View>
    </ScrollView>
  );
}
