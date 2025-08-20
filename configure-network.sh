#!/bin/bash

# MessMate Mobile App - Network Configuration Helper
# This script helps configure the correct API base URL for your development setup

echo "🔧 MessMate Network Configuration Helper"
echo "=========================================="

# Get current IP address
CURRENT_IP=$(hostname -I | awk '{print $1}')
echo "📍 Your computer's IP address: $CURRENT_IP"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
fi

echo ""
echo "🎯 Choose your development setup:"
echo "1) Physical device (cable/WiFi) - Use IP: $CURRENT_IP"
echo "2) Android emulator (AVD) - Use: 10.0.2.2"
echo "3) Web development - Use: localhost"
echo "4) Custom IP address"
echo "5) Show current configuration"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "EXPO_PUBLIC_API_BASE_URL=http://$CURRENT_IP:4000" > .env.tmp
        grep -v "EXPO_PUBLIC_API_BASE_URL=" .env >> .env.tmp || true
        cat .env.tmp > .env
        rm .env.tmp
        echo "✅ Configured for physical device: http://$CURRENT_IP:4000"
        ;;
    2)
        echo "EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:4000" > .env.tmp
        grep -v "EXPO_PUBLIC_API_BASE_URL=" .env >> .env.tmp || true
        cat .env.tmp > .env
        rm .env.tmp
        echo "✅ Configured for Android emulator: http://10.0.2.2:4000"
        ;;
    3)
        echo "EXPO_PUBLIC_API_BASE_URL=http://localhost:4000" > .env.tmp
        grep -v "EXPO_PUBLIC_API_BASE_URL=" .env >> .env.tmp || true
        cat .env.tmp > .env
        rm .env.tmp
        echo "✅ Configured for web development: http://localhost:4000"
        ;;
    4)
        read -p "Enter custom IP address: " custom_ip
        echo "EXPO_PUBLIC_API_BASE_URL=http://$custom_ip:4000" > .env.tmp
        grep -v "EXPO_PUBLIC_API_BASE_URL=" .env >> .env.tmp || true
        cat .env.tmp > .env
        rm .env.tmp
        echo "✅ Configured for custom IP: http://$custom_ip:4000"
        ;;
    5)
        echo "📋 Current configuration:"
        if [ -f ".env" ]; then
            grep "EXPO_PUBLIC_API_BASE_URL" .env || echo "No EXPO_PUBLIC_API_BASE_URL found in .env"
        else
            echo "No .env file found"
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🚀 Next steps:"
echo "1. Make sure your backend server is running on port 4000"
echo "2. Restart Expo development server: npm start"
echo "3. Test the authentication flow"
echo ""
echo "💡 To test if your API is reachable:"
echo "curl -X POST http://$(grep EXPO_PUBLIC_API_BASE_URL .env | cut -d'=' -f2)/auth/signin \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"email\":\"admin@meal.com\",\"password\":\"password123\"}'"
