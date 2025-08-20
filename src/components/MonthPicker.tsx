import React, { useState } from 'react';
import { View, Text, ScrollView, Modal } from 'react-native';
import { Button, ButtonText } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { X, Check } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface MonthPickerProps {
  visible: boolean;
  selectedMonth: string;
  onSelect: (month: string) => void;
  onClose: () => void;
}

export function MonthPicker({ visible, selectedMonth, onSelect, onClose }: MonthPickerProps) {
  const colors = useThemeColors();
  const [tempSelected, setTempSelected] = useState(selectedMonth);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateMonthOptions = () => {
    const options = [];
    for (let year = currentYear - 1; year <= currentYear + 1; year++) {
      for (let month = 0; month < 12; month++) {
        const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
        const isDisabled = year === currentYear && month > currentMonth;
        options.push({
          value: monthStr,
          label: `${months[month]} ${year}`,
          disabled: isDisabled
        });
      }
    }
    return options.reverse(); // Most recent first
  };

  const monthOptions = generateMonthOptions();

  const handleConfirm = () => {
    onSelect(tempSelected);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
      }}>
        <Card style={{
          margin: 16,
          maxHeight: '60%',
          backgroundColor: colors.background.primary
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.primary
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text.primary
            }}>
              Select Month
            </Text>
            <Button
              action="secondary"
              variant="link"
              size="sm"
              onPress={onClose}
            >
              <X size={20} color={colors.icon.muted} />
            </Button>
          </View>

          {/* Month List */}
          <ScrollView style={{ maxHeight: 300, padding: 16 }}>
            <View style={{ gap: 8 }}>
              {monthOptions.map((option) => (
                <Button
                  key={option.value}
                  action={tempSelected === option.value ? "primary" : "secondary"}
                  variant={tempSelected === option.value ? "solid" : "outline"}
                  onPress={() => setTempSelected(option.value)}
                  disabled={option.disabled}
                  style={{
                    justifyContent: 'space-between',
                    opacity: option.disabled ? 0.5 : 1
                  }}
                >
                  <ButtonText style={{
                    color: tempSelected === option.value 
                      ? colors.text.inverse 
                      : colors.text.primary
                  }}>
                    {option.label}
                  </ButtonText>
                  {tempSelected === option.value && (
                    <Check size={16} color={colors.text.inverse} />
                  )}
                </Button>
              ))}
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={{
            flexDirection: 'row',
            gap: 12,
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: colors.border.primary
          }}>
            <Button
              action="secondary"
              variant="outline"
              style={{ flex: 1 }}
              onPress={onClose}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="primary"
              variant="solid"
              style={{ flex: 1 }}
              onPress={handleConfirm}
            >
              <ButtonText style={{ color: colors.text.inverse }}>
                Confirm
              </ButtonText>
            </Button>
          </View>
        </Card>
      </View>
    </Modal>
  );
}
