import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import API from '../features/API';
import {login} from '../features/user';
import {changeMode} from '../features/home';

function Register() {

  const dispatch = useDispatch();
  const [today] = useState(new Date());
  today.setHours(0,0,0,0);
  const nameRegex = useState(/^[a-zA-Z]+(-[a-zA-Z]+)*$/);
  const emailRegex = useState(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const acEmailRegex = useState(/^[\w!#$%&'*+\/=?^`{|}~-]+(?:\.[\w!#$%&'*+\/=?`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:ac\.uk)$/);
  const passwordRegex = useState(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
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
  const forenameMissing = useState('Please enter your first name');
  const forenameInvalid = useState('Names can only contain letters and hyphens');
  const lastnameMissing = useState('Please enter your last name');
  const lastnameInvalid = useState('Names can only contain letters and hyphens');
  const userEmailMissing = useState('Please enter your personal email address');
  const userEmailInvalid = useState('The personal email address you entered is not valid. Please enter a valid email address');
  const dobMissing = useState('Please enter your date of birth');
  const dobInvalid = useState(`The date of birth you entered is not valid. ${userType === 'client' ? 'Pupils' : 'Tutors'} should be aged ${userType === 'client' ? '11-17' : '18 or over'}`);
  const secondEmailMissing = useState(`Please enter your ${userType === 'client' ? 'designated teacher' : 'university personal tutor'}'s email address`);
  const secondEmailInvalid = useState(`The ${userType === 'client' ? 'designated teacher' : 'university personal tutor'}'s email address you entered is invalid. Please enter their school/university email address ending .ac.uk`);
  const passwordMissing = useState('Please enter a password: at least 8 characters long, containing at least 1 upper case letter, 1 lower case letter, 1 digit and 1 symbol');
  const passwordInvalid = useState('Password must be at least 8 characters long, containing at least 1 upper case letter, 1 lower case letter, 1 digit and 1 symbol');
  const confPasswordMissing = useState('Please re-enter the password for confirmation');
  const confPasswordInvalid = useState('The confirmation password should be the same as the password');
  const tcBoxUnchecked = useState('Please read and agree to the terms and conditions');
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
    tcBoxUnchecked: '',
    badResponse: '',
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
      // errorObj.forenameMissing = 'Please enter your first name';
      errorObj.forenameMissing = forenameMissing;
    } else if (!nameRegex.test(forename)) {
      // errorObj.forenameInvalid = 'Names can only contain letters and hyphens';
      errorObj.forenameInvalid = forenameInvalid;
    }
    
    if (!lastname) {
      // errorObj.lastnameMissing = 'Please enter your last name';
      errorObj.lastnameMissing = lastnameMissing;
    } else if (!nameRegex.test(lastname)) {
      // errorObj.lastnameInvalid = 'Names can only contain letters and hyphens';
      errorObj.lastnameInvalid = lastnameInvalid;
    }

    if (!userEmail) {
      // errorObj.userEmailMissing = 'Please enter your personal email address';
      errorObj.userEmailMissing = userEmailMissing;
    } else if (!emailRegex.test(userEmail)) {
      // errorObj.userEmailInvalid = 'The personal email address you entered is not valid. Please enter a valid email address';
      errorObj.userEmailInvalid = userEmailInvalid;
    }

    if (!dob) {
      // errorObj.dobMissing = 'Please enter your date of birth';
      errorObj.dobMissing = dobMissing;
    } else if (!checkAge(dob)) {
      // errorObj.dobInvalid = `The date of birth you entered is not valid. ${userType === 'client' ? 'Pupils' : 'Tutors'} should be aged ${userType === 'client' ? '11-17' : '18 or over'}`;
      errorObj.dobInvalid = dobInvalid;
    }

    if (!secondEmail) {
      // errorObj.secondEmailMissing = `Please enter your ${userType === 'client' ? 'designated teacher' : 'university personal tutor'}'s email address`;
      errorObj.secondEmailMissing = secondEmailMissing;
    } else if (!emailRegex.test(secondEmail)) {
      // errorObj.secondEmailInvalid = `The ${userType === 'client' ? 'designated teacher' : 'university personal tutor'}'s email address you entered is invalid. Please enter their school/university email address ending .ac.uk`;
      errorObj.secondEmailInvalid = secondEmailInvalid;
    }

    if (!password) {
      // errorObj.passwordMissing = 'Please enter a password: at least 8 characters long, containing at least 1 upper case letter, 1 lower case letter, 1 digit and 1 symbol';
      errorObj.passwordMissing = passwordMissing;
    } else if (!passwordRegex.test(password)) {
      // errorObj.passwordInvalid = 'Password must be at least 8 characters long, containing at least 1 upper case letter, 1 lower case letter, 1 digit and 1 symbol';
      errorObj.passwordInvalid = passwordInvalid;
    }

    if (!confPassword) {
      // errorObj.confPasswordMissing = 'Please re-enter the password for confirmation';
      errorObj.confPasswordMissing = confPasswordMissing;
    } else if (confPassword !== password) {
      // errorObj.confPasswordInvalid = 'The confirmation password should be the same as the password';
      errorObj.confPasswordInvalid = confPasswordInvalid;
    }

    if (!tcBoxChecked) {
      // errorObj.tcBoxUnchecked = 'Please read and agree to the terms and conditions';
      errorObj.tcBoxUnchecked = tcBoxUnchecked;
    }

    setErrors(errorObj);

  };

  function submitRegistration() {
    API().post('register', {
      userType: userType,
      first: forename,
      last: lastname,
      email1: userEmail,
      dob: dob,
      email2: secondEmail,
      password: password,
      confPassword: confPassword
    })
    .then(response => {
      if (response.data.outcome === 'success') {
        dispatch(login(
          {
            loggedIn: true,
            id: response.data.userId,
            userType: userType,
            forename: forename,
            lastname: lastname,
          }
        ))
      } else if (Array.isArray(response.data.error)) {
        console.log('Server validation errors');
      } else {

      }
    })
    .catch(error => console.log(error));
  };


  return (
    <div id='register'>
      <h1>Register for an account</h1>
      <form onSubmit={checkForm}>
        {errors.badResponse && <p>{errors.badResponse}</p>}
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