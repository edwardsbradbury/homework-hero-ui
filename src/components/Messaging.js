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
  const [convIndex, setConvIndex] = useState(null);
  const [currConvMsgs, setCurrConvMsgs] = useState([]);
  const [errors, setErrors] = useState([]);

  // After component is mounted, fetch their conversations
  useEffect(() => {
    dispatch(getConversations(userId));
  }, [])

  // Watch convIndex for changes and update recipient
  useEffect(() => {
    if (convIndex){
      dispatch(setRecipId(
        conversations[convIndex][0].senderId === userId ? conversations[convIndex][0].recipId : conversations[convIndex][0].senderId
      ));
    }
  }, [convIndex])

  // Method to pass to child components to set errors state in this component, e.g. if a message fails to send
  function setErrsFromChild(errors) {
    setErrors(errors);
  }

  // Method to switch from inbox view to conversation view (i.e. all messages in a given chat + MessageForm component)
  function showConversation(conversation) {
    setConvIndex(conversations.indexOf(conversation));
    dispatch(setRecipId(conversation[0].senderId === userId ? conversation[0].recipId : conversation[0].senderId));
    dispatch(setMessagingMode('messages'));
  }

  // Method to switch from a conversation view  back to inbox view
  function backToInbox() {
    setConvIndex(null);
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
          <MessageForm convId={convIndex} recipient={state.messaging.value.recipId} setErrors={setErrsFromChild} />
          {conversations[convIndex].map(messageData => 
            <Message key={messageData.id} data={messageData} />
          )}
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