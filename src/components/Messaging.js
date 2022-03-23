import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMessagingMode, getConversations} from '../features/messaging';
import Conversation from './Conversation';

function Messaging() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userId = state.user.value.id;
  const mode = state.messaging.value.mode;
  const conversations = state.messaging.value.conversations;
  const [currentConvMessages, setCurrConvMsgs] = useState([]);
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   dispatch(getConversations(userId));
  // })

  return (
    <div id='messaging'>
      <h1>Messages</h1>
      {errors &&
        <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
          {errors.map(error => <li>{error}</li>)}
        </ul>}
      {conversations.length < 1 && <p>You don't have any conversations yet...</p>}
      {mode === 'conversations' && conversations.map(conversation => <Conversation messages={conversation}/>)}
    </div>
  )
}

export default Messaging;