/* Slice of Redux state for data relating to the current user,
  with reducers and methods to update its properties */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {
  value: {
    loggedIn: false,
    id: null,
    type: 'client',
    forename: '',
    lastname: '',
}}


/* Method to call my API's logout route, which erases the user's session data */
export const logout = createAsyncThunk(
  'user/logout',
  async (thunkAPI) => {
    const response = await API().get('logout');
    return response.data;
});

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Overwrite the properties in the state slice, probably from Login or Register components on successful login/registration
    login: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* Upon receipt of API's response to the logout method defined above, reset the state slice
        to its initial state */
    builder.addCase(logout.fulfilled, state => {
      state.value = {
        loggedIn: false,
        id: null,
        type: 'client',
        forename: '',
        lastname: '',
      };
    })
  }
});


export const {login} = userReducer.actions;

export default userReducer.reducer;