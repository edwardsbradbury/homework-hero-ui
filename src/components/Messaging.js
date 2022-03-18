import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getConversations, getMessages} from '../features/messaging';
import Conversation from './Conversation';
import MessageForm from './MessageForm';

function Messaging() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userId = state.user.value.id;
  const mode = state.messaging.value.mode;
  const conversations = state.messaging.value.conversations;

  useEffect(() => {
    dispatch(getConversations(userId));
  })

  return (
    <div id='messaging'>
      <h1>Messages</h1>
      {mode === 'newMessage' && <MessageForm />}
      {mode === 'conversations' && conversations.map(conversation => <Conversation messages={conversation}/>)}
    </div>
  )
}

export default Messaging;