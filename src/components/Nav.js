import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../features/home'

function Nav() {
  const user_data = useSelector((state) => state.user.value);
  const loggedIn = user_data.loggedIn;
  const user_type = user_data.type;
  const question_prompt = user_type === 'client' ? 'Ask a question' : 'Browse questions';
  const search_prompt = user_type === 'client' ? 'Search for tutors' : 'Search for clients';
  const dispatch = useDispatch();

  return (
    <div id='nav'>
      <img
        id='logo'
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
      </nav>
    </div>
  )
  
}

export default Nav;