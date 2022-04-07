// This component is a menu for use within the Dashboard component by users who're logged in

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMode} from '../features/home';
import {logout} from '../features/user';
import {setDashMode, resetDashState} from '../features/dash';
import {setMessagingMode, setRecipId, setConversations} from '../features/messaging';

function DashMenu() {

  // Will need to dispatch some actions to update Redux global state properties
  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.value.type);
  const mode = useSelector(state => state.dashboard.value.mode);
  const variableLabel = useState(userType === 'client' ? 'Questions' : 'Feedback');
  const targetMode = useState(userType === 'client' ? 'questions' : 'feedback');

  function resetState() {
    dispatch(logout());
    dispatch(changeMode('splash'));
    dispatch(setMessagingMode('conversations'));
    dispatch(setRecipId(null));
    dispatch(setConversations([]));
    dispatch(resetDashState());
  }

  return (
    <div id='dashMenu'>
      <ul>
        {/* See features/dash for details of the setDashMode method - mode variable used to switch out components */}
        <li
          className={mode === 'dash' ? 'current' : null}
          onClick={() => dispatch(setDashMode('dash'))}>
            Dashboard
        </li>
        <li
          className={mode === 'messages' ? 'current' : null}
          onClick={() => dispatch(setDashMode('messages'))}>
            Messages
        </li>
        <li
          className={mode === 'lessons' ? 'current' : null}
          onClick={() => dispatch(setDashMode('lessons'))}>
            Lessons
        </li>
        <li
          className={mode === ('questions' || 'feedback') ? 'current' : null}
          onClick={() => dispatch(setDashMode(targetMode))}>
            {variableLabel}
        </li>
        <li
          className={mode === 'profile' ? 'current' : null}
          onClick={() => dispatch(setDashMode('profile'))}>
            My profile
        </li>
        <li
          onClick={resetState}>
            Logout
        </li>
      </ul>
    </div>
  )
}

export default DashMenu;