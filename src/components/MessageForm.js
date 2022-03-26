// Component for writing new messages, with method to validate and send the message

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage} from '../features/messaging';

function MessageForm (props) {
  const dispatch = useDispatch();
  const user = props.user;
  const [content, setContent] = useState('');
  let [characters, setCharacters] = useState(500);

  function charsRemaining() {
    return content ? (500 - content.length) : 500;
  }

  function updateState(e) {
    setContent(e.target.value);
    setCharacters(charsRemaining());
  }
  
  function sendIt() {
    if (!(content.length > 500)) {
      dispatch(sendMessage(
        {

        }
      ));
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