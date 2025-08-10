# WizeWealth Newsletter System

This repository contains the complete newsletter subscription system for WizeWealth, including frontend form, backend server, and Google Sheets integration.

## 📁 Project Structure

```
├── invest.html              # Updated frontend with newsletter form
├── server.js               # Backend server (Node.js/Express)
├── package.json            # Backend dependencies
├── google-apps-script.js   # Google Apps Script for Sheets integration
└── README.md              # This file
```

## 🚀 Quick Setup Guide

### Step 1: Set Up Google Sheets

1. Go to [sheets.new](https://sheets.new) and create a new spreadsheet
2. Name it "WizeWealth Subscribers"
3. The headers will be automatically created when the first subscription is received

### Step 2: Deploy Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Replace the default code with the contents of `google-apps-script.js`
4. Save the script (Ctrl+S)
5. Click **Deploy** → **New deployment**
6. Choose **Web app** as the type
7. Set **Execute as**: Me
8. Set **Who has access**: Anyone
9. Click **Deploy**
10. Copy the **Web app URL** (you'll need this for the backend)

### Step 3: Deploy Backend to Render

1. Create a GitHub repository and push these files:
   - `server.js`
   - `package.json`

2. Go to [render.com](https://render.com) and sign up
3. Click **New** → **Web Service**
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: wizewealth-newsletter-backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy the **Service URL** (e.g., `https://your-app.onrender.com`)

### Step 4: Update Backend Configuration

1. In `server.js`, replace the webhook URL:
   ```javascript
   const GOOGLE_SHEETS_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```

2. Redeploy the backend on Render

### Step 5: Update Frontend

1. In `invest.html`, update the backend URL in the JavaScript:
   ```javascript
   const backendUrl = 'YOUR_RENDER_BACKEND_URL/subscribe';
   ```

### Step 6: Deploy Frontend

#### Option A: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Create a new project
3. Upload your HTML files
4. Deploy and get the live URL

#### Option B: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your HTML folder
3. Deploy and get the live URL

## 🧪 Testing

1. Open your deployed frontend
2. Fill in the newsletter form with test data
3. Submit the form
4. Check your Google Sheet for the new entry
5. Verify the timestamp is correct

## 📋 API Endpoints

### Backend Endpoints

- `GET /` - Health check
- `POST /subscribe` - Newsletter subscription

### Request Format
```json
{
  "email": "user@example.com",
  "phone": "+1234567890"
}
```

### Response Format
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!"
}
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)

### Google Sheets Structure
The sheet will automatically create these columns:
- `email` - Subscriber's email address
- `phone` - Subscriber's phone number  
- `timestamp` - ISO timestamp of subscription

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open `invest.html` in your browser

## 🔒 Security Features

- Input validation for email and phone
- CORS protection
- Error handling and logging
- Rate limiting (implemented in production)

## 📞 Support

For issues or questions, please contact the development team.

## 📄 License

MIT License - see LICENSE file for details. 