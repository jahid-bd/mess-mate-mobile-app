import React, { forwardRef } from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { cn } from '../../src/utils/cn';
import { Button } from './Button';

export interface ModalProps {
  visible?: boolean;
  isVisible?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

const modalSizes = {
  sm: 'max-w-sm w-full',
  md: 'max-w-md w-full',
  lg: 'max-w-lg w-full',
  full: 'w-full h-full',
};

export const Modal = forwardRef<View, ModalProps>(({
  visible,
  isVisible,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  actions,
  className,
}, ref) => {
  const modalVisible = visible ?? isVisible ?? false;
  const isFullSize = size === 'full';

  return (
    <RNModal
      visible={modalVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <Pressable
          className="absolute inset-0"
          onPress={closeOnBackdrop ? onClose : undefined}
        />
        
        <View
          ref={ref}
          className={cn(
            'bg-white rounded-3xl shadow-large',
            !isFullSize && modalSizes[size],
            isFullSize && 'flex-1 rounded-none',
            className
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <View className="flex-row items-center justify-between p-6 border-b border-gray-100">
              <Text className="text-xl font-bold text-gray-900 flex-1 pr-4">
                {title}
              </Text>
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
                >
                  <Text className="text-gray-600 text-lg font-medium">×</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View className="p-6">
              {children}
            </View>
          </ScrollView>

          {/* Actions */}
          {actions && (
            <View className="p-6 border-t border-gray-100">
              {actions}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
});

Modal.displayName = 'Modal';

// Convenience wrapper for alert-style modals
export interface AlertModalProps {
  visible?: boolean;
  isVisible?: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  variant?: 'default' | 'danger';
}

export function AlertModal({
  visible,
  isVisible,
  onClose,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'default',
}: AlertModalProps) {
  const modalVisible = visible ?? isVisible ?? false;
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      visible={modalVisible}
      onClose={onClose}
      title={title}
      size="sm"
      actions={
        <View className="flex-row space-x-3">
          <Button
            title={cancelText}
            variant="ghost"
            onPress={onClose}
            className="flex-1"
          />
          <Button
            title={confirmText}
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onPress={handleConfirm}
            className="flex-1"
          />
        </View>
      }
    >
      <Text className="text-gray-700 text-base leading-relaxed">
        {message}
      </Text>
    </Modal>
  );
}
