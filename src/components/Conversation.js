import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMessagingMode, getConversations, getMessages} from '../features/messaging';
import MessageForm from './MessageForm';
import Message from './Message';

function Conversation () {

  const mode = useState('newMessage');
  const user = useSelector(state => state.user.value);
  const convo = useSelector(state => state.messaging.value.conversations);
  // const firstMessage = useState(props.messages[0]);
  const firstMessage = convo[0];
  const recipient = useState(firstMessage.senderId === user.id ? firstMessage.recipId : firstMessage.senderId);
  const messages = convo.map(aMessage => <Message data={aMessage}/>);
  const generalError = useState('Failed to get messages');
  const confirmDeletion = useState('Are you sure you want to delete this message?');
  const deletionFailed = useState('Failed to delete your message');

  return (
    <div className='conversation'>
      {mode === 'newMessage' && <MessageForm user={user} recipient={recipient}/>}
      {convo.length > 0 && messages}
    </div>
  )
}

export default Conversation;