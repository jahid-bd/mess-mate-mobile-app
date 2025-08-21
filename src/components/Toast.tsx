import React, { useEffect, useRef, useCallback } from 'react';
import {
  Animated,
  Text,
  View,
} from 'react-native';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
}

export function Toast({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
}: ToastProps) {
  const colors = useThemeColors();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, [opacity, translateY, onHide]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, hideToast, opacity, translateY]);

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color={colors.success[600]} />;
      case 'error':
        return <XCircle size={20} color={colors.error[600]} />;
      case 'warning':
        return <AlertCircle size={20} color={colors.warning[600]} />;
      case 'info':
      default:
        return <Info size={20} color={colors.primary[600]} />;
    }
  };

  const getToastColors = () => {
    switch (type) {
      case 'success':
        return {
          background: colors.success[50],
          border: colors.success[500],
          text: colors.success[700],
        };
      case 'error':
        return {
          background: colors.error[50],
          border: colors.error[500],
          text: colors.error[700],
        };
      case 'warning':
        return {
          background: colors.warning[50],
          border: colors.warning[500],
          text: colors.warning[700],
        };
      case 'info':
      default:
        return {
          background: colors.primary[50],
          border: colors.primary[500],
          text: colors.primary[700],
        };
    }
  };

  const toastColors = getToastColors();

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        zIndex: 9999,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <View
        style={{
          backgroundColor: toastColors.background,
          borderWidth: 1,
          borderColor: toastColors.border,
          borderRadius: 12,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {getToastIcon()}
        <Text
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 14,
            fontWeight: '500',
            color: toastColors.text,
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
