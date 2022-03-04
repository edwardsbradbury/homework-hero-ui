import React from 'react';
import {useSelector} from 'react-redux';
import DashMenu from './DashMenu';

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  return (
    <div id='dashboard'>
      <h1>Welcome to your dashboard, {user.forename}</h1>
      <DashMenu />
    </div>
  )
}

export default Dashboard;