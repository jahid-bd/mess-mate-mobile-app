import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeVariants = {
  default: 'bg-gray-100 border-gray-200',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
  error: 'bg-error/10 border-error/20',
  info: 'bg-info/10 border-info/20',
  secondary: 'bg-secondary-100 border-secondary-200',
};

const badgeSizes = {
  sm: 'px-2 py-1',
  md: 'px-3 py-1.5',
  lg: 'px-4 py-2',
};

const textVariants = {
  default: 'text-gray-700',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
  secondary: 'text-secondary-700',
};

const textSizes = {
  sm: 'text-xs font-medium',
  md: 'text-sm font-medium',
  lg: 'text-base font-medium',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <View
      className={cn(
        'rounded-full border self-start',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      <Text className={cn(textVariants[variant], textSizes[size])}>
        {children}
      </Text>
    </View>
  );
}
