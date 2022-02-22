import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Register() {
  const user_type = useSelector((state) => state.user.value.type);
  const email_label = user_type === 'client' ? `Designated teacher's email address` : `Personal tutor's email address`;
  const email_placeholder = user_type === 'client' ? 'teacher@school.ac.uk' : 'tutor@university.ac.uk'
  return (
    <div id='register'>
      <h1>Register for an account</h1>
      <form>
        <label htmlFor='reg_fname'>First name </label>
        <input id='reg_fname' type='text' placeholder='First name'></input>
        <label htmlFor='reg_lname'>Last name </label>
        <input id='reg_lname' type='text' placeholder='Last name'></input>
        <label htmlFor='reg_email'>Email address </label>
        <input id='reg_email' type='email' placeholder='you@website.com'></input>
        <br />
        <label htmlFor='reg_dob'>Date of birth </label>
        <input id='reg_dob' type='date'></input>
        <label htmlFor='reg_personal_tutor'>{email_label} </label>
        <input id='reg_personal_tutor' type='email' placeholder={email_placeholder}></input>
        <br />
        <label htmlFor='reg_password'>Password </label>
        <input id='reg_password' type='password'></input>
        <label htmlFor='reg_conf_pass'>Confirm password </label>
        <input id='reg_conf_pass' type='password'></input>
        <br />
        <label htmlFor='tc_checkbox'>I have read and agree to Homework Hero's terms and conditions: </label>
        <input id='tc_checkbox' type='checkbox'></input>
        <input type='submit' value='Register'/>
      </form>
    </div>
  );
}

export default Register;