// This component is a menu for use within the Dashboard component by users who're logged in

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMode} from '../features/home';
import {logout} from '../features/user';
import {changeDashMode} from '../features/dash';

function DashMenu() {

  // Will need to dispatch some actions to update Redux global state properties
  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.value.type);
  const mode = useSelector(state => state.dashboard.value.mode);
  const variableLabel = useState(userType === 'client' ? 'Questions' : 'Feedback');
  const targetMode = useState(userType === 'client' ? 'questions' : 'feedback');

  return (
    <div id='dashMenu'>
      <ul>
        {/* See features/dash for details of the changeDashMode method - mode variable used to switch out components */}
        <li
          className={mode === 'dash' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'dash', newUser: false}))}>
            Dashboard
        </li>
        <li
          className={mode === 'messages' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'messages', newUser: false}))}>
            Messages
        </li>
        <li
          className={mode === 'lessons' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'lessons', newUser: false}))}>
            Lessons
        </li>
        <li
          className={mode === ('questions' || 'feedback') ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: targetMode, newUser: false}))}>
            {variableLabel}
        </li>
        <li
          className={mode === 'profile' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'profile', newUser: false}))}>
            My profile
        </li>
        <li
          onClick={() => {dispatch(logout()); dispatch(changeMode({mode: 'splash'}));}}>
            Logout
        </li>
      </ul>
    </div>
  )
}

export default DashMenu;