# Environment Configuration

## 🔧 Quick Setup

### 1. **Automatic Configuration (Recommended)**
```bash
./configure-network.sh
```

### 2. **Manual Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

## 🌐 Environment Variables

### **Primary Configuration**
- `EXPO_PUBLIC_API_BASE_URL` - Main API endpoint (overrides platform detection)

### **Platform-Specific Fallbacks**
- `EXPO_PUBLIC_API_BASE_URL_LOCALHOST` - Web development
- `EXPO_PUBLIC_API_BASE_URL_ANDROID_EMULATOR` - Android AVD
- `EXPO_PUBLIC_API_BASE_URL_IOS_DEVICE` - iOS/Physical devices

### **Other Settings**
- `EXPO_PUBLIC_API_TIMEOUT` - Request timeout (milliseconds)
- `EXPO_PUBLIC_APP_NAME` - Application name
- `EXPO_PUBLIC_APP_VERSION` - Application version

## 📱 Development Scenarios

### **Physical Device (Cable/WiFi)**
```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.0.138:4000
```

### **Android Emulator**
```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:4000
```

### **Web Development**
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
```

## 🔍 Troubleshooting

### **Find Your IP Address**
```bash
hostname -I | awk '{print $1}'
```

### **Test API Connectivity**
```bash
curl -X POST http://YOUR_IP:4000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@meal.com","password":"password123"}'
```

### **Debug Network Issues**
Check console logs for:
- `🌐 API Request:` - Shows URL being used
- `⚙️ Environment Variables:` - Shows loaded config
- `🔍 Network Debug Result:` - Connection test results

## 📋 Configuration Priority

1. `EXPO_PUBLIC_API_BASE_URL` (if set)
2. Platform-specific fallback variables
3. Hardcoded platform defaults

## 🚨 Security Notes

- `.env` files are excluded from git
- Never commit API keys or sensitive data
- Use environment variables for production deployments
