# MessMate Mobile App

> 🍽️ A modern React Native mobile application for managing meal entries and expenses.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure network settings
./configure-network.sh

# Start development server
npm start
```

## 📱 Features

- ✅ **Authentication System** - JWT-based signin/signup with real API
- ✅ **Meal Management** - Add, view, and manage meal entries
- ✅ **Professional UI** - Built with gluestack-ui v2 and custom MessMate theme
- ✅ **Cross-Platform** - iOS, Android, and Web support
- ✅ **Real-time Sync** - Connected to NestJS backend API

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **UI Library**: gluestack-ui v2
- **Navigation**: Expo Router (file-based)
- **State Management**: React Context + AsyncStorage
- **API Client**: Custom fetch-based client with JWT handling
- **Development**: TypeScript, ESLint, Prettier

## 📚 Documentation

### 📖 **Setup & Configuration**
- [Environment Configuration](docs/ENV_CONFIG.md) - API endpoints and environment variables
- [Network Troubleshooting](docs/NETWORK_TROUBLESHOOTING.md) - Fixing connectivity issues

### 🎨 **Design & UI**
- [Theme Guide](docs/THEME_GUIDE.md) - MessMate design system and theming
- [Component Library](docs/COMPONENT_LIBRARY.md) - UI components and usage
- [Logo Design](docs/LOGO_DESIGN.md) - MessMate logo implementation

### 🔐 **Features**
- [Authentication Implementation](docs/AUTH_IMPLEMENTATION.md) - Login/signup flow
- [TODO & Roadmap](docs/TODO.md) - Feature planning and development roadmap

## 🔧 Development

### **Prerequisites**
- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator / Physical Device

### **Environment Setup**
1. Copy environment template: `cp .env.example .env`
2. Configure network settings: `./configure-network.sh`
3. Start backend server on port 4000
4. Run mobile app: `npm start`

### **Testing**
- **Web**: `http://localhost:8081`
- **Physical Device**: Scan QR code with Expo Go
- **Emulator**: Press `a` (Android) or `i` (iOS)

## 🌐 API Integration

The mobile app connects to the NestJS backend API:
- **Authentication**: `/auth/signin`, `/auth/signup`
- **User Profile**: `/user/profile`
- **Meal Entries**: `/meal-entries` (CRUD operations)
- **Real-time Updates**: Automatic token management and refresh

## 📁 Project Structure

```
mobile/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── docs/                 # Documentation
└── configure-network.sh  # Network setup helper
```

## 🤝 Contributing

1. Follow the established code style (ESLint + Prettier)
2. Update documentation for new features
3. Test on multiple platforms before submitting
4. Use conventional commit messages

## 📄 License

This project is part of the MessMate meal management system.
