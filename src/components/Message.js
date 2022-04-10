/* Component to display message data formatted into a table within a div with a class of message,
   rendered by the Conversation component */

import React from 'react';
import {useSelector} from 'react-redux';

function Message (props) {

  const messageData = props.data;
  const globalState = useSelector((state) => state);
  // const messagingMode = useSelector((state) => state.messaging.value.mode);
  const messagingMode = globalState.messaging.value.mode;
  const userId = globalState.user.value.id;

  // Method to format the sent date of message to be more readable to human eyes
  function formatSentDate() {
    const timeStamp = new Date(messageData.sent);
    let dateTimeString = '';
    const dayNum = timeStamp.getDate();
    dateTimeString += (dayNum < 10 ? `0${dayNum}/` : `${dayNum}/`);
    const month = timeStamp.getMonth();
    dateTimeString += (month < 10 ? `0${month}/` : `${month}/`);
    dateTimeString += timeStamp.getFullYear();
    dateTimeString += ` ${timeStamp.getHours()}:${timeStamp.getMinutes()}`;
    return dateTimeString;
  }

  // How much of the message data is displayed depends on the Messaging component's mode & length of message
  function showMessage() {
    if (messagingMode === 'messages') {
      // console.log('messaging mode, full message')
      return messageData.message;
    } else if (messagingMode === 'inbox' && messageData.message.length > 100) {
      // console.log('inbox mode, shortened message')
      return `${messageData.message.slice(0,97)}...`;
    } else if (messagingMode === 'inbox' && messageData.message.length < 100) {
      // console.log('inbox mode, full message')
      return messageData.message;
    }
  }

  return (
    <div className='message'>
      <p>{messageData.senderId === userId ? 'You' : `User ${messageData.senderId}`}</p>
      <p>{formatSentDate()}</p>
      <p>{showMessage()}</p>
    </div>
  )
}

export default Message;