import React from 'react';
import {useDispatch} from 'react-redux';
import {changeMode} from '../features/home';
import {login} from '../features/user';
import API from '../features/API';

function Login() {
  const dispatch = useDispatch();

  function send_login() {
    API.post().then().catch();
  }

  return (
    <div id='Login'>
      <h1>Login</h1>
      <form>
        <label htmlFor='login_email'>Email address </label>
        <input id='login_email' type='text' placeholder='you@website.com'></input>
        <label htmlFor='login_password'>Password </label>
        <input id='login_password' type='password'></input>
        <br />
        <button>Forgotten password?</button>
        <button
          onClick={() => 
            dispatch(login({
              loggedIn: true,
              f_name: '',
              l_name: '',
              id: 1,
              type: 'client'
            }))}>Login</button>
      </form>
    </div>
  );
}

export default Login;