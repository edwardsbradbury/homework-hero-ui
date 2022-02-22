import React from 'react';
import {useSelector} from 'react-redux';
import Splash from './Splash';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function Home() {
  const homeState = useSelector((state) => state);
  const loggedIn = homeState.user.value.loggedIn;
  const mode = homeState.home.value.mode;
  // console.log(loggedIn);
  if (loggedIn) {
    return <Dashboard />
  } else if (mode === 'splash') {
    return <Splash />
  } else if (mode === 'login') {
    return <Login />
  } else if (mode === 'register') {
    return <Register />
  }
}

export default Home;