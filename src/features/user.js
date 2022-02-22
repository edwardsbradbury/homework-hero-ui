import {createSlice} from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    value: {
      loggedIn: false,
      name: '',
      id: null,
      type: 'client',
    }},
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  }
});

export default userReducer.reducer;