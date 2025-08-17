import React from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  className?: string;
}

export function Loading({
  size = 'large',
  color = '#3B82F6', // primary-500
  text,
  className,
}: LoadingProps) {
  return (
    <View className={cn('items-center justify-center', className)}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-gray-600 text-sm mt-2 text-center">
          {text}
        </Text>
      )}
    </View>
  );
}

// Full-screen loading overlay
export interface LoadingOverlayProps {
  visible?: boolean;
  isVisible?: boolean;
  text?: string;
  size?: 'small' | 'large';
  color?: string;
}

export function LoadingOverlay({
  visible,
  isVisible,
  text = 'Loading...',
  size = 'large',
  color = '#3B82F6',
}: LoadingOverlayProps) {
  const overlayVisible = visible ?? isVisible ?? false;
  
  if (!overlayVisible) return null;

  return (
    <Modal transparent visible={overlayVisible}>
      <View className="flex-1 bg-black/30 items-center justify-center">
        <View className="bg-white rounded-2xl p-8 shadow-large min-w-[120px] items-center">
          <ActivityIndicator size={size} color={color} />
          {text && (
            <Text className="text-gray-700 text-base mt-4 text-center font-medium">
              {text}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

// Inline loading for containers
export interface LoadingContainerProps {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
  minHeight?: number;
  className?: string;
}

export function LoadingContainer({
  children,
  isLoading,
  loadingText = 'Loading...',
  minHeight = 200,
  className,
}: LoadingContainerProps) {
  if (isLoading) {
    return (
      <View 
        className={cn('items-center justify-center', className)}
        style={{ minHeight }}
      >
        <Loading text={loadingText} />
      </View>
    );
  }

  return <>{children}</>;
}

// Loading skeleton for list items
export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = 20,
  className,
}: SkeletonProps) {
  return (
    <View
      className={cn('bg-gray-200 rounded animate-pulse', className)}
      style={{ width: width as any, height }}
    />
  );
}

// Skeleton for cards
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <View className={cn('bg-white rounded-2xl p-4 shadow-medium', className)}>
      <Skeleton height={24} width="60%" className="mb-3" />
      <Skeleton height={16} width="100%" className="mb-2" />
      <Skeleton height={16} width="80%" className="mb-4" />
      <View className="flex-row space-x-2">
        <Skeleton height={32} width={80} className="rounded-lg" />
        <Skeleton height={32} width={60} className="rounded-lg" />
      </View>
    </View>
  );
}
