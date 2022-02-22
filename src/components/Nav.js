import React from 'react';
import {useDispatch} from 'react-redux';
import { changeMode } from '../features/home'

function Nav() {
  const dispatch = useDispatch();
  return (
    <div id='nav'>
      <a href='/'>
        <img id='logo' src={require('../assets/logo.png')}></img>
      </a>
      <nav>
        <button onClick={() => dispatch(changeMode({mode: 'login'}))}>Login</button>
        <button onClick={() => dispatch(changeMode({mode: 'register'}))}>Register</button>
      </nav>
    </div>
  )
}

export default Nav;