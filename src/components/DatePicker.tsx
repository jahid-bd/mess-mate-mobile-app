import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, X } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

interface DatePickerProps {
  value: string; // YYYY-MM-DD format
  onDateChange: (date: string) => void;
  placeholder?: string;
  error?: string;
}

export function DatePicker({ value, onDateChange, placeholder = 'Select date', error }: DatePickerProps) {
  const colors = useThemeColors();
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(value ? new Date(value) : new Date());

  const handleDateSelect = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedDate) {
      setTempDate(selectedDate);
      if (Platform.OS === 'android') {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        onDateChange(formattedDate);
      }
    }
  };

  const handleConfirm = () => {
    const formattedDate = tempDate.toISOString().split('T')[0];
    onDateChange(formattedDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempDate(value ? new Date(value) : new Date());
    setShowPicker(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return placeholder;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[
          styles.dateButton,
          {
            borderColor: error ? colors.icon.danger : colors.border.primary,
            backgroundColor: colors.background.primary,
          }
        ]}
      >
        <Calendar size={20} color={colors.icon.secondary} />
        <Text style={[
          styles.dateText,
          {
            color: value ? colors.text.primary : colors.text.secondary,
          }
        ]}>
          {formatDisplayDate(value)}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: colors.icon.danger }]}>
          {error}
        </Text>
      )}

      {Platform.OS === 'ios' ? (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <Card style={[styles.modalContent, { backgroundColor: colors.background.primary }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                  Select Date
                </Text>
                <TouchableOpacity onPress={handleCancel}>
                  <X size={24} color={colors.icon.secondary} />
                </TouchableOpacity>
              </View>
              
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleDateSelect}
                style={styles.iosPicker}
              />
              
              <View style={styles.modalButtons}>
                <Button
                  variant="outline"
                  onPress={handleCancel}
                  style={styles.modalButton}
                >
                  <Text style={{ color: colors.text.primary }}>Cancel</Text>
                </Button>
                <Button
                  onPress={handleConfirm}
                  style={[styles.modalButton, { backgroundColor: colors.icon.primary }]}
                >
                  <Text style={{ color: colors.text.inverse }}>Confirm</Text>
                </Button>
              </View>
            </Card>
          </View>
        </Modal>
      ) : (
        showPicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={handleDateSelect}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Reduced from 12 to 8 for smaller size
    borderWidth: 1,
    borderRadius: 8,
    gap: 8, // Reduced gap as well
    minHeight: 40, // Reduced height to match smaller inputs
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  iosPicker: {
    marginVertical: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
  },
});
