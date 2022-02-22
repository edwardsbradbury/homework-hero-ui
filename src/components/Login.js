import React from 'react';
import {useDispatch} from 'react-redux';

function Login() {
  return (
    <div id='Login'>
      <h1>Login</h1>
      <form>
        <label>Email address </label>
        <input type='text' placeholder='you@website.com'></input>
        <label>Password </label>
        <input type='password'></input>
        <br />
        <button>Forgotten password?</button>
        <input type='submit' value='Login'/>
      </form>
    </div>
  );
}

export default Login;