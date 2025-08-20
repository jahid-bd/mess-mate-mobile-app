import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { User, MoreVertical, Clock, Coffee, Sun, Moon, Utensils } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

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

interface MealEntryCardProps {
  meal: MealEntry;
  currentUserId?: number;
  canEdit: boolean;
  onActionPress: (meal: MealEntry) => void;
}

export function MealEntryCard({ meal, currentUserId, canEdit, onActionPress }: MealEntryCardProps) {
  const colors = useThemeColors();

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

  return (
    <Card style={{ 
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
              {meal.user?.name || meal.user?.email || 'Unknown User'}
              {meal.userId === currentUserId && (
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
        {canEdit && (
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
            onPress={() => onActionPress(meal)}
          >
            <MoreVertical size={16} color={colors.icon.muted} />
          </Button>
        )}
      </View>
    </Card>
  );
}
