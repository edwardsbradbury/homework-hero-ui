import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMode} from '../features/home';
import {logout} from '../features/user';
import {changeDashMode} from '../features/dash';

function DashMenu() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.value.type);
  const mode = useState(useSelector((state) => state.dashboard.value.mode));
  const variableLabel = useState(userType === 'client' ? 'Questions' : 'Feedback');
  const targetMode = useState(userType === 'client' ? 'questions' : 'feedback');

  return (
    <div id='dashMenu'>
      <ul>
        <li onClick={() => dispatch(changeDashMode({mode: 'dash'}))}>Dashboard</li>
        <li onClick={() => dispatch(changeDashMode({mode: 'messages'}))}>Messages</li>
        <li onClick={() => dispatch(changeDashMode({mode: 'lessons'}))}>Lessons</li>
        <li onClick={() => dispatch(changeDashMode({mode: targetMode}))}>{variableLabel}</li>
        <li onClick={() => dispatch(changeDashMode({mode: 'profile'}))}>My profile</li>
        <li onClick={() => {dispatch(logout()); dispatch(changeMode({mode: 'splash'}));}}>Logout</li>
      </ul>
    </div>
  )
}

export default DashMenu;