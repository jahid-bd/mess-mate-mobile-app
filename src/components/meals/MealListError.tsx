import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface MealListErrorProps {
  error?: Error;
  onRetry?: () => void;
}

export function MealListError({ error, onRetry }: MealListErrorProps) {
  const colors = useThemeColors();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
      backgroundColor: colors.background.primary,
    }}>
      <View style={{
        alignItems: 'center',
        backgroundColor: colors.background.primary,
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.border.primary,
        minWidth: 280,
      }}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: colors.error[50],
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <AlertCircle size={32} color={colors.error[500]} />
        </View>

        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text.primary,
          textAlign: 'center',
          marginBottom: 8,
        }}>
          Failed to Load Meals
        </Text>

        <Text style={{
          fontSize: 14,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 20,
          lineHeight: 20,
        }}>
          {error?.message || 'Something went wrong while loading your meal entries. Please try again.'}
        </Text>

        {onRetry && (
          <Button
            action="primary"
            variant="solid"
            onPress={onRetry}
            style={{
              backgroundColor: colors.primary[500],
              paddingHorizontal: 24,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <RefreshCw size={18} color={colors.text.inverse} style={{ marginRight: 8 }} />
            <Text style={{
              color: colors.text.inverse,
              fontWeight: '600',
              fontSize: 16,
            }}>
              Try Again
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
}
