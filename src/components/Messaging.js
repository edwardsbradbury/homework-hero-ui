import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Messaging() {

  const mode = useSelector((state) => state.messaging.value.mode);

  return (
    <div id='messaging'>

    </div>
  )
}

export default Messaging;