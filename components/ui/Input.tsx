import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  className?: string;
  inputClassName?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon,
  rightIcon,
  onRightIconPress,
  className,
  inputClassName,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('mb-4', className)}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-base">
          {label}
        </Text>
      )}
      
      <View
        className={cn(
          'border rounded-xl bg-white flex-row items-center',
          isFocused 
            ? 'border-primary-500 shadow-soft' 
            : error 
            ? 'border-error' 
            : 'border-gray-200',
          disabled && 'bg-gray-50 opacity-60',
          multiline ? 'py-3' : 'py-4',
          'px-4'
        )}
      >
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          editable={!disabled}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'flex-1 text-gray-900 text-base',
            multiline && 'min-h-[80px] text-top',
            inputClassName
          )}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="ml-3"
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-error text-sm mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
