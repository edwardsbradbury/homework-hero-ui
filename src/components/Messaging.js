// Component into which subcomponents will be injected for facilitating messaging feature

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMessagingMode, getConversations, setRecipId} from '../features/messaging';
import Conversation from './Conversation';
import MessageForm from './MessageForm';
import Message from './Message';

function Messaging() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userId = state.user.value.id;
  const mode = state.messaging.value.mode;
  const conversations = state.messaging.value.conversations;
  const [currConvId, setConvId] = useState(null);
  const [errors, setErrors] = useState([]);

  // After component is mounted, fetch their conversations
  useEffect(() => {
    dispatch(getConversations(userId));
  }, [])

  // Watch currConvId for changes and update recipient
  useEffect(() => {
    if (currConvId){
      dispatch(setRecipId(
        conversations[currConvId][0].senderId === userId ? conversations[currConvId][0].recipId : conversations[currConvId][0].senderId
      ));
    }
  }, [currConvId])

  // Method to pass to child components to set errors state in this component
  function setErrsFromChild(errors) {
    setErrors(errors);
  }

  // Method to switch from inbox view to conversation view (i.e. all messages in a given chat + MessageForm component)
  function showConversation(message) {
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].includes(message)) {
        setConvId(i);
        break;
      }
    }
    dispatch(setRecipId(message.senderId === userId ? message.recipId : message.senderId));
    dispatch(setMessagingMode('messages'));
  }

  // Method to switch from a conversation view  back to inbox view
  function backToInbox() {
    setConvId(null);
    dispatch(setRecipId(null));
    dispatch(setMessagingMode('inbox'));
  } 

  // Method to conditionally return elements/components depending on state
  function displayContent() {
    if (mode === 'from search') {
      return (
        <>
          <MessageForm recipient={state.messaging.value.recipId} setErrors={setErrsFromChild}/>
        </>
      )
    } else if (mode === 'inbox' && conversations.length < 1) {
      return (
        <>
          <p>You don't have any conversations yet...</p>
        </>
      )
    } else if (mode === 'inbox' && conversations.length > 0) {
      return (
        <>
          {conversations.map(conversation => 
            <Conversation key={conversation.convId} messages={conversation} show={showConversation}/>
          )}
        </>
      )
    } else if (mode === 'messages') {
      return (
        <>
          <h3 className='link' onClick={backToInbox}>&lt;</h3>
          <h3>{`Chat with user: ${state.messaging.value.recipId}`}</h3>
          <br />
          <MessageForm convId={currConvId} recipient={state.messaging.value.recipId} setErrors={setErrsFromChild} />
          <>
          {conversations[currConvId].map(messageData => {
            <Message key={messageData.id} data={messageData.message} />
          })}
          </>
        </>
      )
    }
  }

  return (
    <div id='messaging'>
      <h1>Messages</h1>
      {errors.length > 0 &&
        <ul>
          {errors.map(error => <li className='error'>{error}</li>)}
        </ul>}
      {displayContent()}
    </div>
  )
}

export default Messaging;