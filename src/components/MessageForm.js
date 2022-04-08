// Component for writing new messages, with method to validate and send the message

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage, getConvId, getConversations, setMessagingMode, setRecipId, setMessagingError} from '../features/messaging';
import {changeMode} from '../features/home';

function MessageForm (props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const parentMode = useSelector(state => state.messaging.value.mode);
  const [content, setContent] = useState('');
  const [characters, setCharacters] = useState(500);
  const [convId, setConvId] = useState(null);
  const [canSend, setCanSend] = useState(false);

  /* Watch the 'content' local state property for changes. When it changes, recalculate remaining characters and set characters state property
    also setCanSend controls whether the send button is clickable */
  useEffect(() => {
    setCharacters(charsRemaining());
    setCanSend(content.length > 1 && content.length <= 500);
  }, [content])

  /* Because the MessageForm component might be rendered either by Messaging component directly (e.g. when replying to a user from search results)
    or else by a Conversation component nested within Messaging, it may or may not have been passed a convId prop. This effect checks, after the
    MessageForm is rendered, whether convId prop was passed and if so, assigns it to the local state variable convId */
  useEffect(() => {
    if (props.hasOwnProperty('convId')) {
      setConvId(props.convId);
    }
  }, [])
  
  /* Method to recalculate how many of max 500 characters have been enterd in the textarea,
    called by useEffect whenever content changes */
  function charsRemaining() {
    return content ? (500 - content.length) : 500;
  }

  // Method to return to search results if messaging component is in 'from search' mode
  function goBack() {
    dispatch(changeMode('search'));
    dispatch(setMessagingMode('inbox'));
    dispatch(setRecipId(null));
    dispatch(setMessagingError(null));
  }

  /* Send the message to the API /new_message endpoint to insert into database. On success response, update Redux state:
      re-fetch user's messages and ... TBC */
  function sendIt() {
    if (canSend) {
      // If convId state variable has falsy value
      if (!convId) {
        // Query API to get a convId, since it must be included with requests to new_message route at API
        dispatch(getConvId(
          {
            userId: user.id,
            recipId: props.recipient
          }))
        .unwrap()
        .then(result => {
          if (result.data.outcome === 'success') {
            // API returned a convId; set the component's convId state property to this value
            setConvId(result.data.convId);
            // Send the message data to API's new_message route
            dispatch(sendMessage(
              {
                convId: result.data.convId,
                sender: user.id,
                recipient: props.recipient,
                sent: new Date().toISOString().slice(0, 19).replace('T', ' '),
                message: content
              }
            ))
            .unwrap()
            .then(response => {
              if (response.outcome === 'success') {
                // Message sent successfully; clear the content state variable
                setContent('');
                // Retrieve user's conversations again, so the new message is included in their conversations
                dispatch(getConversations(user.id));
                /* Update mode property of messaging object in Redux global state (should trigger Messaging component to unmount MessageForm
                  and render a Conversation component, in which a new MessageForm is embedded but also messages are displayed) */
                dispatch(setMessagingMode('inbox'));
              }
            })
            .catch(err => console.log(err));
          } else {
            props.setErrors(['Failed to send message, try again']);
          }
        })
        .catch(error => console.log(error))
      } else {
        // convId local state variable isn't falsy, so is an int representing a convId; send the message data to API
        dispatch(sendMessage(
          {
            convId: convId,
            sender: user.id,
            recipient: props.recipient,
            sent: new Date().toISOString().slice(0, 19).replace('T', ' '),
            message: content
          }
        ))
        .unwrap()
        .then(response => {
          if (response.outcome === 'success') {
            // Message sent successfully; clear the content state variable
            setContent('');
            // Retrieve user's conversations again, so the new message is included in their conversations
            dispatch(getConversations(user.id));
          } else {
            props.setErrors(['Failed to send message, try again']);
          }
        })
        .catch(error => console.log(error))
      }
    
    } else {
      props.setErrors(['Messages must be 2-500 characters long']);
    }

  }

  return (
    <div id='messageForm'>
      <textarea maxlength='500' placeholder='Write your message here...' onChange={e => setContent(e.target.value)}></textarea>
      <p>{characters}/500 characters remaining</p>
      <button onClick={sendIt} disabled={!canSend}>Send</button>
      {parentMode === 'from search' && <button onClick={goBack}>Back</button>}
    </div>
  )
}

export default MessageForm;