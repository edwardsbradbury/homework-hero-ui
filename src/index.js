import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userReducer from './features/user.js';
import homeReducer from './features/home.js';
import dashReducer from './features/dash.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
    dashboard: dashReducer
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
