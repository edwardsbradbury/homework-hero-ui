// Container component, possibly redundant. Might move the JSX logic in here up a level into App.js later

import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Splash from './Splash';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Search from './Search';

function Home() {

  // Here I'm referencing the entire Redux global state store - all global state variables are retrieved
  const state = useSelector(state => state);
  // The components registered depend on whether or not the user is logged in
  const loggedIn = state.user.value.loggedIn;
  // Mode also used to control which components to display
  const mode = state.home.value.mode;
  
  return (
    <div id='home'>
      <Nav />
      {loggedIn && <Dashboard />}
      {mode === 'splash' && <Splash />}
      {mode === 'login' && <Login />}
      {mode === 'register' && <Register />}
      {mode === 'search' && <Search />}
    </div>
  )
}

export default Home;