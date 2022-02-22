import React from 'react';
import {useDispatch} from 'react-redux';

function Login() {
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
        <input type='submit' value='Login'/>
      </form>
    </div>
  );
}

export default Login;