import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Nav from './Nav';
import Splash from './Splash';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

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
    </div>
  )
  // if (loggedIn) {
  //   return (
  //     <div id='home'>
  //       <Nav />
  //       <Dashboard />
  //     </div>
  //   )
  // } else if (mode === 'splash') {
  //   return (
  //     <div id='home'>
  //       <Nav />
  //       <Splash />
  //     </div>
  //   )
  // } else if (mode === 'login') {
  //   return (
  //     <div id='home'>
  //       <Nav />
  //       <Login />
  //     </div>
  //   )
  // } else if (mode === 'register') {
  //   return (
  //     <div id='home'>
  //       <Nav />
  //       <Register />
  //     </div>
  //   )
  // }
}

export default Home;