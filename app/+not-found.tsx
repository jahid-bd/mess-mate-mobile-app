import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-gray-50">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          This screen does not exist.
        </Text>
        <Link href="/" className="mt-4 py-4 px-6 bg-primary-500 rounded-lg">
          <Text className="text-white font-semibold">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
