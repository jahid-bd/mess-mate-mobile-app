import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button, ButtonText, ButtonIcon } from '../../../components/ui/button';
import { Calendar, User as UserIcon } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface User {
  id: number;
  name: string;
  email: string;
}

interface MealFiltersCardProps {
  selectedMonth: string;
  showOnlyMyMeals: boolean;
  selectedUser: number | null;
  sortBy: 'date' | 'type' | 'user';
  sortOrder: 'asc' | 'desc';
  isAdmin: boolean;
  users: User[];
  onMonthPickerOpen: () => void;
  onUserPickerOpen: () => void;
  onToggleMyMeals: () => void;
  onSortByChange: (sortBy: 'date' | 'type' | 'user') => void;
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
}

export function MealFiltersCard({
  selectedMonth,
  showOnlyMyMeals,
  selectedUser,
  sortBy,
  sortOrder,
  isAdmin,
  users,
  onMonthPickerOpen,
  onUserPickerOpen,
  onToggleMyMeals,
  onSortByChange,
  onSortOrderChange,
}: MealFiltersCardProps) {
  const colors = useThemeColors();

  const getSelectedUserName = () => {
    if (!selectedUser) return 'All Users';
    const user = users.find(u => u.id === selectedUser);
    return user ? (user.name || user.email || 'Unknown User') : 'All Users';
  };

  return (
    <Card style={{ 
      padding: 16, 
      marginBottom: 16,
      backgroundColor: colors.background.primary,
      borderWidth: 1,
      borderColor: colors.border.primary
    }}>
      <Text style={{ 
        fontSize: 16, 
        fontWeight: '600', 
        color: colors.text.primary, 
        marginBottom: 12 
      }}>
        Filters & Sorting
      </Text>
      
      <View style={{ gap: 12 }}>
        {/* Month Filter */}
        <View>
          <Text style={{ 
            fontSize: 14, 
            color: colors.text.secondary, 
            marginBottom: 8 
          }}>
            Month
          </Text>
          <Button 
            action="default" 
            variant="outline"
            style={{ 
              justifyContent: 'flex-start',
              borderColor: colors.border.primary,
              backgroundColor: 'transparent'
            }}
            onPress={onMonthPickerOpen}
          >
            <ButtonIcon as={Calendar} size="sm" />
            <ButtonText>
              {selectedMonth}
            </ButtonText>
          </Button>
        </View>

        {/* Person Filter */}
        <View>
          <Text style={{ 
            fontSize: 14, 
            color: colors.text.secondary, 
            marginBottom: 8 
          }}>
            Filter by Person
          </Text>
          <Button 
            action="secondary" 
            variant="outline"
            style={{ 
              justifyContent: 'flex-start',
              borderColor: colors.border.primary,
              backgroundColor: 'transparent'
            }}
            onPress={onUserPickerOpen}
          >
            <ButtonIcon as={UserIcon} size="sm" />
            <ButtonText>
              {getSelectedUserName()}
            </ButtonText>
          </Button>
        </View>

        {/* Toggle My Meals Only */}
        {!isAdmin && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Pressable 
              style={{
                backgroundColor: showOnlyMyMeals ? colors.primary[500] : 'transparent',
                borderWidth: 1,
                borderColor: showOnlyMyMeals ? colors.primary[500] : colors.border.primary,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                minHeight: 36,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
              onPress={onToggleMyMeals}
            >
              <UserIcon 
                size={16} 
                color={showOnlyMyMeals ? colors.text.inverse : colors.icon.muted} 
              />
              <Text style={{
                color: showOnlyMyMeals ? colors.text.inverse : colors.text.primary,
                fontSize: 14,
                fontWeight: '500'
              }}>
                My Meals Only
              </Text>
            </Pressable>
          </View>
        )}

        {/* Sort Options */}
        <View>
          <Text style={{ 
            fontSize: 14, 
            color: colors.text.secondary, 
            marginBottom: 8 
          }}>
            Sort by
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            {['date', 'type', 'user'].map((option) => (
              <Pressable
                key={option}
                style={{
                  backgroundColor: sortBy === option ? colors.primary[500] : 'transparent',
                  borderWidth: 1,
                  borderColor: sortBy === option ? colors.primary[500] : colors.border.primary,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  minHeight: 36,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => onSortByChange(option as any)}
              >
                <Text style={{
                  color: sortBy === option ? colors.text.inverse : colors.text.primary,
                  fontSize: 14,
                  fontWeight: '500'
                }}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
          
          {/* Sort Order */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              style={{
                backgroundColor: sortOrder === 'desc' ? colors.primary[500] : 'transparent',
                borderWidth: 1,
                borderColor: sortOrder === 'desc' ? colors.primary[500] : colors.border.primary,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                minHeight: 36,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
              onPress={() => onSortOrderChange('desc')}
            >
              <Text style={{
                color: sortOrder === 'desc' ? colors.text.inverse : colors.text.primary,
                fontSize: 14,
                fontWeight: '500'
              }}>
                Newest First
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: sortOrder === 'asc' ? colors.primary[500] : 'transparent',
                borderWidth: 1,
                borderColor: sortOrder === 'asc' ? colors.primary[500] : colors.border.primary,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                minHeight: 36,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
              onPress={() => onSortOrderChange('asc')}
            >
              <Text style={{
                color: sortOrder === 'asc' ? colors.text.inverse : colors.text.primary,
                fontSize: 14,
                fontWeight: '500'
              }}>
                Oldest First
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Card>
  );
}
