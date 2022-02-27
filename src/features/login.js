import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API'

export const submitLogin = createAsyncThunk(
  'login/submitLogin',
  async ({userData}) => {
    return API().post('/register', userData);
  }
);

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
  },
  extraReducers: {

  }
});

export const {updateForm} = homeReducer.actions;

export default loginFormReducer.reducer;