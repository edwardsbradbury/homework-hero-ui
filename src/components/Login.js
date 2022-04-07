// Module to render a login form, with methods to check input data, submit it to my API etc etc

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import API from '../features/API';
import {login} from '../features/user';
import {changeMode} from '../features/home';

function Login() {

  // Will need to dispatch Redux state update actions based on response from API
  const dispatch = useDispatch();
  // emailRegex used to verify the email1 field input is a valid email address
  const [emailRegex] = useState(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // email and password state variables will store the current values in the corresponding input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Control variable - login button disabled until both unput fields have soemething entered within them
  const canLogin = Boolean(email) && Boolean(password);
  let errorsObj = {
    emailMissing: '',
    emailInvalid: '',
    passwordMissing: ''
  }
  const [errors, setErrors] = useState(errorsObj);

  // Method to check the input credentials are valid - no point unecessarily sending invalid data to API just to get an error back
  function checkCredentials(e) {
    
    // Block the default HTML submission behaviour of redirecting/refreshing document in browser
    e.preventDefault();
    const errorObj = {...errorsObj};
    const emailValid = email !== '' && emailRegex.test(email);

    // Send data to API if email is not blank, is a valid email address and password is not blank
    if (emailValid && password !== '') {
      submitLogin();
    }

    // Execution reaches here if some validation failed. Figure out which correction prompts to show the user
    if (email === '') {
      errorObj.emailMissing = 'To login, you need to enter your email address';
    } else if (!emailRegex.test(email)) {
      errorObj.emailInvalid = 'The email address you entered is not a valid email address';
    }

    if (password === '') {
      errorObj.passwordMissing = 'To login, you need to enter your password';
    }

    // Show the prompt messages
    setErrors(errorObj);
  };
  
  // Method to actually transmit the validated login data to my API. This should really be in an asyncThunk in features/login.js
  function submitLogin() {
    API().post('login', {
      email: email,
      password: password
    }).then(
      response => {
        if (response.data.outcome === 'success') {
          // Update the mode property of the Redux state slice features/home.js
          dispatch(changeMode('dashboard'));
          // Update the user data in the Redux state slice features/user.js
          dispatch(login(
            {
              loggedIn: true,
              id: response.data.userId,
              type: response.data.userType,
              forename: response.data.first,
              lastname: response.data.last,
            }
          ));
        } else {

        }
      }
    ).catch(
      error => console.log(error));
  };

  return (
    // JSX to render the login form and message prompts to user
    <div id='Login'>
      <h1>Login</h1>
      <form onSubmit={checkCredentials}>
        <label htmlFor='email'>Email address </label>
        <input id='email' type='text' placeholder='you@website.com' value={email} onChange={e => setEmail(e.target.value.trim())}></input>
        {errors.emailMissing && <p>{errors.emailMissing}</p>}
        {errors.emailInvalid && <p>{errors.emailInvalid}</p>}
        <br />
        <label htmlFor='password'>Password </label>
        <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        {errors.passwordMissing && <p>{errors.passwordMissing}</p>}
        <br />
        <button>Forgotten password?</button>
        <input className='button' type='submit' value='Login' disabled={!canLogin}/>
      </form>
    </div>
  );
}

export default Login;