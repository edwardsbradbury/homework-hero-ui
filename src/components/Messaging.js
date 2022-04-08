// Component into which subcomponents will be injected for facilitating messaging feature

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMessagingMode, getConversations} from '../features/messaging';
import Conversation from './Conversation';
import MessageForm from './MessageForm';

function Messaging() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userId = state.user.value.id;
  const mode = state.messaging.value.mode;
  const conversations = state.messaging.value.conversations;
  const [currentConvMessages, setCurrConvMsgs] = useState([]);
  const [errors, setErrors] = useState([]);

  // After component is mounted, fetch their conversations
  useEffect(() => {
    dispatch(getConversations(userId));
  }, [])

  // Method to pass to child components to set errors state in this component
  function setErrsFromChild(errors) {
    setErrors(errors);
  }

  return (
    <div id='messaging'>
      <h1>Messages</h1>
      {errors.length > 0 &&
        <ul>
          {errors.map(error => <li className='error'>{error}</li>)}
        </ul>}
      {mode === 'from search' && <MessageForm recipient={state.messaging.value.recipId} setErrors={setErrsFromChild}/>}
      {mode === 'inbox' && conversations.length < 1 && <p>You don't have any conversations yet...</p>}
      {mode === 'inbox' && conversations.map(conversation => <Conversation key={conversation.convId} messages={conversation} setErrors={setErrsFromChild}/>)}
    </div>
  )
}

export default Messaging;