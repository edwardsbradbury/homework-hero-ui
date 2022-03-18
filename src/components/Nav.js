import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../features/home';
import {logout} from '../features/user';

function Nav() {
  const userData = useSelector(state => state.user.value);
  const loggedIn = userData.loggedIn;
  const userType = userData.type;
  const questionPrompt = userType === 'client' ? 'Ask a question' : 'Browse questions';
  const searchPrompt = userType === 'client' ? 'Search for tutors' : 'Search for clients';
  const dispatch = useDispatch();

  return (
    <div id='nav'>
      <img
        id='logo'
        alt='Homework Hero logo'
        src={require('../assets/logo.png')}
        onClick={() => dispatch(changeMode({
          mode: loggedIn ? 'dashboard' : 'splash'}))}>
      </img>
      <nav>
        <ul>
          <li onClick={() => dispatch(changeMode({mode: 'faq'}))}>F.A.Q</li>
          <li onClick={() => dispatch(changeMode({mode: 'questions'}))}>{questionPrompt}</li>
          <li onClick={() => dispatch(changeMode({mode: 'search'}))}>{searchPrompt}</li>
          {!loggedIn && <li onClick={() => dispatch(changeMode({mode: 'login'}))}>Login</li>}
          {!loggedIn && <li onClick={() => dispatch(changeMode({mode: 'register'}))}>Register</li>}
          {loggedIn && <li onClick={() => {dispatch(logout()); dispatch(changeMode({mode: 'splash'}));}}>Logout</li>}
        </ul>
      </nav>
    </div>
  )
  
}

export default Nav;