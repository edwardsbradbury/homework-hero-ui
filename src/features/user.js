import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {value: {
  loggedIn: false,
  id: null,
  type: 'client',
  forename: '',
  lastname: '',
  newUser: false
}}

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
    login: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action) =>{
      state.value = initialState.value;
    })
  }
});


export const {login} = userReducer.actions;

export default userReducer.reducer;