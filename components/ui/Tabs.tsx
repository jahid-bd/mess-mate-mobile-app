import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../src/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  scrollable?: boolean;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
}

const tabVariants = {
  default: {
    container: 'bg-gray-100 rounded-lg p-1',
    tab: 'px-4 py-2 rounded-md',
    active: 'bg-white shadow-sm',
    inactive: '',
  },
  pills: {
    container: 'flex-row space-x-1',
    tab: 'px-4 py-2 rounded-full',
    active: 'bg-primary-500',
    inactive: 'bg-gray-100',
  },
  underline: {
    container: 'border-b border-gray-200',
    tab: 'px-4 py-3 border-b-2',
    active: 'border-primary-500',
    inactive: 'border-transparent',
  },
};

const tabSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

export function Tabs({
  items,
  defaultActiveId,
  activeId: controlledActiveId,
  onTabChange,
  variant = 'default',
  size = 'md',
  scrollable = false,
  className,
  tabsClassName,
  contentClassName,
}: TabsProps) {
  const [internalActiveId, setInternalActiveId] = useState(
    defaultActiveId || items[0]?.id
  );

  const activeId = controlledActiveId ?? internalActiveId;
  const styles = tabVariants[variant];

  const handleTabPress = (tabId: string) => {
    if (controlledActiveId === undefined) {
      setInternalActiveId(tabId);
    }
    onTabChange?.(tabId);
  };

  const activeItem = items.find(item => item.id === activeId);

  const TabsContainer = scrollable ? ScrollView : View;
  const containerProps = scrollable 
    ? { horizontal: true, showsHorizontalScrollIndicator: false }
    : {};

  return (
    <View className={cn('', className)}>
      <TabsContainer
        {...containerProps}
        className={cn(styles.container, tabsClassName)}
        contentContainerStyle={scrollable ? { paddingHorizontal: 4 } : undefined}
      >
        <View className={cn(
          variant === 'default' ? 'flex-row' : styles.container,
          !scrollable && 'flex-row'
        )}>
          {items.map((item) => {
            const isActive = item.id === activeId;
            const isDisabled = item.disabled;

            return (
              <Pressable
                key={item.id}
                onPress={() => !isDisabled && handleTabPress(item.id)}
                className={cn(
                  styles.tab,
                  tabSizes[size],
                  isActive ? styles.active : styles.inactive,
                  isDisabled && 'opacity-50',
                  variant === 'default' && 'flex-1 items-center',
                  variant === 'pills' && 'mr-2',
                  variant === 'underline' && 'mr-4'
                )}
                disabled={isDisabled}
              >
                <View className="flex-row items-center">
                  <Text
                    className={cn(
                      'font-medium',
                      isActive
                        ? variant === 'pills'
                          ? 'text-white'
                          : 'text-primary-600'
                        : 'text-gray-600',
                      isDisabled && 'text-gray-400'
                    )}
                  >
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View className={cn(
                      'ml-2 px-2 py-0.5 rounded-full',
                      isActive && variant === 'pills'
                        ? 'bg-white/20'
                        : 'bg-primary-100'
                    )}>
                      <Text className={cn(
                        'text-xs font-medium',
                        isActive && variant === 'pills'
                          ? 'text-white'
                          : 'text-primary-600'
                      )}>
                        {item.badge}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </TabsContainer>

      {activeItem?.content && (
        <View className={cn('mt-4', contentClassName)}>
          {activeItem.content}
        </View>
      )}
    </View>
  );
}

// Simple Tab Button component for custom implementations
export interface TabButtonProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  badge?: string | number;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TabButton({
  label,
  isActive = false,
  onPress,
  disabled = false,
  badge,
  variant = 'default',
  size = 'md',
  className,
}: TabButtonProps) {
  const styles = tabVariants[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        styles.tab,
        tabSizes[size],
        isActive ? styles.active : styles.inactive,
        disabled && 'opacity-50',
        className
      )}
    >
      <View className="flex-row items-center">
        <Text
          className={cn(
            'font-medium',
            isActive
              ? variant === 'pills'
                ? 'text-white'
                : 'text-primary-600'
              : 'text-gray-600',
            disabled && 'text-gray-400'
          )}
        >
          {label}
        </Text>
        {badge && (
          <View className={cn(
            'ml-2 px-2 py-0.5 rounded-full',
            isActive && variant === 'pills'
              ? 'bg-white/20'
              : 'bg-primary-100'
          )}>
            <Text className={cn(
              'text-xs font-medium',
              isActive && variant === 'pills'
                ? 'text-white'
                : 'text-primary-600'
            )}>
              {badge}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
