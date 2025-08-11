// Reference to Firebase Realtime Database
const database = firebase.database().ref();

// DOM element references
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const emailElem = document.getElementById('email');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

// Event handler for button click
sendBtn.onclick = updateDB;

// Function to push new data to Firebase
function updateDB(event) {
  event.preventDefault();

  // Get current time
  const now = new Date();
  const date = now.toLocaleDateString(); // e.g. mm/dd/yyyy
  const time = now.toLocaleTimeString(); // e.g. hh:mm:ss AM/PM

  // Create message object
  const data = {
    USERNAME: usernameElem.value,
    MAIL: emailElem.value,
    MESSAGE: messageElem.value,
    DATE: date,
    TIME: time
  };

  // Log it for debugging
  console.log(data);

  // Push to Firebase
  database.push(data);

  // Reset message input only
  messageElem.value = '';
}

// Listen for new messages added to Firebase
database.on('child_added', addMessageToBoard);

// Add each new message to the message board
function addMessageToBoard(rowData) {
  const data = rowData.val();
  console.log(data);
  const singleMessage = makeSingleMessageHTML(data.USERNAME, data.MAIL, data.MESSAGE, data.DATE, data.TIME);
  allMessages.append(singleMessage);
}

// Create single message HTML block
function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt) {
  // Parent div
  const parentDiv = document.createElement('div');
  parentDiv.className = 'single-message';

  // Username
  const usernameP = document.createElement('p');
  usernameP.className = 'single-message-username';
  usernameP.textContent = usernameTxt;

  // Email
  const emailP = document.createElement('p');
  emailP.className = 'single-message-email';
  emailP.textContent = emailTxt;

  // Message
  const messageP = document.createElement('p');
  messageP.textContent = messageTxt;

  // Date
  const dateP = document.createElement('p');
  dateP.className = 'single-message-date';
  dateP.textContent = dateTxt;

  // Time
  const timeP = document.createElement('p');
  timeP.className = 'single-message-time';
  timeP.textContent = timeTxt;

  // Append all elements
  parentDiv.append(usernameP);
  parentDiv.append(emailP);
  parentDiv.append(messageP);
  parentDiv.append(dateP);
  parentDiv.append(timeP);

  return parentDiv;
}