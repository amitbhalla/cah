/**
 * Google Apps Script for CAH Advisory Contact Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Sheets and create a new spreadsheet
 * 2. Name the first sheet "Contact Submissions"
 * 3. Add headers in Row 1: Timestamp | Name | Email | Query | Submitted At
 * 4. Go to Extensions > Apps Script
 * 5. Delete any existing code and paste this entire script
 * 6. Save the project (give it a name like "CAH Contact Form Handler")
 * 7. Click "Deploy" > "New deployment"
 * 8. Select type: "Web app"
 * 9. Set "Execute as": "Me"
 * 10. Set "Who has access": "Anyone"
 * 11. Click "Deploy" and authorize the app
 * 12. Copy the Web App URL and paste it in script.js (replace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL)
 */

// Configuration
const NOTIFICATION_EMAILS = ['cahowe1@gmail.com', 'amit9815@gmail.com'];
const SHEET_NAME = 'Contact Submissions';

/**
 * Handles POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Save to Google Sheet
    saveToSheet(data);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error and return error response
    console.error('Error processing form:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'CAH Advisory Contact Form Handler is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Saves the form data to Google Sheet
 */
function saveToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Query', 'Submitted At']]);
    // Format header row
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // Format timestamp for display
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  
  // Append the new row
  sheet.appendRow([
    formattedDate,
    data.name || '',
    data.email || '',
    data.query || '',
    data.timestamp || ''
  ]);
  
  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, 5);
}

/**
 * Sends email notification about new form submission
 */
function sendEmailNotification(data) {
  const subject = '🔔 New Contact Form Submission - CAH Advisory';
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1a2332; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a2332; color: #faf8f5; padding: 20px; text-align: center; }
        .header h1 { margin: 0; color: #c9a96e; font-size: 24px; }
        .content { background: #faf8f5; padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #c9a96e; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .value { margin-top: 5px; padding: 15px; background: #ffffff; border-left: 3px solid #c9a96e; }
        .footer { background: #1a2332; color: #faf8f5; padding: 15px; text-align: center; font-size: 12px; }
        .footer a { color: #c9a96e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Website Inquiry</h1>
        </div>
        <div class="content">
          <p>A new inquiry has been submitted through your CAH Advisory website:</p>
          
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="value">${escapeHtml(data.query).replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Submitted At</div>
            <div class="value">${new Date(data.timestamp).toLocaleString()}</div>
          </div>
          
          <p style="margin-top: 30px;">
            <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your inquiry to CAH Advisory" 
               style="display: inline-block; padding: 12px 25px; background: #c9a96e; color: #ffffff; text-decoration: none; border-radius: 3px;">
              Reply to ${escapeHtml(data.name)}
            </a>
          </p>
        </div>
        <div class="footer">
          <p>This notification was sent from your CAH Advisory website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const plainBody = `
New Contact Form Submission - CAH Advisory
==========================================

Name: ${data.name}
Email: ${data.email}
Submitted At: ${new Date(data.timestamp).toLocaleString()}

Message:
${data.query}

---
Reply to this inquiry by emailing: ${data.email}
  `;
  
  // Send the email to all recipients
  NOTIFICATION_EMAILS.forEach(email => {
    GmailApp.sendEmail(email, subject, plainBody, {
      htmlBody: htmlBody,
      name: 'CAH Advisory Website'
    });
  });
}

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Test function - run this to test email sending
 */
function testEmailNotification() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    query: 'This is a test message to verify the email notification is working correctly.',
    timestamp: new Date().toISOString()
  };
  
  sendEmailNotification(testData);
  console.log('Test email sent to ' + NOTIFICATION_EMAILS.join(', '));
}
