/* Component into which subcomponents (Conversation, MessageForm & Message) will be injected for facilitating
messaging feature. Mode state property controls which components are nested within Messaging */

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMessagingMode, getConversations, setConvId, setConvIndex, setRecipId, setMessagingErrors, clearMessagingErrors, markAsRead, markAsDeleted} from '../features/messaging';
import Conversation from './Conversation';
import MessageForm from './MessageForm';
import Message from './Message';

function Messaging() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const userId = useSelector(state => state.user.value.id);
  const mode = useSelector(state => state.messaging.value.mode);
  const conversations = useSelector(state => state.messaging.value.conversations);
  const convIndex = useSelector(state => state.messaging.value.convIndex);
  const errors = state.messaging.value.errors;
  const [newMessage, setNewMessage] = useState(false);
  const [selected, setSelected] = useState(new Set());

  // After component is mounted, fetch their conversations
  useEffect(() => {
    if (mode !== 'from search') {
      dispatch(getConversations(userId));
    }
    if (mode === 'messages') {
      dispatch(markAsRead(
        {
          userId: userId,
          convId: state.messaging.value.convId
        }
      ));
    }
  }, [mode])

  /* Watch convIndex for changes, updating recipId and convId accordingly. Those are requires by subcomponents, e.g. MessageForm must
    pass convId when the new message action is dispatched */
  useEffect(() => {
    if (convIndex){
      const lastMessage = conversations[convIndex][0];
      dispatch(setRecipId(
        lastMessage.senderId === userId ? lastMessage.recipId : lastMessage.senderId
      ));
      dispatch(setConvId(lastMessage.convId));
    }
  }, [convIndex])

   /* Whenever newMessage state property changes, if its new value is true, re-fetch user's conversations. Means a new message has
    successfully been sent - conversations array should contain the new message so all messages in the convo are displayed */
  useEffect(() => {
    if (newMessage) {
      dispatch(clearMessagingErrors());
      dispatch(getConversations(userId));
      setNewMessage(!newMessage);
      if (mode === 'from search') {
        dispatch(setMessagingMode('inbox'));
      }
    }
  }, [newMessage])

  /* A method so that - when mode local state variable = 'messaging', only messages not marked as deleted by current user
      will be displayed */
  function displayMessage(message) {
    if (message.senderId === userId && message.senderDeleted === 1) {
      return;
    } else if (message.recipId === userId && message.recipDeleted === 1) {
      return;
    }
    return <Message key={message.id} data={message} setAsSelected={setAsSelected} />;
  }
  
  /* Method passed to MessageForm component instance when Messaging component is in 'from search' mode so that - after writing to a user
    from a search result, Messaging component can switch to 'messages' view, displaying the message the user just sent */
  function setConvIndexFrmChld(convId) {
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i][0].convId === convId) {
        dispatch(setConvIndex(i));
        return;
      }
    }
  }
  
  // Method to pass to child components to set errors state in this component, e.g. if a message fails to send
  function setErrsFromChild(errors) {
    dispatch(setMessagingErrors(errors));
  }

  /* Method to switch from inbox view to conversation view (i.e. all messages in a given chat + MessageForm component)
    passed as prop to - and called by showMessages method of - Conversation component */
  function showConversation(conversation) {
    const index = conversations.indexOf(conversation);
    dispatch(setConvIndex(index));
    dispatch(setConvId(conversations[index][0].convId));
    dispatch(setRecipId(conversation[0].senderId === userId ? conversation[0].recipId : conversation[0].senderId));
    dispatch(setMessagingMode('messages'));
  }

  // Method to switch from a conversation view  back to inbox view
  function backToInbox() {
    setSelected(new Set());
    dispatch(setConvIndex(null));
    dispatch(setRecipId(null));
    dispatch(setMessagingMode('inbox'));
  }

  // Method to be passed to Message components so they can add individual message IDs to the selected state set above
  function setAsSelected(id) {
    let tempSelected = new Set(selected);
    if (!selected.has(id)) {
      tempSelected.add(id);
    } else {
      tempSelected.delete(id);
    }
    setSelected(tempSelected);
  }

  // Method to update deletedBySender / deletedByRecip columns in messaging table via API
  function markDeleted() {
    dispatch(markAsDeleted(
      {
        userId: userId,
        messageIds: Array.from(selected)
      }
    )).unwrap()
    .then(response => {
      if (response.outcome === 'success') {
        setNewMessage(true);
      }
    })
  }

  // Method to conditionally return elements/components depending on state
  function displayContent() {
    if (mode === 'from search') {
      return (
        <>
          <MessageForm setIndex={setConvIndexFrmChld} setErrors={setErrsFromChild} setNewMessage={setNewMessage} />
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
            <Conversation key={conversation.convId} messages={conversation} show={showConversation} />
          )}
        </>
      )
    } else if (mode === 'messages') {
      return (
        <>
          <h3 className='link' onClick={backToInbox}>&lt;</h3>
          <h3>{`Chat with user: ${state.messaging.value.recipId}`}</h3>
          {selected.size > 0 && <button onClick={markDeleted}>Delete selected</button>}
          <br />
          <MessageForm setIndex={setConvIndexFrmChld} setErrors={setErrsFromChild} setNewMessage={setNewMessage} />
          {conversations[convIndex].map(messageData => displayMessage(messageData))}
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