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

export default function SignUpScreen() {
  const colors = useThemeColors();
  const { signIn } = useAuthStore();
  const insets = useSafeAreaInsets();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Call real API
      const authResponse = await authApi.signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      
      // Use AuthContext to sign in (this will fetch user profile and store data)
      await signIn(authResponse.access_token);
      
      // Navigate to main app
      router.replace('/(tabs)');
      
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.message.includes('403') || error.message.includes('already exists')) {
        errorMessage = 'User already exists with this email';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message.includes('timeout') || error.message.includes('Network') || error.message.includes('Failed to fetch')) {
        // Run network diagnostics for network errors
        const networkResult = await debugNetworkIssue();
        errorMessage = `Network error: ${networkResult.message}`;
        console.log('Network debug result:', networkResult);
      }
      
      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignIn = () => {
    router.push('/(auth)/signin');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
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
            Create your account to start managing meals together
          </Text>
        </View>

        <View>
          <View style={{ gap: 20 }}>
            <View>
              <Input
                variant="outline"
                size="lg"
                style={{
                  borderColor: errors.name ? colors.icon.danger : colors.border.primary,
                  backgroundColor: colors.background.primary
                }}
              >
                <InputField
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, name: text }))}
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  style={{ color: colors.text.primary }}
                  placeholderTextColor={colors.text.secondary}
                />
              </Input>
              {errors.name && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.name}
                </Text>
              )}
            </View>

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
                  placeholder="Create a password"
                  value={formData.password}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, password: text }))}
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
                  textContentType="newPassword"
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
                      <EyeOff size={20} color={colors.icon.secondary} />
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

            <View>
              <Input
                variant="outline"
                size="lg"
                style={{
                  borderColor: errors.confirmPassword ? colors.icon.danger : colors.border.primary,
                  backgroundColor: colors.background.primary
                }}
              >
                <InputField
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  style={{ color: colors.text.primary }}
                  placeholderTextColor={colors.text.secondary}
                />
                <InputSlot style={{ paddingRight: 8 }}>
                  <Button
                    variant="link"
                    size="sm"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      width: 40,
                      height: 40,
                      padding: 0,
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={colors.icon.secondary} />
                    ) : (
                      <Eye size={20} color={colors.icon.secondary} />
                    )}
                  </Button>
                </InputSlot>
              </Input>
              {errors.confirmPassword && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <Button
              onPress={handleSignUp}
              disabled={isLoading}
              style={{
                marginTop: 8,
                backgroundColor: colors.icon.primary,
              }}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: '600' }}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </Button>
          </View>
        </View>

        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: 24 
        }}>
          <Text style={{ color: colors.text.secondary }}>
            Already have an account?{' '}
          </Text>
          <Button 
            variant="link" 
            style={{ padding: 0 }}
            onPress={navigateToSignIn}
          >
            <Text style={{ 
              color: colors.icon.primary, 
              fontWeight: '600'
            }}>
              Sign In
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
