import {createSlice} from '@reduxjs/toolkit';

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    value: {
      // mode: 'splash'
      mode: 'dash'
    }},
  reducers: {
    changeMode: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const {changeMode} = homeReducer.actions;

export default homeReducer.reducer;