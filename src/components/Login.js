import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import API from '../features/API';
import {login} from '../features/user';
import {changeMode} from '../features/home';

function Login() {
  const dispatch = useDispatch();
  const userType = useState(useSelector((state) => state.user.value.type));
  const [emailRegex] = useState(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let errorsObj = {
    emailMissing: '',
    emailInvalid: '',
    passwordMissing: ''
  }
  const [errors, setErrors] = useState(errorsObj);

  function checkCredentials(e) {
    e.preventDefault();
    const errorObj = {...errorsObj};
    const emailValid = email !== '' && emailRegex.test(email);

    if (emailValid && password !== '') {
      submitLogin();
    }

    if (email === '') {
      errorObj.emailMissing = 'To login, you need to enter your email address';
    } else if (!emailRegex.test(email)) {
      errorObj.emailInvalid = 'The email address you entered is not a valid email address';
    }

    if (password === '') {
      errorObj.passwordMissing = 'To login, you need to enter your password';
    }

    setErrors(errorObj);
  };
  
  function submitLogin() {
    API().post('login', {
      email: email,
      password: password
    }).then(
      (response) => console.log(response.data)
    ).catch(
      (error) => console.log(error));
  };

  return (
    <div id='Login'>
      <h1>Login</h1>
      <form onSubmit={checkCredentials}>
        <label htmlFor='email'>Email address </label>
        <input id='email' type='text' placeholder='you@website.com' value={email} onChange={(e) => setEmail(e.target.value.trim())}></input>
        {errors.emailMissing && <p>{errors.emailMissing}</p>}
        {errors.emailInvalid && <p>{errors.emailInvalid}</p>}
        <label htmlFor='password'>Password </label>
        <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        {errors.passwordMissing && <p>{errors.passwordMissing}</p>}
        <br />
        <button>Forgotten password?</button>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default Login;