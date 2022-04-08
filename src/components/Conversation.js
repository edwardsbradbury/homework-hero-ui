/* Component to hold all messages relating to one conversation the given user has ongoing. If the mode state is inbox, Conversation displays
  the name of the other participant, time the most recent message was sent and first 97 characters of the message. If mode is messages, it
  displays a MessageForm component and a Message component for each message in the conversation */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMessagingMode, getMessages} from '../features/messaging';
import MessageForm from './MessageForm';
import Message from './Message';

function Conversation (props) {

  const mode = useState('inbox');
  const userId = useSelector(state => state.user.value.id);
  const recipient = useState(props.messages[0].senderId === userId ? props.messages[0].recipId : props.messages[0].senderId);
  const messages = props.messages.map(aMessage => <Message key={aMessage.id} parentMode={mode} data={aMessage} userId={userId}/>);
  const generalError = useState('Failed to get messages');
  const confirmDeletion = useState('Are you sure you want to delete this message?');
  const deletionFailed = useState('Failed to delete your message');

  function displayContents() {
    console.log(typeof mode)
    if (mode === 'inbox') {
      return (
        <>
          <h3>{`Chat with user: ${recipient}`}</h3>
          <br />
          <Message parentMode={mode} data={props.messages[0]} userId={userId}/>
        </>
      )
    } else {
      return (
      <>
        <h3>{`Chat with user: ${recipient}`}</h3>
        <br />
        <MessageForm convId={props.messages[0].convId} recipient={recipient} setErrors={props.setErrors} />
        {messages}
      </>
      )
    }
  }

  return (
    <div className='conversation'>
      {displayContents()}
    </div>
  )
}

export default Conversation;