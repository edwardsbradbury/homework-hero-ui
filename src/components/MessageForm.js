// Component for writing new messages, with method to validate and send the message

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage, getConvId, getConversations, setMessagingMode, setRecipId, clearMessagingErrors, resetMessagingState} from '../features/messaging';
import {changeMode} from '../features/home';

function MessageForm (props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const parentMode = useSelector(state => state.messaging.value.mode);
  const recipient = useSelector(state => state.messaging.value.recipId);
  const convId = useSelector(state => state.messaging.value.convId);
  const [content, setContent] = useState('');
  const [characters, setCharacters] = useState(500);
  const [canSend, setCanSend] = useState(false);
  const [isSent, setIsSent] = useState(false);

  /* Watch the 'content' local state property for changes. When it changes, recalculate remaining characters and set characters state property
    also setCanSend controls whether the send button is clickable */
  useEffect(() => {
    setCharacters(charsRemaining());
    setCanSend(content.length > 1 && content.length <= 500);
  }, [content])

  /* If the convId state property is null, call the API to get a convId. Needs to be included with requests to API's /new_message route and is
      used by the /conversations route to sort all of a user's messages into distinct conversations */
  useEffect(() => {
    if (!convId) {
      dispatch(getConvId(
        {
          userId: user.id,
          recipId: recipient
        }
      ))
      .unwrap()
      .then(result => {
        if (result.data.outcome === 'success') {
          console.log('setting index from messageform line 40');
          props.setIndex(result.data.convId);
        }
      })
    }
  }, [])

  /* Watch the isSent state variable; when it's true, fetch the user's conversations again, so that if MessageForm is
    rendered alongside messages in an ongoing conversation, the new message should be present and displayed */
  useEffect(() => {
    if (isSent) {
      dispatch(getConversations(user.id));
      setIsSent(false);
    }
  }, [isSent])
  
  /* Method to recalculate how many of max 500 characters have been enterd in the textarea,
    called by useEffect whenever content changes */
  function charsRemaining() {
    return content ? (500 - content.length) : 500;
  }

  // Method to return to search results if messaging component is in 'from search' mode
  function goBack() {
    dispatch(changeMode('search'));
    dispatch(resetMessagingState());
  }

  // Method to set the convIndex state property in Messaging component
  function setIndex(convId) {
    props.setIndex(convId);
  }

  /* Send the message to the API /new_message endpoint to insert into database. On success response, update Redux state:
      re-fetch user's messages and ... TBC */
  function sendIt() {
    if (canSend) {
      dispatch(sendMessage(
        {
          convId: convId,
          sender: user.id,
          recipient: recipient,
          sent: new Date().toISOString().slice(0, 19).replace('T', ' '),
          message: content
        }
      )).unwrap()
      .then(result => {
        if (result.outcome === 'success') {
          setContent('');
          setIsSent(true);
        }
      }).catch(error => console.log(error))
    
    } else {
      props.setErrors('Messages must be 2-500 characters long');
    }

  }

  return (
    <div id='messageForm'>
      <textarea maxlength='500' placeholder='Write your message here...' value={content} onChange={e => setContent(e.target.value)}></textarea>
      <p>{characters}/500 characters remaining</p>
      {parentMode === 'from search' && <button onClick={goBack}>Back</button>}
      <button onClick={sendIt} disabled={!canSend}>Send</button>
    </div>
  )
}

export default MessageForm;