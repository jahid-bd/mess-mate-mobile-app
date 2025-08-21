import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Edit3, Trash2, X } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { MealEntry } from '../types/api';

interface MealActionModalProps {
  visible: boolean;
  meal: MealEntry | null;
  onClose: () => void;
  onEdit: (meal: MealEntry) => void;
  onDelete: (meal: MealEntry) => void;
}

export function MealActionModal({
  visible,
  meal,
  onClose,
  onEdit,
  onDelete,
}: MealActionModalProps) {
  const colors = useThemeColors();

  if (!meal) return null;

  const getMealTypeLabel = (type: string) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const handleEdit = () => {
    onEdit(meal);
    onClose();
  };

  const handleDelete = () => {
    onDelete(meal);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: colors.background.primary,
                borderRadius: 16,
                padding: 24,
                width: '100%',
                maxWidth: 320,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: colors.text.primary,
                  }}
                >
                  Meal Actions
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    padding: 4,
                  }}
                >
                  <X size={20} color={colors.icon.muted} />
                </TouchableOpacity>
              </View>

              {/* Meal Info */}
              <View
                style={{
                  backgroundColor: colors.background.secondary,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: colors.text.primary,
                    marginBottom: 4,
                  }}
                >
                  {getMealTypeLabel(meal.type)} - {meal.amount} meal{meal.amount > 1 ? 's' : ''}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.text.secondary,
                  }}
                >
                  {new Date(meal.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                {meal.user && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.text.secondary,
                      marginTop: 2,
                    }}
                  >
                    By: {meal.user.name || meal.user.email}
                  </Text>
                )}
                {meal.note && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.text.tertiary,
                      fontStyle: 'italic',
                      marginTop: 4,
                    }}
                  >
                    &ldquo;{meal.note}&rdquo;
                  </Text>
                )}
              </View>

              {/* Action Buttons */}
              <View style={{ gap: 12 }}>
                <TouchableOpacity
                  onPress={handleEdit}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    backgroundColor: colors.primary[50],
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.primary[500],
                  }}
                >
                  <Edit3 size={20} color={colors.primary[600]} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.primary[700],
                      marginLeft: 12,
                    }}
                  >
                    Edit Meal Entry
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDelete}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    backgroundColor: colors.error[50],
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.error[500],
                  }}
                >
                  <Trash2 size={20} color={colors.error[600]} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.error[700],
                      marginLeft: 12,
                    }}
                  >
                    Delete Meal Entry
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={onClose}
                style={{
                  marginTop: 16,
                  padding: 12,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.text.secondary,
                    fontWeight: '500',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
