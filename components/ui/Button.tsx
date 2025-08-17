import { cn } from '../../src/utils/cn';
import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';


export interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const buttonVariants = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-secondary-500 active:bg-secondary-600',
  outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
  ghost: 'bg-transparent active:bg-gray-100',
  danger: 'bg-error active:bg-red-600',
};

const buttonSizes = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const textVariants = {
  primary: 'text-white font-semibold',
  secondary: 'text-white font-semibold',
  outline: 'text-primary-500 font-semibold',
  ghost: 'text-gray-700 font-medium',
  danger: 'text-white font-semibold',
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  children,
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  leftIcon,
  rightIcon,
  iconPosition = 'left',
  fullWidth = false,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonText = title || children;
  const displayLeftIcon = leftIcon || (icon && iconPosition === 'left');
  const displayRightIcon = rightIcon || (icon && iconPosition === 'right');

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        'rounded-xl flex-row items-center justify-center',
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50',
        className
      )}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#0ea5e9' : '#ffffff'} 
        />
      ) : (
        <View className="flex-row items-center">
          {displayLeftIcon && (
            <View className="mr-2">{displayLeftIcon}</View>
          )}
          <Text className={cn(textVariants[variant], textSizes[size])}>
            {buttonText}
          </Text>
          {displayRightIcon && (
            <View className="ml-2">{displayRightIcon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
