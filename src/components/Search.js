// Component to contain subcomponents needed to facilitate search functionality

import React, {useState, useEffect, useReducer} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUsers} from '../features/search';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

function Search() {

  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.value.type);
  const allUsers = useSelector(state => state.search.value.allUsers);
  const results = useSelector(state => state.search.value.results);
  const errors = useSelector(state => state.search.value.errors);
  const [mode, setMode] = useState('unfiltered');

  // After component is created and mounted, fetch all of the 
  useEffect(() => {
    dispatch(getAllUsers(userType));
  }, [])

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
        results.map(result => <SearchResult key={result.id} resultData={result}/>)
      )
    }
  }

  return (
    <div id='search'>
      <h1>Search for {userType === 'client' ? 'tutors' : 'students'}</h1>
      {errors.length &&
        <ul>
          {errors.map(error => <li className='error'>{error}</li>)}
        </ul>
      }
      <SearchForm />
      {/* {(results.length > 0) && results.map(result => <SearchResult key={result.id} resultData={result}/>)} */}
      {displayContent()}
    </div>
  )
}

export default Search;