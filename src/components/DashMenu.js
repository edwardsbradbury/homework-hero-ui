import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../features/home';

function DashMenu() {
  const dispatch = useDispatch();
  const userType = useState(useSelector((state) => state.user.value.type));
  const mode = useState(useSelector((state) => state.home.value.mode));
  return (
    <div id='dashMenu'>
      <ul>
        <li onClick={() => dispatch(changeMode({mode: ''}))}>Dashboard</li>
        <li onClick={() => dispatch(changeMode({mode: ''}))}>Messages</li>
        <li onClick={() => dispatch(changeMode({mode: ''}))}>Lessons</li>
        <li onClick={() => dispatch(changeMode({mode: ''}))}>{userType === 'client' ? 'Questions' : 'Feedback'}</li>
        <li onClick={() => dispatch(changeMode({mode: ''}))}>My profile</li>
        <li onClick={() => dispatch(changeMode({mode: ''}))}>Logout</li>
      </ul>
    </div>
  )
}

export default DashMenu;