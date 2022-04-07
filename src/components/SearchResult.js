/* Component to create a kind of 'card', i.e. a div container for a formatted table to display a search result
passed in as a prop */

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeMode} from '../features/home';
import {changeDashMode} from '../features/dash';
import {setMessagingMode, setRecipId} from '../features/messaging';

function SearchResult(props) {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.user.value.type);
  const loggedIn = useSelector(state => state.user.value.loggedIn);
  const data = props.resultData;

  /* If user is logged in, a search result contains a Message button. This method is called on clicking that button. Method
      unmounts the Search component from Home, switches to Dashboard. Dashboard is rendered in messages mode. Messaging is
      rendered in 'from search' mode - MessageForm without any prior conversation data */
  function contactUser() {
    dispatch(changeMode('dashboard'));
    dispatch(changeDashMode({
       mode: 'messages',
       newUser: false
    }));
    dispatch(setRecipId(data.userId));
    dispatch(setMessagingMode('from search'));
  }

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
            {loggedIn && <button onClick={contactUser}>Message</button>}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default SearchResult;