import {createSlice} from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    value: {
      loggedIn: false,
      id: null,
      type: 'client',
      forename: '',
      lastname: ''
    }},
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const {login} = userReducer.actions;

export default userReducer.reducer;