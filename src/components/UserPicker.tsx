import React, { useState } from 'react';
import { View, Text, ScrollView, Modal } from 'react-native';
import { Button, ButtonText } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { X, Check, User } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface UserOption {
  id: number;
  name: string;
  email: string;
}

interface UserPickerProps {
  visible: boolean;
  users: UserOption[];
  selectedUserId: number | null;
  onSelect: (userId: number | null) => void;
  onClose: () => void;
}

export function UserPicker({ visible, users, selectedUserId, onSelect, onClose }: UserPickerProps) {
  const colors = useThemeColors();
  const [tempSelected, setTempSelected] = useState(selectedUserId);

  const handleConfirm = () => {
    onSelect(tempSelected);
    onClose();
  };

  const userOptions = [
    { id: null, name: 'All Users', email: 'Show all meal entries' },
    ...users
  ];

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
              Filter by Person
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

          {/* User List */}
          <ScrollView style={{ maxHeight: 300, padding: 16 }}>
            <View style={{ gap: 8 }}>
              {userOptions.map((option) => (
                <Button
                  key={option.id || 'all'}
                  action={tempSelected === option.id ? "primary" : "secondary"}
                  variant={tempSelected === option.id ? "solid" : "outline"}
                  onPress={() => setTempSelected(option.id)}
                  style={{
                    justifyContent: 'space-between',
                    borderColor: colors.border.primary,
                    backgroundColor: tempSelected === option.id ? undefined : 'transparent'
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <User size={16} color={tempSelected === option.id ? colors.text.inverse : colors.icon.muted} />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: tempSelected === option.id ? colors.text.inverse : colors.text.primary
                      }}>
                        {option.name}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: tempSelected === option.id ? colors.text.inverse : colors.text.secondary,
                        opacity: 0.8
                      }}>
                        {option.email}
                      </Text>
                    </View>
                  </View>
                  {tempSelected === option.id && (
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
              style={{ 
                flex: 1,
                borderColor: colors.border.primary,
                backgroundColor: 'transparent'
              }}
              onPress={onClose}
            >
              <ButtonText style={{ color: colors.text.primary }}>Cancel</ButtonText>
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
