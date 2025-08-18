import { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Spinner } from '../components/ui/spinner';
import { useAuthStore } from '../src/stores/authStore';
import { useThemeColors } from '../src/hooks/useThemeColors';

export default function Index() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const colors = useThemeColors();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/signin');
      }
    }
  }, [isAuthenticated, isLoading]);

  // Show loading spinner while checking auth
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.primary,
    }}>
      <Spinner size="large" color={colors.icon.primary} />
    </View>
  );
}
