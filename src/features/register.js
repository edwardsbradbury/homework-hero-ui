import {createSlice} from '@reduxjs/toolkit';

export const registerFormReducer = createSlice({
  name: 'registerForm',
  initialState: {
    value: {
      first: null,
      last: null,
      email1: null,
      dob: null,
      email2: null,
      password: null,
      confPassword: null
    }},
  reducers: {
    updateForm: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const {updateForm} = homeReducer.actions;

export default registerFormReducer.reducer;