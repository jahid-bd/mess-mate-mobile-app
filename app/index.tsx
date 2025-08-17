import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  Modal, 
  AlertModal, 
  Loading, 
  LoadingOverlay,
  LoadingSkeleton as Skeleton,
  CardSkeleton,
  Toast,
  ToastProvider,
  useToast
} from '../components/ui';

function HomeContent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { showToast } = useToast();

  const handleShowToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    showToast({
      message: `This is a ${type} toast message!`,
      type,
      duration: 3000,
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-gradient-to-br from-primary-500 to-primary-700 px-6 pt-12 pb-8">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-white mb-2">
            MessMate UI Demo �
          </Text>
          <Text className="text-primary-100 text-lg">
            Complete component library showcase
          </Text>
        </View>
      </View>

      <View className="px-6 py-6 -mt-4">
        {/* Button Components */}
        <Card title="Button Components" className="mb-6">
          <View className="space-y-3">
            <Button
              title="Primary Button"
              onPress={() => handleShowToast('success')}
              variant="primary"
            />
            <Button
              title="Secondary Button"
              onPress={() => handleShowToast('info')}
              variant="secondary"
            />
            <Button
              title="Outline Button"
              onPress={() => handleShowToast('warning')}
              variant="outline"
            />
            <Button
              title="Ghost Button"
              onPress={() => handleShowToast('error')}
              variant="ghost"
            />
            <Button
              title="Danger Button"
              onPress={() => setAlertVisible(true)}
              variant="danger"
            />
            <Button
              title="Loading Button"
              onPress={() => {}}
              loading
              variant="primary"
            />
          </View>
        </Card>

        {/* Input Components */}
        <Card title="Input Components" className="mb-6">
          <View className="space-y-4">
            <Input
              label="Basic Input"
              placeholder="Enter your name"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Input
              label="Email Input"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password Input"
              placeholder="Enter password"
              secureTextEntry
            />
            <Input
              label="Input with Error"
              placeholder="This has an error"
              error="This field is required"
            />
            <Input
              label="Disabled Input"
              placeholder="This is disabled"
              disabled
            />
            <Input
              label="Multiline Input"
              placeholder="Enter your thoughts..."
              multiline
            />
          </View>
        </Card>

        {/* Modal Components */}
        <Card title="Modal Components" className="mb-6">
          <View className="space-y-3">
            <Button
              title="Show Modal"
              onPress={() => setModalVisible(true)}
              variant="primary"
            />
            <Button
              title="Show Alert"
              onPress={() => setAlertVisible(true)}
              variant="outline"
            />
            <Button
              title="Show Loading Overlay"
              onPress={() => {
                setLoadingVisible(true);
                setTimeout(() => setLoadingVisible(false), 2000);
              }}
              variant="secondary"
            />
          </View>
        </Card>

        {/* Card Variants */}
        <Card title="Card Variants" className="mb-6">
          <View className="space-y-4">
            <Card variant="default" padding="sm">
              <Text className="text-gray-700">Default Card</Text>
            </Card>
            <Card variant="outlined" padding="sm">
              <Text className="text-gray-700">Outlined Card</Text>
            </Card>
            <Card variant="gradient" padding="sm">
              <Text className="text-white">Gradient Card</Text>
            </Card>
          </View>
        </Card>

        {/* Loading Components */}
        <Card title="Loading Components" className="mb-6">
          <View className="space-y-4">
            <Loading text="Basic Loading..." />
            <View className="border border-gray-200 rounded-xl p-4">
              <Text className="text-gray-700 mb-3 font-medium">Skeleton Loading:</Text>
              <Skeleton height={24} width="60%" className="mb-2" />
              <Skeleton height={16} width="100%" className="mb-2" />
              <Skeleton height={16} width="80%" />
            </View>
            <CardSkeleton />
          </View>
        </Card>

        {/* Theme Colors */}
        <Card title="Theme Colors" className="mb-6">
          <View className="flex-row flex-wrap gap-3">
            <View className="items-center">
              <View className="bg-primary-500 w-12 h-12 rounded-xl mb-1" />
              <Text className="text-xs text-gray-600">Primary</Text>
            </View>
            <View className="items-center">
              <View className="bg-secondary-500 w-12 h-12 rounded-xl mb-1" />
              <Text className="text-xs text-gray-600">Secondary</Text>
            </View>
            <View className="items-center">
              <View className="bg-accent-500 w-12 h-12 rounded-xl mb-1" />
              <Text className="text-xs text-gray-600">Accent</Text>
            </View>
            <View className="items-center">
              <View className="bg-success w-12 h-12 rounded-xl mb-1" />
              <Text className="text-xs text-gray-600">Success</Text>
            </View>
            <View className="items-center">
              <View className="bg-error w-12 h-12 rounded-xl mb-1" />
              <Text className="text-xs text-gray-600">Error</Text>
            </View>
            <View className="items-center">
              <View className="bg-warning w-12 h-12 rounded-xl mb-1" />
              <Text className="text-xs text-gray-600">Warning</Text>
            </View>
          </View>
        </Card>

        {/* Final Demo */}
        <View className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-strong">
          <Text className="text-white text-xl font-bold mb-2">
            🚀 Complete UI Library Ready!
          </Text>
          <Text className="text-gray-300 mb-4">
            All components built with modern design, full TypeScript support, and consistent theming.
          </Text>
          <Button
            title="Start Building Features"
            onPress={() => handleShowToast('success')}
            variant="primary"
            className="bg-white"
          />
        </View>
      </View>

      {/* Modals */}
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Demo Modal"
        actions={
          <View className="flex-row space-x-3">
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              variant="ghost"
              className="flex-1"
            />
            <Button
              title="Confirm"
              onPress={() => {
                setModalVisible(false);
                handleShowToast('success');
              }}
              variant="primary"
              className="flex-1"
            />
          </View>
        }
      >
        <Text className="text-gray-700 text-base leading-relaxed">
          This is a demo modal with actions. You can customize the content, size, and behavior.
        </Text>
      </Modal>

      <AlertModal
        isVisible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action?"
        confirmText="Yes, Continue"
        cancelText="Cancel"
        variant="danger"
        onConfirm={() => handleShowToast('success')}
      />

      <LoadingOverlay
        isVisible={loadingVisible}
        text="Processing your request..."
      />

      {toastVisible && (
        <Toast
          message="This is a demo toast!"
          type="success"
          onHide={() => setToastVisible(false)}
        />
      )}
    </ScrollView>
  );
}

export default function HomeScreen() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
