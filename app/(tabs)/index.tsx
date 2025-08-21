import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { ButtonText, Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallbackText } from '../../components/ui/avatar';
import { Spinner } from '../../components/ui/spinner';
import { Sun, Moon, TrendingUp, DollarSign as DollarSignIcon, UtensilsCrossed } from 'lucide-react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { HeaderWithLogo } from '../../src/components/HeaderWithLogo';

export default function DashboardScreen() {
  const [isLoading] = useState(false);
  const { colorScheme, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const isDark = colorScheme === 'dark';

  const mockData = {
    currentMonth: 'August 2025',
    totalMeals: 45,
    totalExpenses: 2850,
    perPersonCost: 1425,
    remainingBudget: 575,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {/* Custom Header with Logo */}
      <HeaderWithLogo />
      
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        {/* Welcome Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: 4,
          }}>
            Welcome back! 👋
          </Text>
          <Text style={{
            fontSize: 16,
            color: colors.text.secondary,
          }}>
            {mockData.currentMonth} Overview
          </Text>
        </View>

        {/* Theme Toggle */}
        <View style={{ alignItems: 'flex-end', marginBottom: 24 }}>
          <Button 
            size="md" 
            variant="outline" 
            action="secondary"
            onPress={toggleTheme}
            className="w-12 h-12 rounded-full"
          >
            {isDark ? (
              <Sun size={20} color={colors.icon.secondary} />
            ) : (
              <Moon size={20} color={colors.icon.secondary} />
            )}
          </Button>
        </View>

      {/* Quick Stats Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <Card style={{ 
          flex: 1, 
          minWidth: 160, 
          padding: 16,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <UtensilsCrossed size={20} color={colors.icon.primary} />
            <Text style={{ color: colors.text.secondary, marginLeft: 8, fontSize: 14 }}>
              Total Meals
            </Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text.primary }}>
            {mockData.totalMeals}
          </Text>
          <Text style={{ color: colors.success[600], fontSize: 12, marginTop: 4 }}>
            +12% from last month
          </Text>
        </Card>

        <Card style={{ 
          flex: 1, 
          minWidth: 160, 
          padding: 16,
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <DollarSignIcon size={20} color={colors.icon.secondary} />
            <Text style={{ color: colors.text.secondary, marginLeft: 8, fontSize: 14 }}>
              Total Cost
            </Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text.primary }}>
            ৳{mockData.totalExpenses}
          </Text>
          <Text style={{ color: colors.error[600], fontSize: 12, marginTop: 4 }}>
            +5% from last month
          </Text>
        </Card>
      </View>

      {/* Monthly Summary Card */}
      <Card style={{ 
        padding: 24, 
        marginBottom: 24,
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text.primary, 
          marginBottom: 16 
        }}>
          Monthly Summary
        </Text>
        
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.text.secondary }}>Per Person Cost</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: colors.primary[600] 
            }}>
              ৳{mockData.perPersonCost}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.text.secondary }}>Remaining Budget</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: colors.success[600] 
            }}>
              ৳{mockData.remainingBudget}
            </Text>
          </View>
          
          <View style={{ 
            borderTopWidth: 1, 
            borderTopColor: colors.border.primary, 
            paddingTop: 12, 
            marginTop: 12 
          }}>
            <Button action="primary" variant="solid">
              <ButtonText style={{ color: colors.text.inverse }}>View Detailed Report</ButtonText>
            </Button>
          </View>
        </View>
      </Card>

      {/* Recent Activity */}
      <Card style={{ 
        padding: 24, 
        marginBottom: 24,
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text.primary, 
          marginBottom: 16 
        }}>
          Recent Activity
        </Text>
        
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar style={{ backgroundColor: colors.primary[500], marginRight: 12 }}>
              <AvatarFallbackText style={{ color: colors.text.inverse }}>JD</AvatarFallbackText>
            </Avatar>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text.primary, fontWeight: '500' }}>
                John added lunch entry
              </Text>
              <Text style={{ color: colors.text.secondary, fontSize: 14 }}>2 hours ago</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar style={{ backgroundColor: colors.secondary[500], marginRight: 12 }}>
              <AvatarFallbackText style={{ color: colors.text.inverse }}>MS</AvatarFallbackText>
            </Avatar>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text.primary, fontWeight: '500' }}>
                Maria added grocery expense
              </Text>
              <Text style={{ color: colors.text.secondary, fontSize: 14 }}>5 hours ago</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar style={{ backgroundColor: colors.tertiary[500], marginRight: 12 }}>
              <AvatarFallbackText style={{ color: colors.text.inverse }}>AK</AvatarFallbackText>
            </Avatar>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text.primary, fontWeight: '500' }}>
                Ahmed completed monthly calculation
              </Text>
              <Text style={{ color: colors.text.secondary, fontSize: 14 }}>1 day ago</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card style={{ 
        padding: 24, 
        marginBottom: 24,
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.border.primary
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text.primary, 
          marginBottom: 16 
        }}>
          Quick Actions
        </Text>
        
        <View style={{ gap: 12 }}>
          <Button action="primary" variant="solid">
            <ButtonText style={{ color: colors.text.inverse }}>Add Meal Entry</ButtonText>
          </Button>
          
          <Button action="secondary" variant="outline">
            <ButtonText style={{ color: colors.text.secondary }}>Add Expense</ButtonText>
          </Button>
          
          <Button action="positive" variant="link">
            <TrendingUp size={16} color={colors.icon.secondary} />
            <ButtonText style={{ marginLeft: 8, color: colors.text.secondary }}>View Analytics</ButtonText>
          </Button>
        </View>
      </Card>

      {/* Loading Demo */}
      {isLoading && (
        <Card style={{ 
          padding: 24, 
          alignItems: 'center',
          backgroundColor: colors.background.primary,
          borderWidth: 1,
          borderColor: colors.border.primary
        }}>
          <Spinner color="$primary500" size="large" />
          <Text style={{ color: colors.text.secondary, marginTop: 8 }}>Loading data...</Text>
        </Card>
      )}
      </ScrollView>
    </View>
  );
}