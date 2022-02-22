import React from 'react';
import {useDispatch} from 'react-redux';

function Register() {
  return (
    <div id='register'>
      <h1>Register for an account</h1>
      <form>
        <label htmlFor='reg_name'>Full name </label>
        <input id='reg_name' type='text' placeholder='Full name'></input>
        <label htmlFor='reg_email'>Email address </label>
        <input id='reg_email' type='email' placeholder='you@website.com'></input>
        <br />
        <label htmlFor='reg_dob'>Date of birth </label>
        <input id='reg_dob' type='date'></input>
        <label htmlFor='reg_personal_tutor'>Personal tutor's address </label>
        <input id='reg_personal_tutor' type='email' placeholder='tutor@university.ac.uk'></input>
        <br />
        <label htmlFor='reg_password'>Password </label>
        <input id='reg_password' type='password'></input>
        <label htmlFor='reg_conf_pass'>Confirm password </label>
        <input id='reg_conf_pass' type='password'></input>
        <br />
        <input type='submit' value='Register'/>
      </form>
    </div>
  );
}

export default Register;