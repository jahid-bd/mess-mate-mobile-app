import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const cardVariants = {
  default: 'bg-white rounded-2xl',
  elevated: 'bg-white rounded-2xl shadow-medium',
  outlined: 'bg-white rounded-2xl border border-gray-200',
  gradient: 'bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl',
};

const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  title,
  subtitle,
  variant = 'elevated',
  padding = 'md',
  className,
}: CardProps) {
  const isGradient = variant === 'gradient';
  
  return (
    <View className={cn(cardVariants[variant], cardPadding[padding], className)}>
      {(title || subtitle) && (
        <View className="mb-4">
          {title && (
            <Text className={cn(
              'text-xl font-bold mb-1',
              isGradient ? 'text-white' : 'text-gray-900'
            )}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className={cn(
              'text-sm',
              isGradient ? 'text-primary-100' : 'text-gray-600'
            )}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}
