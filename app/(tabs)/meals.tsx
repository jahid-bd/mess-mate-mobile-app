import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert, ActionSheetIOS, Platform } from 'react-native';
import { router } from 'expo-router';
import { ButtonText, Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { 
  Plus, 
  Filter, 
  Calendar,
  User,
  MoreVertical,
  Clock,
  TrendingUp,
  Coffee,
  Sun,
  Moon,
  Utensils
} from 'lucide-react-native';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useAuthStore } from '../../src/stores/authStore';
import { MonthPicker } from '../../src/components/MonthPicker';
import { UserPicker } from '../../src/components/UserPicker';

// Mock data types based on your backend
interface MealEntry {
  id: number;
  date: string;
  amount: number;
  note?: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SHAHUR';
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface MealStats {
  totalMeals: number;
  todayMeals: number;
  weeklyMeals: number;
  monthlyMeals: number;
  averagePerDay: number;
  userMeals: number;
}

export default function MealsScreen() {
  const colors = useThemeColors();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  
  // State management
  const [selectedMonth, setSelectedMonth] = useState('2025-08');
  const [showOnlyMyMeals, setShowOnlyMyMeals] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'user'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);

  // Mock data - this will be replaced with API calls
  const mockStats: MealStats = {
    totalMeals: 145,
    todayMeals: 12,
    weeklyMeals: 84,
    monthlyMeals: 145,
    averagePerDay: 4.8,
    userMeals: 23,
  };

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Maria Smith', email: 'maria@example.com' },
    { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
  ];

  const mockMeals: MealEntry[] = [
    {
      id: 1,
      date: '2025-08-20',
      amount: 1,
      type: 'LUNCH',
      note: 'Regular meal',
      userId: 1,
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      createdAt: '2025-08-20T12:30:00Z',
      updatedAt: '2025-08-20T12:30:00Z',
    },
    {
      id: 2,
      date: '2025-08-20',
      amount: 1,
      type: 'DINNER',
      note: 'Late dinner',
      userId: 2,
      user: { id: 2, name: 'Maria Smith', email: 'maria@example.com' },
      createdAt: '2025-08-20T20:30:00Z',
      updatedAt: '2025-08-20T20:30:00Z',
    },
    {
      id: 3,
      date: '2025-08-19',
      amount: 1,
      type: 'BREAKFAST',
      note: undefined,
      userId: 1,
      user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      createdAt: '2025-08-19T08:00:00Z',
      updatedAt: '2025-08-19T08:00:00Z',
    },
    {
      id: 4,
      date: '2025-08-19',
      amount: 1,
      type: 'SHAHUR',
      note: 'Ramadan sehri',
      userId: 3,
      user: { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com' },
      createdAt: '2025-08-19T04:30:00Z',
      updatedAt: '2025-08-19T04:30:00Z',
    },
  ];

  // Helper functions
  const getMealIcon = (type: string) => {
    switch (type) {
      case 'BREAKFAST': return <Coffee size={16} color={colors.warning[600]} />;
      case 'LUNCH': return <Sun size={16} color={colors.primary[600]} />;
      case 'DINNER': return <Moon size={16} color={colors.tertiary[600]} />;
      case 'SHAHUR': return <Clock size={16} color={colors.secondary[600]} />;
      default: return <Utensils size={16} color={colors.icon.muted} />;
    }
  };

  const formatDateWithDay = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
      });
    }
  };

  const canEditMeal = (meal: MealEntry) => {
    return isAdmin || meal.userId === user?.id;
  };

  const handleAddMeal = () => {
    router.push('/(tabs)/add-meal');
  };

  const handleEditMeal = (meal: MealEntry) => {
    // Navigate to edit meal screen
    router.push(`/(tabs)/add-meal?id=${meal.id}&mode=edit`);
  };

  const handleDeleteMeal = (meal: MealEntry) => {
    Alert.alert(
      'Delete Meal Entry',
      `Are you sure you want to delete this ${meal.type.toLowerCase()} entry?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            console.log('Delete meal:', meal.id);
            // TODO: Call delete API
          }
        }
      ]
    );
  };

  const showMealActions = (meal: MealEntry) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Edit', 'Delete'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            handleEditMeal(meal);
          } else if (buttonIndex === 2) {
            handleDeleteMeal(meal);
          }
        }
      );
    } else {
      // For Android, show alert with options
      Alert.alert(
        'Meal Actions',
        'What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Edit', onPress: () => handleEditMeal(meal) },
          { text: 'Delete', style: 'destructive', onPress: () => handleDeleteMeal(meal) }
        ]
      );
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredMeals = mockMeals
    .filter(meal => !showOnlyMyMeals || meal.userId === user?.id)
    .filter(meal => !selectedUser || meal.userId === selectedUser)
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'user':
          comparison = a.user.name.localeCompare(b.user.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getSelectedUserName = () => {
    if (!selectedUser) return 'All Users';
    const user = mockUsers.find(u => u.id === selectedUser);
    return user ? user.name : 'All Users';
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary[500]}
          />
        }
      >
        {/* Header Actions */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <Button 
            action="primary" 
            variant="solid" 
            style={{ flex: 1, height: 40 }}
            onPress={handleAddMeal}
          >
            <Plus size={20} color={colors.text.inverse} />
            <ButtonText style={{ marginLeft: 8, color: colors.text.inverse }}>
              Add Meal Entry
            </ButtonText>
          </Button>
          
          <Button 
            action={showFilters ? "primary" : "default"}
            variant={showFilters ? "solid" : "outline"}
            style={{ 
              width: 42, 
              height: 42,
              borderColor: showFilters ? colors.primary[500] : colors.border.primary,
              backgroundColor: showFilters ? colors.primary[100] : 'transparent'
            }}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={showFilters ? colors.primary[600] : colors.icon.muted} />
          </Button>
        </View>

        {/* Meal Statistics */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: colors.text.primary, 
            marginBottom: 12 
          }}>
            Meal Statistics
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <Card style={{ 
              flex: 1, 
              padding: 12,
              backgroundColor: colors.background.primary,
              borderWidth: 1,
              borderColor: colors.border.primary
            }}>
              <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
                Today
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary[600] }}>
                {mockStats.todayMeals}
              </Text>
            </Card>
            
            <Card style={{ 
              flex: 1, 
              padding: 12,
              backgroundColor: colors.background.primary,
              borderWidth: 1,
              borderColor: colors.border.primary
            }}>
              <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
                This Week
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.secondary[600] }}>
                {mockStats.weeklyMeals}
              </Text>
            </Card>
            
            <Card style={{ 
              flex: 1, 
              padding: 12,
              backgroundColor: colors.background.primary,
              borderWidth: 1,
              borderColor: colors.border.primary
            }}>
              <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
                This Month
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.tertiary[600] }}>
                {mockStats.monthlyMeals}
              </Text>
            </Card>
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Card style={{ 
              flex: 1, 
              padding: 12,
              backgroundColor: colors.background.primary,
              borderWidth: 1,
              borderColor: colors.border.primary
            }}>
              <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
                Total Entries
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TrendingUp size={14} color={colors.success[600]} />
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: 'bold', 
                  color: colors.success[600],
                  marginLeft: 4 
                }}>
                  {mockStats.totalMeals}
                </Text>
              </View>
            </Card>
            
            {!isAdmin && (
              <Card style={{ 
                flex: 1, 
                padding: 12,
                backgroundColor: colors.background.primary,
                borderWidth: 1,
                borderColor: colors.border.primary
              }}>
                <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
                  My Meals
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.warning[600] }}>
                  {mockStats.userMeals}
                </Text>
              </Card>
            )}
          </View>
        </View>

        {/* Filters */}
        {showFilters && (
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
                  onPress={() => setShowMonthPicker(true)}
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
                  onPress={() => setShowUserPicker(true)}
                >
                  <User size={16} color={colors.icon.muted} />
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
                    onPress={() => setShowOnlyMyMeals(!showOnlyMyMeals)}
                  >
                    <User size={16} color={showOnlyMyMeals ? colors.text.inverse : colors.icon.muted} />
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
                      onPress={() => setSortBy(option as any)}
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
                    onPress={() => setSortOrder('desc')}
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
                    onPress={() => setSortOrder('asc')}
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
        )}

        {/* Meal Entries List */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12 
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: colors.text.primary 
            }}>
              Meal Entries
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: colors.text.secondary 
            }}>
              {filteredMeals.length} entries
            </Text>
          </View>

          {filteredMeals.length === 0 ? (
            <Card style={{ 
              padding: 32, 
              alignItems: 'center',
              backgroundColor: colors.background.primary,
              borderWidth: 1,
              borderColor: colors.border.primary
            }}>
              <Utensils size={48} color={colors.icon.muted} />
              <Text style={{ 
                fontSize: 16, 
                color: colors.text.secondary, 
                textAlign: 'center',
                marginTop: 12,
                marginBottom: 16
              }}>
                {showOnlyMyMeals 
                  ? "You haven't added any meals yet"
                  : "No meal entries found for the selected period"
                }
              </Text>
              <Button action="primary" variant="solid" onPress={handleAddMeal}>
                <Plus size={20} color={colors.text.inverse} />
                <ButtonText style={{ marginLeft: 8, color: colors.text.inverse }}>
                  Add Your First Meal
                </ButtonText>
              </Button>
            </Card>
          ) : (
            <View style={{ gap: 8 }}>
              {filteredMeals.map((meal, index) => (
                <Card key={meal.id} style={{ 
                  padding: 16,
                  backgroundColor: colors.background.primary,
                  borderWidth: 1,
                  borderColor: colors.border.primary
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      {/* Meal Type and Amount */}
                      <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginBottom: 8 
                      }}>
                        {getMealIcon(meal.type)}
                        <Text style={{ 
                          fontSize: 16, 
                          fontWeight: '600', 
                          color: colors.text.primary,
                          marginLeft: 8 
                        }}>
                          {meal.type.charAt(0) + meal.type.slice(1).toLowerCase()}
                        </Text>
                        <View style={{
                          backgroundColor: colors.primary[100],
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 12,
                          marginLeft: 8
                        }}>
                          <Text style={{ 
                            fontSize: 12, 
                            fontWeight: '600',
                            color: colors.primary[700]
                          }}>
                            {meal.amount} meal{meal.amount > 1 ? 's' : ''}
                          </Text>
                        </View>
                      </View>

                      {/* User Info */}
                      <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginBottom: 4 
                      }}>
                        <User size={14} color={colors.icon.muted} />
                        <Text style={{ 
                          fontSize: 14, 
                          color: colors.text.secondary,
                          marginLeft: 6 
                        }}>
                          {meal.user.name}
                          {meal.userId === user?.id && (
                            <Text style={{ color: colors.primary[600] }}> (You)</Text>
                          )}
                        </Text>
                      </View>

                      {/* Date */}
                      <Text style={{ 
                        fontSize: 13, 
                        color: colors.text.secondary,
                        marginBottom: 4
                      }}>
                        {formatDateWithDay(meal.date)}
                      </Text>

                      {/* Note */}
                      {meal.note && (
                        <Text style={{ 
                          fontSize: 12, 
                          color: colors.text.tertiary,
                          fontStyle: 'italic',
                          marginTop: 4 
                        }}>
                          &ldquo;{meal.note}&rdquo;
                        </Text>
                      )}
                    </View>

                    {/* Action Button */}
                    {canEditMeal(meal) && (
                      <Button 
                        action="secondary" 
                        variant="outline"
                        size="sm"
                        style={{ 
                          width: 40, 
                          height: 40,
                          borderColor: colors.border.primary,
                          backgroundColor: 'transparent'
                        }}
                        onPress={() => showMealActions(meal)}
                      >
                        <MoreVertical size={16} color={colors.icon.muted} />
                      </Button>
                    )}
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>

        {/* Load More Button (Pagination) */}
        {filteredMeals.length > 0 && (
          <Button 
            action="secondary" 
            variant="outline" 
            style={{ marginTop: 16,  }}
          >
            <ButtonText>Load More Entries</ButtonText>
          </Button>
        )}
      </ScrollView>

      {/* Month Picker Modal */}
      <MonthPicker
        visible={showMonthPicker}
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
        onClose={() => setShowMonthPicker(false)}
      />

      {/* User Picker Modal */}
      <UserPicker
        visible={showUserPicker}
        users={mockUsers}
        selectedUserId={selectedUser}
        onSelect={setSelectedUser}
        onClose={() => setShowUserPicker(false)}
      />
    </View>
  );
}
