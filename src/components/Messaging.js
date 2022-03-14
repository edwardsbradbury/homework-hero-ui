import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getConversations, getMessages} from '../features/messaging';

function Messaging() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userId = state.user.value.id;
  const conversations = state.messaging.value.conversations;
  const messages = state.messaging.value.messaging;

  useEffect(() => {
    dispatch(getConversations(userId));
  })

  return (
    <div id='messaging'>
      <h1>Messages</h1>
    </div>
  )
}

export default Messaging;