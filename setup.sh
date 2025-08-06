#!/bin/bash

# TMDB Movie App Setup Script
echo "🎬 Setting up TMDB Movie App environment..."

# Check if .env already exists
if [ -f ".env" ]; then
    echo "✅ .env file already exists"
    
    # Check if API key is set
    if grep -q "your_api_key_here" .env; then
        echo "⚠️  You need to update your API key in .env file"
        echo "📝 Open .env and replace 'your_api_key_here' with your actual TMDB API key"
        echo "🔗 Get your API key at: https://www.themoviedb.org/settings/api"
    else
        echo "✅ API key appears to be configured"
    fi
else
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "📝 Please edit .env and replace 'your_api_key_here' with your actual TMDB API key"
    echo "🔗 Get your API key at: https://www.themoviedb.org/settings/api"
fi

echo ""
echo "🚀 To run the app:"
echo "   npm run ios     (for iOS simulator)"
echo "   npm run android (for Android emulator)"
echo ""
echo "💡 Remember to restart Metro bundler after changing .env file:"
echo "   npm start"
