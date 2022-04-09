/* Component to display an overview of a conversation when Messaging component is in inbox mode. Should display
  ID of the other participant, time of most recent message, first 97 characters and whether there are unread messages */

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Message from './Message';

function Conversation (props) {

  const [userId] = useState(useSelector(state => state.user.value.id));
  const [firstMessage] = useState(props.messages[0]);
  const [recipient] = useState(firstMessage.senderId === userId ? firstMessage.recipId : firstMessage.senderId);

  /* Calls the showConversation method defined in Messaging component, passing it the first message in the conversation
    so it can search the conversations to check which set of messages to display */
  function showMessages() {
    props.show(props.messages);
  }

  return (
    <div className='conversation' onClick={showMessages}>
      <h3>{`Chat with user: ${recipient}`}</h3>
      {/* Display basic information about latest message in the conversation */}
      <Message data={firstMessage}/>
    </div>
  )
}

export default Conversation;