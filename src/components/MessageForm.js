// Component for writing new messages, with method to validate and send the message

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage, getConvId, getConversations, changeMessagingMode} from '../features/messaging';

function MessageForm (props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
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

  /* Send the message to the API /new_message endpoint to insert into database. On success response, update Redux state:
      re-fetch user's messages and ... TBC */
  function sendIt() {
    if (content.length > 1 && !(content.length > 500)) {
      ///////////////////////////// take out lines 29-66 if i never figure it out
      if (!convId) {
        dispatch(getConvId(
          {
            userId: user.id,
            recipId: props.recipient
          }))
        .unwrap()
        .then(result => {
          console.log(result);
          if (result.outcome === 'success') {
            setConvId(result.convId);
            dispatch(sendMessage(
              {
                convId: result.convId,
                sender: user.id,
                recipient: props.recipient,
                sent: new Date().toISOString().slice(0, 19).replace('T', ' '),
                message: content
              }
            ))
            .unwrap()
            .then(response => {
              if (response.outcome === 'success') {
                setContent('');
                dispatch(getConversations(convId));
              }
            })
            .catch()
          } else {
            props.setErrors(['Failed to send message, try again']);
          }
        })
        .catch(error => console.log(error))
      } else {
        dispatch(sendMessage(
          {
            convId,
            sender: user.id,
            recipient: props.recipient,
            sent: new Date().toISOString().slice(0, 19).replace('T', ' '),
            message: content
          }
        ))
        .unwrap()
        .then(response => {
          if (response.outcome === 'success') {
            setContent('');
            dispatch(getConversations(user.id));
          } else {
            props.setErrors(['Failed to send message, try again']);
          }
        })
        .catch(error => console.log(error))
      }
      
      
      
      // dispatch(sendMessage(
      //   {
      //     sender: user.id,
      //     recipient: props.recipient,
      //     sent: new Date().toISOString().slice(0, 19).replace('T', ' '),
      //     message: content
      //   }
      // ))
      // .unwrap()
      // .then(response => {
      //   if (response.outcome === 'success') {
      //     setContent('');
      //     dispatch(getConversations(user.id));
      //   } else {
      //     props.setErrors(['Failed to send message, try again']);
      //   }
      // })
      // .catch(error => console.log(error))
    } else {
      props.setErrors(['Messages must be 2-500 characters long']);
    }
  }

  return (
    <div id='messageForm'>
      <textarea maxlength='500' placeholder='Write your message here...' onChange={e => setContent(e.target.value)}></textarea>
      <p>{characters}/500 characters remaining</p>
      <button onClick={sendIt} disabled={!canSend}>Send</button>
    </div>
  )
}

export default MessageForm;