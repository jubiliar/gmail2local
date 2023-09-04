# gmail2local
modify this in the script
const CLIENT_ID = "client_id"; - client_id is extracted from https://console.cloud.google.com/apis/credentials under OAuth 2.0 Client IDs

const CLIENT_SECRET = 'client_secret'; - client_secret is extracted from https://console.cloud.google.com/apis/credentials under OAuth 2.0 Client IDs

const EMAIL_ADDRESS = 'email@gmail.com'; - this represents the mail from where to download the attachments

const SAVE_PATH = 'G:\\folder\\file_prefix_'; - this is the local path where the attachments will be download

access_token: "access_token", - access_token I extracted from https://developers.google.com/oauthplayground/. The script can be adapted to do this step automatically but this is what we have 

refresh_token: "refresh_token",- refresh_token I extracted from https://developers.google.com/oauthplayground/. The script can be adapted to do this step automatically but this is what we have 

expiry_date: '2023-11-04T10:07:32.000Z', - put here the tomorrow date.

//q: `from:${EMAIL_ADDRESS}`,//use this to download from INBOX - uncomment this to retrieve attachments from inbox and comment the q: `from:${EMAIL_ADDRESS} in:sent`
q: `from:${EMAIL_ADDRESS} in:sent`,//use this to download from SENT - comment this and un-comment q: `from:${EMAIL_ADDRESS}` to retrieve attachments from inbox

 Setup:
Under the google account from where you want to download the attachments:
1.	navigate to https://console.cloud.google.com/
2.	create a project and select it 
3.	(be sure that the selected project appears on the upper side of the screen top left near the Google Cloud log)
4.	Click on the three horizontal lines on the top left part of the screen and extend More Products then go to APIs and service and extend it and select Library
5.	In the search box search for GMAIL API, click on it and the click on Enable to enable it.
6.	Click on the three horizontal lines on the top left part of the screen and extend More Products then go to APIs and service and extend it and select Credentials
7.	Click on Create Credentials and select OAuth client ID
8.	If prompted to create “OAuth consent screen”, create this first and then go to step 7 and create Credentials 
9.	At the moment you have the client_id and client_secret
10.	Navigate to https://developers.google.com/oauthplayground/
11.	From step 1 select GMAIL SCRIPT API v1 and select https://mail.google.com/ 
12.	Click on Authorize APIs
13.	From step 2 click on “Exchange authorization code for tokens”
14.	At this moment you have refresh token and access token valid for one hour.
15.	After this you need to fill this data in the download_attachments.js script.
To execute the script:
1.	Open a cmd prompt with admin privileges.
2.	Cd to the script location
3.	npm install google-auth-library
4.	install node from  https://nodejs.org/ro
5.	close cmd 
6.	Open a cmd prompt with admin privileges.
7.	Cd to the script location
8.	Execute script 
9.	node download_attachments.js



