import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface AvatarProps {
  source?: ImageSourcePropType;
  uri?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circular' | 'rounded' | 'square';
  className?: string;
  textClassName?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const avatarSizes = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-20 h-20',
};

const avatarVariants = {
  circular: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
};

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const statusColors = {
  online: 'bg-success',
  offline: 'bg-gray-400',
  away: 'bg-warning',
  busy: 'bg-error',
};

const statusSizes = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
  '2xl': 'w-4 h-4',
};

export function Avatar({
  source,
  uri,
  initials,
  size = 'md',
  variant = 'circular',
  className,
  textClassName,
  status,
}: AvatarProps) {
  const imageSource = uri ? { uri } : source;

  const renderContent = () => {
    if (imageSource) {
      return (
        <Image
          source={imageSource}
          className={cn(
            'w-full h-full',
            avatarVariants[variant]
          )}
          resizeMode="cover"
        />
      );
    }

    if (initials) {
      return (
        <View className={cn(
          'w-full h-full items-center justify-center bg-primary-100',
          avatarVariants[variant]
        )}>
          <Text className={cn(
            'font-semibold text-primary-700',
            textSizes[size],
            textClassName
          )}>
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      );
    }

    // Default placeholder
    return (
      <View className={cn(
        'w-full h-full items-center justify-center bg-gray-200',
        avatarVariants[variant]
      )}>
        <Text className={cn(
          'font-semibold text-gray-500',
          textSizes[size],
          textClassName
        )}>
          ?
        </Text>
      </View>
    );
  };

  return (
    <View className={cn('relative', avatarSizes[size], className)}>
      {renderContent()}
      
      {status && (
        <View
          className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white',
            statusColors[status],
            statusSizes[size]
          )}
        />
      )}
    </View>
  );
}

// Avatar Group Component
export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

const spacingStyles = {
  tight: '-space-x-1',
  normal: '-space-x-2',
  loose: '-space-x-3',
};

export function AvatarGroup({
  children,
  max = 5,
  className,
  spacing = 'normal',
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = Math.max(0, childrenArray.length - max);

  return (
    <View className={cn('flex-row items-center', spacingStyles[spacing], className)}>
      {visibleChildren}
      {remainingCount > 0 && (
        <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center border-2 border-white">
          <Text className="text-gray-600 font-medium text-sm">
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
}
