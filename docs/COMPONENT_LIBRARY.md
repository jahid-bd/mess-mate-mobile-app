# MessMate Mobile - Component Library Documentation 📱

## Overview

A complete React Native component library built with **Expo Router**, **NativeWind v2**, and **TypeScript** for the MessMate mess management system.

## 🎨 Design System

### Theme

- **Modern Color Palette**: Primary (blue), secondary (indigo), accent (purple)
- **Status Colors**: Success (green), error (red), warning (amber), info (cyan)
- **Typography Scale**: Consistent font sizes and weights
- **Spacing System**: 4px base unit with logical increments
- **Border Radius**: Consistent rounded corners (6px, 8px, 12px, 16px)
- **Shadows**: Soft, medium, and strong elevation levels

### Utility

- **cn() Function**: Elegant class merging using `clsx`
- **Design Tokens**: Centralized theme configuration
- **TypeScript**: Full type safety across all components

## 🧩 Component Library

### Core Components

#### 1. Button

```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

- **Variants**: primary, secondary, outline, ghost, danger
- **Sizes**: sm, md, lg
- **Features**: Loading states, icons, disabled state, full TypeScript props

#### 2. Input

```tsx
<Input
  label="Email"
  placeholder="Enter email"
  variant="default"
  leftIcon="mail"
  showPasswordToggle
  error="Field is required"
/>
```

- **Variants**: default, filled, outlined
- **Features**: Labels, validation errors, helper text, icons, password toggle
- **Types**: All React Native TextInput props supported

#### 3. Card

```tsx
<Card>
  <Card.Header>
    <Text>Title</Text>
  </Card.Header>
  <Card.Content>Content here</Card.Content>
  <Card.Footer>Footer actions</Card.Footer>
</Card>
```

- **Variants**: default, outlined, gradient
- **Sections**: Header, Content, Footer
- **Features**: Flexible padding, shadows, borders

#### 4. Modal

```tsx
<Modal visible={isVisible} onClose={() => setVisible(false)} title="Modal Title">
  Modal content
</Modal>

<AlertModal
  visible={showAlert}
  title="Confirm Action"
  message="Are you sure?"
  onConfirm={handleConfirm}
  variant="danger"
/>
```

- **Types**: Standard modal, Alert modal
- **Features**: Backdrop blur, animations, action buttons
- **Variants**: default, danger, warning, success

#### 5. Loading & Skeletons

```tsx
<Loading text="Loading..." />
<LoadingOverlay visible={isLoading} text="Processing..." />

<Skeleton width="100%" height={20} />
<SkeletonText lines={3} />
<SkeletonAvatar size={40} />
<SkeletonCard />
```

- **Components**: Loading spinner, overlay, skeleton placeholders
- **Features**: Animated skeletons, customizable sizes, pre-built layouts

#### 6. Toast Notifications

```tsx
<ToastProvider>
  <App />
</ToastProvider>;

// Usage
const { showSuccessToast, showErrorToast } = useToast();
showSuccessToast('Operation successful!');
```

- **Types**: success, error, warning, info
- **Features**: Auto-dismiss, swipe to dismiss, queue management
- **Hook**: `useToast()` for easy access

### Enhanced Components

#### 7. Badge

```tsx
<Badge variant="success" size="md">
  New
</Badge>
```

- **Variants**: default, success, warning, error, info, secondary
- **Sizes**: sm, md, lg
- **Features**: Rounded design, consistent colors

#### 8. Avatar

```tsx
<Avatar initials="JD" size="md" status="online" />
<AvatarGroup max={3}>
  <Avatar initials="A1" />
  <Avatar initials="B2" />
  <Avatar initials="C3" />
  <Avatar initials="D4" />
</AvatarGroup>
```

- **Features**: Image support, initials fallback, status indicators
- **Variants**: circular, rounded, square
- **Sizes**: xs, sm, md, lg, xl, 2xl
- **Group**: Stacked avatars with overflow counter

#### 9. Tabs

```tsx
<Tabs
  items={tabItems}
  activeId={activeTab}
  onTabChange={setActiveTab}
  variant="underline"
/>
```

- **Variants**: default, pills, underline
- **Features**: Badges, scrollable tabs, controlled/uncontrolled
- **Responsive**: Works on all screen sizes

## 🚀 Getting Started

### Installation

```bash
cd mobile
npm install
npm start
```

### Import Components

```tsx
import {
  Button,
  Input,
  Card,
  Modal,
  Badge,
  Avatar,
  Tabs,
  Loading,
  Toast,
  ToastProvider,
} from '../components/ui';
```

## 🎯 Usage Examples

### Login Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showSuccessToast } = useToast();

  return (
    <Card>
      <Card.Header>
        <Text className="text-xl font-bold">Sign In</Text>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          leftIcon="mail"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          leftIcon="lock-closed"
          showPasswordToggle
        />
        <Button
          onPress={() => showSuccessToast('Login successful!')}
          className="mt-4"
        >
          Sign In
        </Button>
      </Card.Content>
    </Card>
  );
}
```

### Dashboard Card

```tsx
function StatsCard() {
  return (
    <Card>
      <Card.Header>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Monthly Summary</Text>
          <Badge variant="success">+12%</Badge>
        </View>
      </Card.Header>
      <Card.Content>
        <View className="flex-row items-center space-x-3">
          <Avatar initials="JD" status="online" />
          <View className="flex-1">
            <Text className="font-medium">John Doe</Text>
            <Text className="text-gray-600">Total Meals: 45</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
```

## 📱 Demo App

The main app (`app/index.tsx`) includes a comprehensive showcase of all components with:

- **Interactive Examples**: Working buttons, forms, modals
- **Visual Guide**: All variants, sizes, and states
- **Live Testing**: Real functionality and state management
- **Design Patterns**: Best practices for component usage

## 🎨 Customization

### Theme Customization

Edit `src/theme/index.ts` to customize:

- Colors and gradients
- Typography scales
- Spacing system
- Border radius values
- Shadow definitions

### Tailwind Configuration

Edit `tailwind.config.js` to:

- Add custom colors
- Extend spacing scale
- Add custom animations
- Configure responsive breakpoints

## 📂 File Structure

```
components/ui/
├── index.ts              # Component exports
├── Button.tsx            # Button component
├── Input.tsx             # Input component
├── Card.tsx              # Card component
├── Modal.tsx             # Modal components
├── Loading.tsx           # Loading components
├── Toast.tsx             # Toast system
├── Badge.tsx             # Badge component
├── Avatar.tsx            # Avatar components
├── Tabs.tsx              # Tab components
└── Skeleton.tsx          # Skeleton components

src/
├── theme/
│   └── index.ts          # Design system
└── utils/
    └── cn.ts             # Class utility
```

## ✅ Ready for MessMate Features

The component library is now ready for building MessMate features:

- **Authentication screens** with beautiful forms
- **Dashboard** with stats cards and charts
- **Meal tracking** with input forms and lists
- **Expense management** with data tables
- **User profiles** with avatar components
- **Navigation** with tab components

All components follow consistent design patterns, have full TypeScript support, and are optimized for mobile performance.
