/* Component to be displayed to newly registered users. Requires user to select a subject and level of study (either that they need
    help with or are confident teaching). Posts this data to API to store in database. Search component uses this db table */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addSubject} from '../features/dash';

function Onboarding() {

  // Will need to dispatch some Redux state update actions
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const [userType] = useState(user.type);

  const messageIfClient = useState(`Add a subject that you need help with and the level you're studying this subject at. This will help tutors who teach that subject to find you`);
  const messageIfTutor = useState(`Choose a subject you want to teach and the level you're confident teaching this subject at`);
  const [message] = useState(userType === 'client' ? messageIfClient : messageIfTutor);
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const subjectPrompt = useState('Subject');
  const subjects = ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Design and Technology', 'ICT', 'Computer Science', 'Religious Education', 'Art', 'French', 'German', 'Spanish', 'Italian'];
  const subjectOptions = subjects.map((subject, index) => <option key={index} value={subject}>{subject}</option>);
  const levelPrompt = useState('Level');
  const levels = ['GCSE', 'A level', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'];
  const levelOptions = levels.map((level, index) => <option key={index} value={level}>{level}</option>);
  const [error, setError] = useState('');
  const errMessage = useState('Please add a subject and level');

  function displayMessage() {
    if (userType === 'client') {
      return `Add a subject that you need help with and the level you're studying this subject at. This will help tutors who teach that subject to find you`;
    } else {
      return `Choose a subject you want to teach and the level you're confident teaching this subject at`;
    }
  }
  
  // Method to submit the input data to API's /add_subject route. See features/dash for details of the addSubject action
  function addSubjectToProfile() {
    setError('');
    if (subject && level) {
      dispatch(addSubject(
        {
          id: user.id,
          first: user.forename,
          last: user.lastname,
          userType: userType,
          subject: subject,
          level: level
        }
      ))
    } else {
      setError(errMessage);
    }
  }
  
  return(
    <div id='onboarding'>
      {/* <p>{message}</p> */}
      <p>{displayMessage()}</p>
      <select defaultValue={subjectPrompt} onChange={e => setSubject(e.target.value)}>
        <option key='subjPrompt' value={subjectPrompt} disabled>{subjectPrompt}</option>
        {subjectOptions}
      </select>
      <select defaultValue={levelPrompt} onChange={e => setLevel(e.target.value)}>
        <option key='levelPrompt' value={levelPrompt} disabled>{levelPrompt}</option>
        {levelOptions}
      </select>
      {error && <p>{error}</p>}
      <br />
      <button onClick={addSubjectToProfile} disabled={!(subject && level)}>Add</button>
    </div>
  )
}

export default Onboarding;