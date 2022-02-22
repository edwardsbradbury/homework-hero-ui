import {createSlice} from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    value: {
      loggedIn: false,
      f_name: '',
      l_name: '',
      id: null,
      type: 'client',
    }},
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const {login} = userReducer.actions;

export default userReducer.reducer;