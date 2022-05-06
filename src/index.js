import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import userReducer from './features/user';
import homeReducer from './features/home';
import dashReducer from './features/dash';
import searchReducer from './features/search';
import messagingReducer from './features/messaging';

// Here to line 45 is all configuration/set-up of the Redux global state store + state persistence
const rootReducer = combineReducers(
  {
    user: userReducer,
    home: homeReducer,
    dashboard: dashReducer,
    search: searchReducer,
    messaging: messagingReducer
  }
)

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

/* Persistor saves snapshot of the entire Redux state to browser's local storage on refresh or navigation away
    and re-hydrates it (i.e. re-loads that state upon return to Homework Hero, so it appears as it did when they
      were last using it */
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
