import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMessagingMode, getConversations, getMessages} from '../features/messaging';
import MessageForm from './MessageForm';
import Message from './Message';

function Conversation (props) {

  const mode = useState('newMessage');
  const user = useSelector(state => state.user.value);
  const firstMessage = props.messages[0];
  const recipient = useState(firstMessage.senderId === user.id ? firstMessage.recipId : firstMessage.senderId);
  const messages = props.messages.map(aMessage => <Message data={aMessage}/>);
  const generalError = useState('Failed to get messages');
  const confirmDeletion = useState('Are you sure you want to delete this message?');
  const deletionFailed = useState('Failed to delete your message');

  return (
    <div className='conversation'>
      {mode === 'newMessage' && <MessageForm user={user} recipient={recipient}/>}
    </div>
  )
}

export default Conversation;