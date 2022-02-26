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
    forenameMissing: '',
    forenameInvalid: '',
    lastnameMissing: '',
    lastnameInvalid: '',
    userEmailMissing: '',
    userEmailInvalid: '',
    dobMissing: '',
    dobInvalid: '',
    secondEmailMissing: '',
    secondEmailInvalid: '',
    passwordMissing: '',
    passwordInvalid: '',
    confPasswordMissing: '',
    confPasswordInvalid: '',
    tcBoxUnchecked: ''
  }
  const [errors, setErrors] = useState(errorsObj);

  function allFieldsAreFilled() {
    return (forename && lastname && userEmail && dob && secondEmail && password && confPassword && tcBoxChecked) ? true : false;
  };
  
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

  };
  
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

    if (!forename) {
      errorObj.forenameMissing = 'Please enter your first name';
    } else if (!nameRegex.test(forename)) {
      errorObj.forenameInvalid = 'Names can only contain letters and hyphens';
    }
    
    if (!lastname) {
      errorObj.lastnameMissing = 'Please enter your last name';
    } else if (!nameRegex.test(lastname)) {
      errorObj.lastnameInvalid = 'Names can only contain letters and hyphens';
    }

    if (!userEmail) {
      errorObj.userEmailMissing = 'Please enter your personal email address';
    } else if (!emailRegex.test(userEmail)) {
      errorObj.userEmailInvalid = 'The personal email address you entered is not valid. Please enter a valid email address';
    }

    if (!dob) {
      errorObj.dobMissing = 'Please enter your date of birth';
    } else if (!checkAge(dob)) {
      errorObj.dobInvalid = `The date of birth you entered is not valid. ${userType === 'client' ? 'Pupils' : 'Tutors'} should be aged ${userType === 'client' ? '11-17' : '18 or over'}`;
    }

    if (!secondEmail) {
      errorObj.secondEmailMissing = `Please enter your ${userType === 'client' ? 'designated teacher' : 'university personal tutor'}'s email address`;
    } else if (!emailRegex.test(secondEmail)) {
      errorObj.secondEmailInvalid = `The ${userType === 'client' ? 'designated teacher' : 'university personal tutor'}'s email address you entered is invalid. Please enter their school/university email address ending .ac.uk`;
    }

    if (!password) {
      errorObj.passwordMissing = 'Please enter a password: at least 8 characters long, containing at least 1 upper case letter, 1 lower case letter, 1 digit and 1 symbol';
    } else if (!passwordRegex.test(password)) {
      errorObj.passwordInvalid = 'Password must be at least 8 characters long, containing at least 1 upper case letter, 1 lower case letter, 1 digit and 1 symbol';
    }

    if (!confPassword) {
      errorObj.confPasswordMissing = 'Please re-enter the password for confirmation';
    } else if (confPassword !== password) {
      errorObj.confPasswordInvalid = 'The confirmation password should be the same as the password';
    }

    if (!tcBoxChecked) {
      errorObj.tcBoxUnchecked = 'Please read and agree to the terms and conditions';
    }

    setErrors(errorObj);

  };

  function submitRegistration() {
    // console.log('Sending registration data');
    API().post('register', {
      userType: userType,
      first: forename,
      last: lastname,
      email1: userEmail,
      dob: dob,
      email2: secondEmail,
      password: password,
      confPassword: confPassword
    }).then(response => console.log(response.data)).catch(error => console.log(error));
  };


  return (
    <div id='register'>
      <h1>Register for an account</h1>
      <form onSubmit={checkForm}>
        <label htmlFor='forename'>First name </label>
        <input id='forename' type='text' placeholder='First name' value={forename} onChange={(e) => setForename(e.target.value.trim())}></input>
        {errors.forenameMissing && <p>{errors.forenameMissing}</p>}
        {errors.forenameInvalid && <p>{errors.forenameInvalid}</p>}
        <label htmlFor='lastname'>Last name </label>
        <input id='lastname' type='text' placeholder='Last name' value={lastname} onChange={(e) => setLastname(e.target.value.trim())}></input>
        {errors.lastnameMissing && <p>{errors.lastnameMissing}</p>}
        {errors.lastnameInvalid && <p>{errors.lastnameInvalid}</p>}
        <label htmlFor='userEmail'>Email address </label>
        <input id='userEmail' type='text' placeholder='you@website.com' value={userEmail} onChange={(e) => setEmail(e.target.value.trim())}></input>
        {errors.userEmailMissing && <p>{errors.userEmailMissing}</p>}
        {errors.userEmailInvalid && <p>{errors.userEmailInvalid}</p>}
        <br />
        <label htmlFor='dob'>Date of birth </label>
        <input id='dob' type='date' value={dob} onChange={(e) => setDob(e.target.value)}></input>
        {errors.dobMissing && <p>{errors.dobMissing}</p>}
        {errors.dobInvalid && <p>{errors.dobInvalid}</p>}
        <label htmlFor='secondEmail'>{emailLabel} </label>
        <input id='secondEmail' type='text' placeholder={emailPlaceholder} value={secondEmail} onChange={(e) => setSecondEmail(e.target.value.trim())}></input>
        {errors.secondEmailMissing && <p>{errors.secondEmailMissing}</p>}
        {errors.secondEmailInvalid && <p>{errors.secondEmailInvalid}</p>}
        <br />
        <label htmlFor='password'>Password </label>
        <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        {errors.passwordMissing && <p>{errors.passwordMissing}</p>}
        {errors.passwordInvalid && <p>{errors.passwordInvalid}</p>}
        <label htmlFor='confPass'>Confirm password </label>
        <input id='confPass' type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}></input>
        {errors.confPasswordMissing && <p>{errors.confPasswordMissing}</p>}
        {errors.confPasswordInvalid && <p>{errors.confPasswordInvalid}</p>}
        <br />
        <label htmlFor='tcCheckbox'>I have read and agree to Homework Hero's terms and conditions: </label>
        <input id='tcCheckbox' type='checkbox' value={tcBoxChecked} onChange={(e) => setTcBoxChecked(!tcBoxChecked)}></input>
        {errors.tcBoxUnchecked && <p>{errors.tcBoxUnchecked}</p>}
        <input type='submit' value='Register'/>
      </form>
    </div>
  );
}

export default Register;