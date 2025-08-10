const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets Webhook URL - Replace with your actual webhook URL
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzH7xXPf8NEO5-HjD6MBqQfIU3HkbA6ruPYbwajX5ynygJE2h2upAnhjtx29gnIJkVV7w/exec';

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'WizeWealth Newsletter Backend is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Newsletter subscription endpoint
app.post('/subscribe', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validate input
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone number are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Basic phone validation (accepts various formats)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      });
    }

    // Prepare data for Google Sheets
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('phone', phone);

    // Send data to Google Sheets webhook
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      console.log(`New subscription: ${email} - ${phone}`);
      res.json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      });
    } else {
      console.error('Google Sheets webhook error:', response.status, response.statusText);
      res.status(500).json({
        success: false,
        message: 'Failed to save subscription. Please try again later.'
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 WizeWealth Newsletter Backend running on port ${PORT}`);
  console.log(`📧 Newsletter endpoint: http://localhost:${PORT}/subscribe`);
  console.log(`🔗 Health check: http://localhost:${PORT}/`);
}); 