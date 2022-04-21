// Component for collecting and then submitting search criteria to API

import React, {useState} from 'react';
import {useSelector} from 'react-redux';

function SearchForm(props) {
  const userType = useSelector(state => state.user.value.type);
  const [targetType] = useState(userType === 'client' ? 'tutors' : 'students');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const subjects = ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Design and Technology', 'ICT', 'Computer Science', 'Religious Education', 'Art', 'French', 'German', 'Spanish', 'Italian'];
  // Create an array of dropdown options using the subjects array above
  const subjectOptions = subjects.map((subject, index) => <option key={index} value={subject}>{subject}</option>);
  const levels = ['GCSE', 'A level', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'];
  // Create an array of dropdown options using the levels array above
  const levelOptions = levels.map((level, index) => <option key={index} value={level}>{level}</option>);

  // Method to update which users are shown based on search criteria selected from dropdowns
  function filterUsers(e) {

    // Prevent browser redirecting/refreshing on form submission
    e.preventDefault();
    // Clear any results remaining from a previous search
    props.setResults([]);

    if (subject && level) {
      const tempResults = props.users.filter(user => user.subject === subject && user.level === level);
      props.setResults(tempResults);
    } else if (subject && !level) {
      const tempResults = props.users.filter(user => user.subject === subject);
      props.setResults(tempResults);
    } else if (!subject && level) {
      const tempResults = props.users.filter(user => user.level === level);
      props.setResults(tempResults);
    }

    // See displayContent method in Search component
    if (subject || level) {
      props.setMode('filtered');
    } else {
      props.setMode('unfiltered');
    }
  }
  
  return (
    // JSX to render search form and user prompts
    <div id='searchForm'>
      <p>All {targetType} are displayed by default.</p>
      <p>Use the subject and/or level dropdowns and Search button to filter the search results.</p>
      <p>To re-display all {targetType}, clear the dropdowns and click Search again.</p>
      <form onSubmit={filterUsers}>
        <select onChange={e => setSubject(e.target.value)}>
          <option key='subjPrompt' value={''} selected>Subject</option>
          {subjectOptions}
        </select>
        <select onChange={e => setLevel(e.target.value)}>
          <option key='levelPrompt' value={''} selected>Level</option>
          {levelOptions}
        </select>
        <br />
        <input className='button' type='submit' value='Search'></input>
      </form>
    </div>
  )
}

export default SearchForm;