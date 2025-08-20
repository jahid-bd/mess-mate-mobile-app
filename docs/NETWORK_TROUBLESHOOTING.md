# Network Troubleshooting Guide

## ✅ **Issues Fixed:**

### 1. **Platform-Specific URLs**
- **Web/Browser**: `http://localhost:4000`
- **Android Emulator**: `http://10.0.2.2:4000`
- **iOS Simulator/Physical Device**: `http://192.168.0.138:4000`

### 2. **Enhanced Error Logging**
- Added detailed console logs for all API requests
- Network debugging with connectivity checks
- Better error messages for different failure types

### 3. **CORS Configuration**
- Backend properly configured to allow all origins in development
- No additional CORS setup needed

## 🔧 **How to Test:**

### **Option 1: Test on Web (Recommended)**
1. Go to `http://localhost:8081` in your browser
2. Try signing up with: `test3@meal.com` / `password123` / `Test User 3`
3. Check browser console for detailed logs

### **Option 2: Test on Physical Device**
1. Make sure your phone and computer are on the same WiFi network
2. Scan the QR code with Expo Go app
3. Try the signup flow
4. Check logs in Expo Go app or Metro bundler

### **Option 3: Test on Android Emulator**
1. Press `a` in the Expo CLI to open Android emulator
2. Try the signup flow - should use `10.0.2.2:4000`

## 🐛 **If Still Having Issues:**

### **Check Backend Server:**
```bash
curl -X POST http://192.168.0.138:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test4@meal.com", "password": "password123", "name": "Test User 4"}'
```

### **Check Network Logs:**
1. Open the app
2. Try to sign up
3. Check the console logs for:
   - `🌐 API Request:` - Shows the URL being used
   - `📱 API Response:` or `🚨 Network Error:` - Shows what happened
   - `🔍 Network Debug Result:` - Shows connectivity test results

### **Common Solutions:**

1. **If using physical device:**
   - Ensure phone and computer are on same WiFi
   - Disable VPN on either device
   - Check firewall settings

2. **If using Android emulator:**
   - Make sure emulator is properly started
   - Try cold boot if needed

3. **If using iOS simulator:**
   - Restart simulator if needed
   - Check that Xcode is properly installed

## 📊 **Current Configuration:**

- **Backend**: Running on `http://localhost:4000` (verified working)
- **Mobile API Base URL**: Automatically detects platform and uses appropriate URL
- **CORS**: Enabled for all origins in development
- **Timeout**: 10 seconds for all requests
- **Error Handling**: Enhanced with network diagnostics

## 🎯 **Expected Behavior:**

When signup works correctly, you should see:
1. Console log: `🌐 API Request: POST http://[correct-url]:4000/auth/signup`
2. Console log: `📱 API Response: 201 Created` 
3. Console log: `✅ API Success: {access_token: "..."}`
4. App navigates to main tabs screen

If it fails, you'll see detailed error information in the console and a user-friendly error message.
