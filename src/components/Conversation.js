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
  const user = useSelector(state => state.user.value);
  const firstMessage = useState(props.messages[0]);
  const recipient = useState(firstMessage.senderId === user.id ? firstMessage.recipId : firstMessage.senderId);
  const messages = props.messages.map(aMessage => <Message key={aMessage.id} parentMode={mode} data={aMessage} userId={user.id}/>);
  const displayInfo = (
    <table>
      <tr>
        <td>{`Conversation with user: ${recipient}`}</td>
        <td>{firstMessage.sent}</td>
      </tr>
    </table>);
  const generalError = useState('Failed to get messages');
  const confirmDeletion = useState('Are you sure you want to delete this message?');
  const deletionFailed = useState('Failed to delete your message');

  return (
    <div className='conversation'>
      {mode === 'inbox' && displayInfo && <Message parentMode={mode} data={firstMessage} userId={user.id}/>}
      {mode === 'messages' && displayInfo && <MessageForm convId={firstMessage.convId} recipient={recipient} setErrors={props.setErrors} /> && messages}
    </div>
  )
}

export default Conversation;