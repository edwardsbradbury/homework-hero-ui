/* Component to display message data formatted into a table within a div with a class of message,
   rendered by the Conversation component */

import React from 'react';
import {useSelector} from 'react-redux';

function Message (props) {

  const messageData = props.data;
  const globalState = useSelector((state) => state);
  const messagingMode = globalState.messaging.value.mode;
  const userId = globalState.user.value.id;
  
  // Method called on line 53, to show which participant sent the message
  function showSender() {
    if (messageData.senderId === userId) {
      return 'You';
    } else {
      return messageData.senderName;
    }
  }
  
  // Method to format the sent date of message to be more readable to human eyes
  function formatSentDate() {
    const timeStamp = new Date(messageData.sent);
    let dateTimeString = '';
    const dayNum = timeStamp.getDate();
    dateTimeString += (dayNum < 10 ? `0${dayNum}/` : `${dayNum}/`);
    // Months are 0 indexed, meaning January is month 0
    const month = timeStamp.getMonth() + 1;
    dateTimeString += (month < 10 ? `0${month}/` : `${month}/`);
    dateTimeString += timeStamp.getFullYear();
    const hours = timeStamp.getHours();
    const minutes = timeStamp.getMinutes();
    dateTimeString += ` ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    return dateTimeString;
  }

  // How much of the message data is displayed depends on the Messaging component's mode & length of message
  function showMessage() {
    if (messagingMode === 'messages') {
      return messageData.message;
    } else if (messagingMode === 'inbox' && messageData.message.length > 100) {
      return `${messageData.message.slice(0,97)}...`;
    } else if (messagingMode === 'inbox' && messageData.message.length < 100) {
      return messageData.message;
    }
  }

  return (
    <div className='message'>
      <p>{showSender()}</p>
      <p>{formatSentDate()}</p>
      <p>{showMessage()}</p>
      {messagingMode === 'messages' && <input type='checkbox' value={props.messageData.id} onChange={props.setAsSelected(props.messageData.id)}></input>}
    </div>
  )
}

export default Message;