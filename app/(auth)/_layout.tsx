import { Stack } from 'expo-router';
import { useThemeColors } from '../../src/hooks/useThemeColors';

export default function AuthLayout() {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="signin"
        options={{
          title: 'Sign In',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
