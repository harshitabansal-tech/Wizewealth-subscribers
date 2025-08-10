#!/bin/bash

# WizeWealth Newsletter System Deployment Script
echo "🚀 WizeWealth Newsletter System Deployment"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Test the server locally
echo "🧪 Testing server locally..."
node server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Test the health endpoint
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is running locally on http://localhost:3000"
else
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Stop the test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 Local setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a Google Sheet named 'WizeWealth Subscribers'"
echo "2. Deploy the Google Apps Script (see google-apps-script.js)"
echo "3. Create a GitHub repository and push server.js and package.json"
echo "4. Deploy to Render.com (see README.md for detailed instructions)"
echo "5. Update the webhook URL in server.js"
echo "6. Deploy the frontend to Vercel or Netlify"
echo ""
echo "📚 See README.md for detailed deployment instructions" 