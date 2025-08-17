import React, { useEffect, useRef, createContext, useContext, useState, useCallback } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  className?: string;
}

const toastVariants = {
  success: 'bg-green-500 border-green-600',
  error: 'bg-red-500 border-red-600',
  warning: 'bg-orange-500 border-orange-600',
  info: 'bg-blue-500 border-blue-600',
};

const toastIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function Toast({
  message,
  type = 'info',
  duration = 4000,
  onHide,
  action,
  className,
}: ToastProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, [fadeAnim, slideAnim, onHide]);

  useEffect(() => {
    // Slide in and fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide after duration
    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeAnim, slideAnim, hideToast]);

  return (
    <Animated.View
      className={cn(
        'absolute top-12 left-4 right-4 rounded-2xl border shadow-large z-50',
        toastVariants[type],
        className
      )}
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        onPress={hideToast}
        className="flex-row items-center p-4"
        activeOpacity={0.9}
      >
        {/* Icon */}
        <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-3">
          <Text className="text-white text-lg font-bold">
            {toastIcons[type]}
          </Text>
        </View>

        {/* Message */}
        <Text className="text-white text-base font-medium flex-1">
          {message}
        </Text>

        {/* Action Button */}
        {action && (
          <TouchableOpacity
            onPress={() => {
              action.onPress();
              hideToast();
            }}
            className="ml-3 bg-white/20 px-3 py-1 rounded-lg"
          >
            <Text className="text-white text-sm font-semibold">
              {action.label}
            </Text>
          </TouchableOpacity>
        )}

        {/* Close button */}
        <TouchableOpacity
          onPress={hideToast}
          className="ml-2 w-6 h-6 items-center justify-center"
        >
          <Text className="text-white/80 text-lg">×</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Toast Context and Provider for global toast management
interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'onHide'>) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback((toastProps: Omit<ToastProps, 'onHide'>) => {
    setToast({
      ...toastProps,
      onHide: () => setToast(null),
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Convenience functions
export function showSuccessToast(message: string) {
  // This would be used with the context provider
  console.log('Success:', message);
}

export function showErrorToast(message: string) {
  // This would be used with the context provider
  console.log('Error:', message);
}
