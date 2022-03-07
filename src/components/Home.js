import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import Splash from './Splash';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Search from './Search';

function Home() {
  const homeState = useSelector((state) => state);
  const loggedIn = homeState.user.value.loggedIn;
  const mode = homeState.home.value.mode;
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