import React from 'react';
import { View } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface MealListSkeletonProps {
  itemCount?: number;
}

export function MealListSkeleton({ itemCount = 6 }: MealListSkeletonProps) {
  const colors = useThemeColors();

  const SkeletonItem = () => (
    <View style={{
      marginHorizontal: 16,
      marginBottom: 12,
      padding: 16,
      backgroundColor: colors.background.primary,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
    }}>
      {/* Meal type and amount skeleton */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: colors.background.secondary,
          marginRight: 8,
        }} />
        <View style={{
          width: 80,
          height: 20,
          borderRadius: 4,
          backgroundColor: colors.background.secondary,
          marginRight: 8,
        }} />
        <View style={{
          width: 60,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors.background.secondary,
        }} />
      </View>

      {/* User info skeleton */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <View style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: colors.background.secondary,
          marginRight: 6,
        }} />
        <View style={{
          width: 120,
          height: 16,
          borderRadius: 4,
          backgroundColor: colors.background.secondary,
        }} />
      </View>

      {/* Date skeleton */}
      <View style={{
        width: 100,
        height: 14,
        borderRadius: 4,
        backgroundColor: colors.background.secondary,
        marginBottom: 4,
      }} />

      {/* Note skeleton */}
      <View style={{
        width: 200,
        height: 12,
        borderRadius: 4,
        backgroundColor: colors.background.secondary,
        marginTop: 4,
      }} />
    </View>
  );

  const SkeletonHeader = () => (
    <View style={{
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.background.primary,
    }}>
      <View style={{
        width: 180,
        height: 16,
        borderRadius: 4,
        backgroundColor: colors.background.secondary,
      }} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Statistics skeleton */}
      <View style={{ padding: 16 }}>
        <View style={{
          backgroundColor: colors.background.primary,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border.primary,
          marginBottom: 16,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{
              width: 60,
              height: 40,
              borderRadius: 4,
              backgroundColor: colors.background.secondary,
            }} />
            <View style={{
              width: 60,
              height: 40,
              borderRadius: 4,
              backgroundColor: colors.background.secondary,
            }} />
            <View style={{
              width: 60,
              height: 40,
              borderRadius: 4,
              backgroundColor: colors.background.secondary,
            }} />
            <View style={{
              width: 60,
              height: 40,
              borderRadius: 4,
              backgroundColor: colors.background.secondary,
            }} />
          </View>
        </View>

        {/* Header actions skeleton */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{
            width: 100,
            height: 40,
            borderRadius: 8,
            backgroundColor: colors.background.secondary,
          }} />
          <View style={{
            width: 80,
            height: 40,
            borderRadius: 8,
            backgroundColor: colors.background.secondary,
          }} />
        </View>
      </View>

      {/* Date header skeleton */}
      <SkeletonHeader />
      
      {/* Meal items skeleton */}
      {Array.from({ length: itemCount }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
}
