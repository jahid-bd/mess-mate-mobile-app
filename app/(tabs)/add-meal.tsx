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
import { Button } from '../../components/ui/button';
import { Input, InputField } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { useActiveUsersQuery } from '../../src/hooks/useUsersQuery';
import { mealApi } from '../../src/api/meals';
import { DatePicker } from '../../src/components/DatePicker';
import { UserSelector } from '../../src/components/UserSelector';
import { ProfileHeader } from '@/src/components/ProfileHeader';
import { HeaderWithLogo } from '@/src/components/HeaderWithLogo';
import { X } from 'lucide-react-native';

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';

export default function AddMealEntry() {
  const colors = useThemeColors();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  
  // Fetch active users for admin
  const { data: activeUsers = [], isLoading: usersLoading } = useActiveUsersQuery();
  
  const [formData, setFormData] = useState({
    type: 'LUNCH' as MealType,
    amount: 1, // Changed to integer
    note: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    userId: user?.id || null, // Default to current user
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    type?: string;
    amount?: string;
    note?: string;
    date?: string;
    userId?: string;
  }>({});

const mealTypes: { label: string; value: MealType }[] = [
  { label: 'Breakfast', value: 'BREAKFAST' },
  { label: 'Lunch', value: 'LUNCH' },
  { label: 'Dinner', value: 'DINNER' },
  { label: 'Sehri', value: 'SHAHUR' },
];

const getMealEmoji = (type: MealType): string => {
  switch (type) {
    case 'BREAKFAST':
      return '🌅';
    case 'LUNCH':
      return '☀️';
    case 'DINNER':
      return '🌙';
    case 'SHAHUR':
      return '🌃';
    default:
      return '🍽️';
  }
};

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.type) {
      newErrors.type = 'Meal type is required';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      newErrors.date = 'Invalid date format';
    }

    if (isAdmin && !formData.userId) {
      newErrors.userId = 'Please select a user';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await mealApi.createMealEntry({
        type: formData.type,
        amount: formData.amount,
        note: formData.note || undefined,
        date: formData.date,
        userId: isAdmin ? formData.userId || undefined : undefined,
      });
      
      Alert.alert(
        'Success',
        'Meal entry added successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error('Error creating meal entry:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add meal entry. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const numericText = text.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(numericText) || 0;
    setFormData(prev => ({ ...prev, amount: numValue }));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Custom Header with Logo */}
            <HeaderWithLogo title='Add Meal Entry' />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          paddingTop: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
           {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: colors.text.primary,
          }}>
            Add Meal Entry
          </Text>
          <Button
            variant="outline"
            size="sm"
            onPress={handleCancel}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          >
            <X size={20} color={colors.error[500]} />
          </Button>
        </View>
        <Card style={{ padding: 24 }}>
          <View style={{ gap: 24 }}>
            {/* Meal Type Selection */}
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 12,
              }}>
                Meal Type
              </Text>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
              }}>
                {mealTypes.map((mealType) => (
                  <Button
                    key={mealType.value}
                    variant={formData.type === mealType.value ? "solid" : "outline"}
                    size="md"
                    onPress={() => setFormData(prev => ({ ...prev, type: mealType.value }))}
                    style={{
                      flex: 1,
                      minWidth: '45%',
                      backgroundColor: formData.type === mealType.value 
                        ? colors.primary[500] 
                        : 'transparent',
                      borderColor: formData.type === mealType.value 
                        ? colors.primary[500] 
                        : colors.border.primary,
                    }}
                  >
                    <Text style={{
                      color: formData.type === mealType.value 
                        ? colors.text.inverse 
                        : colors.text.primary,
                      fontWeight: '500',
                    }}>
                      {getMealEmoji(mealType.value)} {mealType.label}
                    </Text>
                  </Button>
                ))}
              </View>
              {errors.type && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.type}
                </Text>
              )}
            </View>

            {/* Amount */}
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 8,
              }}>
                Amount
              </Text>
              <Input
                variant="outline"
               
                style={{
                  borderColor: errors.amount ? colors.icon.danger : colors.border.primary,
                }}
              >
                <InputField
                  placeholder="Enter meal amount (e.g., 1, 2)"
                  value={formData.amount.toString()}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                  style={{
                    fontSize: 16,
                   
                  }}
                  size='xl'
                />
              </Input>
              {errors.amount && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.amount}
                </Text>
              )}
              <Text style={{
                fontSize: 12,
                color: colors.text.secondary,
                marginTop: 4,
              }}>
                Enter the number of meals (e.g., 1, 2)
              </Text>
            </View>

            {/* Date */}
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 8,
              }}>
                Date
              </Text>
              <DatePicker
                value={formData.date}
                onDateChange={(date) => setFormData(prev => ({ ...prev, date }))}
                placeholder="Select date"
                error={errors.date}
              />
            </View>

            {/* User Selection (Admin Only) */}
            {isAdmin && (
              <View>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text.primary,
                  marginBottom: 8,
                }}>
                  User
                </Text>
                <UserSelector
                  users={activeUsers}
                  selectedUserId={formData.userId}
                  onUserSelect={(userId) => setFormData(prev => ({ ...prev, userId }))}
                  placeholder="Select user"
                  error={errors.userId}
                  currentUserId={user?.id}
                  showCurrentUserFirst={true}
                />
                <Text style={{
                  fontSize: 12,
                  color: colors.text.secondary,
                  marginTop: 4,
                }}>
                  Select which user this meal entry is for
                </Text>
              </View>
            )}

            {/* Note (Optional) */}
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.text.primary,
                marginBottom: 8,
              }}>
                Note (Optional)
              </Text>
              <Input
                variant="outline"
                size="md"
              >
                <InputField
                  placeholder="Add any notes about this meal..."
                  value={formData.note}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, note: text }))}
                  // multiline
                  // numberOfLines={3}
                  // textAlignVertical="top"
                  // style={{
                  //   fontSize: 16,
                  //   paddingVertical: 14,
                  //   minHeight: 80,
                  // }}
                />
              </Input>
            </View>

            {/* Action Buttons */}
            <View style={{ gap: 12, marginTop: 8 }}>
              <Button
                onPress={handleSubmit}
                disabled={isLoading || usersLoading}
                style={{
                   backgroundColor: colors.icon.primary,
                
                }}
              >
                <Text style={{ 
                  color: colors.text.inverse, 
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                  {isLoading ? 'Adding Meal...' : 'Add Meal Entry'}
                </Text>
              </Button>

              <Button
                variant="outline"
                onPress={handleCancel}
                disabled={isLoading}
                // style={{
                //   borderColor: colors.border.primary,
                //   paddingVertical: 16,
                //   backgroundColor: 'transparent',
                // }}
              >
                <Text style={{ 
                  color: colors.text.primary, 
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                  Cancel
                </Text>
              </Button>
            </View>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
