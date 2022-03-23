/* Component to create a kind of 'card', i.e. a div container for a formatted table to display a search result
passed in as a prop */

import React, {useState} from 'react';
import {useSelector} from 'react-redux';

function SearchResult(props) {
  const userType = useSelector(state => state.user.value.type);
  const loggedIn = useSelector(state => state.user.value.loggedIn);
  const data = props.resultData;

  return (
    <div className='search-result'>
      <table>
        <caption>{data.first} </caption>
        <tr>
          <td></td>
          <td>
            {data.subject}
            <br />
            {data.level}
          </td>
        </tr>
        <tr>
          {/* Ultimately here should be a bio which should come from the database via the API */}
          <td>Some description about being a great {userType === 'client' ? 'tutor' : 'student'}.</td>
          <td>
            {loggedIn && <button>Message</button>}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default SearchResult;