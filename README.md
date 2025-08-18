# Welcome to your Expo app 👋

# MessMate Mobile App

A React Native app built with Expo for meal management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on different platforms
npm run android  # Android emulator
npm run ios      # iOS simulator
npm run web      # Web browser
```

## 🛠️ Tech Stack

- **React Native** with Expo Router
- **NativeWind** (Tailwind CSS for React Native)
- **TypeScript** for type safety
- **Zustand** for state management
- **React Query** for API calls
- **Axios** for HTTP requests

## 📁 Project Structure

```
mobile/
├── app/               # App screens (Expo Router)
│   ├── index.tsx     # Home screen
│   ├── _layout.tsx   # Root layout
│   └── +not-found.tsx
├── src/              # Source code
│   ├── api/          # API clients
│   ├── stores/       # State management
│   ├── types/        # TypeScript types
│   └── utils/        # Utilities
├── components/       # Reusable components
├── assets/          # Images, fonts, etc.
└── global.css       # Global styles
```

## 🎨 Styling

Uses NativeWind (Tailwind CSS) for styling. Custom colors defined in `tailwind.config.js`:

- Primary: Blue theme
- Secondary: Gray theme

## 🔗 Backend Integration

Connects to NestJS backend running on `localhost:3000`. Update `src/utils/constants.ts` for different environments.

## 📱 Development

The app is set up for rapid development with:

- Hot reloading
- TypeScript support
- ESLint configuration
- Tailwind CSS classes
