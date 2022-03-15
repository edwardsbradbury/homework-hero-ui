import React, {useState} from 'react';
import {useSelector} from 'react-redux';

function SearchResult(props) {
  const userType = useSelector((state) => state.user.value.type);
  const loggedIn = useSelector((state) => state.user.value.loggedIn);
  const data = props.resultData;

  return (
    <div className='search-result'>
      <table>
        <caption>{data.first} </caption>
        <tr>
          <td></td>
          <td>
            {data.subject}
            {data.level}
          </td>
        </tr>
        <tr>
          <td>Some description about being a great {userType === 'tutor' ? 'tutor' : 'student'}.</td>
          <td>
            {loggedIn && <button>Message</button>}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default SearchResult;