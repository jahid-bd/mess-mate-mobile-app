import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface CloseButtonProps {
  onPress: () => void;
  size?: number;
  style?: any;
}

export function CloseButton({ onPress, size = 24, style }: CloseButtonProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.closeButton,
        {
          backgroundColor: colors.background.secondary,
          borderColor: colors.border.primary,
        },
        style
      ]}
      activeOpacity={0.7}
    >
      <X size={size} color={colors.icon.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
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
});
