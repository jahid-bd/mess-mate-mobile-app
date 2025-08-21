import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Eye, EyeOff } from 'lucide-react-native';
import { Button } from '../../components/ui/button';
import { Input, InputField, InputSlot } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { MessMateLogo } from '../../src/components/MessMateLogo';
import { authApi } from '../../src/services/api';
import { debugNetworkIssue } from '../../src/utils/networkDebug';

export default function SignInScreen() {
  const colors = useThemeColors();
  const { signIn } = useAuthStore();
  const insets = useSafeAreaInsets();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Call real API
      const authResponse = await authApi.signIn({
        email: formData.email,
        password: formData.password,
      });
      
      // Use AuthContext to sign in (this will fetch user profile and store data)
      await signIn(authResponse.access_token);
      
      // Navigate to main app
      router.replace('/(tabs)');
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message.includes('timeout') || error.message.includes('Network') || error.message.includes('Failed to fetch')) {
        // Run network diagnostics for network errors
        const networkResult = await debugNetworkIssue();
        errorMessage = `Network error: ${networkResult.message}`;
        console.log('Network debug result:', networkResult);
      }
      
      Alert.alert('Sign In Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push('/(auth)/signup');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background.primary
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 24,
          paddingTop: Math.max(24, insets.top + 24),
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <MessMateLogo size="lg" />
          <Text
            style={{
              fontSize: 18,
              color: colors.text.secondary,
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            Welcome back! Sign in to continue managing your meals
          </Text>
        </View>

        <View>
          <View style={{ gap: 20 }}>
            <View>
              <Input
                variant="outline"
                size="lg"
                style={{
                  borderColor: errors.email ? colors.icon.danger : colors.border.primary,
                  backgroundColor: colors.background.primary
                }}
              >
                <InputField
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  style={{ color: colors.text.primary }}
                  placeholderTextColor={colors.text.secondary}
                />
              </Input>
              {errors.email && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.email}
                </Text>
              )}
            </View>

            <View>
              <Input
                variant="outline"
                size="lg"
                style={{
                  borderColor: errors.password ? colors.icon.danger : colors.border.primary,
                  backgroundColor: colors.background.primary
                }}
              >
                <InputField
                  placeholder="Enter your password"
                  value={formData.password}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, password: text }))}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  textContentType="password"
                  style={{ color: colors.text.primary }}
                  placeholderTextColor={colors.text.secondary}
                />
                <InputSlot style={{ paddingRight: 8 }}>
                  <Button
                    variant="link"
                    size="sm"
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      width: 40,
                      height: 40,
                      padding: 0,
                    }}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={colors.border.secondary} />
                    ) : (
                      <Eye size={20} color={colors.icon.secondary} />
                    )}
                  </Button>
                </InputSlot>
              </Input>
              {errors.password && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.password}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSignIn}
              disabled={isLoading}
              style={{
                marginTop: 8,
                backgroundColor: colors.icon.primary,
              }}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: '600' }}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </Button>

            <View style={{ alignItems: 'center', marginTop: 8 }}>
              <Button variant="link">
                <Text style={{ color: colors.icon.secondary }}>
                  Forgot Password?
                </Text>
              </Button>
            </View>
          </View>
        </View>

        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: 24 
        }}>
          <Text style={{ color: colors.text.secondary }}>
            Don&apos;t have an account?{' '}
          </Text>
          <Button 
            variant="link" 
            style={{ padding: 0 }}
            onPress={navigateToSignUp}
          >
            <Text style={{ 
              color: colors.icon.primary, 
              fontWeight: '600'
            }}>
              Sign Up
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
