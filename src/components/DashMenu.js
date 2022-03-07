import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMode} from '../features/home';
import {logout} from '../features/user';
import {changeDashMode} from '../features/dash';

function DashMenu() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.value.type);
  const mode = useSelector((state) => state.dashboard.value.mode);
  const variableLabel = useState(userType === 'client' ? 'Questions' : 'Feedback');
  const targetMode = useState(userType === 'client' ? 'questions' : 'feedback');

  return (
    <div id='dashMenu'>
      <ul>
        <li
          className={mode === 'dash' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'dash'}))}>
            Dashboard
        </li>
        <li
          className={mode === 'messages' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'messages'}))}>
            Messages
        </li>
        <li
          className={mode === 'lessons' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'lessons'}))}>
            Lessons
        </li>
        <li
          className={mode === ('questions' || 'feedback') ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: targetMode}))}>
            {variableLabel}
        </li>
        <li
          className={mode === 'profile' ? 'current' : null}
          onClick={() => dispatch(changeDashMode({mode: 'profile'}))}>
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