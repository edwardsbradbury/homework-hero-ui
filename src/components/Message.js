/* Component to display message data formatted into a table within a div with a class of message,
   rendered by the Conversation component */

import React from 'react';
import {useSelector} from 'react-redux';

function Message (props) {

  const messageData = props.data;
  const messagingMode = useSelector((state) => state.messaging.value.mode);

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
    if (messagingMode === 'messaging') {
      console.log('messaging mode, full message')
      return (
        <td>{messageData.message}</td>
      )
    } else if (messagingMode === 'inbox' && messageData.message.length > 100) {
      console.log('inbox mode, shortened message')
      return (
        <td>{`${messageData.message.slice(0,97)}...`}</td>
      )
    } else if (messagingMode === 'inbox' && messageData.message.length < 100) {
      console.log('inbox mode, full message')
      return (
        <td>{messageData.message}</td>
      )
    }
  }

  return (
    <div className='message'>
      <table>
        <tr>
          <td>{formatSentDate()}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>{showMessage()}</td>
          <td></td>
        </tr>
      </table>
    </div>
  )
}

export default Message;