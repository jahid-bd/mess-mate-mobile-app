import { useFonts } from 'expo-font';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';
import { QueryProvider } from '../src/providers/QueryProvider';
import 'react-native-reanimated';
import '../global.css';

function AppContent() {
  const { colorScheme } = useTheme();
  
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} hidden={false} />
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider>
        <GluestackUIProvider>
          <AppContent />
        </GluestackUIProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
