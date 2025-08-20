import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { MessMateLogo } from './MessMateLogo';
import { useThemeColors } from '../hooks/useThemeColors';

interface HeaderWithLogoProps {
  showNotification?: boolean;
  onNotificationPress?: () => void;
}

export function HeaderWithLogo({ 
  showNotification = true, 
  onNotificationPress 
}: HeaderWithLogoProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      paddingTop: 12 + insets.top,
      backgroundColor: colors.background.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    }}>
      {/* Logo */}
      <MessMateLogo size="sm" showText={false} />
      
      {/* App Name */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.text.primary,
        }}>
          MessMate
        </Text>
        <Text style={{
          fontSize: 12,
          color: colors.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Dashboard
        </Text>
      </View>

      {/* Notification Button */}
      {showNotification && (
        <TouchableOpacity
          onPress={onNotificationPress}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: colors.background.secondary,
          }}
        >
          <Bell size={20} color={colors.icon.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}
