import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/user';
import homeReducer from './features/home';
import dashReducer from './features/dash';
import searchReducer from './features/search';
import messagingReducer from './features/messaging';
import { PersistGate } from 'redux-persist/es/integration/react';


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

const persistor = persistStore(store);

// Configure a Redux global state store, import the following state slices and their methods from features
// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     home: homeReducer,
//     dashboard: dashReducer,
//     search: searchReducer,
//     messaging: messagingReducer
//   }
// });

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
