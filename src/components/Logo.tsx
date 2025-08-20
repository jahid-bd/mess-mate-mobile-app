import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Utensils } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const colors = useThemeColors();

  const sizes = {
    sm: { icon: 20, text: 16, container: 32 },
    md: { icon: 24, text: 18, container: 40 },
    lg: { icon: 32, text: 24, container: 56 },
  };

  const currentSize = sizes[size];

  return (
    <View style={styles.container}>
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: colors.primary[500],
          width: currentSize.container,
          height: currentSize.container,
          borderRadius: currentSize.container / 2,
        }
      ]}>
        <Utensils size={currentSize.icon} color={colors.text.inverse} />
      </View>
      {showText && (
        <Text style={[
          styles.text,
          {
            fontSize: currentSize.text,
            color: colors.text.primary,
          }
        ]}>
          MealTracker
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});
