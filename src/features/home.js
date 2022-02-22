import {createSlice} from '@reduxjs/toolkit';

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    value: {
      mode: 'splash'
    }},
  reducers: {
    changeMode: (state, action) => {
      state.value = action.payload;
    },
  }
});

export default homeReducer.reducer;