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

  // Method to validate the input 
  // function search(e) {

    // // Prevent browser redirecting/refreshing on form submission
    // e.preventDefault();
    // // Clear the warning prompt (may've been set on previous button click)
    // setError('');
    // /* See setResults method definition in ../features/search: essentially just clearing any previous search results here. Those are stored in the
    //     Redux store */
    // dispatch(setResults([]));

  //   /* I can probably simplify this logic somewhat. The mandatory paramaters for the search depend on whether the user is a  client or a tutor:
  //     clients must choose both subject and level, tutors can choose both or omit level and find all students needing help with a subject at
  //     any level of study. According to Redux and React docs, I should really be handling the API response and subsequent Redux state updates using
  //     extraReducers in ../features/search */
  //   if (userType === 'client') {
  //     if (subject && level) {
  //       dispatch(doSearch(
  //         {
  //           userType: userType,
  //           subject: subject,
  //           level: level
  //         }
  //       ))
  //       // Unwrap returns the promise from the API's response so I can access the result. A Redux thunk doesn't directly return the promise
  //       .unwrap()
  //       .then(result => {
  //         if (result.outcome === 'failure') {
  //           setError('Something went wrong! Please check your input and try again');
  //         } else {
  //           // If the result.result is a string, it's a message saying nothing was found
  //           if (typeof result.result === 'string') {
  //             setError('No results matched your search criteria');
  //           } else {
  //             /* result.result should be an array; dispatch an action assigning this array to the results property in ../features/search
  //               this part is what should really be moved into an extraReducer in aforementioned file */
  //             dispatch(setResults(result.result));
  //           }
  //         }
  //       })
  //     } else {
  //       // User is a client and hasn't entered both search parameters - display error prompt
  //       setError('You must enter the subject and level of study before you can search for tutors');
  //     }
  //   } else {
  //     // User isn't a client, so must be a tutor
  //     if (subject) {
  //       dispatch(doSearch(
  //         {
  //           userType: userType,
  //           subject: subject,
  //           level: level
  //         }
  //       ))
  //       // redux asyncThunks don't directly return the promise response from API - have to unwrap to access it
  //       .unwrap()
  //       .then(result => {
  //         if (result.outcome === 'error') {
  //           setError('Something went wrong! Please check your input and try again');
  //         } else if (typeof result.result === 'string') {
  //           // If the result.result is a  string then it's a message that nothing as found
  //           setError('No results matched your search criteria');
  //         } else {
  //           /* result.result should be an array; dispatch an action assigning this array to the results property in ../features/search
  //               this part is what should really be moved into an extraReducer in aforementioned file. Really everything from line 94
  //               to at least 113 should probably be in that file */
  //           dispatch(setResults(result.result))
  //         }
  //       })
  //     } else {
  //       // The tutor hasn't entered any search parameters. They must at least choose a subject
  //       setError('You must enter at least a subject before you can search for pupils');
  //     }
  //   }
  // }

  function filterUsers(e) {

    // Prevent browser redirecting/refreshing on form submission
    e.preventDefault();
    // Clear the warning prompt (may've been set on previous button click)
    setError('');
    //
    dispatch(setResults([]));
    /* See setResults method definition in ../features/search: essentially just clearing any previous search results here. Those are stored in the
        Redux store */
    dispatch(setResults([]));

    if (subject && level) {
      const tempResults = props.users.filter(user => user.subject === subject && user.level === level);
      dispatch(setResults(tempResults));
    } else if (subject && !level) {
      const tempResults = props.users.filter(user => user.subject);
      dispatch(setResults(tempResults));
    } else if (!subject && level) {
      const tempResults = props.users.filter(user => user.level);
      dispatch(setResults(tempResults));
    }

    if (subject || level) {
      props.setMode('filtered');
    }
  }
  
  return (
    // JSX to render search form and messages
    <div id='searchForm'>
      <p>{message}</p>
      {/* <form onSubmit={search}> */}
      <form onSubmit={filterUsers}>
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
        <input className='button' type='submit' value='Search'></input>
      </form>
    </div>
  )
}

export default SearchForm;