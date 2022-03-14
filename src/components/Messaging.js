import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getConversations, getMessages} from '../features/messaging';

function Messaging() {

  const state = useSelector((state) => state.messaging.value);
  const conversations = state.conversations;
  const messages = state.messaging;

  return (
    <div id='messaging'>
      <h1>Messages</h1>
    </div>
  )
}

export default Messaging;