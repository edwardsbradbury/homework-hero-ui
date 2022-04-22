/* Component to display an overview of a conversation when Messaging component is in inbox mode. Should display
  ID of the other participant, time of most recent message, first 97 characters and whether there are unread messages */

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Message from './Message';

function Conversation (props) {

  const [user] = useState(useSelector(state => state.user.value));
  const [firstMessage] = useState(props.messages[0]);

  //
  function hasUnread() {
    for (let message of props.messages) {
      if (message.recipId === user.id && message.isRead === 0) {
        return true;
      }
    }
    return false;
  }
  
  /* Calls the showConversation method defined in Messaging component, passing it the first message in the conversation
    so it can search the conversations to check which set of messages to display */
  function showMessages() {
    props.show(props.messages);
  }

  // Method to display at the top of the component instance the name of the other participant in convo
  function getOtherParticName() {
    for (let message of props.messages) {
      if (message.senderName !== user.forename) {
        return message.senderName;
      }
    }
  }

  return (
    <div className={`conversation ${hasUnread() === true ? 'unread' : ''}`} onClick={showMessages}>
      <h3>{getOtherParticName()}</h3>
      {/* Display basic information about latest message in the conversation */}
      <Message data={firstMessage}/>
    </div>
  )
}

export default Conversation;