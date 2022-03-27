// Component for writing new messages, with method to validate and send the message

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage} from '../features/messaging';

function MessageForm (props) {
  const dispatch = useDispatch();
  const user = props.user;
  const [content, setContent] = useState('');
  let [characters, setCharacters] = useState(500);

  /* Method to recalculate how many of max 500 characters have been enterd in the textarea,
    called by updatestate method below */
  function charsRemaining() {
    return content ? (500 - content.length) : 500;
  }

  // Called by change event listener on the textarea - update the content state variabe and remaining characters
  function updateState(e) {
    setContent(e.target.value);
    setCharacters(charsRemaining());
  }
  
  /* Send the message to the API /new_message endpoint to insert into database. On success response, update Redux state:
      re-fetch user's messages and ... TBC */
  function sendIt() {
    if (!(content.length > 500)) {
      dispatch(sendMessage(
        {
          sender: user.id,
          recipient: props.recipient,
          sent: new Date(),
          message: content
        }
      ))
      .unwrap()
      .then(response => {
        if (response.outcome === 'success') {
          console.log('success');
        } else {
          console.log(response.outcome);
        }
      })
      .catch()
    }
  }

  return (
    <div id='messageForm'>
      <textarea maxlength='500' placeholder='Write your message here...' onChange={updateState}></textarea>
      <p>{characters}/500 characters remaining</p>
      <button onclick={sendIt}>Send</button>
    </div>
  )
}

export default MessageForm;