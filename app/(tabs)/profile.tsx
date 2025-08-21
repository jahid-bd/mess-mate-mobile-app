import { View, Text, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
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
import { useAuthStore } from '../../src/stores/authStore';
import { ProfileHeader } from '../../src/components/ProfileHeader';

export default function ProfileScreen() {
  const { colorScheme, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const { user, signOut } = useAuthStore();

  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/signin');
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Custom Header with Logo */}
      <ProfileHeader />
      
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
      {/* Profile Header */}
      <Card style={{ 
        padding: 24, 
        marginBottom: 24,
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary
      }}>
        <View style={{ alignItems: 'center' }}>
          <Avatar size="xl" style={{ backgroundColor: colors.primary[500], marginBottom: 16 }}>
            <AvatarFallbackText style={{ fontSize: 24, color: colors.text.inverse }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallbackText>
          </Avatar>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: colors.text.primary, 
            marginBottom: 4 
          }}>
            {user?.name || 'User'}
          </Text>
          <Text style={{ 
            color: colors.text.secondary, 
            marginBottom: 16 
          }}>
            Active Member • {user?.role || 'USER'}
          </Text>
          <Button action="secondary" variant="outline" size="sm">
            <ButtonText style={{ color: colors.text.secondary }}>Edit Profile</ButtonText>
          </Button>
        </View>
      </Card>

      {/* Profile Info */}
      <Card style={{ 
        padding: 16, 
        marginBottom: 24,
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: colors.text.primary, 
          marginBottom: 16 
        }}>
          Contact Information
        </Text>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Mail size={20} color={colors.icon.muted} />
            <Text style={{ color: colors.text.secondary, marginLeft: 12 }}>
              {user?.email || 'No email'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Phone size={20} color={colors.icon.muted} />
            <Text style={{ color: colors.text.secondary, marginLeft: 12 }}>
              +880 1234 567890
            </Text>
          </View>
        </View>
      </Card>

      {/* Monthly Stats */}
      <Card style={{ 
        padding: 16, 
        marginBottom: 24,
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: colors.text.primary, 
          marginBottom: 16 
        }}>
          This Month Stats
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primary[600] }}>
              23
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary }}>
              Meals
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.secondary[600] }}>
              ৳1,250
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary }}>
              Expenses
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.tertiary[600] }}>
              ৳425
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary }}>
              Per Meal
            </Text>
          </View>
        </View>
      </Card>

      {/* Settings Section */}
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: colors.text.primary, 
        marginBottom: 16 
      }}>
        Settings
      </Text>

      <View style={{ gap: 12, marginBottom: 24 }}>
        {/* Theme Toggle */}
        <Card style={{ 
          padding: 16,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Button 
            action="secondary" 
            variant="link" 
            onPress={toggleTheme}
            style={{ justifyContent: 'space-between', padding: 0 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              {isDark ? (
                <Sun size={20} color={colors.icon.primary} />
              ) : (
                <Moon size={20} color={colors.icon.primary} />
              )}
              <Text style={{ 
                color: colors.text.primary, 
                marginLeft: 12, 
                flex: 1 
              }}>
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>

        {/* Notifications */}
        <Card style={{ 
          padding: 16,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Button 
            action="secondary" 
            variant="link" 
            style={{ justifyContent: 'space-between', padding: 0 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Bell size={20} color={colors.icon.secondary} />
              <Text style={{ 
                color: colors.text.primary, 
                marginLeft: 12, 
                flex: 1 
              }}>
                Notifications
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>

        {/* Account Settings */}
        <Card style={{ 
          padding: 16,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Button 
            action="secondary" 
            variant="link" 
            style={{ justifyContent: 'space-between', padding: 0 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Settings size={20} color={colors.icon.tertiary} />
              <Text style={{ 
                color: colors.text.primary, 
                marginLeft: 12, 
                flex: 1 
              }}>
                Account Settings
              </Text>
            </View>
            <ChevronRight size={20} color={colors.icon.muted} />
          </Button>
        </Card>

        {/* Help & Support */}
        <Card style={{ 
          padding: 16,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Button 
            action="secondary" 
            variant="link" 
            style={{ justifyContent: 'space-between', padding: 0 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <HelpCircle size={20} color={colors.icon.muted} />
              <Text style={{ 
                color: colors.text.primary, 
                marginLeft: 12, 
                flex: 1 
              }}>
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
        style={{ marginBottom: 24 }}
      >
        <LogOut size={20} color={colors.error[600]} />
        <ButtonText style={{ marginLeft: 8, color: colors.error[600] }}>Logout</ButtonText>
      </Button>

      {/* App Info */}
      <View style={{ alignItems: 'center', paddingVertical: 16, paddingBottom: 40 }}>
        <Text style={{ color: colors.text.tertiary, fontSize: 14 }}>
          MessMate v1.0.0
        </Text>
        <Text style={{ color: colors.text.tertiary, fontSize: 12, marginTop: 4 }}>
          Built with ❤️ for better mess management
        </Text>
      </View>
      </ScrollView>
    </View>
  );
}
