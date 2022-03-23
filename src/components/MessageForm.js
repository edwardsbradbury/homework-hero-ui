// Component for writing new messages, with method to validate and send the message

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage} from '../features/messaging';

function MessageForm () {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  let charsRemaining = 500 - content.length;

  function sendIt() {
    
  }

  return (
    <div id='messageForm'>
      <textarea maxlength='500' placeholder='Write your message here...' onChange={e => setContent(e.target.value.trim())}></textarea>
      <p>{charsRemaining}/500 characters remaining</p>
      <button onclick={sendIt}>Send</button>
    </div>
  )
}

export default MessageForm;