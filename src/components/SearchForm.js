// Component for collecting and then submitting search criteria to API

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {doSearch, setResults} from '../features/search';

function SearchForm(props) {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.value.type);
  const messageIfClient = useState(`Choose the subject you need help with and the level you're studying at`);
  const messageIfTutor = useState(`Choose the subject you want to teach\n
    You can also specify the level you're confident teaching this subject at, or leave the level blank to see students of all levels who need help`);
  const [message] = useState(userType === 'client' ? messageIfClient : messageIfTutor);
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const subjectPrompt = useState('Subject');
  const subjects = ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Design and Technology', 'ICT', 'Computer Science', 'Religious Education', 'Art', 'French', 'German', 'Spanish', 'Italian'];
  // Create an array of dropdown options using the subjects array above
  const subjectOptions = subjects.map((subject, index) => <option key={index} value={subject}>{subject}</option>);
  const levelPrompt = useState('Level');
  const levels = ['GCSE', 'A level', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'];
  // Create an array of dropdown options using the levels array above
  const levelOptions = levels.map((level, index) => <option key={index} value={level}>{level}</option>);
  const [error, setError] = useState('');


  function filterUsers(e) {

    // Prevent browser redirecting/refreshing on form submission
    e.preventDefault();
    // Clear the warning prompt (may've been set on previous button click)
    setError('');
    /* See setResults method definition in ../features/search: essentially just clearing any previous search results here. Those are stored in the
        Redux store */
    dispatch(setResults([]));

    if (subject && level) {
      const tempResults = props.users.filter(user => user.subject === subject && user.level === level);
      dispatch(setResults(tempResults));
    } else if (subject && !level) {
      const tempResults = props.users.filter(user => user.subject === subject);
      dispatch(setResults(tempResults));
    } else if (!subject && level) {
      const tempResults = props.users.filter(user => user.level === level);
      dispatch(setResults(tempResults));
    }

    if (subject || level) {
      props.setMode('filtered');
    } else {
      props.setMode('unfiltered');
    }
  }
  
  return (
    // JSX to render search form and messages
    <div id='searchForm'>
      <p>{message}</p>
      {/* <form onSubmit={search}> */}
      <form onSubmit={filterUsers}>
        <select defaultValue={subjectPrompt} onChange={e => setSubject(e.target.value)}>
          {/* <option key='subjPrompt' value={subjectPrompt} disabled>{subjectPrompt}</option> */}
          <option key='subjPrompt' value={''}>{subjectPrompt}</option>
          {subjectOptions}
        </select>
        <select defaultValue={levelPrompt} onChange={e => setLevel(e.target.value)}>
          <option key='levelPrompt' value={''}>{levelPrompt}</option>
          {levelOptions}
        </select>
        {error && <p>{error}</p>}
        <br />
        <input className='button' type='submit' value='Search'></input>
      </form>
    </div>
  )
}

export default SearchForm;