import React from 'react';
import {useSelector} from 'react-redux';
import SearchForm from './SearchForm';

function Search() {
  const mode = useSelector((state) => state.search.value.mode);
  const userType = useSelector((state) => state.user.value.type);

  return (
    <div id='search'>
      <h1>Search for {userType === 'client' ? 'tutors' : 'students'}</h1>
      {mode === 'query' && <SearchForm />}
    </div>
  )
}

export default Search;