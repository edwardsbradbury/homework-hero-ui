/* Component to display message data formatted into a table within a div with a class of message,
   rendered by the Conversation component */

import React, {useState, useEffect} from 'react';

function Message (props) {

  const mode = props.parentMode;
  const messageData = props.data;

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

  return (
    <div className='message'>
      <table>
        <tr>
          <td>{formatSentDate}</td>
        </tr>
        <tr>
          {mode === 'messages' && <td>{messageData.message}</td>}
          {(mode === 'inbox' && messageData.message.length > 100) && <td>{`${messageData.message.slice(0,97)}...`}</td>}
          {(mode === 'inbox' && messageData.message.length < 100) && <td>{messageData.message}</td>}
        </tr>
      </table>
    </div>
  )
}

export default Message;