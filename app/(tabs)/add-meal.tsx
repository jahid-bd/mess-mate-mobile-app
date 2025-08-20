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
import { X } from 'lucide-react-native';
import { Button } from '../../components/ui/button';
import { Input, InputField } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { mealApi } from '../../src/api/meals';

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';

export default function AddMealEntry() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  
  const [formData, setFormData] = useState({
    type: 'LUNCH' as MealType,
    amount: '1',
    note: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    type?: string;
    amount?: string;
    note?: string;
    date?: string;
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
};  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.type) {
      newErrors.type = 'Meal type is required';
    }
    
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      newErrors.date = 'Invalid date format';
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
        amount: Number(formData.amount),
        note: formData.note || undefined,
        date: formData.date,
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
          padding: 24,
          paddingTop: Math.max(24, insets.top + 24),
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
            fontSize: 24,
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
            <X size={20} color={colors.icon.secondary} />
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
                        ? colors.icon.primary 
                        : 'transparent',
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
                size="lg"
                style={{
                  borderColor: errors.amount ? colors.icon.danger : colors.border.primary,
                }}
              >
                <InputField
                  placeholder="Enter meal amount (e.g., 1, 0.5)"
                  value={formData.amount}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, amount: text }))}
                  keyboardType="numeric"
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
                Enter 1 for full meal, 0.5 for half meal, etc.
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
              <Input
                variant="outline"
                size="lg"
                style={{
                  borderColor: errors.date ? colors.icon.danger : colors.border.primary,
                }}
              >
                <InputField
                  placeholder="YYYY-MM-DD"
                  value={formData.date}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, date: text }))}
                />
              </Input>
              {errors.date && (
                <Text style={{ color: colors.icon.danger, fontSize: 12, marginTop: 4 }}>
                  {errors.date}
                </Text>
              )}
              <Text style={{
                fontSize: 12,
                color: colors.text.secondary,
                marginTop: 4,
              }}>
                Format: YYYY-MM-DD (e.g., 2025-08-19)
              </Text>
            </View>

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
                size="lg"
              >
                <InputField
                  placeholder="Add any notes about this meal..."
                  value={formData.note}
                  onChangeText={(text: string) => setFormData(prev => ({ ...prev, note: text }))}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </Input>
            </View>

            {/* Action Buttons */}
            <View style={{ gap: 12, marginTop: 8 }}>
              <Button
                onPress={handleSubmit}
                disabled={isLoading}
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
