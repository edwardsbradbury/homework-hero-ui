// Dashboard component - serves as the homepage users see when logged in

import React from 'react';
import {useSelector} from 'react-redux';
import DashMenu from './DashMenu';
import Onboarding from './Onboarding';
import Messaging from './Messaging';

function Dashboard() {

  // Referencing properties of Redux global state. Values of these variables control which components are rendered
  const user = useSelector(state => state.user.value);
  const newUser = useSelector(state => state.dashboard.value.newUser);
  const mode = useSelector(state => state.dashboard.value.mode);

  return (
    <div id='dashboard'>
      <h1>Welcome, {user.forename}</h1>
      {!newUser && <DashMenu />}
      {/* Newly registered users are shown the onboaring component, requiring them to add a subject and level of study to their record */}
      {newUser && <Onboarding />}
      {mode === 'messages' && <Messaging />}
    </div>
  )
}

export default Dashboard;