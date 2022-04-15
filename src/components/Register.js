// This module is a React component consisting of a registration form with 

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import API from '../features/API';
import {login} from '../features/user';
import {changeMode} from '../features/home';
import {setDashMode, setNewUser} from '../features/dash';

function Register() {

  // Need to dispatch various actions updating Redux state variables depending on response from my API's /register route
  const dispatch = useDispatch();
  // today state variable used in checkAge method defined below to check tutors are over 18 and clients aged between 11-17
  const [today] = useState(new Date());
  today.setHours(0,0,0,0);
  // Name regex used to verify first and last names contain only letters and hyphens
  const [nameRegex] = useState(/^[a-zA-Z]+(-[a-zA-Z]+)*$/);
  // emailRegex used to verify the email1 field input is a valid email address
  const [emailRegex] = useState(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // acEmailRegex used to verify the email2 input is a valid email address ending ac.uk
  const [acEmailRegex] = useState(/^[\w!#$%&'*+\/=?^`{|}~-]+(?:\.[\w!#$%&'*+\/=?`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:ac\.uk)$/);
  // Password regex tests for strong passwords - min 8 characters, at least 1 each of: capital & lower case letter, number and symbol
  const [passwordRegex] = useState(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
  const [userType, setUserType] = useState('client');
  const [clientEmailLabel] = useState(`Designated teacher's email address`);
  const [tutorEmailLabel] = useState(`University personal tutor's email address`);
  const [clientEmailPlaceholder] = useState('teacher@school.ac.uk');
  const [tutorEmailPlaceholder] = useState('tutor@university.ac.uk');
  const [emailLabel, setEmailLabel]  = useState(userType === 'client' ? clientEmailLabel : tutorEmailLabel);
  const [emailPlaceholder, setEmailPlaceholder] = useState(userType === 'client' ? clientEmailPlaceholder : tutorEmailPlaceholder);
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
  const [clientDobInvalid] = useState('The date of birth you entered is not valid. Pupils should be aged 11-17');
  const [tutorDobInvalid] = useState('The date of birth you entered is not valid. Tutors should be aged 18 or over');
  const [dobInvalid, setDobInvalid] = useState(userType === 'client' ? clientDobInvalid : tutorDobInvalid);
  const [desigTeacherEmailMissing] = useState(`Please enter your designated teacher's email address`);
  const [personalTutorEmailMissing] = useState(`Please enter your university personal tutor's email address`);
  const [secondEmailMissing, setSecondEmailMissing] = useState(userType === 'client' ? desigTeacherEmailMissing : personalTutorEmailMissing);
  const [desigTeacherEmailInvalid] = useState(`The designated teacher's email address you entered is invalid. Please enter their school email address ending .ac.uk`);
  const [personalTutorEmailInvalid] = useState(`The university personal tutor's email address you entered is invalid. Please enter their university email address ending .ac.uk`);
  const [secondEmailInvalid, setSecondEmailInvalid] = useState(userType === 'client' ? desigTeacherEmailInvalid : personalTutorEmailInvalid);
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

  // Boolean control value - Register button is disabled until all fields are filled and also no data submitted to API if any values are missing
  const allFieldsAreFilled = Boolean(forename) && Boolean(lastname) && Boolean(userEmail) && Boolean(dob) && Boolean(secondEmail) && Boolean(password) && Boolean(confPassword) && Boolean(tcBoxChecked);

  // Various display text should change depend on whether the user is registering as a client or a tutor; this sets those wben the user type dropodown value changes
  function updateState(type) {

    setUserType(type);
    if (type === 'tutor') {
      setEmailLabel(tutorEmailLabel);
      setEmailPlaceholder(tutorEmailPlaceholder);
      setDobInvalid(tutorDobInvalid);
      setSecondEmailMissing(personalTutorEmailMissing);
      setSecondEmailInvalid(personalTutorEmailInvalid);
    } else {
      setEmailLabel(clientEmailLabel);
      setEmailPlaceholder(clientEmailPlaceholder);
      setDobInvalid(clientDobInvalid);
      setSecondEmailMissing(desigTeacherEmailMissing);
      setSecondEmailInvalid(desigTeacherEmailInvalid);
    }
  }
  
  // Method to check that tutors are aged over 18, clients are aged 11 or over but under 18
  function checkAge(date) {

    const minus18Years = today.getFullYear() - 18;
    const under18Date = new Date();
    under18Date.setFullYear(minus18Years);
    under18Date.setHours(0,0,0,0);
    const over11Years = today.getFullYear() - 11;
    const over11Date = new Date();
    over11Date.setFullYear(over11Years);
    over11Date.setHours(0,0,0,0);

    if (userType === 'client') {
      if (date > under18Date && date <= over11Date) {
        return true;
      } else {
        return false;
      }
    } else {
      if (date <= under18Date) {
        return true;
      } else {
        return false;
      }
    }

  };
  
  // Check validity of registration form input and submit to API if valid
  function checkForm(e) {

    // Prevent the default HTML form behaviour of redirecting/refreshing on submission
    e.preventDefault();
    const errorObj = {...errorsObj};

    // Names and email are valid if not empty strings and match the regex formats above
    const forenameValid = forename !== '' && nameRegex.test(forename);
    const lastnameValid = lastname !== '' && nameRegex.test(lastname);
    const userEmailValid = userEmail !== '' && emailRegex.test(userEmail);
    const tempDob = new Date(dob);
    tempDob.setHours(0,0,0,0);
    // Use the checkDob method defined above to check the entered DOB is valid for the type of user
    const dobValid = checkAge(tempDob);
    const secondEmailValid = secondEmail !== '' && acEmailRegex.test(secondEmail);
    const passwordValid = password !== '' && passwordRegex.test(password);
    const confPasswordValid = confPassword !== '' && passwordRegex.test(confPassword);
    const passwordsMatch = password === confPassword;
    // Made sense to check at this point whether all input is valid - can then submit to API if so, avoiding the error message setting code
    const allFieldsAreValid = (forenameValid && lastnameValid && userEmailValid && dobValid && secondEmailValid && passwordValid && confPasswordValid && passwordsMatch) ? true : false;

    if (allFieldsAreFilled) {
      if (allFieldsAreValid) {
        submitRegistration();
      }
    }

    // Execution reaches here if some input is missing or invalid. So for each input field, check specifically what's wrong and add prompt message to user
    if (!forename) {
      errorObj.forenameMissing = forenameMissing;
    } else if (!nameRegex.test(forename)) {
      errorObj.forenameInvalid = forenameInvalid;
    }
    
    if (!lastname) {
      errorObj.lastnameMissing = lastnameMissing;
    } else if (!nameRegex.test(lastname)) {
      errorObj.lastnameInvalid = lastnameInvalid;
    }

    if (!userEmail) {
      errorObj.userEmailMissing = userEmailMissing;
    } else if (!emailRegex.test(userEmail)) {
      errorObj.userEmailInvalid = userEmailInvalid;
    }

    if (!dob) {
      errorObj.dobMissing = dobMissing;
    } else if (!dobValid) {
      errorObj.dobInvalid = dobInvalid;
    }

    if (!secondEmail) {
      errorObj.secondEmailMissing = secondEmailMissing;
    } else if (!acEmailRegex.test(secondEmail)) {
      errorObj.secondEmailInvalid = secondEmailInvalid;
    }

    if (!password) {
      errorObj.passwordMissing = passwordMissing;
    } else if (!passwordRegex.test(password)) {
      errorObj.passwordInvalid = passwordInvalid;
    }

    if (!confPassword) {
      errorObj.confPasswordMissing = confPasswordMissing;
    } else if (!passwordsMatch) {
      errorObj.confPasswordInvalid = confPasswordInvalid;
    }

    if (!tcBoxChecked) {
      errorObj.tcBoxUnchecked = tcBoxUnchecked;
    }

    // Set the error state object
    setErrors(errorObj);

  };

  // Method to actually transmit the validated registration data to my API. This should really be in an asyncThunk in features/register.js
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
        /* Update the necessary global state variables in Redux: mode and newUser properties in features/dash are updated, as are
          the mode property in fatures/home and the user data is updated in features/user */
        dispatch(login(
          {
            loggedIn: true,
            id: response.data.userId,
            type: userType,
            forename: forename,
            lastname: lastname,
          }
        ))
        dispatch(setDashMode('dash'));
        dispatch(setNewUser(true));
        dispatch(changeMode('dashboard'));
      } else if (Array.isArray(response.data.error)) {
        console.log('Server validation errors');
      } else {

      }
    })
    .catch(error => console.log(error));
  };


  return (
    // JSX to render the form component and message prompts to users based on interaction
    <div id='register'>
      <h1>Register for an account</h1>
      <form onSubmit={checkForm}>
        {errors.badResponse && <p>{errors.badResponse}</p>}
        <label htmlFor='accountType'>Account type </label>
        <select id='accountType' value={userType} onChange={e => updateState(e.target.value)}>
          <option value='client'>Pupil</option>
          <option value='tutor'>Tutor</option>
        </select>
        <br />
        <label htmlFor='forename'>First name </label>
        <input id='forename' type='text' placeholder='First name' value={forename} onChange={e => setForename(e.target.value.trim())}></input>
        {errors.forenameMissing && <p>{errors.forenameMissing}</p>}
        {errors.forenameInvalid && <p>{errors.forenameInvalid}</p>}
        <label htmlFor='lastname'>Last name </label>
        <input id='lastname' type='text' placeholder='Last name' value={lastname} onChange={e => setLastname(e.target.value.trim())}></input>
        {errors.lastnameMissing && <p>{errors.lastnameMissing}</p>}
        {errors.lastnameInvalid && <p>{errors.lastnameInvalid}</p>}
        <label htmlFor='userEmail'>Email address </label>
        <input id='userEmail' type='text' placeholder='you@website.com' value={userEmail} onChange={e => setEmail(e.target.value.trim())}></input>
        {errors.userEmailMissing && <p>{errors.userEmailMissing}</p>}
        {errors.userEmailInvalid && <p>{errors.userEmailInvalid}</p>}
        <br />
        <label htmlFor='dob'>Date of birth </label>
        <input id='dob' type='date' value={dob} onChange={e => setDob(e.target.value)}></input>
        {errors.dobMissing && <p>{errors.dobMissing}</p>}
        {errors.dobInvalid && <p>{errors.dobInvalid}</p>}
        <label htmlFor='secondEmail'>{emailLabel} </label>
        <input id='secondEmail' type='text' placeholder={emailPlaceholder} value={secondEmail} onChange={e => setSecondEmail(e.target.value.trim())}></input>
        {errors.secondEmailMissing && <p>{errors.secondEmailMissing}</p>}
        {errors.secondEmailInvalid && <p>{errors.secondEmailInvalid}</p>}
        <br />
        <label htmlFor='password'>Password </label>
        <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
        {errors.passwordMissing && <p>{errors.passwordMissing}</p>}
        {errors.passwordInvalid && <p>{errors.passwordInvalid}</p>}
        <label htmlFor='confPass'>Confirm password </label>
        <input id='confPass' type='password' value={confPassword} onChange={e => setConfPassword(e.target.value)}></input>
        {errors.confPasswordMissing && <p>{errors.confPasswordMissing}</p>}
        {errors.confPasswordInvalid && <p>{errors.confPasswordInvalid}</p>}
        <br />
        <label htmlFor='tcCheckbox'>I have read and agree to Homework Hero's terms and conditions: </label>
        <input id='tcCheckbox' type='checkbox' value={tcBoxChecked} onChange={e => setTcBoxChecked(!tcBoxChecked)}></input>
        {errors.tcBoxUnchecked && <p>{errors.tcBoxUnchecked}</p>}
        <input className='button' type='submit' value='Register' disabled={!allFieldsAreFilled}/>
      </form>
    </div>
  );
}

export default Register;