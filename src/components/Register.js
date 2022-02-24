import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import API from '../features/API';

function Register() {

  const [today] = useState(new Date());
  today.setHours(0,0,0,0);
  const [nameRegex] = useState(/^[a-zA-Z]+(-[a-zA-Z]+)*$/);
  const [emailRegex] = useState(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [acEmailRegex] = useState(/^[\w!#$%&'*+\/=?^`{|}~-]+(?:\.[\w!#$%&'*+\/=?`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:ac\.uk)$/);
  const [passwordRegex] = useState(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
  const [userType, setUserType] = useState(useSelector((state) => state.user.value.type));
  const [emailLabel, setEmailLabel]  = useState(userType === 'client' ? `Designated teacher's email address` : `Personal tutor's email address`);
  const [emailPlaceholder, setEmailPlaceholder] = useState(userType === 'client' ? 'teacher@school.ac.uk' : 'tutor@university.ac.uk');
  const [forename, setForename] = useState('');
  const [lastname, setLastname] = useState('');
  const [userEmail, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [secondEmail, setSecondEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [tcBoxChecked, setTcBoxChecked] = useState(false);
  let errorsObj = {
    forename: '',
    lastname: '',
    userEmail: '',
    dob: '',
    secondEmail: '',
    password: '',
    confPassword: '',
    tcBox: ''
  }
  const [errors, setErrors] = useState(errorsObj);

  function allFieldsAreFilled() {
    return (forename && lastname && userEmail && dob && secondEmail && password && confPassword && tcBoxChecked) ? true : false;
  }
  
  function checkAge(date) {

    const minus18Years = today.getFullYear() - 18;
    const under18Date = new Date();
    under18Date.setFullYear(minus18Years);
    under18Date.setHours(0,0,0,0);
    const under11Years = today.getFullYear() - 11;
    const under11Date = new Date();
    under11Date.setFullYear(under11Years);
    under11Date.setHours(0,0,0,0);

    if (userType === 'client') {
      if (date <= under18Date) {
        return false;
      } else if (date >= under11Date) {
        return false;
      } else {
        return true;
      }
    } else {
      if (!(date <= under18Date)) {
        return false;
      }
      return true;
    }

  }
  
  function checkForm(e) {
    e.preventDefault();
    console.log('Checking form');
    const errorObj = {...errorsObj};

    const forenameValid = forename !== '' && nameRegex.test(forename);
    const lastnameValid = lastname !== '' && nameRegex.test(lastname);
    const userEmailValid = userEmail !== '' && emailRegex.test(userEmail);
    const tempDob = new Date(dob);
    tempDob.setHours(0,0,0,0);
    const dobValid = checkAge(tempDob);
    const secondEmailValid = secondEmail !== '' && acEmailRegex.test(secondEmail);
    const passwordValid = password !== '' && passwordRegex.test(password);
    const confPasswordValid = confPassword !== '' && passwordRegex.test(confPassword);
    const passwordsMatch = password === confPassword;
    const allFieldsAreValid = (forenameValid && lastnameValid && userEmailValid && dobValid && secondEmailValid && passwordValid && confPasswordValid && passwordsMatch) ? true : false;

    if (allFieldsAreFilled()) {
      if (allFieldsAreValid) {
        submitRegistration();
      }
    }

  }

  function submitRegistration() {
    // console.log('Sending registration data');
    API.post('register', {
      first: forename,
      last: lastname,
      email1: userEmail,
      dob: dob,
      email2: secondEmail,
      password: password,
      confPassword: confPassword
    }).then(response => console.log(response.data)).catch()
  }


  return (
    <div id='register'>
      <h1>Register for an account</h1>
      <form onSubmit={checkForm}>
        <label htmlFor='forename'>First name </label>
        <input id='forename' type='text' placeholder='First name' value={forename} onChange={(e) => setForename(e.target.value.trim())}></input>
        <label htmlFor='lastname'>Last name </label>
        <input id='lastname' type='text' placeholder='Last name' value={lastname} onChange={(e) => setLastname(e.target.value.trim())}></input>
        <label htmlFor='userEmail'>Email address </label>
        <input id='userEmail' type='email' placeholder='you@website.com' value={userEmail} onChange={(e) => setEmail(e.target.value.trim())}></input>
        <br />
        <label htmlFor='dob'>Date of birth </label>
        <input id='dob' type='date' value={dob} onChange={(e) => setDob(e.target.value)}></input>
        <label htmlFor='secondEmail'>{emailLabel} </label>
        <input id='secondEmail' type='email' placeholder={emailPlaceholder} value={secondEmail} onChange={(e) => setSecondEmail(e.target.value.trim())}></input>
        <br />
        <label htmlFor='password'>Password </label>
        <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value.trim())}></input>
        <label htmlFor='confPass'>Confirm password </label>
        <input id='confPass' type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value.trim())}></input>
        <br />
        <label htmlFor='tc_checkbox'>I have read and agree to Homework Hero's terms and conditions: </label>
        <input id='tc_checkbox' type='checkbox' value={tcBoxChecked} onChange={(e) => setTcBoxChecked(!tcBoxChecked)}></input>
        <input type='submit' value='Register'/>
      </form>
    </div>
  );
}

export default Register;