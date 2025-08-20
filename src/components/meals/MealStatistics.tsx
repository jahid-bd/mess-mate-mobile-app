import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../../components/ui/card';
import { TrendingUp } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface MealStats {
  totalMeals: number;
  todayMeals: number;
  weeklyMeals: number;
  monthlyMeals: number;
  averagePerDay: number;
  userMeals: number;
}

interface MealStatisticsProps {
  stats: MealStats;
  isAdmin: boolean;
}

export function MealStatistics({ stats, isAdmin }: MealStatisticsProps) {
  const colors = useThemeColors();

  return (
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
            {stats.todayMeals}
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
            {stats.weeklyMeals}
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
            {stats.monthlyMeals}
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
              {stats.totalMeals}
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
              {stats.userMeals}
            </Text>
          </Card>
        )}
      </View>
    </View>
  );
}
