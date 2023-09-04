const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = "client_id";
const CLIENT_SECRET = 'client_secret';
const REDIRECT_URL = 'http://localhost';
const EMAIL_ADDRESS = 'email@gmail.com';
const SAVE_PATH = 'G:\\folder\\file_prefix_';
const START_PAGE = 1; // page to start downloading attachments

// Configure the OAuth2 client
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// Set the OAuth2 tokens (you need to obtain these tokens through OAuth2 authentication)
const tokens = {
  access_token: "access_token",
  refresh_token: "refresh_token",
  expiry_date: '2023-11-04T10:07:32.000Z',
};

// Set OAuth2 credentials
oauth2Client.setCredentials(tokens);

// Create a Gmail API instance
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Function to check if authentication is successful
async function checkAuthentication() {
  try {
    const userInfo = await gmail.users.getProfile({ userId: 'me' });
    console.log(`Authentication successful for user: ${userInfo.data.emailAddress}`);
    return true;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    return false;
  }
}

// Function to download attachments from all pages of emails
async function downloadAttachmentsFromAllPages() {
  if (!(await checkAuthentication())) {
    return;
  }

  try {
    let nextPageToken = null;
	let pageCounter = 1;

    do {
      const response = await gmail.users.messages.list({
        userId: 'me',
        //q: `from:${EMAIL_ADDRESS}`,//use this to download from INBOX
		q: `from:${EMAIL_ADDRESS} in:sent`,//use this to download from SENT
        pageToken: nextPageToken,
      });

      const messages = response.data.messages;

      for (const message of messages) {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });

        const attachments = msg.data.payload.parts;

        if (attachments && attachments.length > 0) {
          for (const attachment of attachments) {
            if (attachment.filename) {
              if (pageCounter >= START_PAGE) {
                const data = await gmail.users.messages.attachments.get({
                  userId: 'me',
                  messageId: message.id,
                  id: attachment.body.attachmentId,
                });

                const fileData = Buffer.from(data.data.data, 'base64');
                const filePath = `${SAVE_PATH}${attachment.filename}`;

                // Save the attachment locally
                fs.writeFileSync(filePath, fileData);
                console.log(`Attachment saved: ${filePath}`);
              }
            }
          }
        }
      }
	  
	  console.log(`Page: ${pageCounter}`);
      nextPageToken = response.data.nextPageToken;
	  pageCounter++;
	  
    } while (nextPageToken);

    console.log('All attachments downloaded successfully.');
  } catch (error) {
    console.error('Error downloading attachments:', error);
  }
}

// Run the downloadAttachmentsFromAllPages function to start downloading attachments from all pages
downloadAttachmentsFromAllPages();
