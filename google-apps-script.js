// Google Apps Script for WizeWealth Newsletter Webhook
// Deploy this as a Web App with "Anyone" access

function doPost(e) {
  try {
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Subscribers') || spreadsheet.getActiveSheet();
    
    // Parse the incoming data
    const data = e.parameter;
    const email = data.email;
    const phone = data.phone;
    const timestamp = new Date().toISOString();
    
    // Validate input
    if (!email || !phone) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Email and phone are required'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if headers exist, if not add them
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.getRange(1, 1, 1, 3).setValues([['email', 'phone', 'timestamp']]);
    }
    
    // Add new subscription data
    const newRow = [email, phone, timestamp];
    sheet.appendRow(newRow);
    
    // Log the subscription
    console.log(`New subscription added: ${email} - ${phone} at ${timestamp}`);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Subscription added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in webhook:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Internal server error'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Health check endpoint
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'healthy',
      message: 'WizeWealth Newsletter Webhook is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper function to test the webhook locally
function testWebhook() {
  const testData = {
    email: 'test@example.com',
    phone: '+1234567890'
  };
  
  const response = doPost({
    parameter: testData
  });
  
  console.log('Test response:', response.getContent());
}