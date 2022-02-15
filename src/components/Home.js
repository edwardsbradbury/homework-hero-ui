import React from 'react';
import {useSelector} from 'react-redux';
import Login from './Login';
import Splash from './Splash';
import Dashboard from './Dashboard';

function Home() {
  const loggedIn = useSelector((state) => state.user.value.loggedIn);
  console.log(loggedIn);
  if (loggedIn) {
    return <Dashboard />
  } else {
    return <Splash />
  }
  // return (
  //   <h1>Homepage. Logged in =  {loggedIn}</h1>
  // )
}

export default Home;