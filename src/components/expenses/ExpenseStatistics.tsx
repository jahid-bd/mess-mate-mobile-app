import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../../components/ui/card';
import { DollarSign, ShoppingCart, Home } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface ExpenseStats {
  totalEntries: number;
  totalSpent: number;
  userSpent: number;
  bazarSpent: number;
  otherSpent: number;
  todaySpent: number;
  weeklySpent: number;
  monthlySpent: number;
  averagePerDay: number;
}

interface ExpenseStatisticsProps {
  stats: ExpenseStats;
}

export function ExpenseStatistics({ stats }: ExpenseStatisticsProps) {
  const colors = useThemeColors();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ 
        fontSize: 18, 
        fontWeight: '600', 
        color: colors.text.primary, 
        marginBottom: 12 
      }}>
        Expense Statistics
      </Text>
      
      {/* Main Stats Row */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <Card style={{ 
          flex: 1, 
          padding: 12,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
            Total Spent
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <DollarSign size={14} color={colors.primary[600]} />
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.primary[600],
              marginLeft: 4 
            }}>
              ৳{stats.totalSpent}
            </Text>
          </View>
        </Card>
        
        <Card style={{ 
          flex: 1, 
          padding: 12,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
            My Expenses
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.secondary[600] }}>
            ৳{stats.userSpent}
          </Text>
        </Card>
      </View>

      {/* Category Stats Row */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <Card style={{ 
          flex: 1, 
          padding: 12,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
            Bazar
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ShoppingCart size={14} color={colors.tertiary[600]} />
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              color: colors.tertiary[600],
              marginLeft: 4 
            }}>
              ৳{stats.bazarSpent}
            </Text>
          </View>
        </Card>
        
        <Card style={{ 
          flex: 1, 
          padding: 12,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
            Other
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Home size={14} color={colors.warning[600]} />
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              color: colors.warning[600],
              marginLeft: 4 
            }}>
              ৳{stats.otherSpent}
            </Text>
          </View>
        </Card>
      </View>

      {/* Time Period Stats */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
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
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.success[600] }}>
            ৳{stats.todaySpent}
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
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.primary[600] }}>
            ৳{stats.weeklySpent}
          </Text>
        </Card>
        
        {/* <Card style={{ 
          flex: 1, 
          padding: 12,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 4 }}>
            Avg/Day
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.secondary[600] }}>
            ৳{stats.averagePerDay}
          </Text>
        </Card> */}
      </View>
    </View>
  );
}
