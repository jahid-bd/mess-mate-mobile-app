import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { User, MoreVertical, ShoppingCart, Home, DollarSign } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface ExpenseEntry {
  id: number;
  date: string;
  amount: number;
  note: string;
  type: 'BAZAR' | 'OTHER';
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ExpenseEntryCardProps {
  expense: ExpenseEntry;
  currentUserId?: number;
  canEdit: boolean;
  onActionPress: (expense: ExpenseEntry) => void;
  style?: ViewStyle;
}

export function ExpenseEntryCard({ expense, currentUserId, canEdit, onActionPress, style }: ExpenseEntryCardProps) {
  const colors = useThemeColors();

  const getExpenseIcon = (type: string) => {
    switch (type) {
      case 'BAZAR': return <ShoppingCart size={16} color={colors.tertiary[600]} />;
      case 'OTHER': return <Home size={16} color={colors.warning[600]} />;
      default: return <DollarSign size={16} color={colors.icon.muted} />;
    }
  };

  const getExpenseTypeColor = (type: string) => {
    switch (type) {
      case 'BAZAR': return {
        bg: colors.tertiary[50],
        text: colors.tertiary[700],
        border: colors.tertiary[500]
      };
      case 'OTHER': return {
        bg: colors.warning[50],
        text: colors.warning[700],
        border: colors.warning[500]
      };
      default: return {
        bg: colors.primary[50],
        text: colors.primary[700],
        border: colors.primary[500]
      };
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

  const typeColors = getExpenseTypeColor(expense.type);

  return (
    <Card style={[{ 
      padding: 16,
      backgroundColor: colors.background.primary,
      borderWidth: 1,
      borderColor: colors.border.primary
    }, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          {/* Amount and Type */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 8 
          }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: 'bold', 
              color: colors.text.primary,
              marginRight: 8
            }}>
              ৳{expense.amount}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: typeColors.bg,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: typeColors.border,
            }}>
              {getExpenseIcon(expense.type)}
              <Text style={{ 
                fontSize: 12, 
                fontWeight: '600',
                color: typeColors.text,
                marginLeft: 4
              }}>
                {expense.type === 'BAZAR' ? 'Bazar' : 'Other'}
              </Text>
            </View>
          </View>

          {/* Note/Description */}
          <Text style={{ 
            fontSize: 14, 
            color: colors.text.primary,
            marginBottom: 8,
            fontWeight: '500'
          }}>
            {expense.note}
          </Text>

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
              {expense.user?.name || expense.user?.email || 'Unknown User'}
              {expense.userId === currentUserId && (
                <Text style={{ color: colors.primary[600] }}> (You)</Text>
              )}
            </Text>
          </View>

          {/* Date */}
          <Text style={{ 
            fontSize: 13, 
            color: colors.text.secondary,
          }}>
            {formatDateWithDay(expense.date)}
          </Text>
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
            onPress={() => onActionPress(expense)}
          >
            <MoreVertical size={16} color={colors.icon.muted} />
          </Button>
        )}
      </View>
    </Card>
  );
}
