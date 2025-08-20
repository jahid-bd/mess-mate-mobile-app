import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import { Check, ChevronDown, User, X } from 'lucide-react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { Card } from '../../components/ui/card';
import { User as UserType } from '../types/api';

interface UserSelectorProps {
  users: UserType[];
  selectedUserId: number | null;
  onUserSelect: (userId: number | null) => void;
  placeholder?: string;
  error?: string;
  currentUserId?: number;
  showCurrentUserFirst?: boolean;
}

export function UserSelector({ 
  users, 
  selectedUserId, 
  onUserSelect, 
  placeholder = 'Select user',
  error,
  currentUserId,
  showCurrentUserFirst = true 
}: UserSelectorProps) {
  const colors = useThemeColors();
  const [showPicker, setShowPicker] = useState(false);

  // Sort users to show current user first if enabled
  const sortedUsers = showCurrentUserFirst && currentUserId 
    ? [...users].sort((a, b) => {
        if (a.id === currentUserId) return -1;
        if (b.id === currentUserId) return 1;
        return a.name?.localeCompare(b.name || '') || 0;
      })
    : users;

  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleUserSelect = (userId: number | null) => {
    onUserSelect(userId);
    setShowPicker(false);
  };

  const getUserDisplayName = (user: UserType) => {
    const name = user.name || user.email.split('@')[0];
    return user.id === currentUserId ? `${name} (Me)` : name;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[
          styles.userButton,
          {
            borderColor: error ? colors.icon.danger : colors.border.primary,
            backgroundColor: colors.background.primary,
          }
        ]}
      >
        <User size={20} color={colors.icon.secondary} />
        <Text style={[
          styles.userText,
          {
            color: selectedUser ? colors.text.primary : colors.text.secondary,
          }
        ]}>
          {selectedUser ? getUserDisplayName(selectedUser) : placeholder}
        </Text>
        <ChevronDown size={20} color={colors.icon.secondary} />
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: colors.icon.danger }]}>
          {error}
        </Text>
      )}

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={[styles.modalContent, { backgroundColor: colors.background.primary }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                Select User
              </Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <X size={24} color={colors.icon.secondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.usersList} showsVerticalScrollIndicator={false}>
              {sortedUsers.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  onPress={() => handleUserSelect(user.id)}
                  style={[
                    styles.userItem,
                    {
                      backgroundColor: selectedUserId === user.id 
                        ? colors.primary[50] 
                        : 'transparent',
                      borderBottomColor: colors.border.secondary,
                    }
                  ]}
                >
                  <View style={styles.userInfo}>
                    <Text style={[
                      styles.userName,
                      { 
                        color: colors.text.primary,
                        fontWeight: user.id === currentUserId ? '600' : '400'
                      }
                    ]}>
                      {getUserDisplayName(user)}
                    </Text>
                    <Text style={[styles.userEmail, { color: colors.text.secondary }]}>
                      {user.email}
                    </Text>
                    {user.role === 'ADMIN' && (
                      <View style={[styles.adminBadge, { backgroundColor: colors.primary[100] }]}>
                        <Text style={[styles.adminText, { color: colors.primary[700] }]}>
                          Admin
                        </Text>
                      </View>
                    )}
                  </View>
                  {selectedUserId === user.id && (
                    <Check size={20} color={colors.primary[600]} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Reduced from 12 to 8 for smaller size
    borderWidth: 1,
    borderRadius: 8,
    gap: 8, // Reduced gap as well
    minHeight: 40, // Reduced height to match smaller inputs
  },
  userText: {
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
    maxHeight: '60%',
    borderRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  usersList: {
    maxHeight: 300,
    paddingHorizontal: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  adminBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  adminText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
