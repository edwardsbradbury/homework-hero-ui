import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../features/home';
import API from '../features/API';
import {logout} from '../features/user';

function Nav() {
  const user_data = useSelector((state) => state.user.value);
  const loggedIn = user_data.loggedIn;
  const user_type = user_data.type;
  const question_prompt = user_type === 'client' ? 'Ask a question' : 'Browse questions';
  const search_prompt = user_type === 'client' ? 'Search for tutors' : 'Search for clients';
  const dispatch = useDispatch();

  function logout() {
    dispatch(logout());
    dispatch(changeMode({mode: 'splash'}));
  }

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
        <button onClick={() => dispatch(changeMode({mode: 'faq'}))}>F.A.Q</button>
        <button onClick={() => dispatch(changeMode({mode: 'questions'}))}>{question_prompt}</button>
        <button onClick={() => dispatch(changeMode({mode: 'search'}))}>{search_prompt}</button>
        {!loggedIn && <button onClick={() => dispatch(changeMode({mode: 'login'}))}>Login</button>}
        {!loggedIn && <button onClick={() => dispatch(changeMode({mode: 'register'}))}>Register</button>}
        {loggedIn && <button onClick={() => logout()}>Logout</button>}
      </nav>
    </div>
  )
  
}

export default Nav;