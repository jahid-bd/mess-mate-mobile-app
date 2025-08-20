import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button, ButtonText } from '../../../components/ui/button';
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
    return user ? user.name : 'All Users';
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
            <Calendar size={16} color={colors.icon.muted} />
            <ButtonText style={{ marginLeft: 8, color: colors.text.primary }}>
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
            <UserIcon size={16} color={colors.icon.muted} />
            <ButtonText style={{ marginLeft: 8, color: colors.text.primary }}>
              {getSelectedUserName()}
            </ButtonText>
          </Button>
        </View>

        {/* Toggle My Meals Only */}
        {!isAdmin && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button 
              action={showOnlyMyMeals ? "primary" : "secondary"}
              variant={showOnlyMyMeals ? "solid" : "outline"}
              size="sm"
              style={{
                borderColor: showOnlyMyMeals ? undefined : colors.border.primary,
                backgroundColor: showOnlyMyMeals ? undefined : 'transparent'
              }}
              onPress={onToggleMyMeals}
            >
              <UserIcon size={16} color={showOnlyMyMeals ? colors.text.inverse : colors.icon.muted} />
              <ButtonText style={{ 
                marginLeft: 8,
                color: showOnlyMyMeals ? colors.text.inverse : colors.text.primary 
              }}>
                My Meals Only
              </ButtonText>
            </Button>
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
              <Button
                key={option}
                action={sortBy === option ? "primary" : "secondary"}
                variant={sortBy === option ? "solid" : "outline"}
                size="sm"
                onPress={() => onSortByChange(option as any)}
              >
                <ButtonText style={{ 
                  color: sortBy === option ? colors.text.inverse : colors.text.primary 
                }}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </ButtonText>
              </Button>
            ))}
          </View>
          
          {/* Sort Order */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              action={sortOrder === 'desc' ? "primary" : "secondary"}
              variant={sortOrder === 'desc' ? "solid" : "outline"}
              size="sm"
              onPress={() => onSortOrderChange('desc')}
            >
              <ButtonText style={{ 
                color: sortOrder === 'desc' ? colors.text.inverse : colors.text.primary 
              }}>
                Newest First
              </ButtonText>
            </Button>
            <Button
              action={sortOrder === 'asc' ? "primary" : "secondary"}
              variant={sortOrder === 'asc' ? "solid" : "outline"}
              size="sm"
              onPress={() => onSortOrderChange('asc')}
            >
              <ButtonText style={{ 
                color: sortOrder === 'asc' ? colors.text.inverse : colors.text.primary 
              }}>
                Oldest First
              </ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
}
