import React from 'react';
import {useSelector} from 'react-redux'

function Home() {
  const loggedIn = useSelector((state) => state.user.value.loggedIn);
  if (loggedIn) {
    return <Dashboard />
  } else {
    return <Splash />
  }
}

function Splash() {

}

function Dashboard() {
  
}