import React, {useState} from 'react';
import {useSelector} from 'react-redux';

function SearchResult(props) {
  const mode = useSelector((state) => state.search.value.mode);
  const user = useSelector((state) => state.user);
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
          <td>Some description about being a great {user.type === 'tutor' ? 'tutor' : 'student'}.</td>
          <td>
            {user.loggedIn && <button>Message</button>}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default SearchResult;