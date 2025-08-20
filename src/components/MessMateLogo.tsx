import React from 'react';
import { View, Text } from 'react-native';
import { Utensils, Users } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export function MessMateLogo({ size = 'md', showText = true }: LogoProps) {
  const colors = useThemeColors();
  
  const sizes = {
    sm: { container: 40, icon: 20, text: 14 },
    md: { container: 60, icon: 30, text: 18 },
    lg: { container: 80, icon: 40, text: 24 },
    xl: { container: 120, icon: 60, text: 32 },
  };
  
  const currentSize = sizes[size];

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Logo Icon Container */}
      <View
        style={{
          width: currentSize.container,
          height: currentSize.container,
          borderRadius: currentSize.container / 2,
          backgroundColor: colors.icon.primary,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          shadowColor: colors.icon.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {/* Main Utensils Icon */}
        <Utensils 
          size={currentSize.icon} 
          color={colors.text.inverse}
          strokeWidth={2.5}
        />
        
        {/* Small Users Icon - positioned as accent */}
        <View
          style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            backgroundColor: colors.icon.secondary,
            borderRadius: 12,
            padding: 4,
            borderWidth: 2,
            borderColor: colors.background.primary,
          }}
        >
          <Users 
            size={currentSize.icon * 0.4} 
            color={colors.text.inverse}
            strokeWidth={2.5}
          />
        </View>
      </View>
      
      {/* Logo Text */}
      {showText && (
        <View style={{ marginTop: 12, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: currentSize.text,
              fontWeight: 'bold',
              color: colors.text.primary,
              letterSpacing: 0.5,
            }}
          >
            MessMate
          </Text>
          <Text
            style={{
              fontSize: currentSize.text * 0.5,
              color: colors.text.secondary,
              marginTop: 2,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Meal Management
          </Text>
        </View>
      )}
    </View>
  );
}
