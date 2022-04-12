// This component is actually the whole topbar, not only the nav. Also the logo/branding/home button

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeMode} from '../features/home';
import {resetDashState} from '../features/dash';
import {resetMessagingState} from '../features/messaging';
import {logout} from '../features/user';

function Nav() {

  // Selecting the entire user object in Redux global state store
  const userData = useSelector(state => state.user.value);
  const loggedIn = userData.loggedIn;
  const userType = userData.type;
  // Label text on some links depends on the type of user browsing
  const questionPrompt = userType === 'client' ? 'Ask a question' : 'Browse questions';
  const searchPrompt = userType === 'client' ? 'Search for tutors' : 'Search for clients';
  // Need to dispatch actions to update Redux global state depending on what user clicks
  const dispatch = useDispatch();

  // Basically when user logs out, reset as much of the global state in Redux store as possible to its initial state
  function resetState() {
    dispatch(logout());
    dispatch(changeMode('splash'));
    dispatch(resetDashState());
    dispatch(resetMessagingState());
  }

  return (
    <div id='nav'>
      {/* The logo serves as a link to home */}
      <img
        id='logo'
        alt='Homework Hero logo'
        src={require('../assets/logo.png')}
        onClick={() => dispatch(changeMode(loggedIn ? 'dashboard' : 'splash'))}>
      </img>
      <nav>
        <ul>
          {/* Changing the value of mode property in ../features/home switches out the component displayed */}
          <li onClick={() => dispatch(changeMode('faq'))}>F.A.Q</li>
          <li onClick={() => dispatch(changeMode('questions'))}>{questionPrompt}</li>
          <li onClick={() => dispatch(changeMode('search'))}>{searchPrompt}</li>
          {!loggedIn && <li onClick={() => dispatch(changeMode('login'))}>Login</li>}
          {!loggedIn && <li onClick={() => dispatch(changeMode('register'))}>Register</li>}
          {loggedIn && <li onClick={resetState}>Logout</li>}
        </ul>
      </nav>
    </div>
  )
  
}

export default Nav;