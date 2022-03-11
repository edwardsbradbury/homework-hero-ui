import React from 'react';
import {useSelector} from 'react-redux';
import DashMenu from './DashMenu';
import Onboarding from './Onboarding';

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const newUser = useSelector((state) => state.dashboard.value.newUser);
  const mode = useSelector((state) => state.dashboard.value.mode);
  return (
    <div id='dashboard'>
      <h1>Welcome, {user.forename}</h1>
      {!newUser && <DashMenu />}
      {newUser && <Onboarding />}
    </div>
  )
}

export default Dashboard;