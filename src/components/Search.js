/* Component to contain subcomponents (SearchForm, SearchResult) needed to facilitate search functionality.
  By default, displays all users of opposite type to the current user. SearchForm component can filter the
  collection of users based on subject and level. The displayContent handles the conditional rendering */

import React, {useState, useEffect, useReducer} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUsers} from '../features/search';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

function Search() {

  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.value.type);
  const loggedIn = useSelector(state => state.user.value.loggedIn);
  const allUsers = useSelector(state => state.search.value.allUsers);
  const fetchingError = useSelector(state => state.search.value.error);
  const [targetType] = useState(userType === 'client' ? 'tutors' : 'students');
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState('unfiltered');

  // After component is created and mounted, fetch all of the users of the opposite type to current user
  useEffect(() => {
    dispatch(getAllUsers(userType));
  }, [])

  // Method to update the content displayed in browser based on user interaction
  function displayContent() {
    if (mode === 'unfiltered' && allUsers.length < 1) {
      return <p>There are no registered {userType === 'client' ? 'tutors' : 'students'} yet</p>
    } else if (mode === 'unfiltered' && allUsers.length > 0) {
      return (
        <>
          {allUsers.map(user => <SearchResult key={user.id} resultData={user}/>)}
        </>
      )
    } else if (mode === 'filtered' && results.length < 1) {
      return <p>No {userType === 'client' ? 'tutors' : 'students'} matched your search parameters</p>
    } else if (mode === 'filtered' && results.length > 0) {
      return (
        <>
          {results.map(result => <SearchResult key={result.id} resultData={result}/>)}
        </>
      )
    }
  }

  return (
    <div id='search'>
      <h1>Search for {targetType}</h1>
      {!loggedIn && <p>If you want to contact a tutor, you'll have to create an account.</p>}
      <SearchForm users={allUsers} setResults={setResults} setMode={setMode} />
      {fetchingError && <p className='error'>{fetchingError}</p>}
      {displayContent()}
    </div>
  )
}

export default Search;