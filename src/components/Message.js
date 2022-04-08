/* Component to display message data formatted into a table within a div with a class of message,
   rendered by the Conversation component */

import React, {useState} from 'react';

function Message (props) {

  const mode = props.parentMode;
  const messageData = props.data;

  return (
    <div className='message'>
      <table>
        <tr>
          <td>{`Sent: ${messageData.sent}`}</td>
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