import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import API from '../features/API';
import {doSearch} from '../features/search';

function SearchForm() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.user.value.type);
  const messageIfClient = useState(`Choose the subject you need help with and the level you're studying at`);
  const messageIfTutor = useState(`Choose the subject you want to teach\n
    You can also specify the level you're confident teaching this subject at, or leave the level blank to see students of all levels who need help`);
  const message = useState(userType === 'client' ? messageIfClient : messageIfTutor);
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const subjectPrompt = useState('Subject');
  const subjects = ['Maths', 'English', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Design & Technology', 'ICT', 'Computer Science', 'Religious Education', 'Art', 'French', 'German', 'Spanish', 'Italian'];
  const subjectOptions = subjects.map((subject, index) => <option key={index} value={subject}>{subject}</option>);
  const levelPrompt = useState('Level');
  const levels = ['GCSE', 'A-level', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'];
  const levelOptions = levels.map((level, index) => <option key={index} value={level}>{level}</option>);

  function search(e) {
    e.preventDefault();

    if (userType === 'client') {
      if (Boolean(subject) && Boolean(level)) {
        dispatch(doSearch(
          {
            subject: subject,
            level: level
          }
        ));
      }
    } else {
      if (Boolean(subject)) {
        dispatch(doSearch());
      }
    }
  }
  
  return (
    <div id='searchForm'>
      <p>{message}</p>
      <form onSubmit={search}>
        <select value={subjectPrompt} onChange={(e) => setSubject(e.target.value)}>
          <option key='subjPrompt' value={subjectPrompt} disabled>{subjectPrompt}</option>
          {subjectOptions}
        </select>
        <select value={levelPrompt} onChange={(e) => setLevel(e.target.value)}>
          <option key='levelPrompt' value={levelPrompt} disabled>{levelPrompt}</option>
          {levelOptions}
        </select>
        <br />
        <input type='submit' value='Search'></input>
      </form>
    </div>
  )
}

export default SearchForm;