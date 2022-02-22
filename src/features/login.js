import {createSlice} from '@reduxjs/toolkit';

export const loginFormReducer = createSlice({
  name: 'loginForm',
  initialState: {
    value: {
      email: null,
      password: null
    }},
  reducers: {
    updateForm: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const {updateForm} = homeReducer.actions;

export default loginFormReducer.reducer;