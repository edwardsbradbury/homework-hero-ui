// Component to contain subcomponents needed to facilitate search functionality

import React from 'react';
import {useSelector} from 'react-redux';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

function Search() {

  const userType = useSelector(state => state.user.value.type);
  const results = useSelector(state => state.search.value.results);

  return (
    <div id='search'>
      <h1>Search for {userType === 'client' ? 'tutors' : 'students'}</h1>
      <SearchForm />
      {(results.length > 0) && results.map(result => <SearchResult key={result.id} resultData={result}/>)}
    </div>
  )
}

export default Search;