import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userReducer from './features/user';
import homeReducer from './features/home';
import dashReducer from './features/dash';
import searchReducer from './features/search';
import messagingReducer from './features/messaging';


// Configure a Redux global state store, import the following state slices and their methods from features
const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
    dashboard: dashReducer,
    search: searchReducer,
    messaging: messagingReducer
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
