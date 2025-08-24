import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button, ButtonText } from '../../../components/ui/button';
import { Input, InputField } from '../../../components/ui/input';
import { Calendar, User as UserIcon, Search, UtensilsCrossed } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import { FilterOptions } from '../../hooks/useFilterOptions';

export interface MealFilters {
  selectedMonth: string;
  selectedUserId: number | undefined;
  selectedType: 'ALL' | 'BREAKFAST' | 'LUNCH' | 'DINNER';
  searchQuery: string;
}

interface MealFiltersCardProps {
  filters: MealFilters;
  filterOptions: FilterOptions | undefined;
  onFiltersChange: (filters: MealFilters) => void;
  style?: any;
}

export function MealFiltersCard({ 
  filters, 
  filterOptions, 
  onFiltersChange, 
  style 
}: MealFiltersCardProps) {
  const colors = useThemeColors();

  const handleFilterChange = (key: keyof MealFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  // Get data from filter options API with fallbacks
  const months = filterOptions?.months || [];
  const users = filterOptions?.users || [];
  const mealTypes = [
    { value: 'ALL', label: 'All Types' },
    ...(filterOptions?.mealTypes || [])
  ];

  return (
    <Card style={[{ 
      padding: 16, 
      backgroundColor: colors.background.primary,
      borderWidth: 1,
      borderColor: colors.border.primary 
    }, style]}>
      <Text style={{ 
        fontSize: 16, 
        fontWeight: '600', 
        color: colors.text.primary,
        marginBottom: 16 
      }}>
        Filter Meals
      </Text>

      {/* Search */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 14, 
          fontWeight: '500', 
          color: colors.text.primary,
          marginBottom: 8 
        }}>
          Search
        </Text>
        <Input className="px-3">
          <Search size={16} color={colors.icon.muted} className="mr-3" />
          <InputField
            placeholder="Search meals..."
            value={filters.searchQuery}
            onChangeText={(text) => handleFilterChange('searchQuery', text)}
            className="flex-1"
          />
        </Input>
      </View>

      {/* Month Filter */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 14, 
          fontWeight: '500', 
          color: colors.text.primary,
          marginBottom: 8 
        }}>
          Month
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {months.map((month) => (
            <Pressable
              key={month.value}
              onPress={() => handleFilterChange('selectedMonth', month.value)}
              style={[
                {
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                filters.selectedMonth === month.value
                  ? {
                      backgroundColor: colors.primary[50],
                      borderColor: colors.primary[500],
                    }
                  : {
                      backgroundColor: colors.background.primary,
                      borderColor: colors.border.primary,
                    }
              ]}
            >
              <Calendar size={14} color={
                filters.selectedMonth === month.value 
                  ? colors.primary[600] 
                  : colors.icon.muted
              } />
              <Text style={[
                { marginLeft: 6, fontSize: 14 },
                filters.selectedMonth === month.value
                  ? { color: colors.primary[700], fontWeight: '500' }
                  : { color: colors.text.secondary }
              ]}>
                {month.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* User Filter */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 14, 
          fontWeight: '500', 
          color: colors.text.primary,
          marginBottom: 8 
        }}>
          User
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Pressable
            onPress={() => handleFilterChange('selectedUserId', null)}
            style={[
              {
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
              },
              filters.selectedUserId === null
                ? {
                    backgroundColor: colors.primary[50],
                    borderColor: colors.primary[500],
                  }
                : {
                    backgroundColor: colors.background.primary,
                    borderColor: colors.border.primary,
                  }
            ]}
          >
            <UserIcon size={14} color={
              filters.selectedUserId === null 
                ? colors.primary[600] 
                : colors.icon.muted
            } />
            <Text style={[
              { marginLeft: 6, fontSize: 14 },
              filters.selectedUserId === null
                ? { color: colors.primary[700], fontWeight: '500' }
                : { color: colors.text.secondary }
            ]}>
              All Users
            </Text>
          </Pressable>
          {users.map((user) => (
            <Pressable
              key={user.id}
              onPress={() => handleFilterChange('selectedUserId', user.id)}
              style={[
                {
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                filters.selectedUserId === user.id
                  ? {
                      backgroundColor: colors.primary[50],
                      borderColor: colors.primary[500],
                    }
                  : {
                      backgroundColor: colors.background.primary,
                      borderColor: colors.border.primary,
                    }
              ]}
            >
              <UserIcon size={14} color={
                filters.selectedUserId === user.id 
                  ? colors.primary[600] 
                  : colors.icon.muted
              } />
              <Text style={[
                { marginLeft: 6, fontSize: 14 },
                filters.selectedUserId === user.id
                  ? { color: colors.primary[700], fontWeight: '500' }
                  : { color: colors.text.secondary }
              ]}>
                {user.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Meal Type Filter */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 14, 
          fontWeight: '500', 
          color: colors.text.primary,
          marginBottom: 8 
        }}>
          Meal Type
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {mealTypes.map((type) => (
            <Pressable
              key={type.value}
              onPress={() => handleFilterChange('selectedType', type.value)}
              style={[
                {
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                filters.selectedType === type.value
                  ? {
                      backgroundColor: colors.primary[50],
                      borderColor: colors.primary[500],
                    }
                  : {
                      backgroundColor: colors.background.primary,
                      borderColor: colors.border.primary,
                    }
              ]}
            >
              <UtensilsCrossed size={14} color={
                filters.selectedType === type.value 
                  ? colors.primary[600] 
                  : colors.icon.muted
              } />
              <Text style={[
                { marginLeft: 6, fontSize: 14 },
                filters.selectedType === type.value
                  ? { color: colors.primary[700], fontWeight: '500' }
                  : { color: colors.text.secondary }
              ]}>
                {type.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Clear Filters Button */}
      <Button 
        action="secondary" 
        variant="outline"
        onPress={() => onFiltersChange({
          selectedMonth: new Date().toISOString().slice(0, 7),
          selectedUserId: undefined,
          selectedType: 'ALL',
          searchQuery: ''
        })}
        style={{ marginTop: 8 }}
      >
        <ButtonText>Clear All Filters</ButtonText>
      </Button>
    </Card>
  );
}
