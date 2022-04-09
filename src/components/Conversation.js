/* Component to display an overview of a conversation when Messaging component is in inbox mode. Should display
  ID of the other participant, time of most recent message, first 97 characters and whether there are unread messages */

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Message from './Message';

function Conversation (props) {

  const [userId] = useState(useSelector(state => state.user.value.id));
  const [firstMessage] = useState(props.messages[0]);
  const [recipient] = useState(firstMessage.senderId === userId ? firstMessage.recipId : firstMessage.senderId);

  return (
    <div className='conversation' onClick={props.show(firstMessage)}>
      <h3>{`Chat with user: ${recipient}`}</h3>
      <br />
      <Message data={firstMessage}/>
    </div>
  )
}

export default Conversation;