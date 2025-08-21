import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/ui/button';
import { Input, InputField } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { useActiveUsersQuery } from '../../src/hooks/useUsersQuery';
import { useUpdateMealMutation } from '../../src/hooks/useMealMutations';
import { mealApi } from '../../src/api/meals';
import { DatePicker } from '../../src/components/DatePicker';
import { UserSelector } from '../../src/components/UserSelector';
import { HeaderWithLogo } from '@/src/components/HeaderWithLogo';
import { Toast } from '../../src/components/Toast';
import { X } from 'lucide-react-native';

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';

export default function AddMealEntry() {
  const colors = useThemeColors();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  const params = useLocalSearchParams();
  
  // Check if we're in edit mode
  const isEditMode = !!params.id && params.mode === 'edit';
  const mealId = params.id ? parseInt(params.id as string, 10) : null;
  
  // Fetch active users for admin
  const { data: activeUsers = [], isLoading: usersLoading } = useActiveUsersQuery();
  
  // Mutation hooks
  const updateMealMutation = useUpdateMealMutation();
  
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
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });

  // Load meal data in edit mode
  useEffect(() => {
    if (isEditMode && params.id) {
      // Format date properly for edit mode
      let dateString = (params.date as string) || new Date().toISOString().split('T')[0];
      
      // Ensure date is in YYYY-MM-DD format
      if (dateString && dateString.length > 10) {
        // If it's a full ISO string, extract just the date part
        dateString = dateString.split('T')[0];
      }
      
      // Validate and fix the date format
      if (dateString && !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        console.warn('Invalid date format received:', dateString);
        dateString = new Date().toISOString().split('T')[0];
      }
      
      const loadedData = {
        type: (params.type as MealType) || 'LUNCH',
        amount: params.amount ? parseInt(params.amount as string, 10) : 1,
        note: params.note ? decodeURIComponent(params.note as string) : '',
        date: dateString,
        userId: params.userId ? parseInt(params.userId as string, 10) : user?.id || null,
      };
      
      console.log('Loading edit data:', loadedData); // Debug log
      setFormData(loadedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, mealId]); // Only depend on edit mode and meal ID

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

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
    } else {
      // More robust date validation
      console.log('Validating date:', formData.date); // Debug log
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.date)) {
        console.warn('Date regex failed for:', formData.date); // Debug log
        newErrors.date = 'Invalid date format';
      } else {
        // Check if it's a valid date
        const testDate = new Date(formData.date);
        if (isNaN(testDate.getTime()) || testDate.toISOString().split('T')[0] !== formData.date) {
          console.warn('Date validation failed for:', formData.date); // Debug log
          newErrors.date = 'Invalid date';
        }
      }
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
      if (isEditMode && mealId) {
        // Update existing meal
        await updateMealMutation.mutateAsync({
          id: mealId,
          data: {
            type: formData.type,
            amount: formData.amount,
            note: formData.note || undefined,
            date: formData.date,
            userId: isAdmin ? formData.userId || undefined : undefined,
          }
        });
        
        showToast('Meal entry updated successfully!', 'success');
        
        // Navigate after a brief delay to show the toast
        setTimeout(() => {
          router.push('/(tabs)/meals');
        }, 1500);
      } else {
        // Create new meal
        await mealApi.createMealEntry({
          type: formData.type,
          amount: formData.amount,
          note: formData.note || undefined,
          date: formData.date,
          userId: isAdmin ? formData.userId || undefined : undefined,
        });
        
        // Reset form data for create mode
        setFormData({
          type: 'LUNCH' as MealType,
          amount: 1,
          note: '',
          date: new Date().toISOString().split('T')[0],
          userId: user?.id || null,
        });
        
        // Clear any errors
        setErrors({});
        
        showToast('Meal entry added successfully!', 'success');
        
        // Navigate after a brief delay to show the toast
        setTimeout(() => {
          router.push('/(tabs)/meals');
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error saving meal entry:', error);
      showToast(
        error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} meal entry. Please try again.`,
        'error'
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
      <HeaderWithLogo title={isEditMode ? 'Edit Meal Entry' : 'Add Meal Entry'} />
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
            {isEditMode ? 'Edit Meal Entry' : 'Add Meal Entry'}
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
                  {isLoading ? (isEditMode ? 'Updating Meal...' : 'Adding Meal...') : (isEditMode ? 'Update Meal Entry' : 'Add Meal Entry')}
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

      {/* Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </KeyboardAvoidingView>
  );
}
