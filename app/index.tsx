import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { ButtonText, Button } from '../components/ui/button';
import { Input, InputField } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallbackText } from '../components/ui/avatar';
import { Spinner } from '../components/ui/spinner';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '../components/ui/modal';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from '../components/ui/alert-dialog';
import { ToastProvider } from '@gluestack-ui/toast';

function HomeContent() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <ScrollView className="flex-1 bg-background-0">
      {/* Header Section */}
      <View className="bg-primary-500 px-6 pt-12 pb-8">
        <View className="mb-6">
          <Text className="text-4xl font-bold text-white mb-2">
            MessMate UI Demo 🍽️
          </Text>
          <Text className="text-primary-100 text-lg">
            Complete gluestack-ui component showcase
          </Text>
        </View>
      </View>

      <View className="px-6 py-6 -mt-4">
        {/* Avatar Section */}
        <Card className="p-4 mb-6">
          <Text className="text-xl font-bold text-typography-900 mb-4">
            Avatar Components
          </Text>
          <View className="flex-row space-x-4 items-center">
            <Avatar className="bg-secondary-500">
              <AvatarFallbackText>JD</AvatarFallbackText>
            </Avatar>
            <Avatar className="bg-primary-500">
              <AvatarFallbackText>MS</AvatarFallbackText>
            </Avatar>
            <Avatar className="bg-tertiary-500">
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b90e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
              />
              <AvatarFallbackText>SS</AvatarFallbackText>
            </Avatar>
          </View>
        </Card>

        {/* Button Components */}
        <Card className="p-4 mb-6">
          <Text className="text-xl font-bold text-typography-900 mb-4">
            Button Components
          </Text>
          <View className="space-y-3">
            <Button action="primary" variant="solid">
              <ButtonText>Primary Button</ButtonText>
            </Button>
            <Button action="secondary" variant="solid">
              <ButtonText>Secondary Button</ButtonText>
            </Button>
            <Button action="positive" variant="outline">
              <ButtonText>Success Outline</ButtonText>
            </Button>
            <Button action="negative" variant="link">
              <ButtonText>Danger Link</ButtonText>
            </Button>
          </View>
        </Card>

        {/* Input Components */}
        <Card className="p-4 mb-6">
          <Text className="text-xl font-bold text-typography-900 mb-4">
            Input Components
          </Text>
          <View className="space-y-4">
            <Input>
              <InputField
                placeholder="Enter your name"
                value={inputValue}
                onChangeText={setInputValue}
              />
            </Input>
            <Input variant="outline">
              <InputField placeholder="Email address" />
            </Input>
            <Input>
              <InputField placeholder="Password" secureTextEntry />
            </Input>
          </View>
        </Card>

        {/* Loading Components */}
        <Card className="p-4 mb-6">
          <Text className="text-xl font-bold text-typography-900 mb-4">
            Loading Components
          </Text>
          <View className="flex-row space-x-4 items-center">
            <Spinner color="$primary500" />
            <Spinner color="$secondary500" size="large" />
            <Spinner color="$tertiary500" size="small" />
          </View>
        </Card>

        {/* Modal & Alert Dialogs */}
        <Card className="p-4 mb-6">
          <Text className="text-xl font-bold text-typography-900 mb-4">
            Modal & Alert Components
          </Text>
          <View className="space-y-3">
            <Button onPress={() => setShowModal(true)} action="primary">
              <ButtonText>Show Modal</ButtonText>
            </Button>
            <Button onPress={() => setShowAlert(true)} action="negative">
              <ButtonText>Show Alert Dialog</ButtonText>
            </Button>
          </View>
        </Card>

        {/* Final Demo */}
        <View className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-strong">
          <Text className="text-white text-xl font-bold mb-2">
            🚀 Complete UI Library Ready!
          </Text>
          <Text className="text-gray-300 mb-4">
            All gluestack-ui components with beautiful orange-green theme, perfect for MessMate!
          </Text>
        </View>
      </View>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-lg font-semibold">Demo Modal</Text>
            <ModalCloseButton onPress={() => setShowModal(false)} />
          </ModalHeader>
          <ModalBody>
            <Text>
              This is a beautiful modal from gluestack-ui. You can add any content here!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button action="secondary" onPress={() => setShowModal(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button action="primary" onPress={() => setShowModal(false)}>
              <ButtonText>Save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert Dialog */}
      <AlertDialog isOpen={showAlert} onClose={() => setShowAlert(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="text-lg font-semibold">Confirm Action</Text>
            <AlertDialogCloseButton onPress={() => setShowAlert(false)} />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              Are you sure you want to delete this meal entry? This action cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button action="secondary" onPress={() => setShowAlert(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button action="negative" onPress={() => setShowAlert(false)}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
